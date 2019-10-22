import React from 'react'
import {validationPassword} from '../helpers/formHelpers';


export const useFormInput = (initialValue)=>{

    const [value, setValue] = React.useState(initialValue);
    const [error, setError] = React.useState({status:"initial", problem:""});

    const onChange = (e)=>{
      if (validationPassword(e, setError)){
        setValue(value)
      }
      //validationEmail(e.target.value, setError)
      setValue(e.target.value)
    }
    
    return {value, onChange, error}
    
  }

  //validation password