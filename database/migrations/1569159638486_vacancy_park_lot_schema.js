'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VacancyParkLotSchema extends Schema {
  up () {
    this.create('vacancy_park_lots', (table) => {
      table.integer('park_lot_id').unsigned().notNullable().references('id').inTable('parklots').onUpdate('cascade').onDelete('cascade');
      table.integer('car_id').unsigned().notNullable().references('id').inTable('cars').onUpdate('cascade').onDelete('cascade');
      table.boolean('isInVacancy').defaultTo(false)
      table.integer('vacancyNumber').notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('vacancy_park_lots')
  }
}

module.exports = VacancyParkLotSchema
