<template>
  <router-view v-slot="{ Component }" :max="10">
    <keep-alive :include="caches">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <!-- <router-view></router-view> -->
</template>

<script setup lang="ts">
import useRouteCache from "@hooks/useRouteCache"
const { caches } = useRouteCache()
</script>

<style></style>
