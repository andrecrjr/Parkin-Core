'use strict'

const User = use('App/Models/User')

class UserController {
    async create({request, response}){
        try{
            const data = request.only(["username", "email", "password", "identifier_social", "first_name", "last_name"]);
            console.log(request)
            const user = await User.create(data);
            return user;
        }catch(err){
            console.log(err)
            response.status(500).json({"data":"Error username / email or identifier social(CPF) already exists"})
        }
    }

    async show({params}){
        const user = await User.findOrFail(params.id);
        return user;
    }
    

}

module.exports = UserController
