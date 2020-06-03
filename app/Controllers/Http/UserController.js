'use strict'

const User = use('App/Models/User');
const Mail = use('Mail');
const Smser = use('Smser');
const { validateAll } = use('Validator');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class UserController {

    async create({ request, response, auth }) {
        try {
            const erroMessage = {
                'username.required': 'Esse campo é obrigatório',
                'username.unique': 'Esse usuário já existe',
                'email.unique': 'Esse email já existe',
                'password.required': 'Esse campo é obrigatório',
                'email.email': 'Necessário um email válido',
                'password.min': 'Tamanho da senha tem que ser no minímo 6',
                'username.min': 'Tamanho do nome do usuário tem que ser no minímo 5'

            }
            const validation = await validateAll(request.all(), {
                username: 'required|min:5|unique:users',
                email: 'required|email|unique:users',
                password: 'required|min:6'
            }, erroMessage);

            if (validation.fails()) {
                return response.status(401).send({ message: validation.messages() });
            }

            const data = request.only(['username', 'email', 'password']);
            const user = await User.create(data);

            const validatorToken = await auth.attempt(data.email, data.password);
            return response.status(200).json({ message: "Cadastro realizado com sucesso", user: user, token: validatorToken });
        } catch (err) {
            return response.status(500).send({ error: `Erro ${err.message}` });
        }
    }

    async login({ request, response, auth }) {
        try {
            const { email, password } = request.all();
            const user = await User.findBy('email', email);
            if (!user) {
                return response.status(401).send({ message: "Email inexistente ou digitado errado!" })
            }
            //console.log(user.password);
            
            const validatorToken = await auth.withRefreshToken().attempt(email, password);

            return validatorToken;
        } catch (err) {
            return response.status(500).send({ error: `Erro ${err.message}` });
        }
    }

    async lagout({ response, auth, request }) {
        try {
            const check = await auth.check();
            if (check) {

                const apiToken = auth.getAuthHeader()

                await auth
                    .authenticator('api')
                    .revokeTokens([apiToken]);
            }
            // await auth.logout();
            return response.redirect('/');
        } catch (err) {
            return response.status(500).send({ error: `Erro ${err.message}` });
        }

    }

    async email({ response, auth, request,view }){
        /*await Mail.send('', {}, (message) => {
            message.to('wstroks@gmail.com')
            message.subject('Sending emails with Adonis is easy!')
          })*/

          await Smser.send('Eu sou a LEnDA', '+5575992320376')
        
    }


}

module.exports = UserController
