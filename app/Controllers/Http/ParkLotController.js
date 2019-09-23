'use strict'

const ParkLot = use('App/Models/ParkLot');
const User = use('App/Models/User');
const Car = use('App/Models/Car');

class ParkLotController {
    async create({request, response}){
        const data = request.only(["owner_id", "cep", "address", 'latitude', 'longitude', 'vacancyQtt']);
        const parkLot = await ParkLot.create(data)
        return parkLot;
    }

    async show({request, response, params}){
        const user = await User.findOrFail(params.id);
        return await user.parklots().fetch()
    }

    async parking_car({request, response}){
        const parking = request.only(["car_id", "park_id"]);
        try{

            const car = await Car.findOrFail(parking.car_id);
            const park = await ParkLot.findOrFail(parking.park_id);
            //insert into pivot table
            const parking_car = await park.parkingCar().attach(car,(row)=>{
                row.park_lot_id = park.id,
                row.car_id = car.id,
                row.vacancyNumber = 1
                row.isInVacancy = true
            })
            car.isInParkLot = true;
            await car.save()
            return parking_car
        }catch(err){
            console.log(err)
            if(err.errno === 19){
                return response.status(400).send({'error':'There is already a car in this vacancy'})
            }
            return response.status(500).send({'error':'No park lot found'})
        }
    }

    async unparking_car({request, response}){
            const parking = request.only(["car_id", "park_id"]);
        try{
            const park = await ParkLot.findOrFail(parking.park_id);
            const car = await Car.findOrFail(parking.car_id);
            //remove into pivot table
            //constnotaFiscal = await NotaFiscal.create([{}])
            const parking_car = await park.parkingCar().detach()
                if(parking_car === 1){
                    car.isInParkLot = false;
                    await car.save()
                    response.status(200).send({'data':"Car leaves from park lot!"}) 
                }else{
                    response.status(400).send({'data':'No car is attached to leave!'})
                }
            }catch(err){
                console.log(err)
                response.status(404).send({'error':'No park lot found'})
        }
    }

}

module.exports = ParkLotController
