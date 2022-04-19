'use strict'
const User = use ('App/Models/User')
class AuthController {
    async login ({request, response, auth}){
        //Campos requeridos                     //Atrapar los datos
        const {email, password} = request.only(['email','password'])
        //Generar token de usuario
        const token = await auth.attempt(email, password)
        const user = await User.findBy('email', email)
        return response.json({
            token: token.token,
            username:user.Nombre
        })
    }
}

module.exports = AuthController
