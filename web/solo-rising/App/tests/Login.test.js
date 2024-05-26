import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native"; // Updated import
import { login } from "../../services/auth";
import { auth } from "../../services/firebase.config";
import LoginScreen from "../screens/auth/LoginScreen";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../../services/auth", () => ({
  login: jest.fn(),
}));
jest.mock("../../services/firebase.config", () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}));

describe("LoginScreen", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully log in with correct credentials", async () => {
    login.mockResolvedValueOnce({ uid: "12345" });

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "test@gmail.com");
    fireEvent.changeText(passwordInput, "123456");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith("test@gmail.com", "123456");
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.PROFILE_NAVIGATOR);
    });
  });

  it("should not authenticate if email and password fields are empty", async () => {
    const { getByText } = render(<LoginScreen />);
    const loginButton = getByText("Login");

    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(login).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
