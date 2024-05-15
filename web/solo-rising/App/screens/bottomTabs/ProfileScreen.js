import React, { useEffect, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../../services/firebase.config";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { getCurrentUserData } from "../../../services/auth";
import ExperienceBar from "../../components/ExperienceBar";
import Border from "../../components/Border";
import {
  getThisWeekTrainings,
  getTrainingStatistics,
} from "../../../services/trainingService";
import { COLORS, PRIMARY_MUCLES, ROUTES } from "../../constants";
import MuscleGroupImage from "../api/MuscleGroupsImage";

function ProfileScreen() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const [userData, setUserData] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [trainings, setTrainings] = useState(null);
  const [maxXp, setMaxXp] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const primaryMuscles = [];
  const secondaryMuscles = [];

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getCurrentUserData();
      if (userData) {
        setUserData(userData);
        setMaxXp();
        setProgress((userData.xp / (userData.level * 1000)) * 100);
      }

      const weekStatistics = await getTrainingStatistics();
      if (weekStatistics) {
        setStatistics(weekStatistics);
      }

      const weekTrainings = await getThisWeekTrainings();
      if (weekTrainings) {
        setTrainings(weekTrainings);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (statistics && userData && trainings) {
    const allMuscles = [];

    trainings.forEach((training) => {
      training.exercises.forEach((exercise) => {
        if (exercise.primary_muscles) {
          primaryMuscles.push(exercise.primary_muscles);
        }
        if (exercise.secondary_muscles) {
          const jsonString = exercise.secondary_muscles.replace(/'/g, '"');
          const secondaryList = JSON.parse(jsonString);
          secondaryList.forEach((muscle) => {
            if (!secondaryMuscles.includes(muscle)) {
              secondaryMuscles.push(muscle);
            }
          });
        }
      });
    });
    trainings.forEach((training) => {
      training.exercises.forEach((exercise) => {
        if (exercise.primary_muscles) {
          allMuscles.push(exercise.primary_muscles);
        }
        if (exercise.secondary_muscles) {
          const jsonString = exercise.secondary_muscles.replace(/'/g, '"');
          const secondaryList = JSON.parse(jsonString);
          secondaryList.forEach((muscle) => {
            if (!allMuscles.includes(muscle)) {
              allMuscles.push(muscle);
            }
          });
        }
      });
    });

    const totalMusclesCount = allMuscles.length;

    const primaryMusclesString = JSON.stringify(primaryMuscles).replace(
      /"/g,
      "'"
    );

    const secondaryMusclesString = JSON.stringify(secondaryMuscles).replace(
      /"/g,
      "'"
    );

    const formatDuration = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const totalAvailableMuscles = PRIMARY_MUCLES.length;
    const percentage = (totalMusclesCount / totalAvailableMuscles) * 100;
    const formattedPercentage = percentage.toFixed(2) + "%";

    if (loading) {
      return <View className="flex-1 bg-neutral-900"></View>;
    }

    return (
      <View className="flex-1 bg-neutral-900">
        <View className="flex-row items-center">
          <Image
            source={require("../../utils/images/logo.png")}
            style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }}
            className="mt-20 ml-8 mr-4"
          />
          <View className="flex-1 flex-row justify-between items-center mt-20">
            <View>
              <Text className="text-white text-lg font-bold">
                {userData.username}
              </Text>
              <Text className="text-basm text-zinc-400">
                {userData.fullName}
              </Text>
              <Text className="text-sm text-zinc-400">Maintain</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-lg font-bold mr-4">1</Text>
              <Text className="text-white text-lg font-bold mr-4">Friends</Text>
            </View>
          </View>
        </View>
        <ExperienceBar
          progress={progress}
          level={userData.level}
          currentXP={userData.xp}
          maxXp={userData.level * 1000}
        />
        <Border />
        <View className="flex-row justify-between">
          <TouchableOpacity
            className="py-3 border border-blue-700 rounded-xl ml-5"
            onPress={() => navigation.navigate(ROUTES.PROFILE_EDIT)}
          >
            <Text className="text-xl font-bold text-center text-white px-3">
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 border border-red-700 rounded-xl mr-5"
            onPress={() => handleSignOut()}
          >
            <Text className="text-xl font-bold text-center text-white px-3">
              Log out
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View className="flex-1">
            <TouchableOpacity
              className="my-2"
              onPress={() => navigation.navigate(ROUTES.PROFILE_PERFOMANCE)}
            >
              <View className="py-3 rounded-full bg-zinc-800 mx-4">
                <View className="flex-row justify-between mx-6">
                  <Image
                    source={require("../../utils/images/trophies/bench_bronze.png")}
                    style={{
                      width: screenWidth * 0.2,
                      height: screenWidth * 0.2,
                    }}
                  />
                  <Image
                    source={require("../../utils/images/trophies/deadlift_silver.png")}
                    style={{
                      width: screenWidth * 0.2,
                      height: screenWidth * 0.2,
                    }}
                  />
                  <Image
                    source={require("../../utils/images/trophies/squat_gold.png")}
                    style={{
                      width: screenWidth * 0.2,
                      height: screenWidth * 0.2,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            <TouchableOpacity
              className="my-2"
              onPress={() => navigation.navigate(ROUTES.PROFILE_PERFOMANCE)}
            >
              <View className="py-3 rounded-full bg-zinc-800 mx-4">
                <View className="flex-row justify-between">
                  <View className="ml-6 items-center">
                    <Text className="text-blue-500 text-base font-bold">#</Text>
                    <Text className="text-white text-base">
                      {statistics.trainingCount}
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-blue-500 text-base font-bold">
                      Total Volume
                    </Text>
                    <Text className="text-white text-base">
                      {statistics.formattedVolume}
                    </Text>
                  </View>
                  <View className="mr-6 items-center">
                    <Text className="text-blue-500 text-base font-bold">
                      Total Time
                    </Text>
                    <Text className="text-white text-base">
                      {formatDuration(statistics.totalDuration)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View className="justify-center items-center bg-zinc-800 py-4 rounded-3xl my-3 mx-3">
              <View className="items-center justify-center">
                <Text className="text-white text-lg font-bold">
                  Muscles Trained This Week
                </Text>
                <Text className="text-white text-lg font-bold">
                  {formattedPercentage}
                </Text>
              </View>
              <MuscleGroupImage
                primaryMuscleGroups={primaryMusclesString}
                secondaryMuscleGroups={secondaryMusclesString}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ProfileScreen;
