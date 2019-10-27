import React from 'react';
import {UserContext} from '../contexts/UserContext';
import {useAuthentication} from '../hooks/useAuthentication';
import {apiAuthGet} from '../helpers/apiService';

const withAccount = (Component) =>{

    return (props) =>{
        const {token, isAuth} = useAuthentication()
        const [user, setUser] = React.useState({})
        
        React.useMemo( async ()=>{
            try{
                const {data} = await apiAuthGet("show_user", token)
                setUser(data)
            }catch(err){
                setUser(false)
            }
        },[token])

        return (<>
                    <UserContext.Provider value={{user, token, isAuth}}>
                        <Component {...props}/>
                    </UserContext.Provider>
                </>
        )
    }

}

export  default withAccount;