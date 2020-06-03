'use strict'
const Agregado = use('App/Models/Agregado');
const Empresa = use('App/Models/Empresa');
const { validateAll } = use('Validator');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with agregados
 */
class AgregadoController {
  /**
   * Show a list of all agregados.
   * GET agregados
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    try {
      const empresa = await Empresa.query().where('users_id', '=', auth.user.id).first();

      const agregados = await Agregado.query().where('empresas_id', '=', empresa.id).fetch();

      return response.status(200).json({ agregados });
    } catch (err) {
      return response.status(500).send({ error: `Error ${err.message}` });
    }
  }

  /**
   * Create/save a new agregado.
   * POST agregados
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const erroMessage = {
        'nome.required': 'Campo nome é obrigatório',
        'nome.min': 'O tamanho minimo para esse campo é 8',
        'cpf.required': 'Campo cpf é obrigatório',
        'rg.required': 'Campo rg é obrigatório',
        'telefone.required': 'Campo telefone é obrigatório',
        'cpf.unique': 'Esse cpf já foi cadastrado',
        'rg.unique': 'Esse rg já foi cadastrado',

      }

      // procurar um validator de cpf e rg depois..
      const validation = await validateAll(request.all(), {
        nome: 'required|min:8',
        cpf: 'required|unique:agregados',
        rg: 'required|unique:agregados',
        telefone: 'required'

      }, erroMessage);

      //flwwww

      //adicionei validation no post não vou colocar no edit, pq vou mandar apenas quem for alterado
      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }
      const empresa = await Empresa.query().where('users_id', '=', auth.user.id).first();
      const data = request.only(['nome', 'cpf', 'rg', 'telefone']);

      const agregado = await Agregado.create({ ...data, empresas_id: empresa.id });

      return response.status(200).json({ message: 'Cadastro de agregado realizado com sucesso', agregado: agregado });

    } catch (err) {
      response.status(500).send({ error: `Error ${err.message}` });
    }
  }

  /**
   * Display a single agregado.
   * GET agregados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view, auth }) {
    try {
      const empresa = await Empresa.query().where('users_id', '=', auth.user.id).first();
      const agregados = await Agregado.query().where('id', params.id).where('empresas_id', '=', empresa.id).first();

      if (!agregados) {
        return response.status(200).json({ message: "Id não existe!" });
      }

      return response.status(200).json({ agregados });
    } catch (err) {
      return response.status(500).send({ error: `Error ${err.message}` });
    }
  }

  /**
   * Render a form to update an existing agregado.
   * GET agregados/:id/edit
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

      const agregado = await Agregado.query().where('id', params.id).where('empresas_id', '=', empresa.id).first();

      if (!agregado) {
        return response.status(200).json({ message: "Id não existe!" });
      }

      agregado.nome = data.nome;
      agregado.rg = data.rg;
      agregado.cpf = data.cpf;
      agregado.telefone = data.telefone;
      agregado.save();

      return response.status(200).json({ agregado });
    } catch (err) {
      return response.status(500).send({ error: `Error ${err.message}` });
    }
  }


  /**
   * Delete a agregado with id.
   * DELETE agregados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

    try {
      const empresa = await Empresa.query().where('users_id', '=', auth.user.id).first();

      const agregado = await Agregado.query().where('id', params.id).where('empresas_id', '=', empresa.id).first();

      if (!agregado) {
        return response.status(200).json({ message: "Id não existe!" });
      }
      agregado.delete();

      return response.status(200).json({message:"Agregado deletado!", agregado: agregado });
    } catch (err) {
      return response.status(500).send({ error: `Error ${err.message}` });
    }
  }
}

module.exports = AgregadoController
