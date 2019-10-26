import React from 'react';
import {api} from '../helpers/apiService'

export const useFetchGet = (url, auth_token=false, payload="") =>{
    const [response,setResponse] = React.useState([])
    const callApi = React.useCallback( ()=>{
        async function fetchData(){
            if(auth_token!==false){
                let headers = {headers:{"Authorization":`Bearer ${auth_token}`}}
                const data = await api.get(url, headers, payload)
                setResponse(data);
            }else{
                const data = await api.get(url, payload)
                setResponse(data);
            }
        }
        fetchData()
    }, [url, auth_token, payload])
    
    return {response, callApi}
}