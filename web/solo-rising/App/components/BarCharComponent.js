import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { COLORS } from "../constants";

const BarCharComponent = ({ data, spacing, barWidth }) => {
  return (
    <View>
      <View>
        <BarChart
          data={data}
          barWidth={barWidth}
          noOfSections={5}
          barBorderRadius={4}
          yAxisThickness={0}
          isAnimated
          spacing={spacing}
          initialSpacing={15}
          frontColor={COLORS.bone}
          xAxisLabelTextStyle={{color: COLORS.bone, textAlign: 'center'}}
          yAxisTextStyle={{color: COLORS.bone}}
        />
      </View>
    </View>
  );
};

export default BarCharComponent;