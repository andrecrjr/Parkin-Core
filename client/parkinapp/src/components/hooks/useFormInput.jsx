import React from 'react'

export const useFormInput = (initialValue)=>{

    const [value,setValue] = React.useState(initialValue);
    function onChange(e){
      setValue(e.target.value);
    }
    return {value,onChange};
  
  }