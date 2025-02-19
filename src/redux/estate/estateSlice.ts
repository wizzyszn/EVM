import { createSlice} from "@reduxjs/toolkit";
import { createEstate } from "./estateAsync";
interface InitialStateInt {
 loading: {
    create : boolean
 }
}

const initialState: InitialStateInt = {
    loading : {
        create : false
    }
   };

export const estateSlice = createSlice({
    name: "property",
    initialState,
    reducers :{
    },
    extraReducers : (builder) =>{
        builder
        .addCase(createEstate.pending,(state) =>{
            state.loading.create = true
        })
        .addCase(createEstate.rejected,(state) =>{
            state.loading.create = false
        })
        .addCase(createEstate.fulfilled,(state) =>{
            state.loading.create = false
        })
    }
});

export default estateSlice.reducer;
