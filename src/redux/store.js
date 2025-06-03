import { configureStore } from "@reduxjs/toolkit";
import productReducer from './cartSlice.js'
const store=configureStore({
    
 reducer:{
    cart:productReducer,
 }

});
export default store;