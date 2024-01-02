import { configureStore } from "@reduxjs/toolkit";

import PharmacySlice from "./slicers/PharmacySlice";
import DeliverySlice from "./slicers/DeliverySlice";

export const store = configureStore({
    reducer: {
        pharmacy: PharmacySlice,
        delivery: DeliverySlice,
    }

});