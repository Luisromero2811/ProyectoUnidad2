'use strict'
const Codes = use ('App/Models/Code')
const DB = use('Database')
const Hash = use('Hash')
class CodeController {
    async VerificarCodigo ({request, response,params}){
        
        //const code = await Codes.findBy('user_id',params.id)
        const code = await Codes.query().select('code').where({user_id:params.id}).last()
        const c = request.only('code')
        if(code && await Hash.verify(c.code,code.code))
        {
            return true
        }
        else{
            return false
        }
        
    }

    async VerificarAuth({request, response, params}){
        //verificacion de autorizacion para accion de 3er usuario
    }
}

module.exports = CodeController
