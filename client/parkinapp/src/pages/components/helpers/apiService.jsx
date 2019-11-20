import axios from 'axios';

const URL_API = process.env.REACT_APP_API_URL

export const api = axios.create(
    {
        baseURL:`${URL_API}`,
        headers:{"Content-Type":"application/json", "charset":"utf-8"}
    })

export const apiAuthGet = async (url, token, payload) =>{
    const data = axios.get(`${URL_API}`+url, 
    {headers:{"Authorization":`Bearer ${token}`, "Content-Type":"application/json", "charset":"utf-8"}}, payload);
    return data;
}

export const apiAuthPost = async (url, token, payload) =>{
    const instance = axios.post(`${URL_API}`+url, payload, {
        headers:{"Authorization":`Bearer ${token}`, "Content-Type":"application/json", "charset":"utf-8"}
    });
    return instance;
}
