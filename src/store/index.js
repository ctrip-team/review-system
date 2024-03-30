import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./user";
import darkReducer from "./dark";

export default configureStore({
    reducer: {
        role: roleReducer,
        dark: darkReducer,
    }
})