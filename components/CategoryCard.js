import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { urlFor } from "../sanity";

// using es6 destructuring to destructure the props to get inside of them
const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image
        source={{ uri: urlFor(imgUrl).width(700).url() }}
        className="h-20 w-20 rounded"
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
