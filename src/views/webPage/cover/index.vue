<template>

    <a-layout class="container">
        <a-layout-sider width="400" class="side">

            <a-upload v-model:fileList="fileList" name="file" :showUploadList="false" :accept="'.jpg,.png,.jpeg,.webp'"
                multiple :customRequest="customRequest">
                <a-button>
                    <upload-outlined></upload-outlined>
                    上传电影封面
                </a-button>
            </a-upload>

            <a-typography-title :level="5" style="margin-top: 20px;">图片列表</a-typography-title>
            <div class="dragWrapper">
                <a-empty :image="simpleImage" v-if="coverList.length == 0" />
                <VueDraggable v-model="coverList" v-else :animation="300" target=".sort-target"
                    @start="isDragging = true" @end="isDragging = false">
                    <TransitionGroup type="transition" tag="div" :name="!isDragging ? 'fade' : undefined"
                        class="sort-target ">
                        <span v-for="item in coverList" :key="item.key" class="dragItem">
                            <img :src="item.url" alt="">
                            <a-icon type="close" @click="coverList.splice(coverList.indexOf(item), 1)"
                                style="position: absolute; top: 0; right: 0; cursor: pointer;" />

                            <CloseOutlined @click="removeItem(item)" class="close-icon" />
                        </span>
                    </TransitionGroup>
                </VueDraggable>
            </div>

            <a-form style="margin-top: 20px;">
                <a-form-item label="媒体库中文名">
                    <a-input v-model:value="titleValue" placeholder="请填写" />
                </a-form-item>
                <a-form-item label="媒体库英文名">
                    <a-input v-model:value="subTitleValue" placeholder="请填写" />
                </a-form-item>
                <a-form-item label="背景色(渐变)">
                    <a-input v-model:value="bgColor" placeholder="请填写" />
                </a-form-item>
            </a-form>


        </a-layout-sider>
        <a-layout>
            <a-layout-content class="content">
                <a-button :loading="downloading" type="primary" class="export-btn" @click="downloadImage">
                    <template #icon>
                        <DownloadOutlined />
                    </template>
                    导出png
                </a-button>
                <div class="bg" id="bg">
                    <h1 class="title">{{ titleValue }}</h1>
                    <h2 class="subTitle">{{ subTitleValue }}</h2>
                    <div class="cover-box">
                        <div class="cover" v-for="item in coverList" :key="item.key">
                            <img :src="item.url" alt="">
                        </div>
                    </div>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import type { UploadChangeParam } from 'ant-design-vue';
import { VueDraggable } from 'vue-draggable-plus'
import { Empty } from 'ant-design-vue';
import { UploadOutlined, CloseOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import * as htmlToImage from 'html-to-image';
import { downloadFile } from "@/utils/util";

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const fileList = ref([]);

const coverList = ref([])
const isDragging = ref(false)
// 将上传文件转换为base64
function customRequest(info: UploadChangeParam) {
    if (info) {
        const file = info.file;
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            const src = e.target.result as string;
            coverList.value.push({
                name: file.name,
                url: src,
                id: Date.now(),
            })
            console.log(coverList.value)
        }
        fileReader.readAsDataURL(file)
    }
}
// 删除图片项
function removeItem(item: any) {
    coverList.value = coverList.value.filter((item2: any) => item2.id !== item.id)
}

const titleValue = ref('电视剧')
const subTitleValue = ref('TV play')
const bgColor = ref('linear-gradient(135deg, #fce38a, #f38181)')

// 监听bgColor
watch(bgColor, (newVal) => {
    document.getElementById('bg')!.style.background = newVal
})

// 导出图片
const downloading = ref(false)
function downloadImage() {
    downloading.value = true;
    var node = document.getElementById('bg');
    console.log(htmlToImage)
    htmlToImage.toPng(node)
        .then(function (dataUrl) {
            downloadFile(dataUrl, `${titleValue.value}_${Date.now()}.png`)
        }).finally(() => {
            downloading.value = false;
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
}

</script>
<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
}

.side {
    height: 100%;
    background-color: #fff;
    padding: 12px;

    .dragWrapper {
        overflow: hidden;
        border: 1px solid #e0e0e0;
        padding: 6px;
    }

    .sort-target {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 6px;
    }

    .dragItem {
        cursor: move;
        width: 100%;
        height: 160px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;

            &:hover {
                transform: scale(1.2);
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
            }
        }

        .close-icon {
            position: absolute;
            top: 6px;
            right: 6px;
            cursor: pointer;
            font-size: 24px;
        }
    }
}

.content {
    width: 100%;
    height: 100%;
    overflow: scroll;
    display: flex;
    justify-content: center;
    align-items: center;

    .export-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 100;
    }

    .bg {
        position: relative;
        flex-wrap: nowrap;
        width: 1280px;
        height: 720px;
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #fce38a, #f38181);
        overflow: hidden;
    }

    .title {
        position: absolute;
        top: 50%;
        left: 5%;
        font-size: 100px;
        transform: translate(0, -50%);
        color: #fff;
        text-shadow: 1px -1px #fff, -1px 1px #999, -5px 5px 3px #80808080;
    }

    .subTitle {
        position: absolute;
        top: 50%;
        left: 5%;
        font-size: 42px;
        font-family: Maves;
        transform: translate(0, 60px);
        color: #fff;
        text-shadow: 1px -1px #fff, -1px 1px #999, -5px 5px 3px #80808080
    }


    .cover-box {
        width: 60%;
        position: absolute;
        right: 0;
        top: 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        transform: translate(18%, -10%) rotate(15deg);


        .cover {
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 1px -1px #fff, -1px 1px #999, -3px 3px 5px #69686880;

            &:nth-child(3n+2) {
                transform: translateY(-70px);
            }

            &:nth-child(3n+3) {
                transform: translateY(-140px);
            }

            img {
                object-fit: cover;
                width: 100%;
                height: 100%;

            }
        }


    }
}
</style>
