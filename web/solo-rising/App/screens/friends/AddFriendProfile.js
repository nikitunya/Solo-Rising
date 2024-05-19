import React, { useEffect, useState } from "react";
import { Dimensions, Image, View, Text, ScrollView } from "react-native";
import ExperienceBar from "../../components/ExperienceBar";
import Border from "../../components/Border";
import { TouchableOpacity } from "react-native-gesture-handler";
import { sendFriendRequest } from "../../../services/friendsService";
import { auth } from "../../../services/firebase.config";
import { ROUTES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { getCurrentUserData } from "../../../services/auth";
import { AntDesign } from "@expo/vector-icons";
import {
  getThisWeekTrainings,
  getTrainingStatistics,
} from "../../../services/trainingService";
import MuscleGroupImage from "../api/MuscleGroupsImage";

function AddFriendProfile({ route }) {
  const navigation = useNavigation();
  const { user } = route.params;
  const currentUser = auth.currentUser;
  const screenWidth = Dimensions.get("window").width;
  const [maxXp, setMaxXp] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trainings, setTrainings] = useState(null);

  const primaryMuscles = [];
  const secondaryMuscles = [];

  useEffect(() => {
    const maxXpValue = user.level * 1000;
    const progressValue = (user.xp / maxXpValue) * 100;
    setMaxXp(maxXpValue);
    setProgress(progressValue);
  }, []);

  const fetchData = async () => {
    const userData = await getCurrentUserData();
    setCurrentUserData(userData);

    const weekStatistics = await getTrainingStatistics(user.id);
    if (weekStatistics) {
      setStatistics(weekStatistics);
    }

    const weekTrainings = await getThisWeekTrainings(user.id);
    if (weekTrainings) {
      setTrainings(weekTrainings);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddFriend = async () => {
    await sendFriendRequest(currentUser.uid, user.id, currentUserData.username);
    navigation.navigate(ROUTES.FRIENDS);
  };

  const allMuscles = [];

  if (trainings) {
    trainings.forEach((training) => {
      training.exercises.forEach((exercise) => {
        if (exercise.primary_muscles) {
          primaryMuscles.push(exercise.primary_muscles);
        }
        if (exercise.secondary_muscles.length > 0) {
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
        if (exercise.secondary_muscles.length > 0) {
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
  }

  const totalMusclesCount = allMuscles.length;

  const primaryMusclesString = JSON.stringify(primaryMuscles).replace(
    /"/g,
    "'"
  );

  const secondaryMusclesString = JSON.stringify(secondaryMuscles).replace(
    /"/g,
    "'"
  );

  if (loading) {
    return <View className="flex-1 bg-neutral-900"></View>;
  }

  return (
    <View className="flex-1 bg-neutral-900">
      <View className="flex-row items-center">
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl mt-2 bg-blue-700 ml-4"
          >
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../utils/images/logo.png")}
          style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }}
          className="mt-20 ml-8 mr-4"
        />
        <View className="flex-1 flex-row justify-between items-center mt-20">
          <View>
            <Text className="text-white text-lg font-bold">
              {user ? user.username : "username"}
            </Text>
            <Text className="text-basm text-zinc-400">
              {user ? user.fullName : "fullname"}
            </Text>
            <Text className="text-sm text-zinc-400">Maintain</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-bold mr-4">1</Text>
            <Text className="text-white text-lg font-bold mr-4">Friends</Text>
          </View>
        </View>
      </View>
      {user ? (
        <ExperienceBar
          progress={progress}
          level={user.level}
          currentXP={user.xp}
          maxXp={maxXp}
        />
      ) : (
        <View></View>
      )}
      <TouchableOpacity className="mt-6" onPress={() => handleAddFriend()}>
        <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl ml-4">
          <Text className="text-white py-1 px-9">Add Friend</Text>
        </View>
      </TouchableOpacity>
      <Border />
      <ScrollView>
        <View className="flex-1">
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
          <View className="justify-center items-center bg-zinc-800 py-4 rounded-3xl my-3 mx-3">
            <View className="items-center justify-center">
              <Text className="text-white text-lg font-bold">
                Muscles Trained This Week
              </Text>
              <Text className="text-white text-lg font-bold">0%</Text>
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

export default AddFriendProfile;
