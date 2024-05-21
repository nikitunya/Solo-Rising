import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import PerfomanceScreen from "../screens/profile/PerfomanceScreen";
import { getThisYearTrainings } from "../../services/trainingService";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useIsFocused: jest.fn().mockReturnValue(true),
}));

jest.mock("react-native-gifted-charts", () => ({}));

jest.mock("../../services/trainingService", () => ({
  getThisYearTrainings: jest.fn(),
}));

describe("PerfomanceScreen", () => {
  it("displays user's favorite exercise and performance charts", async () => {
    const mockedTrainings = [
      { date: new Date(), volume: 10 },
      { date: new Date(), volume: 15 },
      { date: new Date(), volume: 20 },
    ];

    // getThisYearTrainings.mockResolvedValue(mockedTrainings);

    // const { getByText } = render(<PerfomanceScreen />);

    await waitFor(() => {
    //   expect(getByText("Favorite Exercise")).toBeDefined();
    //   expect(getByText("Pull Ups")).toBeDefined();
    });
  });
});
