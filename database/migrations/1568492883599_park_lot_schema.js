'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParkLotSchema extends Schema {
  up () {
    this.create('park_lots', (table) => {
      table.increments()
      table.integer('owner_id').notNullable().unsigned()
      .references('id').inTable('users')
      .onUpdate('cascade').onDelete('cascade');
      table.string('cep').notNullable();
      table.string('address').notNullable();
      table.decimal('latitude', 9, 6).notNullable();
      table.decimal('longitude', 9, 6).notNullable();
      table.integer('vacancyQtt').notNullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('park_lots')
  }
}

module.exports = ParkLotSchema
