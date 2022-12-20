import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import { useDispatch as useDispatchBase } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist"

const persisConfigure = {
    key: "persist-cart",
    storage
}
const persistedReducer = persistReducer(persisConfigure,cartReducer)
export const store = configureStore({
    reducer:{
        Cart: persistedReducer
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useDispatch = () => useDispatchBase<AppDispatch>();
export const persistor = persistStore(store)  