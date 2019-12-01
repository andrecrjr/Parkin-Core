import React from 'react';
import {UserContext} from '../contexts/UserContext';
import {apiAuthGet} from '../helpers/apiService';


const AccountReducer = (state, action) =>{
    switch(action.type){
        case 'AUTH_USER':
            return {...state, userFetched:true, token:action.token, ...action.payload}
        case 'LIST_CAR_USER':
            return {}
    }
}


const withAccount = (Component) =>{

    return (props) =>{
        let token = localStorage.getItem("token_user_parkin") || false
        const [user, dispatchAuth] = React.useReducer(AccountReducer,{userFetched:false, token:token})

        React.useEffect(()=>{
            async function fetchAuth(){
                const data = await fetchApi(token)
                dispatchAuth({type:'AUTH_USER', token:token, payload:data})
            }
           fetchAuth()
        },[token])

        const fetchApi = async (token) =>{
            try{
                const {data} = await apiAuthGet("show_user", token)
                return data
            }catch(err){
                console.log(err)
            }
        }

        return (<>
                    <UserContext.Provider value={{user}}>
                        <Component {...props}/>
                    </UserContext.Provider>
                </>
        )
    }

}

export  default withAccount;