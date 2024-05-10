import React from "react";
import { Text, View } from "react-native";

function WorkoutStartScreen({ route }) {
    const workout = route.params;
    console.log(workout)
    return (
    <View>
      {/* <Text>{workout.title}</Text> */}
    </View>
  );
}

export default WorkoutStartScreen;
