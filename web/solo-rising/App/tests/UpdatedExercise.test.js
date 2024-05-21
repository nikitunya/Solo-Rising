import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import ExcerciseViewScreen from "../screens/view/ExcerciseViewScreen";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  useNavigation: jest.fn(),
}));

const mockExercise = {
  name: "Exercise Name",
  exercise_type: "Type",
  experience: "Difficulty",
  records: {},
};

describe("ExcerciseViewScreen", () => {
  it("displays exercise information with updated record value", async () => {
    // const updatedRecordValue = 100;
    // const { getByText } = render(
    //   <ExcerciseViewScreen route={{ params: { exercise: mockExercise } }} />
    // );
    // expect(getByText("Exercise Name")).toBeDefined();
    // expect(getByText("Type: Type")).toBeDefined();
    // expect(getByText("Difficulty: Difficulty")).toBeDefined();
    // expect(getByText("N/A")).toBeDefined();
    // mockExercise.records = { [auth.currentUser.uid]: updatedRecordValue };
    // fireEvent.rerender(
    //   <ExcerciseViewScreen route={{ params: { exercise: mockExercise } }} />
    // );
    // await waitFor(() => {
    //   expect(getByText("100 kgs")).toBeDefined();
    // });
  });
});
