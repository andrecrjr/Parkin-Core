import React from 'react';
import {Header} from '../Header';
import {apiAuth} from '../helpers/apiService';


const Body = (props) =>{
    let token = ""
    if(localStorage.getItem("token_user_parkin")){
        token = localStorage.getItem("token_user_parkin")
    }
    const verify_user = async () =>{
        if(token !== ""){
            const instance = apiAuth(token)
            return await instance.get("is_auth")
        }else{
            console.log("Nada aqui")
        }
    }
    return(
        <>
        
        <Header/>
        <section class="main__section">
            {React.Children.map(props.children, child =>{
                return React.cloneElement(child, {isAuth:verify_user()})
            })}
        </section>
        </>
    )
}

export default Body;