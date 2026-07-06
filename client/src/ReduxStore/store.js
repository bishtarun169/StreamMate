import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "./slices/themeSlice" ; 

const stores = configureStore({
    reducer : {
        "themeSlice" : themeSliceReducer , 
    }
})

export default stores ; 