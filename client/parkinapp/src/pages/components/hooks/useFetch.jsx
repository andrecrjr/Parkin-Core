import React from 'react';
import axios from 'axios';

export const useFetchGet = (url, payload) =>{
    const [response,setResponse] = React.useState([])
    const callApi = React.useCallback( ()=>{
        async function fetchData(){
            const data = await axios.get(url, payload)
            setResponse(data);
        }
        fetchData()
    }, [url, payload])
    
    return {response, callApi}
}

export const useFetchPost = ({url, payload}) =>{
    const [data, setData] = React.useState({isLoading:false, response:[], error:null})
    const fetchPost = React.useCallback(()=>{
        const fetch = async () =>{
            setData({isLoading:true, response:[]})
            try{
                const data = await axios.post(url, payload)
                setData({isLoading:false, response:data})
            }catch(err){
                console.log(err)
                setData({isLoading:false, response:null, error:err})
            }
        }
        fetch()
    }, [url, payload])

    return [data, fetchPost]
}