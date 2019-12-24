import axios from 'axios';

const URL_API = process.env.REACT_APP_API_URL

/* POST API REQUEST WITHOUT TOKEN */
export async function fetchData(endpoint, body){
    const fetchInstance = await axios.post(`${URL_API}${endpoint}`, body)
    return fetchInstance
}

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

