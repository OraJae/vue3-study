<template>
  <a-card v-for="(item, index) in menuList" :key="index" :title="item.categoryName">
    <a-card-grid v-for="(child, index) in item.children" :key="index" class="menu-item" @click="routerTo(child.path)">
      {{ child.name }}
    </a-card-grid>
  </a-card>
</template>

<script setup lang="ts">
import useRouteCache from "@hooks/useRouteCache"
const { removeCacheEntry } = useRouteCache()
const menuList = ref([
  {
    categoryName: "封装组件展示",
    children: [
      { name: "h5页面布局组件", path: "/h5/pageLayout" },
      { name: "h5Vant组件扩展", path: "/h5/vant" },
    ],
  },
  {
    categoryName: "第三方插件使用",
    children: [
      { name: "pdf印章", path: "/seal" },
      { name: "sheet表格", path: "/sheet" },
    ],
  },
  {
    categoryName: "业务场景方案",
    children: [
      { name: "h5页面缓存方案", path: "/h5/pageCache/list" },
      { name: "iframe传递数据", path: "/h5/iframe/postMessage" },
    ],
  },
])

const router = useRouter()
function routerTo(url) {
  removeCacheEntry("h5PageCacheList")
  router.push({ path: url })
}
</script>
<style lang="less" scoped>
.menu-item {
  width: 33.33%;
  text-align: center;
  cursor: pointer;
}
.ant-card {
  margin: 12px;
}
</style>
