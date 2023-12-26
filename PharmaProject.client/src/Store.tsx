import { configureStore } from "@reduxjs/toolkit"
import PharmacySlice from "./features/PharmacyListSlice"

export const store = configureStore({
    reducer: {
        pharmacys: PharmacySlice,
    }

});