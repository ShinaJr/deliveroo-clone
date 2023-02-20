import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  clearList,
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { SafeAreaView } from "react-native-safe-area-context"; //for android users
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import CurrencyFormat from "react-currency-format";

const BasketScreen = () => {
  const navigation = useNavigation();
  //Now getting the restaurant that we are in...
  //since we are in a different screen now, we can pull the restaurant details out of the global store since we've added it to the global store..
  //we need to access the restaurant details in this screen...so accessing it we employ redux, redux helps us to grab the restaurant details easily using the useSelector from react redux
  const restaurant = useSelector(selectRestaurant);

  //accessing and grabbing the items using useSelector from the react-redux...
  const items = useSelector(selectBasketItems);

  //we also add the dispatch function too
  const dispatch = useDispatch();

  //to clear the basket items
  const clearBasketItems = () => {
    dispatch(clearList([id]));
  };

  //so now getting the total accumulated value of the items in the basket i.e total in the basket..redux helps us to grab it easily using the use selector from react redux...
  const basketTotal = useSelector(selectBasketTotal);

  //creating a state firstly that we turn our items into a grouped item
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  //creating a handy function to group items together(i.e to avoid repetition when a particular dish is chosen more than once and to prevent it from  appearing on the screen multiple times)..
  //here we're basically looping through the items in our basket and creating an object where if the key exist , then go ahead and push item into that key..
  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  console.log(groupedItemsInBasket);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100 ">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-3"
          >
            <XCircleIcon color="#00ccbb" height={40} width={40} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full "
          />
          <Text className="flex-1">Deliver in 30-55 mins</Text>
          <TouchableOpacity>
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>
        {/* divide-y helps to divide between the children components*/}
        <ScrollView className="divide-y divide-gray-200">
          {/*mapping through the groupedItemsInBasket and implicitly returning the grouped items i.e  => () */}
          {/* remember we have objects with keys with array inside of them */}
          {/* we use entries here instead of keys solely because we want to have the values also */}
          {/* items[o]: here we just need the details of one of the grouped item irrespective of how many is inside of it*/}
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-3"
            >
              <Text className="text-[#00ccbb}">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                {/* HERE I MULTIPLIED THE PRICE AND THE AMOUNT OF ITEMS IN THE BASKET */}
                <CurrencyFormat
                  value={items[0]?.price * items.length}
                  displayType="text"
                  thousandSeparator
                  prefix="₦"
                  renderText={(value) => <Text>{value}</Text>}
                />
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00ccbb] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {/* subtotal */}
        <View className="p-5 bg-white mt-3 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Sub-Total</Text>
            <Text className="text-gray-400">
              <CurrencyFormat
                value={basketTotal}
                displayType="text"
                thousandSeparator
                prefix="₦"
                renderText={(value) => <Text>{value}</Text>}
              />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <CurrencyFormat
                value={2500}
                displayType="text"
                thousandSeparator
                prefix="₦"
                renderText={(value) => <Text>{value}</Text>}
              />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              <CurrencyFormat
                value={basketTotal + 2500}
                displayType="text"
                thousandSeparator
                prefix="₦"
                renderText={(value) => <Text>{value}</Text>}
              />
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PreparingOrder") && { clearBasketItems }
            }
            className="rounded-lg bg-[#00ccbb] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
