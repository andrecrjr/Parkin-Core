import React from 'react';
import {useFormInput} from '../components/hooks/useFormInput';
import {api} from '../components/helpers/apiService';
import {TokenContext} from '../components/contexts/UserContext';
import {Redirect} from "react-router-dom";

const Login = (props) =>{
    const loginUser = useFormInput("");
    const loginPassword = useFormInput("")
    const [error, setError] = React.useState({status:false, response:""})
    const {isAuth} = React.useContext(TokenContext)
    async function fetchData(url, body){
        try{
            const response = await api.post(url, body)
            const {status, data} = response
            if(status === 200){
                console.log(status)
                localStorage.setItem('token_user_parkin', data.token)
                props.history.push('/?login_sucess')
                window.location.reload()
            }
            //history.push(home)
            return data;
        }catch(err){
            console.log(err.response)
            newFormError({status:true, response:err.response.data.data})
        }
    }

    const newFormError = (status) =>{
        if(loginPassword.value === ""){
            setError({status:true, response:"Did you forget the password?!"})
        }else{
            setError(status)
        }
    }

    const payloadLogin = {
        email:loginUser.value, 
        password:loginPassword.value, 
    };
    
    const submitLogin = (e) =>{
        e.preventDefault()
        const data = fetchData("auth", payloadLogin)
        console.log(data)
        return data;
    }

    if(isAuth){
        return <Redirect to="/"/>
    }
    
    return (
        <section className="form__login">
            {error.status?<ErrorForm>{error.response}</ErrorForm>:null}
            <form onSubmit={submitLogin} method="POST">
                <label>Email:</label>
                <input type="email" {...loginUser} name="login_username" />
                <label>Password:</label>
                <input type="password" {...loginPassword} name="login_password" />
                <button type="submit">Login</button>
            </form>
        </section>
    )
}

export default Login;

export const ErrorForm = ({children}) =>{
    return(
        <div class="form__error">
            <p>{children}</p>
        </div>
    )
}