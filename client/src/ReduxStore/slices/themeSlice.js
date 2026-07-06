import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name : "themeSlice", 
    initialState : {
        theme : "dark"
    },

    reducers : {
        toggleTheme : (state, action) => {
                state.theme = action.payload;
         }
    }
})


export default themeSlice.reducer ;  
export const {toggleTheme} = themeSlice.actions ; 