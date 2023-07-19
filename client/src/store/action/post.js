import { apiGetPosts,apiGetPostsCondition,apiGetPostsLimit,apiGetPostsByArea,apiGetNewPosts, apiGetPostsByUser } from "../../services/post"
import actionTypes from "./actionType"

export const getPosts = () => async (dispatch) =>{
    try {
        const response = await apiGetPosts()
        
       if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts : response.data.response
            })
       }
       else{
            dispatch({
                type: actionTypes.GET_POSTS,
                data : response.data
            })
       }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS,
            data : null
        })
    }
}
export const getPostsLimit = (query) => async (dispatch) =>{
    try {
        const response = await apiGetPostsLimit(query)
        
       if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                posts : response.data.response?.rows,
                count : response.data.response?.count,
                filter : response.data.filter
                
            })
       }
       else{
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                msg : response.data.msg
            })
      }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT,
            posts : null
        })
    }
}
export const getPostsCondition = (min,max,page) => async (dispatch) =>{
    try {
        const response = await apiGetPostsCondition(min,max,page)
        
       if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_CONDITION,
                posts : response.data.response?.rows,
                count : response.data.response?.count,
                filter : response.data.filter
                
            })      
       }
       else{
            dispatch({
                type: actionTypes.GET_POSTS_CONDITION,
                msg : response.data.msg,
                
            })
      }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_CONDITION,
            posts :null
            
        })
    }
}
export const getPostsByArea = (min,max,page) => async (dispatch) =>{
    try {
        const response = await apiGetPostsByArea(min,max,page)
       
       if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_CONDITION_AREA,
                posts : response.data.response?.rows,
                count : response.data.response?.count,
                filter : response.data.filter
                
            })      
       }
       else{
            dispatch({
                type: actionTypes.GET_POSTS_CONDITION_AREA,
                msg : response.data.msg,
                
            })
      }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_CONDITION_AREA,
            posts :null
            
        })
    }
}
export const getNewPosts = () => async (dispatch) => {
    try {
        const response = await apiGetNewPosts()
        
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                newPosts: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                msg: response.data.msg,
                newPosts: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_POST,
            newPosts: null
        })
    }
}
export const getUserPosts = () => async (dispatch) => {
    try {
        const response = await apiGetPostsByUser()
        
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_USER_POSTS,
                posts: response.data.response?.rows,
            })
        } else {
            dispatch({
                type: actionTypes.GET_USER_POSTS,
                msg: response.data.msg,
                posts: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_USER_POSTS,
            posts: null
        })
    }
}
export const editData = (dataEdit) => ({
    type : actionTypes.GET_POST_EDIT,
    dataEdit
})
export const resetData = () => ({
    type : actionTypes.RESET_DATA,
    
})
