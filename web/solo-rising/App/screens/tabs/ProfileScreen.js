import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function ProfileScreen() {
  return (
    <SafeAreaView className="flex">
      <View className="flex-row justify-center">
        <Image source={require("../../utils/images/muscles/front.png")} />
        <Image source={require("../../utils/images/muscles/back.png")} />
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
