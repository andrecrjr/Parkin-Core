import axios from 'axios';

const URL_API = process.env.REACT_APP_API_URL

export const api = axios.create(
    {
        baseURL:`${URL_API}`,
        headers:{"Content-Type":"application/json", "charset":"utf-8"}
    })

export const apiAuthGet = async (endpoint, token, payload={}) =>{
    const fetchGet = axios.get(`${URL_API}${endpoint}`, 
    {headers:{"Authorization":`Bearer ${token}`, "Content-Type":"application/json", "charset":"utf-8"}}, payload);
    return fetchGet;
}

export const apiAuthPost = async (endpoint, token, payload) =>{
    const fetchInstance = axios.post(`${URL_API}${endpoint}`, payload, {
        headers:{"Authorization":`Bearer ${token}`, "Content-Type":"application/json", "charset":"utf-8"}
    });
    return fetchInstance;
}

/* GET API REQUEST WITHOUT TOKEN */
export async function fetchData(endpoint, body){
    try{
        const data = await axios.post(`${URL_API}${endpoint}`, body)
        return data;
    }catch(err){
        console.log(err.response)
    }
}