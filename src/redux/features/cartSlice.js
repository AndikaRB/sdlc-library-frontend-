import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemTocart: (state, action) => {
            state.data.push(action.payload)
        },
        fillCart: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { addItemTocart, fillCart } = cartSlice.actions
export default cartSlice.reducer