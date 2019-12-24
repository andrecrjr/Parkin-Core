import {fetchData} from '../../helpers/apiService'
const actionTypes = {
    SIGN_UP_SUCCESS:'SIGN_UP_SUCCESS',
    SIGN_UP_ERROR:'SIGN_UP_ERROR'
}

const signupSuccess = (payload)=>{
    return {
        type:SIGN_UP_SUCCESS,
        data:payload,
    }
}

const signupError = (payload)=>{
    return {
        type:SIGN_UP_ERROR,
        error:payload,
    }
}

export const userLogin = (userData) =>{
    return dispatch =>{
        const fetchLogin = async () =>{
            try{
                const data = await fetchData(`${process.env.REACT_APP_API_URL}create_profile`,userData);
                dispatch(signupSuccess(data))
            }catch(err){
                dispatch(signupError(err.response))
            }
           
        }
        fetchLogin()
    }
}