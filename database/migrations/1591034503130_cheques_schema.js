'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChequesSchema extends Schema {
  up () {
    this.create('cheques', (table) => {
      table.increments()
      table.string('banco').notNullable()
      table.string('valor').notNullable()
      table.string('numeracao').notNullable()
      table.string('status').notNullable()
      table.string('data').notNullable()
      table.integer('fretes_id').unsigned().references('id').inTable('fretes').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('cheques')
  }
}

module.exports = ChequesSchema
