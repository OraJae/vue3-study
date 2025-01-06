<template>
  <router-link to="/">随机数：{{ random }}</router-link>
</template>

<script setup lang="ts">
defineOptions({
  name: "pageCacheDetail",
})
const route = useRoute()
const router = useRouter()

const random = ref(Math.random().toFixed(4))
onMounted(() => {
  console.log("detail onMounted")
})
onActivated(() => {
  console.log("detail onActivated激活")
})
onDeactivated(() => {
  console.log("detail onDeactivated失活")
})
</script>
<style lang="less" scoped></style>
