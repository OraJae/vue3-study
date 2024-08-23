<template>
  <div class="home">
    <a-card v-for="(item, index) in menuList" :key="index" :title="item.categoryName">
      <a-card-grid v-for="(child, index) in item.children" :key="index" class="menu-item" @click="routerTo(child.path)">
        {{ child.name }}
      </a-card-grid>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import useRouteCache from '@hooks/useRouteCache'
const { removeCacheEntry } = useRouteCache()
const menuList = ref([
  {
    categoryName: '封装组件展示',
    children: [
      { name: 'h5页面布局组件', path: '/h5/pageLayout' },
      { name: 'h5Vant组件扩展', path: '/h5/vant' }
    ]
  },
  {
    categoryName: '第三方插件使用',
    children: [
      { name: 'pdf印章', path: '/seal' },
      { name: 'sheet表格', path: '/sheet' },
      { name: '文件预览', path: '/filePreview' },
      { name: '高德地图', path: '/amap' },
    ]
  },
  {
    categoryName: '业务场景方案',
    children: [
      { name: 'h5页面缓存方案', path: '/h5/pageCache/list' },
      { name: 'iframe传递数据', path: '/h5/iframe/postMessage' }
    ]
  },
  {
    categoryName: '工具函数封装',
    children: [
      { name: 'excel导出通用工具函数(antd)', path: '/excelExport' },
    ]
  },
  {
    categoryName: 'test',
    children: [
      { name: 'test', path: '/test' },
      { name: 'download', path: '/download' },
    ]
  }
])

const router = useRouter()
function routerTo(url) {
  removeCacheEntry('h5PageCacheList')
  router.push({ path: url })
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  background: #f3f5f7;
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
