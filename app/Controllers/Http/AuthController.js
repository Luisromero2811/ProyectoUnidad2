'use strict'
const User = use('App/Models/User')
const Mail = use('Mail')
const Hash = use('Hash')
const DB = use('Database')
const Code = use('App/Models/Code')
class AuthController {
    async login({ request, response, auth }) {
        //Campos requeridos                     //Atrapar los datos
        const { email, password } = request.only(['email', 'password'])
        //Generar token de usuario
        const user = await User.findBy('email', email)
        if (!user || await Hash.verify(password, user.password)) {
            if (user.Rol == 1) {
                if(request.ip() != "137.184.114.118"){
                    const token = await auth.generate(user)
                    return response.json({status:true, token: token.token, username: user.Nombre, cu:user.id})
                }else{
                    return response.json({status:false, message:'usuario no autorizado'})
                }
            } else {
                if(request.id != "137.184.114.118" || (request.ip() == "137.184.114.118" && user.Rol == 3)){
                    await this.sendmail(await this.genCode(user),email)
                    return response.json({status:false, data:user.id})
                }else{
                    return response.json({status:false, message:'usuario no autorizado'})
                }
            }
        }

    }

    async getRol({ response, request, params }) {
        const email = request.only('email')
        const u = await User.find(params.id)
        return u.Rol
        return response.json({ nivel: rol })
    }

    async sendmail(code,email) {
        const data = {
            from: "Mailgun Sandbox <postmaster@sandboxdd93a8b366134306a7dffba91eed53d3.mailgun.org>",
            to: email,
            subject: "Codigo de Verificacion",
            text: "Testing some Mailgun awesomness!"
        };
        try {
            const c = {code:code}
            await Mail.send('emails.welcome', c, (message) => {
                message.to(data.to)
                    .from(data.from)
                    .subject(data.subject)

            })
        } catch (e) {
            return e
        }
    }

    async genCode(user) {
        const code = Math.floor(100000 + Math.random() * 900000)
        const ch = await Hash.make((code).toString())
        try{
            const c = new Code()
            c.user_id = user.id
            c.code = ch
            if(await c.save()){
                return code;
            }
        }catch(e) {
            return e
        }
    }

    async createCodeVerificationSU({response, params}){
        const c = Math.floor(100000 + Math.random() * 900000)
        //const ch = await Hash.make((c).toString())
        if(await User.find(params.id)){
            await DB.table('auth_codes').insert({user_id:params.id, code:c})
            return response.json({status:true,code:c})
        }else{
            return response.json({status:false})
        }
        
    }

    async codeVerificationSU({request, response}){
        const user = await User.findBy('email',request.only('email').email)
        
        if(user && await Hash.verify(request.only('password').password,user.password)){
            const code = await DB.table('auth_codes').select('code').where('user_id',user.id).last()
            return response.json({status:true,code:code.code})
        }else{
            return false;
        }
    }

    async codeVerification({request, response, auth}){
        const {id,vcode} = request.only(['id', 'vcode'])
        
        const vcodev = await DB.table('auth_codes').select('code').where('user_id',id).last()
        
        const user = await User.find(id)
        if(vcodev.code == vcode){
            const token = await auth.generate(user)
            return response.json({status:true,token:token.token,username:user.Nombre,cu:user.id})
        }
        else{
            return response.json({status:false})
        }
    }

    async saveAuthorizationCode({request, response}){
        const {user_id,code} = request.only(['user_id','code'])
        const hc = await Hash.make(code.toString())
        if(await DB.table('authorization_codes')
        .insert({user_id:user_id,code:hc})){
            return response.json({status:true})
        }else{
            return response.json({status:false})
        }
    }

    async getAuthorizationCode({request, response,params}){
        const code= request.only(['code','user_id'])
        const vcode = await DB.table('authorization_codes').select('code').where({user_id:code.user_id}).last()
        
        if(await Hash.verify(code.code.toString(),vcode.code)){
            await DB.table('authorization_codes').where({user_id:code.user_id}).delete()
            return response.json({status:true})
        }else{
            return response.json({status:false})
        }
    }
}

module.exports = AuthController
