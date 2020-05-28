'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgregadoSchema extends Schema {
  up () {
    this.create('agregados', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('agregados')
  }
}

module.exports = AgregadoSchema
