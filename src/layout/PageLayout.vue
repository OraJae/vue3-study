<!--
 * @Date: 2023-11-30 08:35:32
 * @LastEditors: 王子豪 2579405338@qq.com
 * @LastEditTime: 2023-12-14 16:13:54
 * @Description: 
-->
<!--
 * @Date: 2023-11-23 10:41:39
 * @LastEditors: 王子豪 2579405338@qq.com
 * @LastEditTime: 2023-11-30 15:57:01
 * @Description: 
-->
<template>
    <div class="page-layout" :class="{ fixed: fixed }">
        <!-- 标题栏 -->
        <slot name="title">
            <div class="page-layout-title" v-if="title" :style="{ background: showTitleBg }" ref="titleRef">
                {{ title }}
                <div class="back" @click="backTo" v-if="showBack">
                    <van-icon name="arrow-left" />
                </div>
                <div class="right">
                    <slot name="title-right" v-bind="{ backTo }"></slot>
                </div>
            </div>
        </slot>
        <!-- 固定头部 -->
        <div class="page-fix-header">
            <slot name="header"></slot>
        </div>
        <div class="page-body" ref="bodyRef">
            <!-- 中间部分 -->
            <div class="page-content" ref="contentRef">
                <slot></slot>
            </div>
            <!-- 活动固定底部 -->
            <div class="page-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useScroll, useElementSize } from '@vueuse/core'

defineOptions({
    name: 'PageLayout',
})

const props = defineProps({
    title: String,
    titleBg: {
        type: String,
        default: '#fff',
    },
    showBack: {
        type: Boolean,
        default: true,
    },
    close: null,
    fixed: {
        type: Boolean,
        default: false,
    },
})

const titleRef = ref()

const contentRef = ref()

const bodyRef = ref()

// 页面滚动高度
const { y } = useScroll(props.fixed ? contentRef : bodyRef)

// 标题高度
const { height } = useElementSize(titleRef)

// 标题背景颜色
const showTitleBg = computed(() => {
    if (props.titleBg && props.titleBg !== 'transparent') {
        return props.titleBg
    } else {
        return 'rgba(255,255,255, ' + y.value / height.value + ')'
    }
})

const router = useRouter()

const backTo = function () {
    console.log(props.close)

    if (props.close !== undefined) {
        props.close()
    } else {
        router.go(-1)
    }
}
</script>

<style lang="less" scoped>
.page-layout {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    &.fixed {
        .page-content {
            flex: 1;
            min-height: 0;
            overflow: auto;
        }
    }
    &-title {
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: PingFangSC-Medium;
        font-weight: 600;
        font-size: 16px;
        color: #2a2e40;
        line-height: 24px;
        position: relative;
        .back {
            position: absolute;
            left: 16px;
            font-size: 24px;
            cursor: pointer;
        }
        .right {
            position: absolute;
            right: 16px;
        }
    }
}
.page-body {
    flex: 1;
    min-height: 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
}
.page-footer {
    margin-top: auto;
    :deep(.footer) {
        border-top: 1px solid #f2f4f7;
        margin-top: auto;
        width: 100%;
        background: #fff;
        padding: 8px 16px;
        display: flex;
        .button {
            flex: 1;
            min-width: 0;
            + .button {
                margin-left: 12px;
            }
        }
    }
}
</style>
