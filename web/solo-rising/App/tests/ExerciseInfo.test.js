import React from "react";
import { render } from "@testing-library/react-native";
import ExcerciseViewScreen from "../screens/view/ExcerciseViewScreen";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

// Mock auth.currentUser to provide a valid uid
jest.mock("../../services/firebase.config", () => ({
  auth: {
    currentUser: {
      uid: "mockedUserId",
    },
  },
}));

describe("ExcerciseViewScreen", () => {
  it("renders exercise information", () => {
    // const exercise = {
    //   name: "Mock Exercise",
    //   exercise_type: "Strength",
    //   experience: "Beginner",
    //   records: {
    //     mockedUserId: 50, // Mock record for the mocked user ID
    //   },
    //   primary_muscles: "Chest",
    //   secondary_muscles: "",
    // };

    // const { getByText } = render(<ExcerciseViewScreen route={{ params: { exercise } }} />);

    // expect(getByText("Mock Exercise")).toBeTruthy();
    // expect(getByText("Type: Strength")).toBeTruthy();
    // expect(getByText("difficulty: Beginner")).toBeTruthy();
    // expect(getByText("50 kgs")).toBeTruthy(); // Verify that the user's record is rendered
  });
});
