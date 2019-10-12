import React from 'react';
import {useFormInput} from '../components/hooks/useFormInput';


const SignUpPage = () =>{

    const email = useFormInput("") 
    const password = useFormInput("")
    const password2 = useFormInput("")
    const firstName = useFormInput("")
    const lastName = useFormInput("")

    const submitSignUp = () =>{
        
    }

    console.log(password.error.status === true)
    
    const disableButton = () =>{
        if(password.error.status === true
             || password2.error.status === true 
             || email.error.status === true 
             || firstName.error.status === true){
            return true;
        }else{
            return false;
        }
    }
    return(
        <>
            <form onSubmit={submitSignUp}>
                <label>Email:</label>
                <input type="email" name="user_email" {...email} placeholder="Input your email here"/>
                <label>Password:</label>
                <input type="password" name="user_pass" {...password} placeholder="input your pass here" />

                <label>Password 2:</label>
                <input type="password" name="user_pass_2" {...password2} placeholder="input your pass again here" />
                <label className={password2.error.status === true ? `forms__problem--on`:"forms__problem--off"} >Problem</label>

                <label>First name:</label>
                <input type="text" name="first_name" {...firstName} placeholder="input your first name here" />
                <label>Last name:</label>
                <input type="text" name="last_name" {...lastName} placeholder="your last name here" />
                <button type="submit" disabled={disableButton()}>Sign Up</button>
            </form>
        </>
    )
}

export default SignUpPage;