'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

//autenticação
Route.post('/login','UserController.login').middleware('guest');
Route.post('/registro','UserController.create');
Route.get('/lagout','UserController.lagout');
Route.get('/email','UserController.email');


Route.post('/empresa','EmpresaController.create').middleware('auth');

Route.group(() => {

  Route.post('','EmpresaController.create');
  Route.get('','EmpresaController.index');
  Route.delete('','EmpresaController.destroy');
  Route.post('editar','EmpresaController.edit');
  
}).prefix('empresa').middleware('auth');



Route.group(() => {

  Route.post('','BoletoController.store');
  Route.get('','BoletoController.index');
  Route.post('editar/:id','BoletoController.edit'); //tirar edit
  Route.get('show/:id','BoletoController.show'); // tirar show
  Route.delete(':id','BoletoController.destroy');
  
  
}).prefix('boletos').middleware('auth');


Route.group(() => {

  Route.post('','AgregadoController.store');
  Route.get('','AgregadoController.index');
  Route.post(':id','AgregadoController.edit');
  Route.get(':id','AgregadoController.show');
  Route.delete(':id','AgregadoController.destroy');
  
  
}).prefix('agregados').middleware('auth');
