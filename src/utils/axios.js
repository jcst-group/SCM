import axios from 'axios'
import qs from 'qs'
import {Modal, notification} from 'ant-design-vue'

const service = axios.create({
    baseURL: '/api',
    timeout: 7000
})

const err = error => {
    if (error.response) {
        let data = error.response.data
        switch(error.response.status) {
            case 401:
                notification.error({ message: '系统提示', description:'该账号无此权限!',duration: 4})
                break
            case 403:
                notification.error({ message: '系统提示', description: '拒绝访问',duration: 4})
                break
            case 404:
                notification.error({ message: '系统提示', description:'很抱歉，资源未找到!',duration: 4})
                break
            case 500:
                if(data.message === "Token失效，请重新登录"){
                    window.localStorage.token = ''
                    Modal.error({
                        title: '登录已过期',
                        content: '很抱歉，登录已过期，请重新登录',
                        okText: '重新登录',
                        mask: false,
                        onOk: () => {
                            window.location.reload()
                        }
                    })
                } else {
                    notification.error({ message: '系统提示', description: '服务器错误',duration: 4})
                }
                break
            case 504:
                notification.error({ message: '系统提示', description: '请求超时',duration: 4})
                break
            default:
                notification.error({
                    message: '系统提示',
                    description: data.message,
                    duration: 4
                })
        }
    }
    return Promise.reject(error)
}

service.interceptors.request.use(config => {
    const token = window.localStorage.token
    if (token) {
        config.headers['X-Access-Token'] = token
        switch(config.method) {
            case 'get':
                config.paramsSerializer = params => {
                    return qs.stringify(params, {arrayFormat: 'repeat'})
                }
                break
        }
    }
    console.log(config)
    return config
}, error => {
    return Promise.reject(error)
})

service.interceptors.response.use(res => {
    return res.data
}, err)

export default service
