'use strict'
const Boleto = use('App/Models/Boleto');
const Empresa = use('App/Models/Empresa');
const { validateAll } = use('Validator');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with boletos
 */
class BoletoController {
  /**
   * Show a list of all boletos.
   * GET boletos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {

    try {
      const empresa = await Empresa.query().where('users_id', '=', auth.user.id).first();

      const boletos = await Boleto.query().where('empresas_id', '=', empresa.id).fetch();

      return response.status(200).json({ boletos });
    } catch (err) {
      return response.status(500).send({ error: `Error ${err.message}` });
    }
  }

  /**
   * Create/save a new boleto.
   * POST boletos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {

    try {
      const erroMessage = {
        'valor.required': 'Campo nome é obrigatório',
        'tipo.required': 'Campo tipo é obrigatório',
        'dia.required': 'Campo dia é obrigatório',
        'parcelas.required': 'Campo parcelas é obrigatório'
        
      }
      const validation = await validateAll(request.all(), {
        valor: 'required',
        tipo: 'required',
        dia: 'required',
        parcelas: 'required'
        
      }, erroMessage);

      //adicionei validation no post não vou colocar no edit, pq vou mandar apenas quem for alterado
      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }

      const empresa = await Empresa.query().where('users_id', '=', auth.user.id).first();
      const data = request.all();
      //esqueci do relacionamento 
      const boleto = await Boleto.create({ ...data, empresas_id: empresa.id });

      return response.status(200).json({ message: 'Cadastro realizado com sucesso', boleto: boleto });

    } catch (err) {
      response.status(500).send({ error: `Error ${err.messege}` });
    }
  }

  /**
   * Display a single boleto.
   * GET boletos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view, auth }) {
    try {
      const empresa = await Empresa.query().where('users_id', '=', auth.user.id).first();

      const boleto = await Boleto.query().where('id', params.id).where('empresas_id', '=', empresa.id).first();

      if (!boleto) {
        return response.status(200).json({ message: "Id não existe!" });
      }

      return response.status(200).json({ boleto });
    } catch (err) {
      return response.status(500).send({ error: `Error ${err.message}` });
    }

  }

  /**
   * Render a form to update an existing boleto.
   * GET boletos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view, auth }) {
    try {

      const data = request.all();
      const empresa = await Empresa.query().where('users_id', '=', auth.user.id).first();

      const boleto = await Boleto.query().where('id', params.id).where('empresas_id', '=', empresa.id).first();

      if (!boleto) {
        return response.status(200).json({ message: "Id não existe!" });
      }

      boleto.tipo = data.tipo;
      boleto.valor = data.valor;
      boleto.dia = data.dia;
      boleto.parcelas = data.parcelas;
      boleto.save();

      return response.status(200).json({ boleto });
    } catch (err) {
      return response.status(500).send({ error: `Error ${err.message}` });
    }
  }


  /**
   * Delete a boleto with id.
   * DELETE boletos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, auth }) {

    try {
      const empresa = await Empresa.query().where('users_id', '=', auth.user.id).first();
      // console.log(empresa)
      const boleto = await Boleto.query().where('id', params.id).where('empresas_id', '=', empresa.id).first();
      //test
      if (!boleto) {
        return response.status(200).json({ message: "Id não existe!" });
      }
      boleto.delete();

      return response.status(200).json({message:"Boleto deletado!", boleto: boleto });
    } catch (err) {
      return response.status(500).send({ error: `Error ${err.message}` });
    }


  }
}

module.exports = BoletoController
