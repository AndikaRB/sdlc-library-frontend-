import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/authSlice"
import cartSlice from "./features/cartSlice"
import transactionSlice from "./features/transactionSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice,
        transaction: transactionSlice
    }
})