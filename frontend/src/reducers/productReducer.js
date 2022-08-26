import { PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL, 
    PRODUCT_CREATE_RESET,
    
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL, 
    PRODUCT_UPDATE_RESET,

    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,

    TOP_PRODUCTS_FAIL,
    TOP_PRODUCTS_REQUEST,
    TOP_PRODUCTS_SUCCESS
} from "../constants/productConstant"
import { PRODUCT_FAIL, PRODUCT_SUCCESS, PRODUCT_REQUEST, PRODUCT_DELETE_FAIL,PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS } from "../constants/productConstant"


export const ProductListReducer = (state= {products:{} }, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true, products:[]}
        case PRODUCT_LIST_SUCCESS:
            return {
                    loading:false,
                    products:action.payload.products,
                    page:action.payload.page,
                    pages:action.payload.pages
                }
        case PRODUCT_LIST_FAIL:
            return {loading:false, error:action.payload}
        
        default:
            return state
    }
}

export const ProductReducer = (state = {product:{reviews:[]}}, action) => {
    switch(action.type){
        case PRODUCT_REQUEST:
            return {loading:true, ...state}
        case PRODUCT_SUCCESS:
            return { loading:false, product: action.payload}
        case PRODUCT_FAIL:
            return {loading:false, error: action.payload}
        
        default:
            return state
}

}


export const ProductDeleteReducer = (state= {}, action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading:true}
        case PRODUCT_DELETE_SUCCESS:
            return {loading:false, success:true}
        case PRODUCT_DELETE_FAIL:
            return {loading:false, error:action.payload}
        
        default:
            return state
    }
}

export const ProductCreateReducer = (state= {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading:true}
        case PRODUCT_CREATE_SUCCESS:
            return {loading:false, success:true, product:action.payload}
        case PRODUCT_CREATE_FAIL:
            return {loading:false, error:action.payload}
        case PRODUCT_CREATE_RESET:
            return {}
        
        default:
            return state
    }
}

export const ProductUpdateReducer = (state= {product:{}}, action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading:true}
        case PRODUCT_UPDATE_SUCCESS:
            return {loading:false, success:true, product:action.payload}
        case PRODUCT_UPDATE_FAIL:
            return {loading:false, error:action.payload}
        case PRODUCT_UPDATE_RESET:
            return {   product:{}}
        
        default:
            return state
    }
}

export const ProductReviewCreateReducer = (state= {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading:true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading:false, success:true}
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading:false, error:action.payload}
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        
        default:
            return state
    }
}

export const topProductReducer = (state= {topproducts:[]}, action) => {
    switch(action.type){
        case TOP_PRODUCTS_REQUEST:
            return {loading:true}
        case TOP_PRODUCTS_SUCCESS:
            return {loading:false, topproducts:action.payload}
        case TOP_PRODUCTS_FAIL:
            return {loading:false, error:action.payload}
        
        default:
            return state
    }
}