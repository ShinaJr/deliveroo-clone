import { View, Text, TouchableOpacity, Image } from "react-native";
import CurrencyFormat from "react-currency-format";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../features/basketSlice";
//destructuring the props that was passed in the DishRow component in the restaurant screen
const DishRow = ({ id, name, description, price, image }) => {
  //adding a quantity modifier when the dishes are pressed using statehook
  const [isPressed, setIsPressed] = useState(false);

  //creating the dispatch gun(ie the helper function) that'll give us the ability to fire-off actions using the action creator we created in the basket slice..
  const dispatch = useDispatch();
  //we'll use the selector helper function we created in the basket slice to get the items in the basket... const items = useSelector(selectBasketItems);

  //now using the newly created helper selector function to only add the dish items to the basket that the id of the dish that was clicked matches... we are using state here because it's a callback function
  const items = useSelector((state) => selectBasketItemsWithId(state, id));

  //creating a function addItemsToBasket to add items to the basket by dispatching the addToBasket action with the payload(items we want to basically keep track of in the basket or adding to the basket)
  const addItemsToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image })); //here we destructure the payload which is the items to get the props...
  };

  //creating a function removeItemsFromBasket to add items to the basket by dispatching the removeFromBasket action...
  //firstly doing defensive programming by not allowing it to remove an item that doesn't exist...
  if (!items > 0) return;
  const removeItemsFromBasket = () => {
    dispatch(removeFromBasket({ id })); //here we destructure the payload which is the items to get the props...
  };

  return (
    // Adding fragment(like an empty container) around the touchable opacity so that we'll be able to add the quantity modifier when the dishes are pressed..
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        // hiding the border bottom when the dishes is pressed using a conditional...
        // className="bg-white border p-4 border-gray-200"
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400">
              <CurrencyFormat
                value={price}
                displayType="text"
                thousandSeparator
                prefix="₦"
                renderText={(value) => <Text>{value}</Text>}
              />
            </Text>
          </View>

          <View style={{ borderWidth: 1, borderColor: "#fff" }}>
            <Image
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {/* checking if the dishes has been pressed is true and adding the quantity modifier below*/}
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            {/* firing off the removeItemsFromBasket function when the plus button is pressed using onPress event.. */}
            {/* disabling the remove items from basket button when there's no kitem in the cart */}
            <TouchableOpacity
              onPress={removeItemsFromBasket}
              disabled={!items.length}
            >
              <MinusCircleIcon
                color={items.length > 0 ? "#00ccbb" : "gray"}
                size={40}
              ></MinusCircleIcon>
            </TouchableOpacity>
            {/* here we'll put the number of items in the basket currently and update it when items is either added or removed */}
            <Text>{items.length}</Text>
            {/* firing off the addItemsToBasket function when the plus button is pressed using onPress event.. */}
            <TouchableOpacity onPress={addItemsToBasket}>
              <PlusCircleIcon color="#00ccbb" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
