import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { colors } from '../../utils/colors/index.js'
import ExcercisesScreen from "./ExcercisesScreen.js";
import WorkoutsScreen from "./WorkoutsScreen.js";

const renderScene = SceneMap({
  workout: WorkoutsScreen,
  excercise: ExcercisesScreen,
});


function TrainingScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "workout", title: "Workouts" },
    { key: "excercise", title: "Excercises" },
  ]);
  
  return (
    <View className="flex-1 bg-black">
      <View className="bg-zinc-800 h-24 rounded-bl-3xl rounded-br-3xl flex-row justify-center px-4 ">
        <Text className="text-2xl absolute bottom-6 font-bold text-green-600">Trained today: 1.35 minutes</Text>
        {/* <View className="absolute bottom-6 right-5">
          <AntDesign name="plus" size={30} color="#16a34a" />
        </View> */}
      </View>
      <View className="pt-4 flex-1">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          className="rounded-3xl"
          renderTabBar={props => <TabBar {...props} style={{backgroundColor: "#27272A"}} indicatorStyle={{backgroundColor: colors.mainGreen}}/>}
        />
      </View>
    </View>
  );
}

export default TrainingScreen;
