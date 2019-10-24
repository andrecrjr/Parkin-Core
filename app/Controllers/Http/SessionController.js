'use strict'

class SessionController {
    async authentication({request, auth,response}){
        const {email, password} = request.all()
        try{
            const token = await auth.attempt(email, password);
            return token;
        }catch(err){
            console.log(err)
            response.status(401).json({"data":"Problem in email or password"})
        }
    }

    async is_auth({response, auth}){
        try{
            return await auth.check()
        }catch{
            return response.status(401).send({"data":"not logged"})
        }
    }
}

module.exports = SessionController
