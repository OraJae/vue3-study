<template>
    <router-view></router-view>
</template>

<script setup>
import list from './list.vue';
import tagsEdit from './tagsEdit.vue';
import boxEdit from './boxEdit.vue';

// 注册组件
const components = {
    tagsEdit,
    list,
    boxEdit,
};
const componentId = 'list';
const currentComponent = computed(() => components[componentId]);
</script>

<style scoped>
</style>