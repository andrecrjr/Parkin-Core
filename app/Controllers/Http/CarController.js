'use strict'

const Car = use('App/Models/Car');
const User = use('App/Models/User');

class CarController{
    async create_car({request, response}){
        const data = request.only(["car_model", "car_code", "owner_id"]);
        const car = await Car.create(data);
        return car;
    }
    
    async show_cars({params}){
        const user = await User.find(params.id);
        const cars = await user.cars().fetch();
        return cars.toJSON();
    }

}

module.exports = CarController