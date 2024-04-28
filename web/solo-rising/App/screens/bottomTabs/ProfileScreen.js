import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../services/firebase.config";

function ProfileScreen() {
  return (
    <SafeAreaView className="flex">
      <View className="flex-row justify-center">
        <Text>{ auth.currentUser?.email}</Text>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
