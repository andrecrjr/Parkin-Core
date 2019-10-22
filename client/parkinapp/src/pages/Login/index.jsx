import React from 'react';
import {useFormInput} from '../components/hooks/useFormInput';
import {useFetchPost} from '../components/hooks/useFetch';

const Login = () =>{

    const loginUser = useFormInput("");
    const loginPassword = useFormInput("")
    const data = {url:"http://127.0.0.1:3333/auth/", payload:{username:loginUser.value, password:loginPassword.value}}
    const [post, callApi] = useFetchPost(data)
    
    const submitLogin = () =>{
        try{
            callApi()
            if (post.isLoading){
                console.log("Bateu aqui")
            }
        }catch(err){
            console.log(err)
        }
    }
    return (
        <section className="form__login">
            <form method="POST"  onSubmit={submitLogin}>
                <label>Username:</label>
                <input type="text" {...loginUser} name="login_username" />
                <label>Password:</label>
                <input type="password" {...loginPassword} name="login_password" />
                <button type="submit">Login</button>
            </form>
        </section>
    )
}

export default Login;