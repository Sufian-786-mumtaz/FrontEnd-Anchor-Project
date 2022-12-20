import { createSlice } from "@reduxjs/toolkit"
import persistReducer from "redux-persist/es/persistReducer";
const initialState = {
    cartItems: [], 
    users:[]
}
const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers:{
        addToCart(state, action){
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)
            if(itemIndex >= 0){
                state.cartItems[itemIndex].quantity += action.payload.quantity 
            }else{
                state.cartItems.push(action.payload)
            }
            
        },
        removeToCart(state, action){
            const remItem = state.cartItems.filter(
                item => item._id !== action.payload._id);
                state.cartItems = remItem
        },
        addUsers(state, action){
             state.users.push(action.payload)
        },
        resetCart(state){
            state.cartItems = []
        },
        logOut(state){
            state.cartItems = [];
            state.users = [];
        },
    }
});

export const {addToCart, removeToCart,addUsers, logOut,resetCart}  = cartSlice.actions
export default cartSlice.reducer 