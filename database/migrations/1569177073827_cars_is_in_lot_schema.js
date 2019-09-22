'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarsIsInLotSchema extends Schema {
  up () {
    this.table('cars', (table) => {
      // alter table
      table.boolean('isInParkLot').defaultTo(false).notNullable();
    })
  }

  down () {
    this.table('cars', (table) => {
      // reverse alternations
      table.dropColumn('isInParkLot');
    })
  }
}

module.exports = CarsIsInLotSchema
