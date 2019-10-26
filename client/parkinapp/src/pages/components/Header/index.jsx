import React from 'react';
import {UserContext} from '../contexts/UserContext';
import {Link, useHistory} from 'react-router-dom'

export const Header = (props) =>{
    const data = React.useContext(UserContext);
    const history = useHistory();

    const removeSession = () =>{
        localStorage.removeItem("token_user_parkin")
        history.push('/')       
        window.location.reload()
    }

    return(
        
        <header class="header__main">
            <div class="header__main--logo">
                Parkin!
            </div>
            <div className="header__user--account">
                {data.user === false ?
                    
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </ul>:
                    <ul>
                        <li>Usuário: {data.user.username}</li>
                        <li onClick={removeSession}>Logout</li>
                    </ul>
                }
            </div>
        </header>
    )
}