<template>
  <!-- <div class="custom-field" @click="showDatePicker = true">
        <span v-if="value">{{ value }}</span>
        <span class="h5-form-placeholder" v-else>请选择</span>
    </div>
    <van-popup v-model:show="showDatePicker" position="bottom"> -->
  <van-date-picker
    v-model="currentDate"
    title="选择日期"
    @confirm="onConfirm"
    @cancel="onCancel"
    v-if="!['true', true].includes(showTime)"
  />
  <van-picker-group
    title="预约日期"
    :tabs="['选择日期', '选择时间']"
    @confirm="onConfirm"
    @cancel="onCancel"
    v-else="showTime"
  >
    <van-date-picker v-model="currentDate" />
    <van-time-picker v-model="currentTime" />
  </van-picker-group>
  <!-- </van-popup> -->
</template>

<script setup lang="ts">
import dayjs from "dayjs"

const props = defineProps({
  value: null,
  showTime: {
    type: [Boolean, String],
    default: false,
  },
  valueFormat: null,
})

const attrs = useAttrs()
console.log(attrs)
const emits = defineEmits(["update:value"])
const currentDate = ref(["2022", "06", "01"])
const currentTime = ref(["12", "00"])
const showDatePicker = ref(false)

watch(
  () => props.value,
  (ns) => {
    currentDate.value = ns
  }
)

const onConfirm = () => {
  console.log("啊大伤脑筋法术暴击")
  let dateTime = ["true", true].includes(props.showTime)
    ? `${currentDate.value.join("/")} ${currentTime.value.join(":")}`
    : `${currentDate.value.join("/")}`
  if (props.valueFormat) {
    dateTime = dayjs(dateTime).format(props.valueFormat)
  }
  console.log(dateTime)
  emits("update:value", dateTime)
  showDatePicker.value = false
}

const onCancel = () => {
  showDatePicker.value = false
}
</script>
<style lang="less" scoped>
.custom-field {
  flex: 1;
}
</style>
