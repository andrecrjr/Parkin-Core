import React from 'react';
import {TokenContext} from '../contexts/UserContext';
//import Ws from '@adonisjs/websocket-client'

export const withAuthentication = (Component)=>{
    return  (props) =>{
        /*
            const io = Ws('ws://127.0.0.1:3333')
            const channel = io.connect()
            let subs = channel.subscribe("chat");
        */
        const [token] = React.useState(localStorage.getItem("token_user_parkin") || false);
        const [verifyUser, setVerify] = React.useState(false);
        
        const getToken = React.useCallback(() =>{
            if(token === localStorage.getItem("token_user_parkin")){
                setVerify(true);
            }
            if(token === false){
                setVerify(false);
            }
        },[token])

        React.useMemo(()=>{
            getToken()
        }, [getToken])

        return (<>
            <TokenContext.Provider value={{token:token, isAuth:verifyUser}}>
                <Component {...props} />
            </TokenContext.Provider>
        </>)
    }
}

