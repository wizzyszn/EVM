import { Property } from "@/types";
import { createSlice} from "@reduxjs/toolkit";
import { createProperty, getProperty } from "./propertyAsync";

interface InitialStateInt {
    properties : Property[];
    property : Property | null;
    loading : {
        create : boolean,
        get : boolean,
        update : boolean,
        delete : boolean
    }
}

const initialState: InitialStateInt = {
    properties : [],
    loading : {
        create : false,
        get : false,
        update : false,
        delete : false
    },
    property : null
   };

export const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers :{
    },
    extraReducers : (builder) =>{
        builder
        .addCase(createProperty.pending, (state) => {
            state.loading.create = true;
        })
        .addCase(createProperty.rejected, (state) => {
            state.loading.create = false;
        })
        .addCase(createProperty.fulfilled, (state,action) => {
            state.loading.create = false;
            state.property = action.payload.data
        })
        .addCase(getProperty.pending, (state) => {
            state.loading.get = true;
        })
        .addCase(getProperty.rejected, (state) => {
            state.loading.get = false;
        })
        .addCase(getProperty.fulfilled, (state,action) => {
            state.properties = action.payload.data.properties;
            state.loading.get = false;
        })
    }
});

export default propertySlice.reducer;
