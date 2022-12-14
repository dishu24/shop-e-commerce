import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVEPAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstant"



export const cartReducer = (state = {cartItems:[], shippingAddress:[]}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item =action.payload
            const existItem = state.cartItems.find( x => x.product_id === item.product_id)

            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map( x => x.product_id === item.product_id ? item : x)
                }
            } else{
                return{
                    ...state,
                    cartItems: [...state.cartItems,item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter( x => x.product_id !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }

        case CART_SAVEPAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        default:
            return state
    }
}

