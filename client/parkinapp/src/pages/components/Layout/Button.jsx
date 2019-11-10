import React from 'react';


export const Button = (props) =>{
    const {className} = props
    return(
        <>
        <button className={`button__${className !== undefined ?className:`default`}`}>
            {props.children}
        </button>
        </>
    )
}