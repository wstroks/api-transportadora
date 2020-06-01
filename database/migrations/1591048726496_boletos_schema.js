'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoletosSchema extends Schema {
  up () {
    this.create('boletos', (table) => {
      table.increments()
      table.string('tipo').notNullable()
      table.string('valor').notNullable()
      table.string('parcelas').notNullable()
      table.string('dia').notNullable()
      table.integer('empresas_id').unsigned().references('id').inTable('empresas').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('boletos')
  }
}

module.exports = BoletosSchema
