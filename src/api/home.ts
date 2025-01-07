import { get } from '@/utils/http'

// 全部新闻
export const getPosterInfo = params => get('https://api.themoviedb.org/3/search/movie', params)
