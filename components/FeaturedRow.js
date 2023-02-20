import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";
// using es6 destructuring to destructure the props to get inside of them
const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured" && _id == $id]{
              ...,
                restaurants[] ->{
                   ...,
                    dishes[]->,
                      type -> {
                        name
                           }
                 },
            }[0]
    
          `,
        { id } //params as a second argument
      )
      .then((data) => {
        //this is when we get the response back from the query. 
        setRestaurants(data?.restaurants);
      });
  }, [id]); //we pass id here because it's part of a dependency array..
  console.log(restaurants);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between">
        <Text className="font-bold text-lg ">{title}</Text>
        <ArrowRightIcon color="#00ccbb" />
      </View>
      <Text className="text-xs text-gray-500">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        {/* using optional chaining and map to iterate through the backend to get various restaurants card */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.Image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
        {/* restaurant card demo  */}
        {/* <RestaurantCard
          id={123}
          imgUrl="https://links.papareact.com/gn7"
          title="Yol Sushi"
          rating={4.5}
          genre="Japanese"
          address="123 Main St"
          short_description="This is a test description"
          dishes={[]}
          long={20}
          lat={0}
        /> */}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
