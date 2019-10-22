import React from 'react';
import {Header} from '../Header';

const Body = (props) =>{
    if(localStorage.getItem("token_parkin_user")){
        console.log("uhu")
    }else{
        console.log("Nada aqui")
    }
    return(
        <>
        <Header/>
        <section class="main__section">
            {React.Children.map(props.children, child=>
                React.cloneElement(child, {authUser: false})
            )}
        </section>
        </>
    )
}

export default Body;