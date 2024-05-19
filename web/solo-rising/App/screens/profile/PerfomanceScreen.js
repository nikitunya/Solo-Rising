import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  addDays,
  endOfDay,
  endOfMonth,
  format,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
} from "date-fns";
import BarCharComponent from "../../components/BarCharComponent";
import { ScrollView } from "react-native-gesture-handler";
import { ROUTES } from "../../constants";
import { getThisYearTrainings } from "../../../services/trainingService";
function PerfomanceScreen() {
  const navigation = useNavigation();
  const [volumeChartData, setVolumeChartData] = useState([]);
  const [volumeChartParams, setVolumeChartParams] = useState({
    data: volumeChartData,
    spacing: 25,
  });
  const [countChartParams, setCountChartParams] = useState({
    data: volumeChartData,
    spacing: 25,
  });
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [trainings, setTrainings] = useState([]);

  const fetchData = async () => {
    const trainingsData = await getThisYearTrainings();
    if (trainingsData) {
      setTrainings(trainingsData);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  useEffect(() => {
    handleTimePeriod("1W");
    handleTimePeriodForCount("1W");
  }, []);

  const handleTimePeriod = (type) => {
    const today = new Date();
    const data = [];

    if (type == "1W") {
      for (let i = 0; i < 7; i++) {
        const date = subDays(today, i);
        const volumeForDate = trainings
          .filter((training) =>
            isSameDay(new Date(training.date.toDate()), date)
          )
          .reduce((totalVolume, training) => totalVolume + training.volume, 0);
        data.push({
          value: volumeForDate,
          label: format(date, "MM/dd"),
        });
      }
      setVolumeChartParams({
        ...volumeChartParams,
        data: data.reverse(),
        spacing: 25,
        barWidth: 15,
      });
    } else if (type == "1M") {
      const data = [];
      const mostRecentMonday = startOfWeek(addDays(today, 7), {
        weekStartsOn: 1,
      });
      for (let i = 1; i <= 4; i++) {
        const mondayOfWeek = subDays(mostRecentMonday, i * 7);
        const endOfWeek = endOfDay(addDays(mondayOfWeek, 6));

        const volumeForWeek = trainings
          .filter((training) =>
            isWithinInterval(new Date(training.date.toDate()), {
              start: mondayOfWeek,
              end: endOfWeek,
            })
          )
          .reduce((totalVolume, training) => totalVolume + training.volume, 0);

        data.push({
          value: volumeForWeek,
          label: format(mondayOfWeek, "MM/dd"),
        });
      }
      setVolumeChartParams({
        ...volumeChartParams,
        data: data,
        spacing: 30,
        barWidth: 40,
      });
    } else if (type == "3M") {
      for (let i = 0; i < 3; i++) {
        const startDate = startOfMonth(subMonths(today, i * 3));
        const endDate = endOfDay(endOfMonth(subMonths(today, i * 3 - 2)));

        const volumeForQuarter = trainings
          .filter((training) =>
            isWithinInterval(new Date(training.date.toDate()), {
              start: startDate,
              end: endDate,
            })
          )
          .reduce((totalVolume, training) => totalVolume + training.volume, 0);

        data.push({
          value: volumeForQuarter,
          label: format(startDate, "MMM yyyy"),
        });
      }

      setVolumeChartParams({
        ...volumeChartParams,
        data: data.reverse(),
        spacing: 40,
        barWidth: 55,
      });
    } else if (type === "1Y") {
      for (let i = 0; i < 12; i++) {
        const startDate = new Date(today.getFullYear(), i, 1);
        const endDate = endOfDay(
          subDays(new Date(today.getFullYear(), i + 1, 1), 1)
        );

        const volumeForYear = trainings
          .filter((training) =>
            isWithinInterval(new Date(training.date.toDate()), {
              start: startDate,
              end: endDate,
            })
          )
          .reduce((totalVolume, training) => totalVolume + training.volume, 0);

        data.push({
          value: volumeForYear,
          label: format(startDate, "MMM")[0],
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

  const handleTimePeriodForCount = (type) => {
    const today = new Date();
    const data = [];

    if (type == "1W") {
      for (let i = 0; i < 7; i++) {
        const date = subDays(today, i);
        const countForDate = trainings.filter((training) =>
          isSameDay(new Date(training.date.toDate()), date)
        ).length;
        data.push({
          value: countForDate,
          label: format(date, "MM/dd"),
        });
      }
      setCountChartParams({
        ...volumeChartParams,
        data: data.reverse(),
        spacing: 25,
        barWidth: 15,
      });
    } else if (type == "1M") {
      const data = [];
      const mostRecentMonday = startOfWeek(addDays(today, 7), {
        weekStartsOn: 1,
      });
      for (let i = 1; i <= 4; i++) {
        const mondayOfWeek = subDays(mostRecentMonday, i * 7);
        const endOfWeek = endOfDay(addDays(mondayOfWeek, 6));

        const countForWeek = trainings.filter((training) =>
          isWithinInterval(new Date(training.date.toDate()), {
            start: mondayOfWeek,
            end: endOfWeek,
          })
        ).length;

        data.push({
          value: countForWeek,
          label: format(mondayOfWeek, "MM/dd"),
        });
      }
      setCountChartParams({
        ...volumeChartParams,
        data: data,
        spacing: 30,
        barWidth: 40,
      });
    } else if (type == "3M") {
      for (let i = 0; i < 3; i++) {
        const startDate = startOfMonth(subMonths(today, i * 3));
        const endDate = endOfDay(endOfMonth(subMonths(today, i * 3 - 2)));

        const countForQuarter = trainings.filter((training) =>
          isWithinInterval(new Date(training.date.toDate()), {
            start: startDate,
            end: endDate,
          })
        ).length;

        data.push({
          value: countForQuarter,
          label: format(startDate, "MMM yyyy"),
        });
      }

      setCountChartParams({
        ...volumeChartParams,
        data: data.reverse(),
        spacing: 40,
        barWidth: 55,
      });
    } else if (type === "1Y") {
      for (let i = 0; i < 12; i++) {
        const startDate = new Date(today.getFullYear(), i, 1);
        const endDate = endOfDay(
          subDays(new Date(today.getFullYear(), i + 1, 1), 1)
        );

        const countForYear = trainings.filter((training) =>
          isWithinInterval(new Date(training.date.toDate()), {
            start: startDate,
            end: endDate,
          })
        ).length;

        data.push({
          value: countForYear,
          label: format(startDate, "MMM")[0],
        });
      }
      setCountChartParams({
        ...volumeChartParams,
        data: data,
        spacing: 15,
        barWidth: 8,
      });
    }
  };

  if (loading) {
    return <View className="flex-1 bg-neutral-900"></View>;
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
          <TouchableOpacity
            className="mr-3"
            onPress={() => navigation.navigate(ROUTES.WORKOUT_HISTORY)}
          >
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
                <BarCharComponent {...countChartParams} />
              </View>
              <View className="justify-between flex-row">
                <TouchableOpacity
                  onPress={() => handleTimePeriodForCount("1W")}
                >
                  <View className="justify-center items-center bg-blue-700 px-3 rounded-3xl my-4">
                    <Text className="text-white text-base font-bold p-1">
                      1W
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTimePeriodForCount("1M")}>
                  <View className="justify-center items-center bg-blue-700 px-3 rounded-3xl my-4">
                    <Text className="text-white text-base font-bold p-1">
                      1M
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTimePeriodForCount("3M")}>
                  <View className="justify-center items-center bg-blue-700 px-3 rounded-3xl my-4">
                    <Text className="text-white text-base font-bold p-1">
                      3M
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTimePeriodForCount("1Y")}>
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
