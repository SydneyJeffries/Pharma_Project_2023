import { configureStore } from "@reduxjs/toolkit";

import PharmacySlice from "./features/PharmacySlice";

export const store = configureStore({
    reducer: {
        pharmacy: PharmacySlice
    }

});