
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_LOGOUT,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_DETAILS_UPDATE_REQUEST,
    USER_DETAILS_UPDATE_SUCCESS,
    USER_DETAILS_UPDATE_FAIL,
    USER_DETAILS_UPDATE_RESET,

    USERS_LIST_REQUEST,
    USERS_LIST_SUCCESS,
    USERS_LIST_FAIL,
    USERS_LIST_RESET,

    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,

    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_FAIL,

    GET_USER_DETAILS_RESET,

    GET_USER_DETAILS_UPDATE_REQUEST,
    GET_USER_DETAILS_UPDATE_SUCCESS,
    GET_USER_DETAILS_UPDATE_FAIL,
    GET_USER_DETAILS_UPDATE_RESET,

} from '../constants/userConstant'


export const userRegisterReducer = (state ={}, action) => {
    switch (action.payload) {
        case USER_REGISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESS:
            return {loading:false, userInfo: action.payload}
        case USER_REGISTER_FAIL:
            return {loading:false, error: action.payload}

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userLoginReducer = (state = {}, action ) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESS:
            return {loading:false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading:false, error: action.payload}
        
        case USER_LOGOUT:
            return {}
        
        default:
            return state
    }
}

export const userProfileReducer = (state = {user:{}}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {...state, loading:true}
        case USER_DETAILS_SUCCESS:
            return {loading:false, user : action.payload}
        case USER_DETAILS_FAIL:
            return {loading:false, error: action.payload}
        case USER_DETAILS_RESET:
            return {user:{}}
        default:
            return state
    }
}

export const userProfileUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_UPDATE_REQUEST:
            return {loading:true}
        case USER_DETAILS_UPDATE_SUCCESS:
            return {loading:false, success:true, userInfo:action.payload}
        case USER_DETAILS_UPDATE_FAIL:
            return {loading:false, error: action.payload}
        case USER_DETAILS_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

// ----------------------------------------------------------------------------------------

export const usersListReducer = (state = {users:[]}, action) => {
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return {loading:true}
        case USERS_LIST_SUCCESS:
            return {loading:false, users:action.payload}
        
        case USERS_LIST_FAIL:
            return {loading:false, error: action.payload}
        case USERS_LIST_RESET:
            return {users:[]}
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {loading:true}
        case USER_DELETE_SUCCESS:
            return {loading:false, success:true}
        
        case USER_DELETE_FAIL:
            return {loading:false, error: action.payload}
        
        default:
            return state
    }
}


export const getuserDetailReducer = (state = {getuser:{}}, action) => {
    switch (action.type) {
        case GET_USER_DETAILS_REQUEST:
            return {...state, loading:true}
        case GET_USER_DETAILS_SUCCESS:
            return {loading:false, getuser : action.payload}
        case GET_USER_DETAILS_FAIL:
            return {loading:false, error: action.payload}
        case GET_USER_DETAILS_RESET:
            return {getuser:{}}
        default:
            return state
    }
}

export const getuserUpdateReducer = (state = {user:{}}, action) => {
    switch (action.type) {
        case GET_USER_DETAILS_UPDATE_REQUEST:
            return {loading:true}
        case GET_USER_DETAILS_UPDATE_SUCCESS:
            return {loading:false, success:true}
        
        case GET_USER_DETAILS_UPDATE_FAIL:
            return {loading:false, error: action.payload}
        case GET_USER_DETAILS_UPDATE_RESET:
            return {user:{}}
        default:
            return state
    }
}


