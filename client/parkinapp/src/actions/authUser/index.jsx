import history from '../../history';
import {fetchData, apiAuthGet} from '../../helpers/apiService';

const actionType={
    LOGIN_TRUE:'LOGIN_USER_TRUE',
    LOGIN_FALSE:'LOGIN_USER_FALSE'
}

export const loginUser = payload =>{
    return {
        type:actionType.LOGIN_TRUE,
        token:payload.token,
        authenticated:true,
        user: payload.data
    }
}

export const loginFail = payload =>{
    return {
        type:actionType.LOGIN_FALSE,
        payload:payload
    }
}

export const loginApi = (body)=>{
    return dispatch =>{
        async function fetchLogin(){
            try{
                const response = await fetchData(`${process.env.REACT_APP_API_URL}auth`, body)
                const {status, data} = response
                if(status === 200){
                    const user = await apiAuthGet(`show_user`, data.token)
                    localStorage.setItem('token_user_parkin', data.token)
                    localStorage.setItem('parkin_user', user.data)
                    dispatch(loginUser(data.token, user.data))
                    history.push('/')
                    window.location.reload()
                }
                return data;
            }catch(err){
                console.log(err)
            }
            
        }
        fetchLogin()
    }
}