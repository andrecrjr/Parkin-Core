import React from 'react';
import {Header} from '../Header';

const Body = (props) =>{

    return(
        <>
        <Header/>
        <section class="main__section">
            {props.children}
        </section>
        </>
    )
}

export default Body;


export const ErrorForm = ({children}) =>{
    return(
        <div class="form__error">
            <p>{children}</p>
        </div>
    )
}
