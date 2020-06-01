'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Caminhao extends Model {
    agregados(){
        return this.belongsTo('App/Models/Agregado')
    }
}

module.exports = Caminhao
