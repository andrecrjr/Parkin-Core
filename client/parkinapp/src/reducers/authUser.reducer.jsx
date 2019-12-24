const initialState = {
                authenticated:localStorage.getItem("token_user_parkin") ? true : false, 
                token:localStorage.getItem("token_user_parkin") ? localStorage.getItem("token_user_parkin") : false, 
                error:null,
                user: localStorage.getItem("parkin_user") ? JSON.parse(localStorage.getItem("parkin_user")) : null
            }

const userAuth = (state=initialState, action)=>{
    switch(action.type){
        case "LOGIN_USER_TRUE":
            return {...state, authenticated: action.authenticated, 
                                token: action.token, error:null}
        case "LOGIN_USER_FAIL":
            return {...state, error:action.payload}
        default:
            return state
    }
}

const initialStateSign = {signUp:false, fail:false}

export const userSignup = (state=initialStateSign, action)=>{
    switch(action.type){
        case "SIGN_UP_SUCCESS":
            return {...state, signUp:true}
        case "SIGN_UP_FAIL":
            return {...state, fail:action.error}
        default:
            return state;
    }
}

export default userAuth