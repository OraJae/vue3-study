<template>
    <div class="poster-search">
        <a-input-search class="search-input" v-model:value="keyword" placeholder="搜索电影、剧集" size="large"
            @search="onSearch" @pressEnter="onSearch">
            <template #enterButton>
                <a-button type="primary" :icon="h(SearchOutlined)">搜索</a-button>
            </template>
        </a-input-search>

        <component :is="currentComponent" :searchResult="searchResult" :posterResult="posterResult"
            :media_name="media_name" @toDetail="toDetail" @toBack="toBack" />
    </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import qs from 'qs'
import mediaList from './mediaList.vue'
import posterList from './posterList.vue'
import { ref } from 'vue'

const keyword = ref('')
const step = ref(0)

const components = [
    mediaList,
    posterList
]
const currentComponent = computed(() => components[step.value])

const searchResult = ref()

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjlmMjg1YmY2NDg3ZmZjM2EwYWJmMDhmZjVlOWY2MiIsIm5iZiI6MTczNjIxNDUwNy41NDU5OTk4LCJzdWIiOiI2NzdjODdlYjljYjA4OWUwNTE2NzIyZmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sYN62bWmwDwDAB26ydTki1-IacXMkDbISEDj3P6w4ac'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey
    }
};

onMounted(() => {
    getPopular()
})
// 获取最受欢迎的电影列表
function getPopular() {
    const params = {
        language: 'zh-CN',
        page: 1
    }
    fetch('https://api.themoviedb.org/3/movie/popular?' + qs.stringify(params), options)
        .then(res => res.json())
        .then(res => {
            searchResult.value = res.results.map(item => {
                return {
                    ...item,
                    media_type: 'movie'
                }
            })
        })
        .catch(err => console.error(err));
}

function onSearch() {
    console.log(keyword.value)
    const params = {
        query: keyword.value,
        include_adult: false,
        language: 'zh-CN',
        page: 1
    }

    fetch('https://api.themoviedb.org/3/search/multi?' + qs.stringify(params), options)
        .then(res => res.json())
        .then(res =>
            searchResult.value = res.results.filter(item => item.media_type !== 'person').map(item => {
                return {
                    ...item,
                    poster_path: item.poster_path || item.profile_path,
                }
            })
        ).finally(() => {
            step.value = 0
        })
        .catch(err => console.error(err));
}


const posterResult = ref({})
const media_name = ref('')

function toDetail({ media_type, id, name, title }) {
    const params = {
        // query: id,
        language: 'zh',
        include_adult: false,
        page: 1
    }
    let urlMap = {
        'tv': `https://api.themoviedb.org/3/tv/${id}/images?`,
        'movie': `https://api.themoviedb.org/3/movie/${id}/images?`,
        'person': ''
    }
    if (media_type === 'person') {
        return
    }
    fetch(urlMap[media_type] + qs.stringify(params), options)
        .then(res => res.json())
        .then(res => {
            posterResult.value = res
            step.value = 1
            media_name.value = name || title
        })
        .catch(err => console.error(err));
}

function toBack() {
    step.value = 0
}
</script>
<style lang="less" scoped>
.poster-search {
    width: 1200px;
    margin: 20px auto;
}

.search-input {
    width: 600px;
    margin: 0 auto;
    display: block;
}
</style>
