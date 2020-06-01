'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CaminhaoSchema extends Schema {
  up () {
    this.create('caminhaos', (table) => {
      table.increments()
      table.string('modelo').notNullable()
      table.string('placa').notNullable()
      table.string('ano').notNullable()
      table.string('chassis').notNullable()
      table.string('renavam').notNullable()
      table.integer('agregados_id').unsigned().references('id').inTable('agregados').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('caminhaos')
  }
}

module.exports = CaminhaoSchema
