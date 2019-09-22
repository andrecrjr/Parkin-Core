'use strict'

class SessionController {
    async authentication({request, auth}){
        const {email, password} = request.all()
        const token = await auth.attempt(email, password);
        return token;
    }

    async is_auth({response, auth}){
        try{
            return await auth.check()
        }catch{
            response.status(401).send({"data":"not logged"})
        }
    }
}

module.exports = SessionController
