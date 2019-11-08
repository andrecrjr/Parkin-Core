import React from 'react';

import {SignUpContext} from './SignUpContext';

const SignUpForm = (props) =>{

    const {submitSignUp, 
            username, 
            email, 
            password, 
            firstName, 
            lastName, 
            identifierSocial, 
            disableButton, passStatus} = React.useContext(SignUpContext)

    return(
        <div className="form__signup">
                <form method="POST" onSubmit={submitSignUp} className="form__signup--group">
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
                    <input type="text" name="identifier_user" {...identifierSocial}/>
                    <button type="submit" disabled={disableButton()}>Sign Up</button>
                </form>
            </div>
    )
}

export default SignUpForm;