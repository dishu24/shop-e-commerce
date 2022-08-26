import thunk from "redux-thunk";
import  {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'
import { combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductListReducer, ProductReducer,ProductCreateReducer,topProductReducer,ProductReviewCreateReducer,ProductUpdateReducer,ProductDeleteReducer } from "./reducers/productReducer";
import { userLoginReducer,getuserDetailReducer,getuserUpdateReducer, userRegisterReducer, userProfileReducer,userProfileUpdateReducer,userDeleteReducer, usersListReducer} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderCreateReducer, orderMyListReducer, orderDetailsReducer,ordersReducer , orderDeliverReducer} from "./reducers/orderReducer";

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';


const reducers = combineReducers({
    productsList:ProductListReducer,
    productDetail:ProductReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userProfile:userProfileReducer,
    userProfileUpdate:userProfileUpdateReducer,
    usersList:usersListReducer,
    orderCreate:orderCreateReducer,
    orderMyList:orderMyListReducer,
    orderDetails:orderDetailsReducer,
    userDelete:userDeleteReducer,
    getuserDetail:getuserDetailReducer,
    getuserUpdate:getuserUpdateReducer,
    ProductDelete:ProductDeleteReducer,
    ProductCreate:ProductCreateReducer,
    ProductUpdate:ProductUpdateReducer,
    Orders:ordersReducer,
    orderDeliver:orderDeliverReducer,
    ProductReviewCreate:ProductReviewCreateReducer,
    topProducts:topProductReducer,
})

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, reducers)

const localStorageCartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfostorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {

    cart:{
       
        cartItems:localStorageCartItems,
        shippingAddress: shippingAddressStorage,
        
    },
    userLogin: {userInfo : userInfostorage}, 
}

// //console.log('state',initialState);

const middleware = [thunk]

const store = configureStore({
    reducer:persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })},initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store

export const persistor = persistStore(store)