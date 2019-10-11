import React from 'react';
import {useFormInput} from '../components/hooks/useFormInput';

const SignUpPage = () =>{

    const email = useFormInput("") 
    const password = useFormInput(null)
    const firstName = useFormInput("")
    const lastName = useFormInput("")

    const submitSignUp = () =>{
        return 
    }

    return(
        <>
            <form onSubmit={submitSignUp}>
                <label>Username:</label>
                <input type="email" name="user_email" {...email} placeholder="Input your email here"/>
                <label>Password:</label>
                <input type="password" name="user_pass" {...password} placeholder="input your pass here" />
                <label>First name:</label>
                <input type="text" name="first_name" {...firstName} placeholder="input your first name here" />
                <label>Last name:</label>
                <input type="text" name="last_name" id="" {...lastName}/>
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}

export default SignUpPage;