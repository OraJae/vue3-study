/*
 * @Date: 2023-10-26 10:07:10
 * @LastEditors: 王子豪 2579405338@qq.com
 * @LastEditTime: 2023-11-07 15:31:48
 * @Description:
 */
import path from 'path'
import autoImport from 'unplugin-auto-import/vite'
// import ApiResolver from './apiResolver'

const pathDir = path.resolve(process.cwd(), 'types')

export default function createAutoImport() {
    return [
        autoImport({
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
            imports: ['vue', 'vue-router', 'pinia'],
            dts: path.resolve(pathDir, 'auto-import.d.ts'),
            // resolvers: [ApiResolver()],
        }),
    ]
}
