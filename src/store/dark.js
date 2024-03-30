import { createSlice } from "@reduxjs/toolkit";

const darkStore = createSlice({
    name: "dark",
    initialState: {
        isDarkMode: false
    },
    reducers: {
        setDarkMode(state, action) {
            state.isDarkMode = action.payload
        }
    }
})

export const { setDarkMode } = darkStore.actions
const darkReducer = darkStore.reducer
export default darkReducer