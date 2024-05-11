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
import { COLORS } from "../../constants";
import MuscleGroupImage from "../api/MuscleGroupsImage";

function ProfileScreen() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const [userData, setUserData] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [trainings, setTrainings] = useState(null);
  const [maxXp, setMaxXp] = useState(0);
  const [progress, setProgress] = useState(0);

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
    const fetchUserData = async () => {
      const userData = await getCurrentUserData();
      setUserData(userData);
      setMaxXp(userData.level * 1000);
      setProgress((userData.xp / maxXp) * 100);
    };

    const fetchStatistics = async () => {
      setStatistics(await getTrainingStatistics());
    };

    const fetchTrainings = async () => {
      setTrainings(await getThisWeekTrainings());
    };
    fetchUserData();
    fetchStatistics();
    fetchTrainings();
  }, []);

  if (statistics && userData && trainings) {
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

    const primaryMusclesString = JSON.stringify(primaryMuscles).replace(
      /"/g,
      "'"
    );

    const secondaryMusclesString = JSON.stringify(secondaryMuscles).replace(
      /"/g,
      "'"
    );

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
                {userData ? userData.username : "username"}
              </Text>
              <Text className="text-basm text-zinc-400">
                {userData ? userData.fullName : "fullname"}
              </Text>
              <Text className="text-sm text-zinc-400">Maintain</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-lg font-bold mr-4">1</Text>
              <Text className="text-white text-lg font-bold mr-4">Friends</Text>
            </View>
          </View>
        </View>
        {userData ? (
          <ExperienceBar
            progress={progress}
            level={userData.level}
            currentXP={userData.xp}
            maxXp={maxXp}
          />
        ) : (
          <View></View>
        )}
        <Border />
        <ScrollView>
          <View className="flex-1">
            <TouchableOpacity
              className="my-2"
              onPress={() => getThisWeekTrainings()}
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
                      {statistics.totalDuration}
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
                  40%
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
