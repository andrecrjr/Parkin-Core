'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class ParkLot extends Model {

    owner(){
        return this.belongsTo('App/Models/User');
    }

    parkingCar(){
        return this.belongsToMany('App/Models/Car', 'id', 'park_lot_id').pivotTable('park_lots_uses');
    }

    static scopeNearBy (query, latitude, longitude, distance){
        const haversine = `(6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude)
        - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(latitude))))`
    
      return query.select('*', Database.raw(`${haversine} as distance`))
        .whereRaw(`${haversine} < ${distance}`)
    }

}

module.exports = ParkLot
