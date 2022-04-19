'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Ruta para inicio de sesión
Route.post('/login','AuthController.login');
//Ruta para registro de usuario
Route.resource('/users', 'UserController')
  .apiOnly()
  .validator(new Map([
    [['users.store'],['RegistroUser']]
  ]))
//CRUD Productos
//Ruta POST nuevo producto
Route.post('/nuevoproducto','ProductController.NuevoProducto');
//Ruta PUT producto actualizado
//Route.post('/actualizarproducto','ProductCrontroller.ActualizarProducto');
//Ruta Delete eliminar producto
//Route.post('/eliminarproducto','ProductCrontroller.EliminarProducto');
//Ruta GET Listar Productos
Route.get('/productos','ProductController.ListasProducto');
//CRUD Usuarios
//Ruta POST nuevo usuario
Route.post('/nuevousuario','UsuarioController.NuevoUsuario');
//Ruta PUT actualizar usuario
//Route.post('/actualizarusuario','UsuarioCrontroller.ActualizarUsuario');
//Ruta Delete eliminar usuario
//Route.post('/eliminarusuario','UsuarioCrontroller.EliminarUsuario');
//Ruta GET Listar usuarios
Route.get('/usuarios','UsuarioController.ListasUsuario');
