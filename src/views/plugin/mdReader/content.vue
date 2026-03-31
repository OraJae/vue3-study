<template>
    <div id="root" class="ne-doc-major-editor"></div>
</template>

<script setup lang="ts">
const props = defineProps<{ text: string }>();

watch(
    () => props.text,
    () => {
        const { createOpenViewer } = window.Doc;
        // 创建阅读器
        const viewer = createOpenViewer(document.getElementById('root'), {
            toc: {
                enable: true,
            },
        });
        // 设置内容
        viewer.setDocument('text/lake', props.text);
    }
);
</script>
<style lang='less' scoped>
#root {
    // width: 100%;
    // height: 100%;
    box-sizing: border-box;
    padding: 12px 32px;
    position: relative;
    width: calc(100% - 320px);
}
:deep(.ne-doc-major-editor) {
}
:deep(.ne-viewer-toc-sidebar) {
    right: 6px !important;
}
</style>
