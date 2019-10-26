import React from 'react';
import {Header} from '../Header';
import {TokenContext} from '../contexts/UserContext';

const Body = (props) =>{

    const {token} = React.useContext(TokenContext);
    React.useMemo(()=>{
        console.log(token)
    }, [token])

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