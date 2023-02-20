import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import CurrencyFormat from "react-currency-format";

const BasketIcon = () => {
  //we need to access the basket items in this component...so accessing it we employ redux, redux helps us to grab the basket easily using the useSelector from react redux
  const items = useSelector(selectBasketItems);
  //we also need to access the navigation object using the use navigation hook from react native
  const navigation = useNavigation();

  //so now getting the total accumulated value of the items in the basket i.e total in the basket..redux helps us to grab it easily using the use selector from react redux...
  const basketTotal = useSelector(selectBasketTotal);

  //using a conditional so that the basket will not be shown if there is nothing in the basket
  if (items.length === 0) return null;
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Basket");
        }}
        className="mx-5 bg-[#00ccbb] p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2 ">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <CurrencyFormat
            value={basketTotal}
            displayType="text"
            thousandSeparator
            prefix="₦"
            renderText={(value) => <Text>{value}</Text>}
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
