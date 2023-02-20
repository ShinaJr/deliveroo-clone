import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ChevronRightIcon,
  LocationMarkerIcon,
  ArrowLeftIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  //Accessing the information/argument passed from the restaurant card to the Restaurant Screen using the useRoute hook from react native
  // const route = useRoute();
  // const route.params.id = useRoute();
  //Now destructuring the route to pull the argument/info passed through
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();
  //accessing the navigation object using the useNavigation hook
  const navigation = useNavigation();
  //creating a dispatch here so that'll keep track of the restaurant that we are in at any given moment..
  const dispatch = useDispatch();

  //capturing the restaurant details when the restaurant card component mounts on the screen by setting setRestaurant action to the payload...
  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
      // so now we have the restaurant details in the global store
    );
  }, [dispatch]);

  //using useLayoutEffect to remove the default header when the screen mounts
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 bg-gray-300 p-4 "
          />
          <TouchableOpacity
            onPress={navigation.goBack} //to go back to the previous screen
            //above is a function that is invoked when the icon is pressed
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#00ccbb" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text>. {genre}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <LocationMarkerIcon color="gray" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">Nearby. {address}</Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300 ">
            <QuestionMarkCircleIcon color="gray" opacity={0.5} size={22} />
            <Text className="py-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#00ccbb" />
          </TouchableOpacity>
        </View>
        {/* so you can view the last item on the dishrow view very well */}
        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {/* Dishrows: Cause we have already fetched the dishes along with the restaurants for the featured row using sanity we just map the dishes directly instead of fetching it again... */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
