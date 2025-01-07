<template>
    <div class="back" @click="toBack">
        <ArrowLeftOutlined />
        <span>返回搜索结果页</span>
    </div>
    <a-radio-group v-model:value="picType">
        <a-radio-button value="posters">封面({{ posterResult.posters?.length || 0 }})</a-radio-button>
        <a-radio-button value="backdrops">背景({{ posterResult.backdrops?.length || 0 }})</a-radio-button>
        <a-radio-button value="logos">logos({{ posterResult.logos?.length || 0 }})</a-radio-button>
    </a-radio-group>
    <div class="cover-list">
        <a-card v-for="item in posterList" :key="item.id">
            <!-- 鼠标经过显示蒙版，蒙版上放置下载按钮 -->
            <div class="mask">
                <a-button type="primary" shape="circle" size="large" :icon='h(EyeOutlined)'
                    @click="viewBigPicture(item)" />
                <a-button type="primary" shape="circle" size="large" :icon='h(DownloadOutlined)'
                    @click="download(item)" />
            </div>
            <img :src="'https://image.tmdb.org/t/p/w500' + item.file_path" class="media-pic" />
            <span style="margin-left: 4px;">{{ item.width }}×{{ item.height }}</span>
        </a-card>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeftOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
import { downloadFile } from '@/utils/util'
const props = defineProps<{
    posterResult,
    media_name: string
}>()

watch(
    () => props.posterResult,
    () => {

    },
    { immediate: true }
)

const picType = ref('posters')
const posterList = computed(() => props.posterResult[picType.value])

const emit = defineEmits(['toBack'])

function toBack() {
    emit('toBack')
}

function viewBigPicture(item) {
    window.open('https://image.tmdb.org/t/p/original' + item.file_path)
}

function download(item) {
    console.log('下载')
    let fileType = item.file_path.split('.').pop()
    downloadFile('https://image.tmdb.org/t/p/original' + item.file_path, `${props.media_name}_${picType.value}_${Date.now()}.${fileType}`)
}
</script>
<style lang="less" scoped>
.back {
    font-size: 16px;
    cursor: pointer;
    margin: 12px 0;
}

.cover-list {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;

    :deep(.ant-card-body) {
        padding: 0;
        width: 100%;
        height: 100%;


    }

    .media-pic {
        width: 100%;
        height: calc(100% - 32px);
        object-fit: cover;
        background-color: #0000001a;
    }

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.3s;

        &:hover {
            opacity: 1;
        }

        .ant-btn {
            cursor: pointer;
            margin: 0 6px;
            background-color: #c7cbd16b;
        }

    }

}
</style>
