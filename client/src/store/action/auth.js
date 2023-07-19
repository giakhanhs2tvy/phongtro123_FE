import { apiLogin, apiRegister } from '../../services/auth'
import actionTypes from  './actionType'

export const register = (payload) => async (dispatch) =>{
    try {
        const response = await apiRegister(payload)
        console.log(response)
       if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data : response.data
            })
       }
       else{
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data : response.data
            })
       }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data : null
        })
    }
}
export const login = (payload) => async (dispatch) =>{
    try {
        const response = await apiLogin(payload)
        console.log(response)
       if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data : response.data
            })
       }
       else{
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data : response.data
            })
       }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data : null
        })
    }
}
export const logout = () => ({
    type: actionTypes.LOGOUT
})