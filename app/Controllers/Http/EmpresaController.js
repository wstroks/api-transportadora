'use strict'
const Empresa = use('App/Models/Empresa');
const { validateAll } = use('Validator');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with empresas
 */
class EmpresaController {
  /**
   * Show a list of all empresas.
   * GET empresas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    try {
      const empresa = await Empresa.query().where('users_id', '=', auth.user.id).first();
      if (!empresa) {
        return response.status(404).send({ message: "Nenhum registro encontrado" });
      }

      return empresa;
    }
    catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` })
    }
  }

  /**
   * Render a form to be used for creating a new empresa.
   * GET empresas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view, auth, params }) {
    try {

      const { id } = auth.user.id;
      //console.log(id+"x");
      const erroMessage = {
        'nome.required': 'Campo nome é obrigatório',
        'nome.min': 'Tamanho do nome de sua empresa tem que ser no minímo 5',
        'cnpj.required': 'Campo CNPJ é obrigatório',
        'estado.required': 'Campo cep é obrigatório',
        'cep.min': 'Tamanho do cep tem que ser no minímo 6',
        'cep.required': 'Campo cep é obrigatório',
        'endereco.min': 'Tamanho do endereço tem que ser no minímo 7',
        'endereco.required': 'Campo endereço é obrigatório',
        'cidade.required': 'Campo cidade é obrigatório'

      }
      const validation = await validateAll(request.all(), {
        nome: 'required|min:5',
        cnpj: 'required|min:5',
        estado: 'required',
        cidade: 'required',
        cep: 'required|min:6',
        endereco: 'required:min:7'

      }, erroMessage);

      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }


      const data = request.only(['nome', 'cnpj', 'estado', 'cidade', 'cep', 'endereco']);
      const empresa = await Empresa.create({ ...data, users_id: auth.user.id });

      return response.status(200).json({ message: "Cadastro de sua empresa realizado com sucesso!", empresa: empresa });
    } catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` })
    }

  }

  /**
   * Create/save a new empresa.
   * POST empresas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single empresa.
   * GET empresas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing empresa.
   * GET empresas/:id/edit
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
      if (!empresa) {
        return response.status(404).send({ message: "Nenhum registro encontrado" });
      }

      empresa.nome = data.nome;
      empresa.endereco = data.endereco;
      empresa.cep = data.cep;
      empresa.cnpj = data.cnpj;
      empresa.cidade = data.cidade;

      empresa.save();

      return response.status(200).json({message: "Edição feita com sucesso!", empresa: empresa});;
    }
    catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` })
    }
  }

  /**
   * Update empresa details.
   * PUT or PATCH empresas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a empresa with id.
   * DELETE empresas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response,auth }) {

    try {
     
      const empresa = await Empresa.query().where('users_id', '=', auth.user.id).first();
      if (!empresa) {
        return response.status(404).send({ message: "Nenhum registro encontrado" });
      }

      empresa.delete();

      return response.status(200).json({message: "Exclução feita com sucesso!", empresa: empresa});;
    }
    catch (err) {
      return response.status(500).send({ error: `Erro ${err.message}` })
    }
  }
}

module.exports = EmpresaController
