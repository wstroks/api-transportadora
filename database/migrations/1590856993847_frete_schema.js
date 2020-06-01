'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FreteSchema extends Schema {
  up () {
    this.create('fretes', (table) => {
      table.increments()
      table.string('valor').notNullable()
      table.string('status').notNullable()
      table.string('transferencia').notNullable()
      table.integer('agregados_id').unsigned().references('id').inTable('agregados').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('empresas_id').unsigned().references('id').inTable('empresas').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('fretes')
  }
}

module.exports = FreteSchema
