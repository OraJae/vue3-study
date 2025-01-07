/*
 * @Author: lihongming 1114865413@qq.com
 * @Date: 2022-10-31 09:11:03
 * @LastEditors: lihongming 1114865413@qq.com
 * @LastEditTime: 2022-12-09 16:26:11
 * @FilePath: \portal-web-fd\src\utils\http.js
 * @Description:
 */
import request from './request'

export const get = (url, params) =>
    request({
        url,
        method: 'get',
        params: params,
    })
export const postByquery = (url, params, config = {}) =>
    request({
        url,
        method: 'post',
        params: params,
        ...config,
    })
export const post = (url, data, config = {}) =>
    request({
        url,
        method: 'post',
        data: data,
        ...config,
    })
export const put = (url, params) =>
    request({
        url,
        method: 'put',
        data: params,
    })
