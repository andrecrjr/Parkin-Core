import React from 'react';
import {useFormInput} from '../components/hooks/useFormInput';
import {api} from '../components/helpers/apiService';
import {Redirect} from "react-router-dom";
import {ErrorForm} from '../components/Layout/Body';
import {UserContext} from '../components/contexts/UserContext';

const Login = (props) =>{
    const {isAuth} = React.useContext(UserContext);
    const loginUser = useFormInput("");
    const loginPassword = useFormInput("");
    const [error, setError] = React.useState({status:false, response:""});
    const [warning, setWarning] = React.useState(null);

    async function fetchData(url, body){
        try{
            const response = await api.post(url, body)
            const {status, data} = response
            if(status === 200){
                localStorage.setItem('token_user_parkin', data.token)
                props.history.push('/')
                window.location.reload()
            }
            return data;
        }catch(err){
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
        return fetchData("auth", payloadLogin)
    }

    React.useEffect(()=>{
        const {location} = props;
        if(location.search === "?new_user"){
            setWarning("Agora seu cadastro foi efetuado com sucesso, você poderá se autenticar!")
        }
    },[])

    if(isAuth){
        return <Redirect to="/"/>
    }

    return (
        <section className="form__login">
            {warning}
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

