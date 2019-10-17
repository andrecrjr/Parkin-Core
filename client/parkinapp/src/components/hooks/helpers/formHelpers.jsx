
  export const validationPassword = (e, setError)=>{
    switch(e.target.name){
      case "user_pass":
          validatePass(setError, e);
          break;
      default:
          break;
    }
  }

  const validatePass = (setError,e) =>{
    const {value} = e.target;
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(value)){
      setError({status:true, problem:"less than eight characters and has at least one uppercase letter"})
      return false
     }else{
      setError({status:false, problem:""})
      return true
    }
  }