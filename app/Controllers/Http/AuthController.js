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
                const token = await auth.generate(user)
                return response.json({status:true, token: token.token, username: user.Nombre })
            } else {
                await this.sendmail(await this.genCode(user))
                return response.json({status:false, data:user.id})
            }
        }

    }

    async getRol({ response, request, params }) {
        const email = request.only('email')
        const u = await User.find(params.id)
        return u.Rol
        return response.json({ nivel: rol })
    }

    async sendmail(code) {
        const data = {
            from: "Mailgun Sandbox <postmaster@sandboxdd93a8b366134306a7dffba91eed53d3.mailgun.org>",
            to: "angelzapata582@gmail.com",
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
            return response.json({status:true,token:token.token})
        }
        else{
            return response.json({status:false})
        }
    }
}

module.exports = AuthController
