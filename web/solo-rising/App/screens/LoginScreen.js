import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { login } from "../../services/auth";
import { auth } from "../../services/firebase.config";

function LoginScreen() {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Home");
      }
    })
    return unsubscribe;
  }, [])

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await login(email, password)
      if (user) {
        const id = user.uid;
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <DismissKeyboard>
        <View className="flex-1 justify-between bg-black">
          <SafeAreaView className="flex">
            <View className="flex-row justify-center mt-4">
              <Image
                source={require("../utils/images/logo.png")}
                style={{ width: screenWidth * 0.7, height: screenWidth * 0.7 }}
              />
            </View>
          </SafeAreaView>
          <View className="bg-white p-6 rounded-3xl">
            <View className="form space-y-2">
              <Text className="text-gray-700 ml-4">Email Address</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />

              <Text className="text-gray-700 ml-4">Password</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                secureTextEntry
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity className="flex items-end">
                <Text className="mb-5 text-gray-700">Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogin}
                className="py-3 rounded-xl bg-blue-700"
              >
                <Text className="text-xl font-bold text-center text-white">
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
                <Text className="font-semibold text-blue-700"> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </DismissKeyboard>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
