import actionTypes from "../action/actionType";

const initState = {
    isLoggIn: false,
    token:null,
    msg : ''
}
const authReducer = (state = initState,action) =>{
    switch(action.type){
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
        
            return{
                ...state,
                isLoggIn:true,
                token:action.data.token,
                msg: ''
            }
        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:    
            return{
                    ...state,
                    isLoggIn:false,
                    token:null,
                    msg: action.data.msg
                }
        case actionTypes.LOGOUT:
            return{
                ...state,
                    isLoggIn:false,
                    token:null,
                    msg: ''
            }
        default:
            return state;
    }
}
export default authReducer;