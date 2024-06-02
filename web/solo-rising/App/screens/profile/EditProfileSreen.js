import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { AntDesign } from "@expo/vector-icons";
import Border from "../../components/Border";
import { useNavigation } from "@react-navigation/native";
import { getCurrentUserData, updateUserData } from "../../../services/auth";
import { ROUTES } from "../../constants";
import { auth } from "../../../services/firebase.config";

function EditProfileScreen() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  //   const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getCurrentUserData();
      if (userData) {
        setFullName(userData.fullName);
        setUsername(userData.username);
        // setEmail(userData.email);
        setGender(userData.gender);
        setGoal(userData.goal);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = () => {
    const updatedUserData = {
      fullName,
      username,
      // email,
      gender,
      goal,
    };
    updateUserData(updatedUserData);
    navigation.navigate(ROUTES.PROFILE, { refetch: true });
  };

  const handleProfilePictureChange = () => {
    
  }

  return (
    <DismissKeyboard>
      <View className="flex-1 bg-neutral-900">
        <View className="flex-row items-center justify-between mt-10">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl mt-2 bg-blue-700 ml-4"
          >
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View className="items-center">
          <TouchableOpacity onPress={() => handleProfilePictureChange()}>
            <Image
              source={require("../../utils/images/logo.png")}
              style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }}
              className="mt-5"
            />
          </TouchableOpacity>
        </View>
        <Border />
        <View className="flex-1 justify-between">
          <View className="form space-y-2 mx-4">
            <Text className="text-gray-700">Full Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <Text className="text-gray-700">Username</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter username"
              value={username}
              onChangeText={setUsername}
            />
            {/* <Text className="text-gray-700">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
            /> */}
            <Text className="text-gray-700">Gender</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Gender"
              value={gender}
              onChangeText={setGender}
            />
            <Text className="text-gray-700">Goal</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Goal"
              value={goal}
              onChangeText={setGoal}
            />
            <TouchableOpacity
              onPress={() => handleUpdate()}
              className="py-3 rounded-xl justify-center items-center flex-row mb-5 bg-blue-700"
            >
              <Text className="font-xl font-bold text-center text-white">
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DismissKeyboard>
  );
}
export default EditProfileScreen;
