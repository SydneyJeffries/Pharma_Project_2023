import { configureStore } from "@reduxjs/toolkit";

import PharmacySlice from "./slicers/PharmacySlice";

export const store = configureStore({
    reducer: {
        pharmacy: PharmacySlice
    }

});