
import { UserInt } from "@/types";
import { createSlice} from "@reduxjs/toolkit";
import { addTenant, getAllTenants } from "./tenantAsync";

interface InitialStateInt {
    tenant : UserInt | null,
    tenants : UserInt["user"][],
    loading : {
        get : boolean,
        create : boolean,
        delete : boolean
    }
}

const initialState: InitialStateInt = {
    tenant : null,
    tenants : [],
    loading : {
        get : false,
        create : false,
        delete : false
    }
   };

export const tenantSlice = createSlice({
    name: "tenant",
    initialState,
    reducers :{
    },
    extraReducers : (builder) =>{
        builder
        .addCase(addTenant.pending,(state) =>{
            state.loading.create = true
        })
        .addCase(addTenant.rejected,(state) =>{
            state.loading.create = false
        })
        .addCase(addTenant.fulfilled,(state,action) =>{
            state.loading.create = false;
            state.tenant = action.payload.data
        })
        .addCase(getAllTenants.fulfilled,(state,action) =>{
            state.loading.get = false;
            state.tenants = action.payload.data.tenants
        })
        .addCase(getAllTenants.pending,(state) =>{
            state.loading.get = true;
        })
        .addCase(getAllTenants.rejected,(state) =>{
            state.loading.get = false;
        })
    }
});

export default tenantSlice.reducer;
