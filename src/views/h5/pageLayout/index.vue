<template>
  <page-layout :fixed="true">
    <template #header> 固定头部 </template>

    <div v-for="item in 30" :key="item">这是一条数据</div>

    <template #footer>
      <div class="footer">操作按钮</div>
    </template>
  </page-layout>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
</script>
<style lang="less" scoped></style>
