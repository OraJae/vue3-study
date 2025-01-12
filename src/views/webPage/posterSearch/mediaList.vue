<template>
    <div class="search-result">
        <a-card v-for="item in searchResult" :key="item.id" class="search-result-item" hoverable
            @click="toDetail(item)">
            <a-flex justify="space-between">
                <img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" class="media-pic" />
                <div class="media-info">
                    <div class="title">{{ item.title || item.name }}</div>
                    <div class="overview" :title="item.overview">{{ item.overview }}</div>
                </div>
            </a-flex>
        </a-card>
    </div>
</template>

<script setup lang="ts">

interface MediaItem {
    id: number;
    poster_path: string;
    name: string;
    title: string;
    // original_name: string;
    // original_title: string;
    overview: string;
}

defineProps<{
    searchResult: MediaItem[];
}>()

const emit = defineEmits(['toDetail'])
function toDetail(item: MediaItem) {
    emit('toDetail', item)
}
</script>
<style lang="less" scoped>
.search-result {
    margin: 20px auto;
    width: 1200px;
    display: grid;
    // 每项占25%宽度
    grid-template-columns: repeat(3, 1fr);
}

.search-result-item {
    margin: 20px;

    .media-pic {
        width: 100px;
    }

    .media-info {
        padding: 0 20px;
    }

    .title {
        font-size: 20px;
        color: #333;
        line-height: 20px;
    }

    .overview {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        font-size: 14px;
        color: #666;
        margin-top: 12px;
        line-height: 1.5em;
    }
}
</style>
