import React from 'react';
import {api} from '../helpers/apiService'

export const useFetchGet = (url, payload) =>{
    const [response,setResponse] = React.useState([])
    const callApi = React.useCallback( ()=>{
        async function fetchData(){
            const data = await api.get(url, payload)
            setResponse(data);
        }
        fetchData()
    }, [url, payload])
    
    return {response, callApi}
}