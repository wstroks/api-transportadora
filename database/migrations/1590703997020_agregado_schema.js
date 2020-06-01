'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgregadoSchema extends Schema {
  up () {
    this.create('agregados', (table) => {
      table.increments()
      table.string('nome').notNullable();
      table.string('cpf').notNullable();
      table.string('telefone').notNullable();
      table.string('rg').notNullable();
      table.integer('empresas_id').unsigned().references('id').inTable('empresas').onUpdate('CASCADE').onDelete('CASCADE')     
      table.timestamps()
    })
  }

  down () {
    this.drop('agregados')
  }
}

module.exports = AgregadoSchema
