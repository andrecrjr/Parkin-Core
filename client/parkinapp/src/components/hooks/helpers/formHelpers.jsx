const passwords = []

  export const validationPassword = (e, setValue, setError)=>{
    
    switch(e.target.name){
      case "user_pass":
          validatePass(setError, e);
          break;
      case "user_pass_2":
          validateBothPath(setError, e)
          break;
      default:
          break;
    }
    setValue(e.target.value)
  }

  const validatePass = (setError, e) =>{
    const {value} = e.target;
    if(6 >= value.length){
      setError({status:true, problem:"less than six characters"})
     }else{
      setError({status:false, problem:""})
      passwords.push(value)
    }
  }

  const validateBothPath = (setError, e)=>{
    if(passwords[0] === e.target.value){
      setError({status:false, problem:""})
    }else{
      setError({status:true, problem:"is not the same password"})
    }
  }
