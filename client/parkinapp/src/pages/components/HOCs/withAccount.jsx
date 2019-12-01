import React from 'react';
import {UserContext} from '../contexts/UserContext';
import {apiAuthGet} from '../helpers/apiService';

const withAccount = (Component) =>{

    return (props) =>{
        let token = localStorage.getItem("token_user_parkin") || false
        const [user, setUser] = React.useState({})

        React.useMemo(async ()=>{
            try{
                const {data} = await apiAuthGet("show_user", token)
                setUser(data)
            }catch(err){
                setUser(false)
            }
        },[token])

        return (<>
                    <UserContext.Provider value={{user, token}}>
                        <Component {...props}/>
                    </UserContext.Provider>
                </>
        )
    }

}

export  default withAccount;