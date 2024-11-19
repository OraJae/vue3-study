<template>
  <!-- <input @change="uploadFile" type="file" id="file" name="file" /> -->

  <!-- <span @click="log(funcStr)">log</span> -->
  <a-row :gutter="16">
    <a-col :span="18">
      <a-textarea v-model:value="textareaValue" :placeholder="placeholderText" :rows="8" />
    </a-col>
    <a-col :span="6">
      <a-textarea v-model:value="funcStr" :placeholder="placeholderText" :rows="8" />
    </a-col>
  </a-row>
  <a-button type="primary" style="margin: 12px" @click="importCourses('中级知识')">中级知识</a-button>
  <a-button type="primary" style="margin: 12px" @click="importCourses('中级实操')">中级实操</a-button>
  <a-button type="primary" style="margin: 12px" @click="downloadAll">全部下载</a-button>
  <a-table :columns="columns" :data-source="dataSource" bordered :pagination="false">
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.dataIndex === 'index'">
        <span>{{ index + 1 }}</span>
      </template>
      <template v-if="column.dataIndex === 'title'">
        <span @click="copyToClipboard(record.title)">{{ record.title }}</span>
      </template>
      <template v-if="column.dataIndex === 'url'">
        <span @click="copyToClipboard(record.url)">{{ record.url }}</span>
      </template>
      <template v-if="column.dataIndex === 'action'">
        <a-space>
          <a @click="showDetail(record)">查看</a>
          <a @click="download(record, index)" :class="{ visited: visitedIndex.includes(index) }">下载</a>
        </a-space>
        <!-- <a :href="record.url" :class="{ visited: visitedIndex.includes(index) }" :download="record.title">下载</a> -->
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { downloadFile, copyToClipboard } from "@/utils/util";

let placeholderText = `[
    {
        "title": "1、模块一项目1单元1 判断火灾自动报警系统工作状态.mp4",
        "url": "https://video.yiwenjy.cn/yunlian_aliyun/jzgc/xfssczy/2024/002-xfssczy-24031710-rF9X.mp4"
    },
    ...
]`;

let data = ref("");
const funcStr = ref(`data.value.map((item) => {
  return {
    title: item.title + ".mp4",
    url: item.videoModel.vBUrl,
  };
});`);

const textareaValue = ref();

const dataSource = computed(() => {
  if (textareaValue.value) {
    // return JSON.parse(textareaValue.value);
    data.value = JSON.parse(textareaValue.value);
    return eval(funcStr.value);
  } else {
    return [];
  }
});

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

function showDetail(record) {
  window.open(record.url);
}

async function importCourses(str) {
  try {
    const response = await import(`@/assets/files/${str}.json`);
    console.log(response.default);
    textareaValue.value = JSON.stringify(response.default);
  } catch (error) {
    console.error("加载 JSON 文件失败:", error);
  }
}

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
