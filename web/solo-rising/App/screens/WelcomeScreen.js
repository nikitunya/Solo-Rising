import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../utils/colors";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <View className="flex-1 flex justify-around my-4">
        <Text className="text-white font-bold text-4xl text-center">
          Solo Rising
        </Text>
        <View className="flex-row justify-center">
          <Image
            source={require("../utils/images/logo.png")}
            style={{ width: 350, height: 350 }}
          />
        </View>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            className="py-3 mx-7 rounded-xl"
            style={{ backgroundColor: colors.mainGreen }}
          >
            <Text className="text-xl font-bold text-center text-white">
              Sign Up
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text className="text-white font-semibold">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                className="font-semibold"
                style={{ color: colors.mainGreen }}
              >
                &nbsp; Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;
