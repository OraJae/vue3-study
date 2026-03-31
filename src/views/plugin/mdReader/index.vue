<template>
    <a-layout>
        <a-layout-sider :style="siderStyle" width="300">
            <a-directory-tree v-model:selectedKeys="selectedKeys" v-model:expandedKeys="expandedKeys" :tree-data="treeData"> </a-directory-tree>
        </a-layout-sider>
        <a-layout-content :style="contentStyle">
            <!-- <detailVue :fileName="noteName"></detailVue> -->
            <contentVue :text="fileContent"></contentVue>
        </a-layout-content>
    </a-layout>
</template>
<script setup>
import { ref, watch } from 'vue';
import difference from 'lodash-es/difference';
import mdMenu from './mdMenu';
import detailVue from './detail.vue';
import contentVue from './content.vue';
import XEUtils from 'xe-utils';
import { getNoteContent } from '@/api/notes';

const treeData = ref(mdMenu);
const expandedKeys = ref([]);
const selectedKeys = ref([]);
const checkedKeys = ref([]);

const siderStyle = {
    // width: '10vw',
    height: '100vh',
    backgroundColor: '#f9ecdf',
    borderRight: '1px solid #e8e8e8',
    padding: '16px 8px',
    fontSize: '20px',
    width: '300px',
    maxWidth: '300px',
    minWidth: '300px',
};
const contentStyle = {
    backgroundColor: '#fff',
    overflow: 'auto',
};

// 展开所有根节点
expandedKeys.value = treeData.value.map((item) => item.key);

const noteName = ref('js面试题');
// watch(selectedKeys, (newValue) => {
//     let selectedKey = newValue[0];
// });
const fileContent = ref('');
watch(selectedKeys, (newValue) => {
    let node = XEUtils.findTree(treeData.value, (item) => item.key === newValue[0]);
    noteName.value = node.item.title;
});

watch(
    noteName,
    (newValue) => {
        getNoteContent({
            // fileName: noteName.value + '.md',
            fileName: '数组方法🔥.lake',
        }).then((res) => {
            console.log(res);
            fileContent.value = res.data;
        });
    },
    {
        immediate: true,
    }
);
</script>

<style lang="less" scoped>
.ant-layout {
    height: 100%;
}
.ant-tree-title {
    font-size: 20px;
}
</style>
