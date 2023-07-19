import axiosConfig from '../axiosConfig'
import axios from 'axios'
export const apiGetPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/all',
            
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetPostsLimit = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/limit`,
            params:query
           
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiUploadImages = (images) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.cloudinary.com/v1_1/dv0icndql/image/upload/`,
            data: images,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetPostsCondition = (min,max,page) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/?min=${min}&max=${max}&page=${page}`,
           
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetPostsByArea = (minArea,maxArea,page) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/filter/?minArea=${minArea}&maxArea=${maxArea}&page=${page}`,
           
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetNewPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/new-post',
            
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiGetPostsByUser = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/get-post',
            
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiCreateNewPosts = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/post/create-post',
            data: payload
            
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiUpdatePosts = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: '/api/v1/post/update',
            data: payload
            
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiDeletePost = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: '/api/v1/post/delete',
            params: {postId}
            
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})