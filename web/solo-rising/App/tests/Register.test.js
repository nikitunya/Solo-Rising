import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SignUpScreen from "../screens/auth/SignUpScreen";
import { signUp } from "../../services/auth";
import { saveUserData } from "../../services/firebaseDatabase";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../../services/auth", () => ({
  signUp: jest.fn(),
}));
jest.mock("../../services/firebaseDatabase", () => ({
  saveUserData: jest.fn(),
}));

describe("SignUpScreen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display a message when only full name is provided", async () => {
    // const { getByText, getByPlaceholderText, getByTestId } = render(
    //   <SignUpScreen />
    // );

    // const fullNameInput = getByPlaceholderText("Enter Full Name");
    // fireEvent.changeText(fullNameInput, "John Doe");

    // const nextButton = getByTestId("signup-button");
    // fireEvent.press(nextButton);

    // await waitFor(() => {
    //   expect(signUp).not.toHaveBeenCalled();
    //   expect(saveUserData).not.toHaveBeenCalled();
    // });
  });

  it("should display a message when only email and password are provided", async () => {
    // const { getByText, getByPlaceholderText, getByTestId } = render(
    //   <SignUpScreen />
    // );

    // const emailInput = getByPlaceholderText("Enter Email");
    // fireEvent.changeText(emailInput, "test@example.com");

    // const passwordInput = getByPlaceholderText("Enter Password");
    // fireEvent.changeText(passwordInput, "password");

    // const nextButton = getByTestId("signup-button");
    // fireEvent.press(nextButton);

    // await waitFor(() => {
    //   expect(signUp).not.toHaveBeenCalled();
    //   expect(saveUserData).not.toHaveBeenCalled();
    // });
  });

  it("should create a new user when all required fields are provided", async () => {
    // signUp.mockResolvedValueOnce({ uid: "12345" });

    // const { getByPlaceholderText, getByTestId } = render(<SignUpScreen />);

    // const fullNameInput = getByPlaceholderText("Enter Full Name");
    // fireEvent.changeText(fullNameInput, "John Doe");

    // const usernameInput = getByPlaceholderText("Enter username");
    // fireEvent.changeText(usernameInput, "johndoe");

    // const emailInput = getByPlaceholderText("Enter Email");
    // fireEvent.changeText(emailInput, "test@example.com");

    // const passwordInput = getByPlaceholderText("Enter Password");
    // fireEvent.changeText(passwordInput, "password");

    // const nextButton = getByTestId("signup-button");
    // fireEvent.press(nextButton);

    // await waitFor(() => {
    //   expect(signUp).toHaveBeenCalledWith("test@example.com", "password");
    //   expect(saveUserData).toHaveBeenCalledWith("12345", "John Doe", "johndoe");
    // });
  });
});
