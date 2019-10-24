import React from 'react';
import {useFormInput} from '../components/hooks/useFormInput';
import {api} from '../components/helpers/apiService';

const Login = (props) =>{
    const loginUser = useFormInput("");
    const loginPassword = useFormInput("")
    const [error, setError] = React.useState({status:false, response:""})
    async function fetchData(url, body){
        try{
            const response = await api.post(url, body)
            console.log(response)
            const {status, data} = response
            if(status === 200){
                console.log(status)
                localStorage.setItem('token_user_parkin', data.token)
            }
            //history.push(home)
            return data;
        }catch(err){
            newFormError({status:true, response:"Error in email or password, please try again!"})
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