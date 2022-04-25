'use strict'
const User = use('App/Models/User')
const Database = use('Database')
class UserController {
    async store({ request, response }) {
        //Obtener datos que llegaran del cliente (Insomnia)
        const userData = request.only(['Nombre', 'Rol', 'email', 'password'])
        //Crear Nuevo Usuario
        const user = await User.create(userData)
        //Retorna en caso de que el usuario sea creado satisfactoriamente
        return response.created({
            status: true
        })
    }

    async ListasUsuario({ response }) {
        const Personas = await User.query().setHidden(['password', 'created_at', 'updated_at']).fetch()
        response.status(200).json({
            mensaje: "La lista de tus usuarios son:",
            datos: Personas
        })
    }


    async GetIp({ request, response }) {
        const ip = request.ip()
        return response.json({ ip:ip })
    }

    async getUser({ response, params }) {
        const user = await User.query()
            .setHidden(['password', 'created_at', 'updated_at'])
            .where('id',params.id)
            .first()

        return response.json({ user:user })
    }

    async EliminarUsuario ({response, params}){
    const users = await User.find(params)
    await users.delete()
    return response.json({
        message: "Eliminado con exito"
    })
    }

    async ActualizarUsuario ({request, response, params})
    {
        const users=await Persona.find(params.id)
        users.merge(request.post())
        if(await users.save()){
            response.json({
                status:true
            })
        }
        
    }
    
}

module.exports = UserController
