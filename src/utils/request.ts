import axios from 'axios'
import { message } from 'ant-design-vue'
import qs from 'qs'

// 获取 token 的函数
const getToken = () => {
    return localStorage.getItem('token')
}

// 创建 axios 实例
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 基础 URL
    timeout: 40000, // 超时时间
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        platForm: 'web',
    },
    paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'brackets' })
    }
})

// 请求拦截器
request.interceptors.request.use(
    config => {
        const token = getToken()
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        if (error.response) {
            const data = error.response.data
            if (error.response.status === 403) {
                message.error(data.message || 'Forbidden')
            }
            if (error.response.status === 401) {
                message.error('Unauthorized, please login again')
            }
        }
        return Promise.reject(error)
    }
)

export default request