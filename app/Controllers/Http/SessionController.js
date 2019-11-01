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

    async show_user({response, auth}){
        try{
            const data = await auth.getUser()
            return response.status(200).json({"id":data.id, "username":data.username, "email":data.email, "first_name":data.first_name,"last_name":data.last_name});
        }catch{
            return response.status(401).send({"data":"not logged"})
        }
    }
}

module.exports = SessionController
