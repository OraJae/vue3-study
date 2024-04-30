import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import createVitePlugins from "./vite/plugins"

//  const VITE_APP_SERVER_URL: string = loadEnv(mode, process.cwd()).VITE_APP_SERVER_URL;
export default ({ command }) => {
  // const VITE_APP_SERVER_URL: string = loadEnv(mode, process.cwd()).VITE_APP_SERVER_URL
  return defineConfig({
    plugins: [
      ...createVitePlugins(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    define: {
      "process.env": process.env,
    },
    resolve: {
      // 配置路径别名
      alias: {
        "@": resolve(__dirname, "./src"),
        "@com": resolve(__dirname, "./src/components"),
        "@styles": resolve(__dirname, "./src/assets/styles"),
        "@hooks": resolve(__dirname, "./src/hooks"),
      },
    },
    base: command === "build" ? "/vue3-study" : "./",
    build: {
      outDir: "docs",
    },
    server: {
      port: 5174,
      // proxy: !isEnvProduction
      //   ? {
      //     '/localProxy': {
      //       target: 'https://test-portal.hysz.co', // 用于开发环境单点登录
      //       // target: 'http://172.16.16.99:8084', // 用于开发环境单点登录
      //       // target: 'https://qyapi.weixin.qq.com', // 企业微信开发
      //       changeOrigin: true,
      //       rewrite: path => path.replace(/^\/localProxy/, '')
      //     }
      //   }
      //   : undefined
    },
  })
}
