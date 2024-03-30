import { createSlice } from "@reduxjs/toolkit";


const roleStore = createSlice({
    name: "role",
    initialState: {
        token: localStorage.getItem('token') || '',
        roleInfo: JSON.parse(localStorage.getItem('role')) || {}
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            localStorage.setItem('token', action.payload)
        },
        setRoleInfo(state, action) {
            state.roleInfo = action.payload
            localStorage.setItem('role', JSON.stringify(action.payload))
        },
        clearRole(state) {
            state.token = ''
            state.roleInfo = {}
            localStorage.removeItem('token')
        }
    }
})

export const { setToken, setRoleInfo, clearRole } = roleStore.actions
const roleReducer = roleStore.reducer
export default roleReducer