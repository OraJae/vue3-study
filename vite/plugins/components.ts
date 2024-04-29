/*
 * @Date: 2023-11-08 15:40:22
 * @LastEditors: 王子豪 2579405338@qq.com
 * @LastEditTime: 2023-11-23 11:16:13
 * @Description:
 */
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

const pathDir = path.resolve(process.cwd(), 'types')

export default function createComponents() {
    return Components({
        // 要搜索组件的目录的相对路径
        dirs: [path.resolve(process.cwd(), 'src/components')],
        // 组件的有效文件扩展名
        extensions: ['vue', 'md'],
        // 搜索子目录
        deep: true,
        include: [/\.vue$/, /\.vue\?vue/],
        // 生成自定义 `auto-components.d.ts` 全局声明
        dts: path.resolve(pathDir, 'auto-components.d.ts'),
        // 自定义组件的解析器
        exclude: [/[\\/]node_modules[\\/]/],
        resolvers: [VantResolver()],
    })
}
