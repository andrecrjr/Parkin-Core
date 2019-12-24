import React from 'react';
import {useFormInput} from '../../components/hooks/useFormInput';
import {Redirect} from "react-router-dom";
import {ErrorForm} from '../../components/Layout/Body';
import {UserContext} from '../../components/contexts/UserContext';
import LoginForm from './LoginForm';
import {loginApi} from '../../actions/authUser'
import { useSelector, useDispatch } from 'react-redux';

const Login = (props) =>{
    const loginUser = useFormInput("");
    const loginPassword = useFormInput("");
    const [error, setError] = React.useState({status:false, response:""});
    const [warning, setWarning] = React.useState(null);
    const {auth} = useSelector(state=>state)
    const dispatchLogin = useDispatch()

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
    

    async function login(body){
        try{
            dispatchLogin(loginApi(body))
        }catch(err){
            newFormError({status:true})
        }
    }

    const submitLogin = (e) =>{
        e.preventDefault()
        return login(payloadLogin)
    }

    React.useEffect(()=>{
        const {location} = props;
        if(location.search === "?new_user"){
            setWarning("Agora seu cadastro foi efetuado com sucesso, você poderá se autenticar!")
        }
        if(location.search === "?logoff"){
            setWarning("You're not logged, try to login again!")
        }
        if(auth.authenticated){
            return props.history.push('/')
        }
    },[])


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

