<template>
  <!-- <router-view v-slot="{ Component }" :max="10">
    <keep-alive :include="caches">
      <component :is="Component" />
    </keep-alive>
  </router-view> -->
  <router-view />
</template>

<script setup lang="ts">
import useRouteCache from '@hooks/useRouteCache'
const { caches, addCache } = useRouteCache()
addCache(['h5PageCacheList'])

console.log(import.meta.env.NODE_ENV); // 输出: development 或 production
console.log(import.meta.env.VITE_ENV_CONFIG); // 输出: 自定义的API URL
</script>
<style>
#app {
  /* width: 100%; */
  /* height: 100%; */
  /* overflow: hidden auto; */
}
</style>
