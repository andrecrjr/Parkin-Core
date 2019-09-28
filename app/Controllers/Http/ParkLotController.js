'use strict'

const ParkLot = use('App/Models/ParkLot');
const User = use('App/Models/User');
const Car = use('App/Models/Car');

class ParkLotController {
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

    async parking_car({request, response}){
        const parking = request.only(["car_id", "park_id", "parkin_active_number"]);
        try{

            const car = await Car.findOrFail(parking.car_id);
            const park = await ParkLot.findOrFail(parking.park_id);
            //insert into pivot table
            //const isThereCarHere = await park.parkingCar().pivotQuery().where('park_lot_id', );
            //console.log(isThereCarHere)
            const parking_car = await park.parkingCar().attach(car,(row)=>{
                row.park_lot_id = park.id,
                row.car_id = car.id,
                row.parkin_active_number = parking.parkin_active_number
                row.parkin_has_car = true
            })
            car.is_in_parklot = true;
            await car.save()
            return parking_car
        }catch(err){
            if(err.errno === 19){
                return response.status(400).send({'error':'There is already a car in this park lot'})
            }
            
            return response.status(500).send({'error':'No park lot or car found'})
        }
    }

    async unparking_car({request, response}){
        const parking = request.only(["car_id", "park_id"]);
        try{
            const park = await ParkLot.findOrFail(parking.park_id);
            const car = await Car.findOrFail(parking.car_id);
            //remove into pivot table
            //constnotaFiscal = await NotaFiscal.create([{}])
            const parking_car = await park.parkingCar().pivotQuery().where('car_id', car.id).delete();
            console.log(parking_car)
                if(parking_car === 1){
                    car.is_in_parklot = false;
                    await car.save()
                    response.status(200).send({'data':"Car leaves from park lot!"}) 
                }else{
                    response.status(400).send({'data':'No car is attached to leave!'})
                }
            }
            catch(err){
            console.log(err)
            response.status(404).send({'error':'No park lot found'})
        }
    }

}

module.exports = ParkLotController
