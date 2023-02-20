import { View, Text, TextInput, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; //for android users
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  // Accessing the navigation object using the use navigation hook
  const navigation = useNavigation();
  //pulling the featured category from the sanity backend
  const [featuredCategories, setFeaturedCategories] = useState([]);

  //using uselayouteffect hook from the react library to do something as soon as the homescreen mounts on the screen
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  //using useEffect hook to odd in the featured categories from the backend when the component loads.
  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "featured"]{
          ...,
             restaurants[] ->{
                 ...,
                   dishes[]->
      
         },
       }

    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);
  // console.log(featuredCategories);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* header */}
      <View className="flex-row pb-3 items-center mx-2 space-x-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon color="#00ccbb" size={20} />
          </Text>
        </View>
        <UserIcon size={35} color="#00ccbb" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-2 ">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 ">
          <SearchIcon size={20} color="gray" />
          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsIcon size={24} color="#00ccbb" />
      </View>
      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 10,
        }}
      >
        {/* Categories */}
        <Categories />
        {/* Featured Rows */}
        {/* Featured */}
        {/* Using optional chaining to iterate through the back end to get the featured row */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
        {/* featured row demo */}
        {/* <FeaturedRow
          id="123"
          title="featured"
          description="Paid Placements for our partners"
        />
        <FeaturedRow
          id="1234"
          title="Offers Near You"
          description="Why not support your local restaurants tonight!"
        />
        <FeaturedRow
          id={"12345"}
          title="Tasty Discounts"
          description="Everyone's been enjoying these juicy discounts!"
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
