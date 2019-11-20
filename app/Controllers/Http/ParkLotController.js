'use strict'

const ParkLot = use('App/Models/ParkLot');
const User = use('App/Models/User');

class ParkLotController {


    async create({request}){
        const data = request.only(["owner_id", "cep", "address", 'latitude', 'longitude', 'parkins_number']);
        const parkLot = await ParkLot.create(data)
        return parkLot;
    }

    async show({params}){
        const user = await User.findOrFail(params.id);
        const lot = await user.parklots().fetch();
        const json = lot.toJSON()
        return json
    }

    async findParkLots({request}){
        const { latitude, longitude, distance } = request.all()
        
        const parklots = await ParkLot.query().nearBy(latitude, longitude, distance || 2).fetch()
        
        return parklots
    }
    
}

module.exports = ParkLotController
