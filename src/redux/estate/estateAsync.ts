import { createEstateReq } from "@/services/estate.service";
import { EstateBodyInt, EstateInt, GeneralReturnInt, RejectedPayload } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createEstate = createAsyncThunk<GeneralReturnInt<EstateInt>, {
    data : EstateBodyInt,
    adminId : string
}, {
    rejectValue : RejectedPayload
}>("estate/create",({adminId,data}, {rejectWithValue}) => {
    try {
        const response = createEstateReq(data,adminId);
        return response;
    } catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Failed to create an Estate",
        });
    }
})