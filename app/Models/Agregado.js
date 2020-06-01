'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Agregado extends Model {
    empresas(){
        return this.belongsTo('App/Models/Empresa')
    }
    bancos(){
        return this.hasMany('App/Models/Banco')
    }

    caminhao(){
        return this.hasMany('App/Models/Caminhao')
    }
}

module.exports = Agregado
