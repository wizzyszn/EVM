
import { StorageKeysEnum, UserInt } from "@/types";
import { createSlice} from "@reduxjs/toolkit";
import { signIn, signUp } from "./userAsync";
import { Storages } from "@/lib/helpers";


interface InitialStateInt {
    userInfo : UserInt | null,
    isAuthLoading : boolean,
    isAuthenticated : boolean
}

const initialState: InitialStateInt = {
    userInfo : null,
    isAuthLoading : false,
    isAuthenticated : false
   };

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers :{
    },
    extraReducers : (builder) =>{
        builder
        .addCase(signUp.pending, (state) =>{
            state.isAuthLoading = true
        })
        .addCase(signUp.rejected, (state) =>{
            state.isAuthLoading = false
        })
        .addCase(signUp.fulfilled, (state,action) =>{
            state.isAuthLoading = false;
            state.userInfo = action.payload.data
        })
        .addCase(signIn.fulfilled, (state,action) =>{
            if(!action.payload.data.user.estate){
                
            }
            state.isAuthLoading = false;
            state.userInfo = action.payload.data;
            state.isAuthenticated = action.payload.data.user.authenticated;
            Storages.setStorage('local', StorageKeysEnum.user,action.payload.data);
            Storages.setStorage('local', StorageKeysEnum.isAuthenticated, action.payload.data.user.authenticated
            );
            
        })
        .addCase(signIn.pending, (state) =>{
            state.isAuthLoading = true
        })
        .addCase(signIn.rejected, (state) =>{
            state.isAuthLoading = false
        })
    }
});

export default userSlice.reducer;
