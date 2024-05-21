import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import DismissKeyboard from "../../components/DismissKeyboard";
import { signUp } from "../../../services/auth";
import { saveUserData } from "../../../services/firebaseDatabase";

function SignUpScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    setLoading(true);
    if (!fullName || !username || !email || !password)
      return;
    try {
      const user = await signUp(email, password)
      if (user) {
        const id = user.uid;
        await saveUserData(id, fullName, username);
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
            <View className="flex-row justify-start">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2 bg-blue-700"
              >
                <AntDesign name="arrowleft" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <View className="bg-white p-6 rounded-3xl">
            <View className="form space-y-2">
              <Text className="text-gray-700 ml-4">Full Name</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Enter Full Name"
                value={fullName}
                onChangeText={setFullName}
              />
              <Text className="text-gray-700 ml-4">Username</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Enter username"
                value={username}
                onChangeText={setUsername}
              />
              <Text className="text-gray-700 ml-4">Email Address</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
              />
              <Text className="text-gray-700 ml-4">Password</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                // onPress={() => navigation.navigate("SignUpSecond")}
                onPress={handleSignup}
                testID="signup-button"
                className="py-3 rounded-xl justify-center items-center flex-row mb-5 bg-blue-700"
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
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;
