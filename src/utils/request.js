import axios from 'axios'
import { message } from 'antd'

const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
})

request.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.token = `${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

request.interceptors.response.use((response) => {
    if (response.data.code === '2005') {
        message.error('登录已失效，请重新登录')
        window.location.href = '/';
        return Promise.reject('登录已失效，请重新登录');
    } else
        return response.data
}, (error) => {
    return Promise.reject(error)
})
export { request }