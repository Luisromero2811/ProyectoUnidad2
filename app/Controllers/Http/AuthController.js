'use strict'
const User = use ('App/Models/User')
class AuthController {
    async login ({request, response, auth}){
        //Campos requeridos                     //Atrapar los datos
        const {email, password} = request.only(['email','password'])
        //Generar token de usuario
        const usert = await User.findBy('email', email)
        const token = await auth.generate(usert)
        const user = await User.findBy('email', email)
        return response.json({
            token: token.token,
            username:user.Nombre
        })
    }
}

module.exports = AuthController
