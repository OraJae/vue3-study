<template>
    <a-card title="文本替换工具">
        <a-row :gutter="16">
            <a-col :span="12">
                <a-form-item label="查找文本">
                    <a-input v-model:value="findText" placeholder="请输入要查找的文本" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="替换为">
                    <a-select v-model:value="replaceText" :options="options"></a-select>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row :gutter="16">
            <a-col :span="12">
                <a-form-item label="数据源">
                    <a-textarea style="border-color: #4096ff; border-width: 2px" v-model:value="sourceText" :rows="4" placeholder="请输入数据源文本" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="替换结果">
                    <a-textarea
                        style="border-color: #389e0d; border-width: 2px"
                        v-model:value="outputText"
                        :rows="4"
                        placeholder="请输入数据源文本"
                        @click="copyToClipboard(outputText)"
                    />
                </a-form-item>
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup>
import { message } from 'ant-design-vue';

const options = ref([
    {
        value: 'rsshub.rssforever.com',
        label: 'rsshub.rssforever.com',
    },
    {
        value: 'hub.slarker.me',
        label: 'hub.slarker.me',
    },
    {
        value: 'rsshub.pseudoyu.com',
        label: 'rsshub.pseudoyu.com',
    },
    {
        value: 'rsshub.rss.tips',
        label: 'rsshub.rss.tips',
    },
    {
        value: 'rsshub.ktachibana.party',
        label: 'rsshub.ktachibana.party',
    },
    {
        value: 'rsshub.woodland.cafe',
        label: 'rsshub.woodland.cafe',
    },
    {
        value: 'rss.owo.nz',
        label: 'rss.owo.nz',
    },
    {
        value: 'rss.wudifeixue.com',
        label: 'rss.wudifeixue.com',
    },
    {
        value: 'yangzhiaapp',
        label: 'yangzhiaapp',
    },
    {
        value: 'rss.littlebaby.life',
        label: 'rss.littlebaby.life',
    },
    {
        value: 'rsshub.henry.wang',
        label: 'rsshub.henry.wang',
    },
    {
        value: 'rsshub.speednet.icu',
        label: 'rsshub.speednet.icu',
    },
    {
        value: 'holoxx.f5.si',
        label: 'holoxx.f5.si',
    },
    {
        value: 'hub.rss.direct',
        label: 'hub.rss.direct',
    },
    {
        value: 'rsshub.unzzz.com',
        label: 'rsshub.unzzz.com',
    },
    {
        value: 'rsshub.isrss.com',
        label: 'rsshub.isrss.com',
    },
    {
        value: 'rsshub.thzu.xyz',
        label: 'rsshub.thzu.xyz',
    },
    {
        value: 'rsshub.email-once.com',
        label: 'rsshub.email-once.com',
    },
    {
        value: 'rss.datuan.dev',
        label: 'rss.datuan.dev',
    },
]);

const findText = ref('rsshub.app');
const replaceText = ref('rsshub.rssforever.com');
const sourceText = ref('');
const outputText = computed(() => {
    const regex = new RegExp(findText.value, 'g');
    return sourceText.value.replace(regex, replaceText.value);
});

function copyToClipboard(text) {
    if (!text) {
        message.warning('没有可复制的内容！');
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        message.success('复制成功！');
    });
}
</script>

<style lang="less" scoped>
.ant-card {
    width: 1000px;
    margin: 200px auto;
}
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    background: #f9f9f9;
    padding: 10px;
    border: 1px solid #ddd;
    min-height: 50px;
}
</style>