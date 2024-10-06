import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type initialStateType = {
    theme : "light" | "dark"
}

const initialState:initialStateType = {
    theme : "dark"
}

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        changeTheme:(state,action)=>{
            state.theme = action.payload;
        }
    }
})

export const getThemeState = (state:RootState) => state.theme.theme; 

export const { changeTheme } = themeSlice.actions

export default themeSlice;