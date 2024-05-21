import XEUtils from 'xe-utils'
import { utils, writeFile } from 'xlsx'
import dayjs from 'dayjs'
import type { TableColumnsType } from 'ant-design-vue'

type HeaderDataItem = TableColumnsType & {
    // title: string // 标题
    // dataIndex: string // 字段
    // colSpan?: number // 表头列合并,设置为 0 时，不渲染（antd）
    // rowSpan?: number
    style?: any // 样式
    // selected?: boolean // 是否开启筛选
    // hidden?: boolean // 是否隐藏
    // freezen?: boolean // 是否冻结
}

export type HeaderData = HeaderDataItem & {
    children?: HeaderDataItem[]
}

type BodyDataItem = {
    title: string // 单元格中显示的文本
    // dataIndex: string // 字段
    colSpan?: number
    rowSpan?: number
    // style?: any // 样式
}

type TableConfig = {
    fileName: string // 文件名称
    sheetName: string // sheet名称
    // mark: string // 文件注释
}

/**
 * 表头分组类型的table
 * @param header 表头
 * @param data 数据
 * @param config 配置
 */
export const exportSheet = (header: HeaderData, dataSource: BodyDataItem[][], config?: TableConfig) => {
    let {
        fileName, // 文件名称
        sheetName, // sheet名称
    } = config || {}

    let headerArr = []
    console.log(header, dataSource)

    let merges = []

    let headerDeep = getTreeDeep(header)

    // 处理 header
    function eachHeader(tree, level = 0) {
        if (!headerArr[level]) headerArr[level] = []
        if (tree?.length) {
            tree.forEach(item => {
                if (!item.children) item.children = []

                // 根据最深的分支深度，递归调用
                if (level < headerDeep - 1) eachHeader(item.children || [], level + 1)

                // 根据末端叶节点数n，生成长度为n的数据
                let leaf = getTreeLeafLen(item.children) || 1
                let curArr = new Array(leaf).fill('')
                curArr[0] = item.title || ''

                // 生成合并规则
                merges.push({
                    s: { r: level, c: headerArr[level].length },
                    e: { r: item.children?.length ? level : headerDeep - 1, c: headerArr[level].length + leaf - 1 },
                })

                headerArr[level] = headerArr[level].concat(curArr)
            })
        } else {
            // 根据最深的分支深度，将其余分支节点补充为''
            headerArr[level] = headerArr[level].concat([''])
            if (level < headerDeep - 1) eachHeader([], level + 1)
        }
    }
    eachHeader(header)

    // 处理 dataSource
    let dataMerge = []
    let bodyData = dataSource.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
            let { rowSpan = 1, colSpan = 1 } = col
            if (col.colSpan > 1 || col.rowSpan > 1) {
                // 生成合并规则
                dataMerge.push({
                    s: { r: rowIndex + headerDeep, c: colIndex },
                    e: { r: rowIndex + headerDeep + (rowSpan - 1), c: colIndex + (colSpan - 1) },
                })
            }
            return col.title
        })
    })
    console.log(dataMerge)
    let exportJson = headerArr.concat(bodyData)
    console.log(exportJson)
    var ws = utils.aoa_to_sheet(exportJson) // 导出时跳过表头col
    merges = merges.concat(dataMerge)
    merges = merges.filter(item => !XEUtils.isEqual(item.s, item.e))
    ws['!merges'] = merges
    console.log(ws)
    var wb = utils.book_new()

    utils.book_append_sheet(wb, ws, sheetName || 'sheet1')
    fileName = fileName || dayjs().format('YYYY-MM-DD HH:mm:ss')
    writeFile(wb, fileName + '.xlsx')
}

// 获取tree最大深度
function getTreeDeep(treeData) {
    let maxLevel = 0
    function loop(data, level) {
        data.forEach(item => {
            if (level > maxLevel) {
                maxLevel = level
            }
            if (item.children && item.children.length) {
                loop(item.children, level + 1)
            }
        })
    }
    loop(treeData, 1)
    return maxLevel
}

export function getTreeLeaf(treeData) {
    let arr = []
    function loop(data) {
        data.forEach(item => {
            item.children?.length ? loop(item.children) : arr.push(item)
        })
    }
    loop(treeData)
    return arr
}

// 获取末端叶子节点的总数
function getTreeLeafLen(treeData) {
    let total = 0
    function loop(data) {
        data.forEach(item => {
            item.children?.length ? loop(item.children) : total++
        })
    }
    loop(treeData)
    return total
}

function getSheetCellType(title) {
    if (title) {
        if (typeof title == 'number') {
            return 'n'
        }
        if (typeof title == 'string') {
            return 's'
        }
        if (typeof title == 'boolean') {
            return 'z'
        }
    } else {
        return 'z'
    }
}
