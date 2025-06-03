import { createSlice } from "@reduxjs/toolkit";
const ProductSlice=createSlice({
      
 name:"Cart",
 initialState:{
    items:[]
 },
 reducers:{
    addToCart:(state,action)=>{
        const item=action.payload;
        const existingItem=state.items.find(i=>i.id===item.id);
        if(existingItem){
            existingItem.quantity+=1;
        }else{
            state.items.push({...item,quantity:1})
        }
        },
         removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i.id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i.id !== id);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    }

    }
 }

)
 export const {addToCart,removeFromCart}=ProductSlice.actions;
 export default ProductSlice.reducer;