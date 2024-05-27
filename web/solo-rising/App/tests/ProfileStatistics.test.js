import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import PerfomanceScreen from "../screens/profile/PerfomanceScreen";
import { getThisYearTrainings } from "../../services/trainingService";
import BarCharComponent from "../components/BarCharComponent";
import { View } from "react-native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useIsFocused: jest.fn().mockReturnValue(true),
}));

jest.mock("react-native-gifted-charts", () => ({}));

jest.mock("../../services/trainingService", () => ({
  getThisYearTrainings: jest.fn(),
}));

jest.mock("../components/BarCharComponent", () => {
  const React = require('react');
  const { View } = require('react-native');
  return (props) => <View testID="BarCharComponent" {...props} />;
});

describe("PerfomanceScreen", () => {
  it("displays user's favorite exercise and performance charts", async () => {
    const mockedTrainings = [
      { date: new Date(), volume: 10 },
      { date: new Date(), volume: 15 },
      { date: new Date(), volume: 20 },
    ];

    getThisYearTrainings.mockResolvedValue(mockedTrainings);

    const { getByText, getByTestId } = render(<PerfomanceScreen />);

    await waitFor(() => {
      expect(getByText("Favorite Exercise")).toBeDefined();
      expect(getByText("Pull Ups")).toBeDefined();
    });

    const volumeBarCharComponent = getByTestId("VolumeBarCharComponent");
    expect(volumeBarCharComponent.props.data.length).toBeGreaterThan(0);
  
    // Test the second BarCharComponent
    const countBarCharComponent = getByTestId("CountBarCharComponent");
    expect(countBarCharComponent.props.data.length).toBeGreaterThan(0);
  });
});
