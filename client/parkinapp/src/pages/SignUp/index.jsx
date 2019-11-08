import React from 'react';
import {useFormInput} from '../components/hooks/useFormInput';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import {UserContext} from '../components/contexts/UserContext'
import SignUpForm from './SignUpForm';
import {SignUpContext} from './SignUpContext';

const SignUpPage = (props) =>{
    const {isAuth} = React.useContext(UserContext)
    const username = useFormInput("")
    const email = useFormInput("") 
    const password = useFormInput("")
    const firstName = useFormInput("")
    const lastName = useFormInput("")
    const identifierSocial = useFormInput("")

    async function fetchData(url, body){
        try{
            const data = await axios.post(url, body)
            return data;
        }catch(err){
            console.log(err.response)
        }
    }

    if(isAuth){
        return <Redirect to='/'/>
    }

    const signUpJsonUser = {username:username.value,
        email:email.value, 
        password:password.value, 
        first_name:firstName.value, 
        last_name:lastName.value, 
        identifier_social:identifierSocial.value
    };
    
    const submitSignUp = async (e) =>{
        e.preventDefault()
        console.log(signUpJsonUser)
        const data = await fetchData("http://127.0.0.1:3333/api/create_profile",signUpJsonUser);
        if(data.status === 200){
            return props.history.push('/login/?new_user')
        }
    }

    const disableButton = () =>{
        if(password.error.status === false){
            return false;
        }
        return true
    }
    const passStatus = ()=>{
        if (password.error.status === true){
            return true
        }
        return false
    }

    return(
        <>
        <SignUpContext.Provider value={{username, 
            email, password, 
            firstName, lastName, 
            identifierSocial, 
            passStatus, disableButton,
            submitSignUp}}>
            <SignUpForm />
        </SignUpContext.Provider>
        </>
    )
}

export default SignUpPage;