'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DasSimpleSchema extends Schema {
  up () {
    this.create('das_simples', (table) => {
      table.increments()
      table.string('valor_cobrado').notNullable()
      table.string('valor_real').notNullable()
      table.string('porcentagem_cobranca').notNullable()
      table.string('porcentagem_calculada').notNullable()
      table.string('data').notNullable() 
      table.integer('fretes_id').unsigned().references('id').inTable('fretes').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('das_simples')
  }
}

module.exports = DasSimpleSchema
