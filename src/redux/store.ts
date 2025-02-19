import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./user/userSlice";
import propertyReducer from "./properties/propertySlice";
import tenantReducer from "./tenant/tenantSlice";
import estateReducer from "./estate/estateSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        property : propertyReducer,
        tenant : tenantReducer,
        estate : estateReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
