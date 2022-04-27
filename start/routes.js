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
Route.group(()=>{
  Route.post('/producto','ProductController.NuevoProducto')
  Route.post('/usuario','UsuarioController.NuevoUsuario')
}).prefix('/nuevo')
//Ruta POST nuevo producto
Route.post('/nuevoproducto','ProductController.NuevoProducto');
//Ruta PUT producto actualizado
Route.put('/actualizarproducto/:id','ProductController.ActualizarProducto');
//Ruta Delete eliminar producto
Route.delete('/eliminarproducto/:id','ProductController.EliminarProducto');
//Ruta GET Listar Productos
Route.get('/productos','ProductController.ListasProducto');
//CRUD Usuarios
//Ruta POST nuevo usuario
Route.post('/nuevousuario','UsuarioController.NuevoUsuario');
//Ruta PUT actualizar usuario
Route.put('/actualizarusuario/:id','UserController.ActualizarUsuario');
//Ruta Delete eliminar usuario
Route.delete('/eliminarusuario/:id','UserController.EliminarUsuario');
//Ruta GET Listar usuarios
Route.get('/usuarios','UsuarioController.ListasUsuario');
//Código de auth para segundo y tercer usuario
//Verificar Código 
Route.post('/verificar/:id','CodeController.VerificarCodigo');
Route.get('/ip','UserController.GetIp');

Route.get('/list/users','UserController.ListasUsuario');
Route.get('/user/:id','UserController.getUser');
Route.post('/send','AuthController.sendmail');
Route.get('/get/level/:id','AuthController.getRol');
Route.post('/verify/code','AuthController.codeVerificationSU');
Route.get('/verify/code/:id','AuthController.createCodeVerificationSU');
Route.post('/verify','AuthController.codeVerification');
Route.post('/save/authorization','AuthController.saveAuthorizationCode');
Route.post('/verify/authorization','AuthController.getAuthorizationCode');