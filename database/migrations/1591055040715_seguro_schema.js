'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeguroSchema extends Schema {
  up () {
    this.create('seguros', (table) => {
      table.increments()
      table.string('valor').notNullable()
      table.integer('empresas_id').unsigned().references('id').inTable('empresas').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('seguros')
  }
}

module.exports = SeguroSchema
