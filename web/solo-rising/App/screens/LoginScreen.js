import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DismissKeyboard from "../components/DismissKeyboard";

function LoginScreen() {
  const navigation = useNavigation();
  return (
    <DismissKeyboard>
      <View
        className="flex-1 bg-white"
        style={{ backgroundColor: colors.background }}
      >
        <SafeAreaView className="flex">
          <View className="flex-row justify-start">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2"
              style={{ backgroundColor: colors.mainGreen }}
            >
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Image
              source={require("../utils/images/logo.png")}
              style={{ width: 250, height: 250 }}
            />
          </View>
        </SafeAreaView>
        <View
          className="flex-1 bg-white px-8 pt-8 rounded-t-3xl"
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="email"
              value="john@gmail.com"
            />

            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="password"
              value="test12345"
            />

            <TouchableOpacity className="flex items-end">
              <Text className="mb-5 text-gray-700">Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              className="py-3 rounded-xl"
              style={{ backgroundColor: colors.mainGreen }}
            >
              <Text className="text-xl font-bold text-center text-gray-700">
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-xl font-bold text-center py-4 text-gray-700">
            Or
          </Text>

          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity
              className="p-2 rounded-2xl"
              style={{ backgroundColor: colors.iconBackground }}
            >
              <Image
                source={require("../utils/images/google.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-2 rounded-2xl"
              style={{ backgroundColor: colors.iconBackground }}
            >
              <Image
                source={require("../utils/images/apple.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-2 rounded-2xl"
              style={{ backgroundColor: colors.iconBackground }}
            >
              <Image
                source={require("../utils/images/facebook.png")}
                className="w-10 h-10"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-3">
            <Text className="font-semibold text-gray-700">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text
                className="font-semibold"
                style={{ color: colors.mainGreen }}
              >
                {" "}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DismissKeyboard>
  );
}

export default LoginScreen;
