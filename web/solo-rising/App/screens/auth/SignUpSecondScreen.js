import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { colors } from "../../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DismissKeyboard from "../../components/DismissKeyboard";

export default function SignUpSecondScreen() {
  const navigation = useNavigation();
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const confimIOSDate = () => {
    setDateOfBirth(date.toDateString());
    toggleDatePicker();
  };

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
          {/* <View className="flex-row justify-center py-3">
            <Image
              source={require("../utils/images/logo.png")}
              style={{ width: 250, height: 250 }}
            />
          </View> */}
        </SafeAreaView>
        <View className="flex-1 bg-white px-8 pt-8 rounded-t-3xl">
          <View className="form space-y-2">
            <View className="flex-row justify-between ml-1 mr-1">
              <TouchableOpacity
                onPress={() => setGender("female")}
                className={`justify-center items-center flex-1 flex-row mr-2 p-3 rounded-xl border-2 border-pink-300 ${gender === "female" ? "bg-pink-300" : "bg-transparent"}`}
              >
                <AntDesign name="woman" size={24} color="black" />
                <Text
                  className="text-center text-black ml-2"
                >
                  Female
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGender("male")}
                className={`justify-center items-center flex-1 flex-row mr-2 p-3 rounded-xl border-2 border-blue-300 ${gender === "male" ? "bg-blue-300" : "bg-transparent"}`}
              >
                <AntDesign name="man" size={24} color="black" />
                <Text
                  className="text-center text-black ml-2"
                >
                  Male
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="text-gray-700 ml-4">Weight (kg)</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={weight}
              onChangeText={(text) => setWeight(text)}
              placeholder="Enter Weight"
              keyboardType="numeric"
            />
            <View>
              <Text className="text-gray-700 ml-4">Birth Date</Text>
              {showPicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChange}
                  maximumDate={new Date()}
                />
              )}
              {showPicker && Platform.OS === "ios" && (
                <View className="justify-around flex-row">
                  <TouchableOpacity
                    onPress={toggleDatePicker}
                    className="justify-center items-center rounded-lg bg-red-500 px-5 py-3"
                  >
                    <Text className="text-white font-bold">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={confimIOSDate}
                    className="justify-center items-center rounded-lg bg-blue-500 px-5 py-3"
                  >
                    <Text className="text-white font-bold">Confirm</Text>
                  </TouchableOpacity>
                </View>
              )}

              {!showPicker && (
                <Pressable onPress={toggleDatePicker} className="pt-2">
                  <TextInput
                    placeholder="Sat Aug 21 2004"
                    value={dateOfBirth}
                    onChangeText={setDateOfBirth}
                    editable={false}
                    onPressIn={toggleDatePicker}
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  />
                </Pressable>
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{
              backgroundColor: colors.mainGreen,
            }}
            className="py-2 rounded-xl justify-center items-center flex-row absolute bottom-10 left-10 right-10 mx-auto"
          >
            <Text className="font-bold text-center text-white text-lg">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboard>
  );
}
