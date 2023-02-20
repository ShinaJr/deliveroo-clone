import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const PreparingOrderScreen = () => {
  //we want to navigate from this screen to the delivery screen after few seconds..
  //we'll be needing the navigation object and use effect to settimeout..
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="bg-[#00ccbb] flex-1 py-5 px-5 justify-center items-center">
      {/* //using the animatable image... */}
      <Animatable.Image
        source={require("../assets/orderLoading2.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-60.5 w-60.5"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
