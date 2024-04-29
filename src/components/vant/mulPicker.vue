<template>
  <div class="mul-picker">
    <div class="van-picker__toolbar">
      <button type="button" class="van-picker__cancel van-haptics-feedback" @click="cancel">取消</button>
      <div class="van-picker__title van-ellipsis">{{ title }}</div>
      <button type="button" class="van-picker__confirm van-haptics-feedback" @click="confirm">确定</button>
    </div>
    <div class="picker-list">
      <van-checkbox
        v-for="(item, index) in cColumns"
        :key="index"
        :title="item[columnsFieldNames.text]"
        v-model="item.checked"
        shape="square"
        label-position="left"
        >{{ item[columnsFieldNames.text] }}</van-checkbox
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import XEUtils from "xe-utils"

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  columnsFieldNames: {
    type: Object,
    default: function () {
      return {
        children: "children",
        text: "text",
        value: "value",
      }
    },
  },
})

// const attrs = useAttrs()

const cColumns = ref([])
watch(
  () => props.columns,
  (ns) => {
    if (ns && ns.length) {
      ns.forEach((item: any) => {
        cColumns.value.push({
          ...item,
          checked: props.modelValue.includes(item[props.columnsFieldNames["value"]]) || false,
        })
      })
    }
  },
  { immediate: true, deep: true }
)
const emits = defineEmits(["confirm", "cancel"])

function cancel() {
  emits("cancel")
}
function confirm() {
  emits("confirm", {
    selectedOptions: cColumns.value
      .filter((item) => item.checked)
      .map((item) => {
        return XEUtils.omit(item, "checked")
      }),
  })
}

// defineExpose({})
</script>
<style lang="less">
.mul-picker {
  .picker-list {
    overflow-y: auto;
    padding: 32px 16px;
    max-height: 264px;
    .van-checkbox {
      height: 44px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 0;
      .van-checkbox__label {
        text-align: center;
        margin: 0;
        display: inline-block;
        width: calc(100% - 64px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .van-checkbox__icon {
        // width: 30%;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      & + .van-checkbox {
        border-top: 1px solid var(--van-cell-border-color);
      }
    }
  }
}
</style>
