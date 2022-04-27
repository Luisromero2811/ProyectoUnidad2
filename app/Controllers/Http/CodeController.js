'use strict'
const Codes = use ('App/Models/Code')
const DB = use('Database')
const Hash = use('Hash')
const User = use('App/Models/User')
class CodeController {
    async VerificarCodigo ({request, response,params,auth}){
        
        const user = await User.find(params.id)
        const code = await Codes.query().select('code').where({user_id:params.id}).last()
        const c = request.only('code')
        if(code && await Hash.verify(c.code,code.code))
        {
            if(user && user.Rol == 3){
                return response.json({status:true,loged:false,sala:await this.genCode()})
            }else{
                const token = await auth.generate(user)
                await Codes.query().where('user_id',params.id).delete()
                return response.json({ loged:true,token: token.token,uid: user.id, 
                    username: user.Nombre,status:true})
            }
        }
        else{
            return response.json({status:false})
        }
        
    }

    async VerificarAuth({request, response, params}){
        //verificacion de autorizacion para accion de 3er usuario
    }

    async genCode() {
        return Math.floor(100000 + Math.random() * 900000)
    }
}

module.exports = CodeController
