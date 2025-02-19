import { SignInBodyInt, signInReq, SignUpBodyInt, sigupReq } from "@/services/estate.service";
import { GeneralReturnInt, RejectedPayload, UserInt } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk<GeneralReturnInt<UserInt>, {data : SignUpBodyInt}, {
    rejectValue : RejectedPayload
}>("user/register", async ({data}, {rejectWithValue}) =>{
    try{
        const response = sigupReq(data);
        return response;
    }catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Failed to signup",
        });
    }
})
export const signIn = createAsyncThunk<GeneralReturnInt<UserInt>, {data : SignInBodyInt}, {
    rejectValue : RejectedPayload
}>("user/login", async ({data}, {rejectWithValue}) =>{
    try{
        const response = signInReq(data);
        return response;
    }catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Failed to login",
        });
    }
})