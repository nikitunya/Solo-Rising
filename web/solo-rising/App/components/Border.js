import React from "react";
import { View } from "react-native";

const Border = ({ color = "white", borderWidth = 1, marginY = 15 }) => {
  return (
    <View
      style={{
        borderBottomColor: color,
        borderBottomWidth: borderWidth,
        marginTop: marginY,
        marginBottom: marginY,
      }}
    />
  );
};

export default Border;