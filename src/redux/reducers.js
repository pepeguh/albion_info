import { createSlice } from "@reduxjs/toolkit";
const dataSlice =createSlice({
    name:'data',
    initialState:[],
    reducers:{
        addArray:(state, action)=>{
            state.push(action.payload);
        },
        clearData:(state)=>{
            return [];
        },
    },
});
export const{addArray, clearData}=dataSlice.actions;
export default dataSlice.reducer;