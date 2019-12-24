import React from 'react';
import {UserContext} from '../contexts/UserContext';
import {Link, useHistory} from 'react-router-dom'
import { useSelector } from 'react-redux';


export const Header = (props) =>{
    const {user} = React.useContext(UserContext);
    const history = useHistory();
    const data = useSelector(state=>state)
    
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
            <div className="header__main--menu">
                {!user.token ?
                    <ul className="header__main--menu-login">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </ul>:
                    <ul className="header__main--menu-user">
                        <li>Usuário: {user.username}</li>
                        <li onClick={removeSession}>Logout</li>
                    </ul>
                }
            </div>
        </header>
    )
}