const actionType={
    LOGIN_TRUE:'LOGIN_USER_TRUE',
    LOGIN_FALSE:'LOGIN_USER_FALSE'
}

export const loginUser = payload =>{
    return {
        type:actionType.LOGIN_TRUE,
        token:payload.token
    }
}

export const loginFail = payload =>{
    return {
        type:actionType.LOGIN_FALSE,
        payload:payload
    }
}