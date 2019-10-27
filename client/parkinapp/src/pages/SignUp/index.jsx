import React from 'react';
import {useFormInput} from '../components/hooks/useFormInput';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import {useAuthentication} from '../components/hooks/useAuthentication'

const SignUpPage = () =>{
    const {isAuth} = useAuthentication()
    const username = useFormInput("")
    const email = useFormInput("") 
    const password = useFormInput("")
    const firstName = useFormInput("")
    const lastName = useFormInput("")
    const identifier_social = useFormInput("")

    async function fetchData(url, body){
        try{
            const data = await axios.post(url, body)
            if(data.status === 200)
                return <Redirect to='/'/>
            
        }catch(err){
            console.log(err.response)
        }
    }
    React.useEffect(()=>{
        console.log(isAuth)
    }, [isAuth])
    
    if(isAuth){
        return <Redirect to='/'/>
    }

    const signUpJsonUser = {username:username.value,
        email:email.value, 
        password:password.value, 
        first_name:firstName.value, 
        last_name:lastName.value, 
        identifier_social:identifier_social.value
    };
    
    const submitSignUp = (e) =>{
        e.preventDefault()
        console.log(signUpJsonUser)
        fetchData("http://127.0.0.1:3333/api/create_profile",signUpJsonUser);
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
            <div className="form__signupPage">
                <form method="POST" onSubmit={submitSignUp} >
                    <label>Username</label>
                    <input type="text" name="username" {...username} placeholder="Put your username" required/>
                    <label>Email:</label>
                    <input type="email" name="user_email" {...email} placeholder="Input your email here" spellCheck={false} required/>
                    <label>Password:</label>
                    <input type="password" name="user_pass" 
                        className={passStatus() ? `forms__problem--on`:"forms__problem--off"} 
                        {...password} placeholder="input your pass here" required/>
                    <label>First name:</label>
                    <input type="text" name="first_name" {...firstName} placeholder="input your first name here" />
                    <label>Last name:</label>
                    <input type="text" name="last_name" {...lastName} placeholder="your last name here" />
                    <label>Identifier Social(CPF)</label>
                    <input type="text" name="identifier_user" {...identifier_social}/>
                    <button type="submit" disabled={disableButton()}>Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default SignUpPage;