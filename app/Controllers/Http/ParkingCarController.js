'use strict'

const Database = use('Database')
const Car = use('App/Models/Car');
const ParkLot = use('App/Models/ParkLot');


class ParkingCarController {
    
    constructor(){
        this.parkLot = Database.from('park_lots')
        this.parkLotCar = Database.from('park_lots_uses');
    }

    
    async alreadyHasCar (park_id, withcars=false){
        let hasCar = []
        let listCarsId = []
        let insideParkinLot = {};

        const existLot = await this.parkLotCar.where({
            park_lot_id: park_id,
            parkin_has_car:true,
        })
        existLot.forEach((data)=>{
            if(data.parkin_has_car === 1){
                hasCar.push(data.parkin_active_number)
                if(withcars){
                    listCarsId.push({"active_number":data.parkin_active_number,"car_id":data.car_id})
                }
            }
        })
        if(withcars){
            insideParkinLot.listCarsId = listCarsId
            insideParkinLot.hasCar = hasCar
            return insideParkinLot;
        }
        return hasCar
    }
    
    
    async list_parkings({request, params}){
        const {has_cars} = request.all()
        const park = await ParkLot.findOrFail(params.id)
        const insideParkin = await this.alreadyHasCar(park.id, true);
        let list_parkins = [];

            for(let i = 1; i <= park.parkins_number ; i++){
                //verify if it exists in database some parkin true and going to send an array of ids
                //if not includes... so not include it in the json
                if(!insideParkin.hasCar.includes(i)){
                    list_parkins.push({"active_parkin":i,"parkin_has_car":false, "park_lot":park.id});
                }else 
                    if(has_cars==='true'){
                        insideParkin.listCarsId.forEach((data)=>{
                            //if active number is equal of value of the "i" above
                            if(data.active_number === i){
                                list_parkins.push({"active_parkin":i,"parkin_has_car":true, ...data});
                            }
                        })
                    }
                }
        return list_parkins;
    }

    
    async parking_car({request, response}){
        const parking = request.only(["car_id", "park_id", "parkin_active_number"]);
        try{
            const car = await Car.findOrFail(parking.car_id);
            const park = await ParkLot.findOrFail(parking.park_id);
            const hasCar = await this.alreadyHasCar(park.id);
            let parking_car = undefined
                if(parking.parkin_active_number > park.parkins_number){
                    return response.status(404).json({"error":"This parkin not exist"})
                }
                //if car is_in_parklot is false add it to park lot
                if(!hasCar.includes(parking.parkin_active_number) && !car.is_in_parklot)
                    {
                        parking_car = await park.parkingCar().attach(car, async (row)=>{
                                row.id = await this.parkLotCar.getMax('id') + 1 || 1,
                                //add the row id getting it the max last id + 1 or 1
                                row.park_lot_id = park.id,
                                row.car_id = car.id,
                                row.parkin_active_number = parking.parkin_active_number
                                row.parkin_has_car = true
                        })
                    }
                else{
                    return response.status(400).json({"error":"Your car is already in a parkin or this park is not active"})
                }
            car.is_in_parklot = true;
            await car.save()
            return parking_car
        }catch(err){
            console.log(err)
            return response.status(500).send({'error':'No park lot or car found'})
        }
    }


    async unparking_car({request, response}){
        const parking = request.only(["car_id", "park_id", 'parkin_active_number']);
        try{
            const park = await ParkLot.findOrFail(parking.park_id);
            const car = await Car.findOrFail(parking.car_id);
            //find in the parklotuse database where is the parklot the car and the active lot
            const parking_car = await this.parkLotCar.where({
                    parkin_active_number:parking.parkin_active_number, 
                    car_id:car.id, 
                    park_lot_id:park.id
                }).delete()
                if(parking_car){
                    car.is_in_parklot = false;
                    await car.save()
                    response.status(200).send({'data':"Car leaves from park lot!"}) 
                }else{
                    response.status(400).send({'data':'No car is attached to leave!'})
                }
            }
            catch(err){
            response.status(404).send({'error':'No park lot or car found'})
        }
    }
}

module.exports = ParkingCarController
