'use strict'

const ParkLot = use('App/Models/ParkLot');
const User = use('App/Models/User');
const Car = use('App/Models/Car');
const Database = use('Database')

class ParkLotController {

    constructor(){
        this.parkLot = Database.from('park_lots')
        this.parkLotCar = Database.from('park_lots_uses');
    }

    async alreadyHasCar (park_id){
        let hasCar = []
        const existLot = await this.parkLotCar.where({
            park_lot_id: park_id,
            parkin_has_car:true,
        })
        existLot.forEach((data)=>{
            if(data.parkin_has_car === 1){
                hasCar.push(data.parkin_active_number)
            }
        })
        return hasCar
    }

    async create({request, response}){
        const data = request.only(["owner_id", "cep", "address", 'latitude', 'longitude', 'parkins_number']);
        const parkLot = await ParkLot.create(data)
        return parkLot;
    }

    async show({request, response, params}){
        const user = await User.findOrFail(params.id);
        const lot = await user.parklots().fetch();
        const json = lot.toJSON()
        json.forEach( async(data_lot)=>{
            let park = await ParkLot.findOrFail(data_lot.id)
            const database = await park.parkingCar().pivotQuery().where('park_lot_id', park.id).fetch()
            console.log(database.toJSON())
        })
        return json
    }

    async list_parkings({params}){
        const park = await ParkLot.findOrFail(params.id)
        let number_of_parks = park.parkins_number;
        const hasCar = await this.alreadyHasCar(park.id);
        let json = [];

        for(let i = 1; i <= number_of_parks ; i++){
            if(!hasCar.includes(i)){
                json.push({"id":i,"parkin_has_car":false});
            }
        }
        return json;
    }

    async parking_car({request, response}){
        const parking = request.only(["car_id", "park_id", "parkin_active_number"]);
        try{
            const car = await Car.findOrFail(parking.car_id);
            const park = await ParkLot.findOrFail(parking.park_id);
            const hasCar = await this.alreadyHasCar(park.id);
            let parking_car = undefined
            console.log(hasCar)
                if(parking.parkin_active_number > park.parkins_number){
                    return response.status(404).json({"error":"This parkin not exist"})
                }
                
                if(!hasCar.includes(parking.parkin_active_number))
                {
                    parking_car = await park.parkingCar().attach(car, async (row)=>{
                            row.id = await this.parkLotCar.getMax('id') + 1 || 1,
                            row.park_lot_id = park.id,
                            row.car_id = car.id,
                            row.parkin_active_number = parking.parkin_active_number
                            row.parkin_has_car = true
                    
                    })
                }else{
                    return response.status(400).json({"error":"There is a car already in this parkin or this parkin not exist"})
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

module.exports = ParkLotController
