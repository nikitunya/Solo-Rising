import React from "react";
import TabNavigation from "../navigation/tabNavigation";
import { View } from "react-native";

function HomeScreen() {
  return (
    <View className="flex-1 bg-black">
      <TabNavigation />
    </View>
  );
}

export default HomeScreen;
