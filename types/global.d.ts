export {}
declare global {
    interface PageParam {
        pageSize?: number
        pageNo?: number
    }

    interface ObjectType {
        [key: string]: any
    }
}
