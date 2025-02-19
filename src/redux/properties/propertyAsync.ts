
import { createPropertyReq, getPropertyReq } from "@/services/estate.service";
import { GeneralReturnInt, PropertyBodyInt, Property, RejectedPayload, PropertyInt} from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createProperty = createAsyncThunk<GeneralReturnInt<Property>, {data : PropertyBodyInt}, {
    rejectValue : RejectedPayload
}>("property/create", async ({data}, {rejectWithValue}) =>{
    try{
        const response = createPropertyReq(data);
        return response;
    }catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Failed to create a property",
        });
    }
});
//get all properties in an estate
export const getProperty = createAsyncThunk<GeneralReturnInt<PropertyInt>, {estateId : string}, {
    rejectValue : RejectedPayload
}>("property/get", async ({estateId}, {rejectWithValue}) =>{
    try{
        const response = getPropertyReq(estateId);
        return response;
    }catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Failed to get a property",
        });
    }
})
