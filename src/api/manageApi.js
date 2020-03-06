import axios from '@/utils/axios.js'

export function getParams(url, params) {
    return axios({
        url: url,
        params: params,
        method: 'get'
    })
}

export function postParams(url, params) {
    return axios({
        url: url,
        data: params,
        method: 'post'
    })
}