import React from 'react';
import {useFormInput} from '../../components/hooks/useFormInput';
import {api} from '../../helpers/apiService';
import {Redirect} from "react-router-dom";
import {ErrorForm} from '../../components/Layout/Body';
import {UserContext} from '../../components/contexts/UserContext';
import LoginForm from './LoginForm';
import {loginApi} from '../../actions/authUser'
import { useSelector, useDispatch } from 'react-redux';

const Login = (props) =>{
    const {isAuth} = React.useContext(UserContext);
    const loginUser = useFormInput("");
    const loginPassword = useFormInput("");
    const [error, setError] = React.useState({status:false, response:""});
    const [warning, setWarning] = React.useState(null);
    const data = useSelector(state=>state)
    const dispatchLogin = useDispatch()
    console.log(data.auth)

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
        return login(payloadLogin)
    }

    async function login(body){
        try{
            dispatchLogin(loginApi(body))
        }catch(err){
            newFormError({status:true})
        }
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

