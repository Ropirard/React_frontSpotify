import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./album/albumSelector"

const store = configureStore({
    reducer: {
        // Reducers
        albums: albumReducer
    }
})

export default store;