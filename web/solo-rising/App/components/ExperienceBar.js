import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "../constants";

const ExperienceBar = ({ progress, level, currentXP, maxXp }) => {
  return (
    <View
      style={{
        marginTop: 6,
        backgroundColor: COLORS.secondaryBackground,
        height: 15,
        marginHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
        position: "relative",
      }}
    >
      <Text
        style={{
          position: "absolute",
          top: "50%",
        //   left: `${progress}%`,
          transform: [{ translateX: 0 }, { translateY: -8 }],
          left: 15,
          color: COLORS.white,
          fontSize: 15,
          fontWeight: "bold",
          zIndex: 1,
        }}
      >
        {level}
      </Text>
      <View
        style={{
          width: `${progress}%`,
          backgroundColor: COLORS.primaryBlue,
          height: "100%",
          borderRadius: 10,
        }}
      />
      <View>
        <Text style={{color: COLORS.white, position: "absolute", right: 10, marginTop: 10}}>{currentXP}/{maxXp} exp</Text>
      </View>
    </View>
  );
};

export default ExperienceBar;
