import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import DismissKeyboard from "../components/DismissKeyboard";

function SignUpScreen() {
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
              style={{ width: 200, height: 200 }}
            />
          </View>
        </SafeAreaView>
        <View
          className="flex-1 bg-white px-8 pt-8 rounded-t-3xl"
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Full Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value="john snow"
              placeholder="Enter Name"
            />
            <Text className="text-gray-700 ml-4">Username</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value="nikitunya"
              placeholder="Enter username"
            />
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value="john@gmail.com"
              placeholder="Enter Email"
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              secureTextEntry
              value="test12345"
              placeholder="Enter Password"
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUpSecond")}
              style={{
                backgroundColor: colors.mainGreen,
              }}
              className="py-3 rounded-xl justify-center items-center flex-row"
            >
              <Text className="font-xl font-bold text-center text-white">
                Next
              </Text>
              <AntDesign
                name="right"
                size={24}
                color="white"
                className="ml-5"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DismissKeyboard>
  );
}

export default SignUpScreen;
