<template>
  <!-- <input @change="uploadFile" type="file" id="file" name="file" /> -->
  <a-textarea v-model:value="textareaValue" :placeholder="placeholderText" :rows="8" />
  <!-- <span @click="log(textareaValue)">log</span> -->

  <a-button type="primary" style="margin: 12px" @click="downloadAll">全部下载</a-button>
  <a-table :columns="columns" :data-source="dataSource" bordered :pagination="false">
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.dataIndex === 'index'">
        <span>{{ index + 1 }}</span>
      </template>
      <template v-if="column.dataIndex === 'action'">
        <a @click="download(record, index)" :class="{ visited: visitedIndex.includes(index) }">下载</a>
        <!-- <a :href="record.url" :class="{ visited: visitedIndex.includes(index) }" :download="record.title">下载</a> -->
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
// import data from "./data.json";
import { downloadFile } from "@/utils/util";

let placeholderText = `[
    {
        "title": "1、模块一项目1单元1 判断火灾自动报警系统工作状态.mp4",
        "url": "https://video.yiwenjy.cn/yunlian_aliyun/jzgc/xfssczy/2024/002-xfssczy-24031710-rF9X.mp4"
    },
    ...
]`;
// function uploadFile(e) {
//   let file = e.target.files[0];
//   console.log(file);
//   var reads = new FileReader();
//   reads.readAsDataURL(file);
//   // reads.readAsArrayBuffer(file)
//   reads.onload = (e) => {
//     let res = e.target.result;
//     console.log(res);
//   };
// }

const textareaValue = ref();

const dataSource = computed(() => {
  if (textareaValue.value) {
    return JSON.parse(textareaValue.value);
  } else {
    return [];
  }
});

// function log(str) {
//   console.log(str);
// }
const columns = [
  {
    title: "序号",
    dataIndex: "index",
  },
  {
    title: "文件名",
    dataIndex: "title",
  },
  {
    title: "链接",
    dataIndex: "url",
  },
  {
    title: "操作",
    dataIndex: "action",
  },
];

// 是否点击过的索引
let visitedIndex = reactive([]);

// 单个下载
function download(item, index) {
  visitedIndex.push(index);
  downloadFile(item.url, item.title);
}

// 全部下载
function downloadAll() {
  let index = 0;
  setInterval(() => {
    if (index <= dataSource.value.length - 1) {
      download(dataSource.value[index], index);
      index++;
    }
  }, 1000);
}
</script>
<style lang="less" scoped>
a {
  color: #3498db;
  cursor: pointer;
}
a.visited {
  color: gray;
}
a:hover {
  color: red;
}
</style>
