<template>
  <h3>随机数：{{ random }}</h3>
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="(item, index) in list" :key="item" :title="item" @click="handleDetail(index)" />
  </van-list>
</template>

<script setup lang="ts">
defineOptions({
  name: "pageCacheList",
})
const random = ref(Math.random().toFixed(4))
const list = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1)
    }

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (list.value.length >= 20) {
      finished.value = true
    }
  }, 0)
}

const router = useRouter()
function handleDetail(index) {
  router.push({ path: "/scene/pageCache/detail", query: { id: index } })
}
onMounted(() => {
  console.log("list onMounted")
})
onActivated(() => {
  console.log("list onActivated激活")
})
onDeactivated(() => {
  console.log("list onDeactivated失活")
})
</script>
<style lang="less" scoped>
.page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.vant-list {
  height: 100%;
}
</style>
