/*
 * @Date: 2023-11-01 10:33:55
 * @LastEditors: 王子豪 2579405338@qq.com
 * @LastEditTime: 2023-11-01 10:35:21
 * @Description:
 */

let hooks = ['$service']

function resolveApiHooks(name: string) {
    if (!hooks) return
    if (!hooks.includes(name)) return

    return {
        name: 'default',
        from: '@/api',
    }
}

export function ApiResolver(): Resolver {
    return name => {
        return resolveApiHooks(name)
    }
}
export default ApiResolver
