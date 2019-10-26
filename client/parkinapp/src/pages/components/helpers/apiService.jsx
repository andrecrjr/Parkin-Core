import axios from 'axios';

export const api = axios.create(
    {
        baseURL:'http://127.0.0.1:3333/api/',
        headers:{"Content-Type":"application/json", "charset":"utf-8"}
    })

export const apiAuthGet = async (url, token, payload) =>{
    const data = axios.get('http://127.0.0.1:3333/api/'+url, 
    {headers:{"Authorization":`Bearer ${token}`, "Content-Type":"application/json", "charset":"utf-8"}}, payload);
    return data;
}