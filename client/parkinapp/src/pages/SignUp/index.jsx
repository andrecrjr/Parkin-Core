import React from 'react';
import {useFormInput} from '../../components/hooks/useFormInput';
import {Redirect} from "react-router-dom";
import {UserContext} from '../../components/contexts/UserContext'
import SignUpForm from './SignUpForm';
import {SignUpContext} from './SignUpContext';
import {useDispatch, useSelector} from 'react-redux';
import {userSignup} from '../../actions/signupUser'

const SignUpPage = (props) =>{
    const username = useFormInput("")
    const email = useFormInput("") 
    const password = useFormInput("")
    const firstName = useFormInput("")
    const lastName = useFormInput("")
    const identifierSocial = useFormInput("")
    const dispatch = useDispatch()
    const {signUp, auth} = useSelector(state=>state)
    
    const signUpJsonUser = {
        username:username.value,
        email:email.value, 
        password:password.value, 
        first_name:firstName.value, 
        last_name:lastName.value, 
        identifier_social:identifierSocial.value
    };

    const submitSignUp = async (e) =>{
        e.preventDefault()
        dispatch(userSignup(signUpJsonUser))
    }

    React.useEffect(()=>{
        if(signUp===true){
            console.log(auth)
            return props.history.push('/?new_user')
        }
        if(auth.authenticated){
            return props.history.push('/')
        }
    },[signUp, auth])

    return(
        <>
        <SignUpContext.Provider value={{username, 
            email, password, 
            firstName, lastName, 
            identifierSocial,
            submitSignUp}}>
            <SignUpForm />
        </SignUpContext.Provider>
        </>
    )
}

export default SignUpPage;