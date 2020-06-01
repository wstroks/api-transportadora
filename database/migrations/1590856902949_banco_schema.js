'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BancoSchema extends Schema {
  up () {
    this.create('bancos', (table) => {
      table.increments()
      table.string('banco').notNullable();
      table.string('conta').notNullable();
      table.string('agencia').notNullable();
      table.string('tipo_conta').notNullable();
      table.integer('agregados_id').unsigned().references('id').inTable('agregados').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('bancos')
  }
}

module.exports = BancoSchema
