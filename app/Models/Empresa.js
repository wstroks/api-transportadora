'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Empresa extends Model {

    users() {
        return this.hasMany('App/Models/User')
    }
    agregados(){
        return this.hasMany('App/Models/Agregado')
    }

}

module.exports = Empresa
