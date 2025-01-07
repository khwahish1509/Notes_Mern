// Your app has a delivery assistant called **AxiosInstance**,
//  who handles all API requests smoothly. It always starts at 
//  the same base warehouse (`BASE_URL`), knows not to wait more 
//  than 10 seconds for a response, and includes a clear 
//  label (`Content-Type: application/json`) with every package. 
//  Before any delivery, AxiosInstance checks for a security 
//  badge (token) in the app’s vault (localStorage) and attaches 
//  it to secure packages. If there’s a problem, AxiosInstance 
//  reports it right away. This way, your app can send requests 
//  efficiently, securely, and without repeating setup every time.

/* eslint-disable no-unused-vars */
import axios from 'axios';
import { BASE_URL } from './constants';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers:{
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) =>{
       return Promise.reject(error)
    }   
);


export default axiosInstance;