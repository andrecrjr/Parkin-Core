import React from 'react';
import {useFormInput} from '../../components/hooks/useFormInput';


const SignUpPage = () =>{

    const email = useFormInput("") 
    const password = useFormInput("")
    const firstName = useFormInput("")
    const lastName = useFormInput("")

    const submitSignUp = () =>{
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
            <form onSubmit={submitSignUp}>
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
                <button type="submit" disabled={disableButton()}>Sign Up</button>
            </form>
        </>
    )
}

export default SignUpPage;