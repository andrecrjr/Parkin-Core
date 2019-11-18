'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParkLotsUse extends Schema {
  up () {
    this.create('park_lots_uses', (table) => {
      table.increments()
      table.integer('park_lot_id').unsigned().notNullable().references('id').inTable('park_lots').onUpdate('cascade').onDelete('cascade');
      table.integer('car_id').unsigned().notNullable().references('id').inTable('cars').onUpdate('cascade').onDelete('cascade');
      table.boolean('parkin_has_car').defaultTo(false)
      table.integer('parkin_active_number').notNullable().defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('park_lots_uses')
  }
}

module.exports = ParkLotsUse
