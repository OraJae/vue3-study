import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx"; // 添加这一句
import Markdown from 'vite-plugin-md';
import DefineOptions from "unplugin-vue-define-options/vite"; // setup组件设置name
import createAutoImport from "./auto-import";
import createComponents from "./components";

export default function createVitePlugins() {
  const vitePlugins = [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
    Markdown(),
    DefineOptions(),
    createAutoImport(),
    createComponents(),
  ];
  return vitePlugins;
}
