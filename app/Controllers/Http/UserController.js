'use strict'

const User = use('App/Models/User')

class UserController {
    async create({request, response}){
        try{
            const data = request.only(["username", "email", "password"]);
            const user = await User.create(data);
            return user;
        }catch{
            console.log(response)
            response.status(500).json({"data":"Error username or email already exists"})
        }
    }

    async show({params}){
        const user = await User.findOrFail(params.id);
        return user;
    }
    

}

module.exports = UserController
