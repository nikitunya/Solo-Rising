import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { format, subDays } from "date-fns";
import BarCharComponent from "../../components/BarCharComponent";
import { ScrollView } from "react-native-gesture-handler";
import { ROUTES } from "../../constants";
function PerfomanceScreen() {
  const navigation = useNavigation();
  const [volumeChartData, setVolumeChartData] = useState([]);
  const [volumeChartParams, setVolumeChartParams] = useState({
    data: volumeChartData,
    spacing: 25,
  });

  useEffect(() => {
    handleTimePeriod("1W");
  }, []);

  const handleTimePeriod = (type) => {
    const today = new Date();
    if (type == "1W") {
      const data = Array.from({ length: 7 }, (_, i) => ({
        value: Math.floor(Math.random() * 100) + 1,
        label: format(subDays(today, 6 - i), "MM/dd"),
      }));
      setVolumeChartParams({
        ...volumeChartParams,
        data: data,
        spacing: 25,
        barWidth: 15,
      });
    } else if (type == "1M") {
      const data = [];
      for (let i = 1; i <= 4; i++) {
        const weekStartDate = subDays(today, i * 7);
        const weekEndDate = subDays(today, (i - 1) * 7 - 1);
        data.push({
          value: Math.floor(Math.random() * 100) + 1,
          label: `${format(weekStartDate, "MM/dd")}`,
        });
      }
      setVolumeChartParams({
        ...volumeChartParams,
        data: data,
        spacing: 30,
        barWidth: 40,
      });
    } else if (type == "3M") {
      const data = [];
      for (let i = 1; i <= 3; i++) {
        const monthStartDate = subDays(today, i * 30);
        const monthEndDate = subDays(today, (i - 1) * 30 - 1);
        data.push({
          value: Math.floor(Math.random() * 100) + 1,
          label: format(monthStartDate, "MMM"),
        });
      }
      setVolumeChartParams({
        ...volumeChartParams,
        data: data,
        spacing: 40,
        barWidth: 55,
      });
    } else if (type === "1Y") {
      const data = [];
      for (let i = 0; i < 12; i++) {
        const monthStartDate = new Date(today.getFullYear(), i, 1);
        data.push({
          value: Math.floor(Math.random() * 100) + 1,
          label: format(monthStartDate, "MMM")[0],
        });
      }
      setVolumeChartParams({
        ...volumeChartParams,
        data: data,
        spacing: 15,
        barWidth: 8,
      });
    }
  };

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
          <TouchableOpacity className="mr-3" onPress={() => navigation.navigate(ROUTES.WORKOUT_HISTORY)}>
            <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4">
              <Text className="flex text-white text-base font-bold p-1">
                Workout History
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text className="text-white text-2xl font-bold text-center">
            Perfomance Overview
          </Text>
          <View className="justify-center items-center bg-zinc-800 py-4 rounded-3xl my-3 mx-3">
            <View className="items-center justify-center">
              <Text className="text-white text-lg font-bold">
                Favorite Exercise
              </Text>
              <Text className="text-white text-lg font-bold">Pull Ups</Text>
            </View>
          </View>
          <View className="justify-center bg-zinc-800 py-4 rounded-3xl my-3 mx-3">
            <View className="ml-4">
              <Text className="text-white text-base font-bold">
                Volume Over Time
              </Text>
              <View>
                <BarCharComponent {...volumeChartParams} />
              </View>
              <View className="justify-between flex-row">
                <TouchableOpacity onPress={() => handleTimePeriod("1W")}>
                  <View className="justify-center items-center bg-blue-700 px-3 rounded-3xl my-4">
                    <Text className="text-white text-base font-bold p-1">
                      1W
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTimePeriod("1M")}>
                  <View className="justify-center items-center bg-blue-700 px-3 rounded-3xl my-4">
                    <Text className="text-white text-base font-bold p-1">
                      1M
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTimePeriod("3M")}>
                  <View className="justify-center items-center bg-blue-700 px-3 rounded-3xl my-4">
                    <Text className="text-white text-base font-bold p-1">
                      3M
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTimePeriod("1Y")}>
                  <View className="justify-center items-center bg-blue-700 px-3 rounded-3xl my-4 mr-3">
                    <Text className="text-white text-base font-bold p-1">
                      1Y
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="justify-center bg-zinc-800 py-4 rounded-3xl my-3 mx-3">
            <View className="ml-4">
              <Text className="text-white text-base font-bold">
                Workouts Over Time
              </Text>
              <View>
                <BarCharComponent {...volumeChartParams} />
              </View>
              <View className="justify-between flex-row">
                <TouchableOpacity onPress={() => handleTimePeriod("1W")}>
                  <View className="justify-center items-center bg-blue-700 px-3 rounded-3xl my-4">
                    <Text className="text-white text-base font-bold p-1">
                      1W
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTimePeriod("1M")}>
                  <View className="justify-center items-center bg-blue-700 px-3 rounded-3xl my-4">
                    <Text className="text-white text-base font-bold p-1">
                      1M
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTimePeriod("3M")}>
                  <View className="justify-center items-center bg-blue-700 px-3 rounded-3xl my-4">
                    <Text className="text-white text-base font-bold p-1">
                      3M
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTimePeriod("1Y")}>
                  <View className="justify-center items-center bg-blue-700 px-3 rounded-3xl my-4 mr-3">
                    <Text className="text-white text-base font-bold p-1">
                      1Y
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </DismissKeyboard>
  );
}

export default PerfomanceScreen;
