import React from 'react';
import {apiAuthGet} from '../helpers/apiService';
import {TokenContext, UserContext} from '../contexts/UserContext';

const withAccount = (Component) =>{

    return (props) =>{
        const {token} = React.useContext(TokenContext);
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
                    <UserContext.Provider value={{user}}>
                        <Component {...props}/>
                    </UserContext.Provider>
                </>
        )
    }

}

export  default withAccount;