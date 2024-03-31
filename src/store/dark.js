import { createSlice } from "@reduxjs/toolkit";

const darkStore = createSlice({
    name: "dark",
    initialState: {
        isDarkMode: localStorage.getItem('dark') === '1' ? true : false || false
    },
    reducers: {
        setDarkMode(state, action) {
            state.isDarkMode = action.payload
            if (action.payload)
                localStorage.setItem('dark', 1)
            else
                localStorage.setItem('dark', 0)

        }
    }
})

export const { setDarkMode } = darkStore.actions
const darkReducer = darkStore.reducer
export default darkReducer