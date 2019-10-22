import React from 'react';
//import Ws from '@adonisjs/websocket-client'

export const withAuthentication = (Component)=>{
    return  (props) =>{
        /*
            const io = Ws('ws://127.0.0.1:3333')
            const channel = io.connect()
            let subs = channel.subscribe("chat");
        */
        return <Component {...props} />
    }
}
