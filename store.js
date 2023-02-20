import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import restaurantReducer from "./features/restaurantSlice";
export const store = configureStore({
  reducer: {
    // so connecting the basketSlice and restaurant to the global store so that redux knows about it..
    basket: basketReducer,
    restaurant: restaurantReducer,
  },
});
