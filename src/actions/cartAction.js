import {
        CART_ADD_ITEM,
        CART_REMOVE_ITEM, 
        CART_SAVEPAYMENT_METHOD, 
        CART_SAVE_SHIPPING_ADDRESS 
    } from "../constants/cartConstant"
import axios from "axios"



export const addToCart = (id,quantity) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)

     dispatch({
        type : CART_ADD_ITEM,
        payload : {
            product_id: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            inStock: data.inStock,
            quantity,
        }
     })    

     localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeCartItem = (id) => (dispatch, getState) => {
    dispatch({
        type : CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    // //console.log(data)

    localStorage.setItem('shippingAddress', JSON.stringify(data))

}

export const paymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVEPAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
