import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  }
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.background }}
    >
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            style={{ backgroundColor: themeColors.mainGreen }}
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../utils/images/logo.png")}
            style={{ width: 100, height: 100 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <View className="flex-row justify-between ml-4 mr-4">
            <TouchableOpacity
              onPress={() => setGender("female")}
              style={{
                backgroundColor: gender === "female" ? "pink" : "transparent",
                borderWidth: 1,
                borderColor: "pink",
                borderRadius: 10,
                padding: 10,
                flex: 1,
                marginRight: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="woman" size={24} color="black" />
              <Text
                style={{ textAlign: "center", color: "black", marginLeft: 5 }}
              >
                Female
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender("male")}
              style={{
                backgroundColor: gender === "male" ? "blue" : "transparent",
                borderWidth: 1,
                borderColor: "blue",
                borderRadius: 10,
                padding: 10,
                flex: 1,
                marginLeft: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="man" size={24} color="black" />
              <Text
                style={{ textAlign: "center", color: "black", marginLeft: 5 }}
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
            <Text className="text-gray-700 ml-4">Birthday</Text>
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
              />
            )}
            {showPicker && Platform.OS === "ios" && (
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity onPress={toggleDatePicker} style={[{backgroundColor: "#11182711"}]}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confimIOSDate} style={[{backgroundColor: "#11182711"}]}>
                  <Text>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}

            {!showPicker && (
              <Pressable onPress={toggleDatePicker}>
                <TextInput
                  placeholder="Sat Aug 21 2004"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  placeholderTextColor="11182744"
                  editable={false}
                  onPressIn={toggleDatePicker}
                  style={styles.datePicker}
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  pcikerButton: {
    paddingHorizontal: 20,
  }
});
