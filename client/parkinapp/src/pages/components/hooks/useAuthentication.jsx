import React from 'react';
import {apiAuthGet} from '../helpers/apiService';

export const useAuthentication = ()=>{
    const [token] = React.useState(localStorage.getItem("token_user_parkin") || false);
    const [isAuth, setAuth] = React.useState(false);
    
    const getToken = React.useCallback(() =>{
        if(token === localStorage.getItem("token_user_parkin")){
            setAuth(true);
        }
        if(token === false){
            setAuth(false);
        }
    },[token])

    React.useMemo(()=>{
        getToken()
    }, [getToken])

    return {token, isAuth}
}
