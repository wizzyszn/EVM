import { AddTenantBodyInt, addTenantReq, getAllTenantsReq } from "@/services/estate.service";
import { GeneralReturnInt, RejectedPayload, TenantInt, UserInt } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addTenant= createAsyncThunk<GeneralReturnInt<UserInt>,{data : AddTenantBodyInt,adminId : string}, {rejectValue : RejectedPayload}>("tenant/create", async ({data,adminId}, {rejectWithValue}) =>{
    try{
        const response = addTenantReq(data,adminId);
        return response
    }catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Failed to add tenant",
        });
    }
})

export const getAllTenants= createAsyncThunk<GeneralReturnInt<TenantInt>,{adminId : string}, {rejectValue : RejectedPayload}>("tenant/get", async ({adminId}, {rejectWithValue}) =>{
    try{
        const response = getAllTenantsReq(adminId);
        return response
    }catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Failed to get all tenants",
        });
    }
})