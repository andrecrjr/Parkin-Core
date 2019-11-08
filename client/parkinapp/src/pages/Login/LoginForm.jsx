import React from 'react'

const LoginForm = (props) =>{
    return(
        <form onSubmit={props.submitLogin} method="POST" className="form__login--group">
                <label>Email:</label>
                <input type="email" {...props.loginUser} name="login_username" />
                <label>Password:</label>
                <input type="password" {...props.loginPass} name="login_password" />
                <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm