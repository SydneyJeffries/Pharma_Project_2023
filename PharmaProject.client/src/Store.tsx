import { configureStore } from "@reduxjs/toolkit"
import PharmacyListSlice from "./features/PharmacyListSlice"
import PharmacySlice from "./features/PharmacySlice"

export const store = configureStore({
    reducer: {
        pharmacys: PharmacyListSlice,
        pharmacy: PharmacySlice
    }

});