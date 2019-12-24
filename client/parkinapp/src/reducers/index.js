import userAuth,{userSignup} from './authUser.reducer'
import {combineReducers} from 'redux';


const rootReducer = combineReducers({auth:userAuth, signUp:userSignup})

export default rootReducer