import {    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
            ORDER_MYLIST_FAIL, ORDER_MYLIST_REQUEST, ORDER_MYLIST_SUCCESS,
            ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAIL,
            ORDER_DELIVER_REQUEST,ORDER_DELIVER_SUCCESS,ORDER_DELIVER_FAIL,
            ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL
} from "../constants/orderConstant";
import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/cartConstant";

export const orderCreate = (order) => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {userLogin: {userInfo},} = getState()
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post('/api/orders/create/',order,config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload : data
        })

        localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch({
            type : ORDER_CREATE_FAIL,
            payload : error.response && error.response.data.detail? error.response.data.detail : error.message
        })

    }
}

export const orderMyList = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_MYLIST_REQUEST
        })

        const {userLogin: {userInfo},} = getState()
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('/api/orders/myorders/',config)

        dispatch({
            type: ORDER_MYLIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type : ORDER_MYLIST_FAIL,
            payload : error.response && error.response.data.detail? error.response.data.detail : error.message
        })

    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    
    try{
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        const {userLogin: { userInfo }, } = getState()
        //console.log("before update:",userInfo.token)

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/${id}`,config)
        // //console.log(data)


        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type : ORDER_DETAILS_FAIL,
            payload : error.response && error.response.data.detail? error.response.data.detail : error.message
        })

    }
}

export const ordersList = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_REQUEST
        })

        const {userLogin: {userInfo},} = getState()
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('/api/orders/',config)

        dispatch({
            type: ORDER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type : ORDER_FAIL,
            payload : error.response && error.response.data.detail? error.response.data.detail : error.message
        })

    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/${order._id}/delivered/`,
            {},
            config
        )

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}