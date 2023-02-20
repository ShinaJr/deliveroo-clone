import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient from "../sanity";

const Categories = () => {
  //using a useState() hook to set the categories state
  const [menuCategories, setMenuCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "category"]{
        ...,
     }

      `
      )
      .then((data) => setMenuCategories(data));
  }, []);
  console.log(menuCategories);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Category Card */}
      {/* passing props to each category card to customize it */}
      {/* iterating through the sanity backend to get the categories cards */}
      {menuCategories?.map((menuCategory) => (
        <CategoryCard
          key={menuCategory._id}
          imgUrl={menuCategory.image}
          title={menuCategory.name}
        />
      ))}
      {/* <CategoryCard imgurl="https://links.papareact.com/gn7" title="Testing" /> */}
    </ScrollView>
  );
};

export default Categories;
