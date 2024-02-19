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
    <View className="flex-1">
      <View className="bg-gray-400 h-24 rounded-bl-3xl rounded-br-3xl flex-row justify-center px-4 relative">
        <Text className="text-2xl absolute bottom-6 font-bold">Create</Text>
        <View className="absolute bottom-6 right-5">
          <AntDesign name="plus" size={30} color="black" />
        </View>
      </View>
      <View className="pt-4 flex-1">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          className="rounded-3xl"
          renderTabBar={props => <TabBar {...props} style={{backgroundColor: colors.textColor}} indicatorStyle={{backgroundColor: colors.mainGreen}}/>}
        />
      </View>
    </View>
  );
}

export default TrainingScreen;
