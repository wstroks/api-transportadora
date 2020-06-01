'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DespesaFixaSchema extends Schema {
  up () {
    this.create('despesa_fixas', (table) => {
      table.increments()
      table.string('tipo').notNullable()
      table.string('valor').notNullable()
      table.string('dia').notNullable()
      table.integer('empresas_id').unsigned().references('id').inTable('empresas').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('despesa_fixas')
  }
}

module.exports = DespesaFixaSchema
