'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Car extends Model {

    owner(){
        return this.belongsTo('App/Models/User')
    }
    parkLot(){
        return this.belongsToMany('App/Models/ParkLot', 'id', 'car_id').pivotTable('park_lots_uses')
    }
}

module.exports = Car
