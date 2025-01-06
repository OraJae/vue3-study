<template>
  <a-select
    class="model-choose"
    ref="select"
    v-model:value="modelName"
    style="width: 120px"
    :options="modelOptions"
  ></a-select>
  <component :is="currentComponent" />
</template>

<script setup>
import { ref, computed } from "vue";
import duck_bodybuilder from "./duck_bodybuilder.vue";
import LittlestTokyo from "./LittlestTokyo.vue";

// 注册组件
const components = {
  duck_bodybuilder,
  LittlestTokyo,
};

const modelName = ref("duck_bodybuilder");
const modelOptions = ref([
  { label: "duck_bodybuilder", value: "duck_bodybuilder" },
  // { label: "LittlestTokyo", value: "LittlestTokyo" },
]);

const currentComponent = computed(() => components[modelName.value]);

</script>

<style lang="less" scoped>
.model-choose {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
