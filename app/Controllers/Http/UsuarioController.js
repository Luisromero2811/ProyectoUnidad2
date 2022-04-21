'use strict'
const Persona = use ('App/Models/Persona')
class UsuarioController {
    async NuevoUsuario ({request,response})
    {
            const userData = request.only(['Nombre', 'Apellido', 'Edad'])    
            const users = await Persona.create(userData)
        return response.json({
            message:"Se ha agregado un nuevo usuario"
        })      
          }

    //Función para consulta de usuarios
    async ListasUsuario ({response}){
        const Personas = await Persona.all()
           response.status(200).json({
            mensaje:"La lista de tus usuarios son:",
            datos:Personas
        })
    }
    //Función para actualizar usuario
    async ActualizarUsuario ({request, response, params})
    {
        const users=await Persona.find(params.id)
        users.merge(request.post())
        await users.save()
        response.json({
            message:"Se han actualizado los datos correctamente"
        })
    }
    //Función para eliminar usuario
    async EliminarUsuario ({response, params})
    {
    const { id } = params
    const users = await Persona.find(id)
    await users.delete()
    return response.json({
        message: "Eliminado con exito"
    })
    }
}

module.exports = UsuarioController
