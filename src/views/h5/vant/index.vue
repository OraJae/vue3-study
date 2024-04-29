<template>
  <van-cell title="多选picker" is-link @click="showPopup('mulPicker')" />
  <van-cell title="datePickerPro" is-link @click="showPopup('datePickerPro')" />
  <van-popup v-bind="popupAttr" v-model:show="popupAttr.show" teleport="body">
    <!-- 多选picker -->
    <mul-picker v-if="popupAttr.component == 'mulPicker'" v-bind="pickerMultipleAttr"></mul-picker>
    <!-- 支持年月日或者年月日时分秒的dataPicker （有缺陷） -->
    <datePickerPro
      v-model="dateTime"
      v-if="popupAttr.component == 'datePickerPro'"
      v-bind="datePickerProAttr"
    ></datePickerPro>
  </van-popup>
</template>

<script setup lang="ts">
const popupAttr = reactive({
  position: "bottom",
  show: false,
  component: "",
})

function initPopup() {
  popupAttr.show = false
}

function showPopup(component) {
  popupAttr.show = true
  popupAttr.component = component
}
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
    initPopup()
  },
}

const dateTime = ref([])
const datePickerProAttr = {
  showTime: true,
  onConfirm: (dateTime) => {
    console.log(dateTime)
    initPopup()
  },
}
</script>
<style lang="less" scoped></style>
