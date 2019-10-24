import axios from 'axios';

export const api = axios.create(
    {
        baseURL:'http://127.0.0.1:3333/api/',
        headers:{"Content-Type":"application/json", "charset":"utf-8"}
    })

    export const apiAuth = (auth_token)=>{
        let config = {
            baseURL:'http://127.0.0.1:3333/api/',
            headers:{"Content-Type":"application/json", "charset":"utf-8", "Authorization":`Bearer ${auth_token}`}
        }
        return axios.create(config)
    }