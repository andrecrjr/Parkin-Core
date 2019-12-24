import userAuth,{userSignup} from './authUser.reducer';
import {listCars} from './listCarUser.reducer';
import {combineReducers} from 'redux';


const rootReducer = combineReducers({auth:userAuth, signUp:userSignup, userCars:listCars})

export default rootReducer