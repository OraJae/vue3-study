<template>
  <van-cell title="单元格" is-link @click="popupAttr.show = true" />
  <van-popup v-bind="popupAttr" v-model:show="popupAttr.show" teleport="body">
    <!-- 多选picker -->
    <mul-picker v-if="pickerMultipleAttr" v-bind="pickerMultipleAttr"></mul-picker>
  </van-popup>
</template>

<script setup lang="ts">
const popupAttr = ref({
  position: "bottom",
  show: false,
})

const pickerMultipleAttr = {
  columns: [
    { text: "杭州", value: "Hangzhou" },
    { text: "宁波", value: "Ningbo" },
    { text: "温州", value: "Wenzhou" },
    { text: "绍兴", value: "Shaoxing" },
    { text: "湖州", value: "Huzhou" },
  ],
  onConfirm: ({ selectedOptions }) => {
    console.log(selectedOptions)
  },
}
</script>
<style lang="less" scoped></style>
