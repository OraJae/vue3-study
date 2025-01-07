<template>
  <div class="home">
    <a-card v-for="(item, index) in menuList" :key="index" :title="item.categoryName">
      <a-card-grid v-for="(child, index) in item.children" :key="index" class="menu-item" @click="routerTo(child)">
        {{ child.name }}
      </a-card-grid>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import useRouteCache from "@hooks/useRouteCache";
const { removeCacheEntry } = useRouteCache();
const menuList = ref([
  {
    categoryName: "封装组件展示",
    children: [
      { name: "h5页面布局组件", path: "/components/h5/pageLayout" },
      { name: "h5Vant组件扩展", path: "/components/h5/vant" },
    ],
  },
  {
    categoryName: "第三方插件使用",
    children: [
      { name: "pdf印章", path: "/plugin/seal" },
      { name: "sheet表格", path: "/plugin/sheet" },
      { name: "文件预览", path: "/plugin/filePreview" },
      { name: "高德地图", path: "/plugin/amap" },
      { name: "md文档渲染", path: "/plugin/mdReader" },
      { name: "threejs", path: "/plugin/three" },
    ],
  },
  {
    categoryName: "业务场景方案",
    children: [
      { name: "h5页面缓存方案", path: "/scene/pageCache/list" },
      { name: "iframe传递数据", path: "/scene/postMessage" },
    ],
  },
  {
    categoryName: "工具函数封装",
    children: [{ name: "excel导出通用工具函数(antd)", path: "/toolFunction/excelExport" }],
  },
  {
    categoryName: "功能网页",
    children: [
      { name: "download", path: "/webPage/download" },
      { name: "emby封面", path: "/webPage/cover" },
      { name: "海报搜索", path: "/webPage/posterSearch" },
    ],
  },
]);

const router = useRouter();
function routerTo(child) {
  removeCacheEntry("h5PageCacheList");
  router.push({ path: child.path });
}
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  background: #f3f5f7;
  overflow: scroll;
}
.menu-item {
  width: 33.33%;
  text-align: center;
  cursor: pointer;
}
.ant-card {
  margin: 12px;
}
</style>
