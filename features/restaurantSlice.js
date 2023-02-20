import { createSlice } from "@reduxjs/toolkit";
// we are creating this restaurant slice because we want to capture all the details about the restaurant when we are on the restaurant screen so we can use it later or we can use it on any other screen..
const initialState = {
  // the initial state of this global store area will be the restaurant props with all the fields as null.
  restaurant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
    long: null,
    lat: null,
  },
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  //   reducers allows us to modify the global store
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
//these action creators can be used to dispatch actions outside
export const { setRestaurant } = restaurantSlice.actions;
//Creating a selector which will allow us to access the global store and pull out the restaurant details from this slice....
export const selectRestaurant = (state) => state.restaurant.restaurant;

export default restaurantSlice.reducer;
