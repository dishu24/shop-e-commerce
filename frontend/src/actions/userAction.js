import axios from 'axios'
import { ORDER_MYLIST_RESET } from '../constants/orderConstant'
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

    USER_DETAILS_UPDATE_SUCCESS,
    USER_DETAILS_UPDATE_FAIL,
    USER_DETAILS_UPDATE_REQUEST,

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

    GET_USER_DETAILS_UPDATE_REQUEST,
    GET_USER_DETAILS_UPDATE_SUCCESS,
    GET_USER_DETAILS_UPDATE_FAIL,
} from '../constants/userConstant'



export const registerAction = (username,email,name,password) => async (dispatch) => {
    try{
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/register/',{'username':username,'email':email,'name':name,'password':password},config)

        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type : USER_REGISTER_FAIL,
            payload : error.response && error.response.data.detail? error.response.data.detail : error.message
        })
    }
}



export const loginAction = (username, password) => async (dispatch) =>{
    try{
        dispatch({
            type : USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login/',{'username':username,'password':password},config)

        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type : USER_LOGIN_FAIL,
            payload : error.response && error.response.data.detail? error.response.data.detail : error.message
        })

    }
}


export const logoutAction = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_MYLIST_RESET})
    dispatch({type:USERS_LIST_RESET})
}


export const userProfileAction = () => async (dispatch,getState) => {
    try{
        dispatch({
            type:USER_DETAILS_REQUEST,
        })

        const {userLogin : {userInfo},} = getState()
        //console.log('token', userInfo.token)
        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('/api/users/profile/',config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type : USER_DETAILS_FAIL,
            payload : error.response && error.response.data.detail? error.response.data.detail : error.message
        })

    }
}


export const userProfileUpdateAction = (user) => async (dispatch,getState) => {
    try{
        dispatch({
            type: USER_DETAILS_UPDATE_REQUEST
        })

        const {userLogin: { userInfo }, } = getState()
        //console.log("before update:",userInfo.token)

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}` 
            }
        }
        const {data} = await axios.put(`/api/users/profile/update/`,user,config)
        // //console.log(data);


        dispatch({
            type: USER_DETAILS_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type : USER_DETAILS_UPDATE_FAIL,
            payload : error.response && error.response.data.detail? error.response.data.detail : error.message
        })

    }
}

// ----------------------------------------------------------------

export const usersListAction = () => async (dispatch,getState) => {
    
    try{
        dispatch({
            type: USERS_LIST_REQUEST
        })

        const {userLogin: { userInfo } } = getState()
        // //console.log("before update:",userInfo.token)

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}` 
            }
        }
        const {data} = await axios.get(`/api/users/`,config)
        // //console.log(data);


        dispatch({
            type: USERS_LIST_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type : USERS_LIST_FAIL,
            payload : error.response && error.response.data.detail? error.response.data.detail : error.message
        })

    }
}

export const userDetailsAction = (id) => async (dispatch,getState) => {
    try{
        dispatch({
            type:GET_USER_DETAILS_REQUEST,
        })

        const {userLogin : {userInfo},} = getState()
        // //console.log('token', userInfo.token)
        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/${id}/`,config)

        dispatch({
            type: GET_USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type : GET_USER_DETAILS_FAIL,
            payload : error.response && error.response.data.detail? error.response.data.detail : error.message
        })

    }
}

export const userDeleteAction = (id) => async (dispatch,getState) => {
    
    try{
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const {userLogin: { userInfo } } = getState()
        //console.log("before update:",userInfo.token)

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}` 
            }
        }
        const {data} = await axios.delete(`/api/users/delete/${id}/`,config)
        // //console.log(data);

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type : USER_DELETE_FAIL,
            payload : error.response && error.response.data.detail? error.response.data.detail : error.message
        })

    }
}

export const getuserupdateAction = (user) => async (dispatch,getState) => {
    
    try{
        dispatch({
            type: GET_USER_DETAILS_UPDATE_REQUEST
        })

        const {userLogin: { userInfo } } = getState()
        //console.log("before update:",userInfo.token)

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}` 
            }
        }
        const {data} = await axios.put(`/api/users/update/user/${user.id}/`,user,config)
        // //console.log(data);

        dispatch({
            type: GET_USER_DETAILS_UPDATE_SUCCESS
            
        })

        dispatch({
            type: GET_USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type : GET_USER_DETAILS_UPDATE_FAIL,
            payload : error.response && error.response.data.detail? error.response.data.detail : error.message
        })

    }
}