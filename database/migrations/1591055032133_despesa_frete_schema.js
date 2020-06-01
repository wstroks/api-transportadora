'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DespesaFreteSchema extends Schema {
  up () {
    this.create('despesa_fretes', (table) => {
      table.increments()
      table.string('tipo').notNullable()
      table.string('valor').notNullable()
      table.integer('empresas_id').unsigned().references('id').inTable('empresas').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('despesa_fretes')
  }
}

module.exports = DespesaFreteSchema
