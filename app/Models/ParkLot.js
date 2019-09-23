'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ParkLot extends Model {

    owner(){
        return this.belongsTo('App/Models/User');
    }

    parkingCar(){
        return this.belongsToMany('App/Models/Car', 'id', 'park_lot_id').pivotTable('vacancy_park_lots');
    }

}

module.exports = ParkLot
