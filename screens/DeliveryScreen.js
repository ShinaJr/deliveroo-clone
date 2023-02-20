import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import { useSelector } from "react-redux";
import { XIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
const DeliveryScreen = () => {
  //here we'll be needing a navigation object
  const navigation = useNavigation();
  //we need the restaurants that we captured using redux
  const Restaurant = useSelector(selectRestaurant);
  return (
    <View className="bg-[#00ccbb] flex-1">
      <SafeAreaView className="z-30 pt-5">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="text-lg text-white font-light">Order Help</Text>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md ">
          <View className="flex-row justify-between">
            {/* we put the view to encapsulate the two text here so that the image will be beside the two texts... */}
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">30-55mins</Text>
            </View>
            <Image
              source={{ uri: "https://links.papareact.com/fls" }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={20} indeterminate={true} color="#00ccbb" />
          <Text className="mt-3 text-gray-500">
            Your order at {Restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      {/* Map View using React-Native Maps*/}
      {/* since we captured the restaurants details like latitude and longitude using redux... we'll be using that here */}
      {/* delta is basically the zoom scale of the map; z-0 puts the map at the back */}
      <MapView
        initialRegion={{
          latitude: Restaurant.lat,
          longitude: Restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        // -mt-10: allows the map to be at the back of the view above
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: Restaurant.lat,
            longitude: Restaurant.long,
          }}
          title={Restaurant.title}
          description={Restaurant.short_description}
          identifier="origin"
          pinColor="#00ccbb"
        />
      </MapView>
      {/* Bottom part of the delivery screen */}
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-20">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-12 w-12 bg-gray-200 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Shina Lasisi</Text>
          <Text className="text-gray-400">your Driver</Text>
        </View>
        <Text className="text-[#00ccbb] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
