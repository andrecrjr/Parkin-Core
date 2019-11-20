'use strict'

const Car = use('App/Models/Car');
const User = use('App/Models/User');

class CarController{
    async create_car({request, response}){
        try{
            const data = request.only(["car_model", "car_code", "owner_id"]);
            console.log(data)
            const car = await Car.create(data);
            console.log(car)
            return car;
        }
        catch(err){
            console.log(err)
            return err
        }
    }
    
    async show_cars({params}){
        const user = await User.find(params.id);
        const cars = await user.cars().fetch();
        return cars.toJSON();
    }

}

module.exports = CarController