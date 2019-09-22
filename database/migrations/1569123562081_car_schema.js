'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarSchema extends Schema {
  up () {
    this.create('cars', (table) => {
      table.increments()
      table.timestamps()
      table.string('model').notNullable();
      table.string('car_code').notNullable();
      table.integer('owner_id').unsigned().notNullable().references('id').inTable('users').onUpdate('cascade').onDelete('cascade');    })
  }

  down () {
    this.drop('car')
  }
}

module.exports = CarSchema
