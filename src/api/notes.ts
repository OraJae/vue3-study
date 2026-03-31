import { get } from '@/utils/http'

// 全部新闻
export const getNoteContent = params => get('/notes/getNoteText', params)
export const getNote = params => get('/notes/getNote', params)
