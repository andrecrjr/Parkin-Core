import React from 'react';
import {useFormInput} from '../components/hooks/useFormInput';
import {api} from '../components/helpers/apiService';
import {Redirect} from "react-router-dom";
import {ErrorForm} from '../components/Layout/Body';
import {UserContext} from '../components/contexts/UserContext';
import LoginForm from './LoginForm';

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
        if(loginPassword.value === "" || loginUser === ""){
            setError({status:true, response:"Didn't you forget something?!"})
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
        if(location.search === "?logoff"){
            setWarning("You're not logged, try to login again!")
        }
    },[])

    if(isAuth){
        return <Redirect to="/"/>
    }

    return (
        <section className="form__login">
            {warning}
            {error.status?<ErrorForm>{error.response}</ErrorForm>:null}
            <LoginForm submitLogin={submitLogin} 
                        loginUser={loginUser} 
                        loginPass={loginPassword}/>
        </section>
    )
}

export default Login;

