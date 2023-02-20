import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // the initial state of this global store area will be an empty array
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  //   reducers allows us to modify the global store
  reducers: {
    addToBasket: (state, action) => {
      // So here when we get the message addtobasket, keep whatever is in the current basket but also add whatever the payload is {note: The payload comes along with the action...}
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      //Here we'll be creating a logic that's going to find if the items that i am trying to remove is inside there using the id of the item..
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      //since we cannot manipulate the direct object itself, we'll create a copy of the basket inside of the removeFromBasket action and
      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `can't remove product (id: ${action.payload.id}) as it's not in basket`
        );
      }

      //now we'll replace the existing basket with the new basket..
      state.items = newBasket;
    },
    //clearing the array in order to return a new empty array i.e to clear the items in the basket in order for the basket to be empty
    clearList: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
//these action creators can be used to dispatch actions outside
export const { addToBasket, removeFromBasket, clearList } = basketSlice.actions;
//Creating a selector which will allow us to access the global store and pull the items from the basket out.....
export const selectBasketItems = (state) => state.basket.items;
//Creating a helper selector function that helps to rectify the issue that occurred when adding a dish item to the basket.. when the add button is clicked for a specific  dish it affects other dishes that weren't added too..automatically other dishes gets added too..The filter function helps to only get the dish and add the dish that was clicked/added to the basket..i.e going through every dish item and filter out the items that matches the id that i gave it..it will return an array only with the items of the id that is specified...
export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

//In order to get the total/accumulated value/price of the items in our basket, we create a helper function and employ something called a reduce function from es6 syntax...
//reduce function: reduces a complicated array down to a single number. Reduce has a callback function and also an initial value of 0...total(is the accumulator), item(each individual item)..
//anytime it loops through total += total.price.. it means that it takes any array goes through it and basically makes it into a single number whereby all the prices of the item are being accumulated into the total variable that is returned...
export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
