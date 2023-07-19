import actionTypes from "../action/actionType";
const initState = {
    posts: [],
    msg: '',
    count: 0,
    newPosts: [],
    postOfUser: [],
    dataEdit : null,
   
    filter: false
}

const postReducer = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.GET_POSTS:
        case actionTypes.GET_POSTS_LIMIT:
        case actionTypes.GET_POSTS_CONDITION:
        case actionTypes.GET_POSTS_CONDITION_AREA:
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0,
                filter: action.filter || false

            }

        case actionTypes.GET_NEW_POST:
            return {
                ...state,
                newPosts: action.newPosts || [],
                msg: action.msg || '',

            }
        case actionTypes.GET_USER_POSTS:
            return {
                ...state,
                postOfUser: action.posts || [],
                msg: action.msg || ''
            }
        case actionTypes.GET_POST_EDIT:
            return{
                ...state,
                dataEdit : action.dataEdit || null,
                msg :action.msg || ''
            }
        case actionTypes.RESET_DATA:
            return{
                ...state,
                dataEdit : null
            }
        default:
            return state;
    }
}
export default postReducer