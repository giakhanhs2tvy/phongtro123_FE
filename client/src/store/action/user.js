import { apiGetCurrent } from "../../services/user"
import actionTypes from "./actionType"

export const getCurrent = () => async (dispatch) =>{
    try {
        const response = await apiGetCurrent()
        console.log(response)
       if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CURRENT,
                currentUser : response.data.response
            })
       }
       else{
            dispatch({
                type: actionTypes.GET_CURRENT,
                currentUser : response.data,
                msg: response.data.msg
            })
       }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentUser : null,
            msg: error
        })
    }
}