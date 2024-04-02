import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./role";
import darkReducer from "./dark";

export default configureStore({
    reducer: {
        role: roleReducer,
        dark: darkReducer,
    }
})