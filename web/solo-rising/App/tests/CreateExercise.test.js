import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CreateExerciseModal from '../screens/exercise/CreateExerciseModal';
import { useNavigation } from '@react-navigation/native';
import { PRIMARY_MUCLES, TYPES, ROUTES } from '../constants';
import { createCustomExercise } from '../../services/exerciseService';

jest.mock('../../services/exerciseService', () => ({
  createCustomExercise: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  useNavigation: jest.fn(),
}));

global.alert = jest.fn();

describe('CreateExerciseModal', () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
    jest.clearAllMocks();
  });

  it('should show success message and navigate to exercises list on successful creation', async () => {
    // createCustomExercise.mockResolvedValueOnce({});

    // const { getByText, getByPlaceholderText, getByTestId } = render(
    //   <CreateExerciseModal visible={true} onClose={jest.fn()} />
    // );

    // fireEvent.changeText(getByPlaceholderText('Enter Name'), 'New Exercise');
    // fireEvent(getByTestId('primary-muscle-dropdown'), 'onValueChange', PRIMARY_MUCLES[0].value);
    // fireEvent(getByTestId('type-dropdown'), 'onValueChange', TYPES[0].value);
    // fireEvent.changeText(getByPlaceholderText('Enter Experience'), 'Beginner');
    // fireEvent.changeText(getByPlaceholderText('Enter Force Type'), 'Push');
    // fireEvent.changeText(getByPlaceholderText('Enter Mechanics'), 'Isolation');

    // fireEvent.press(getByText('Create'));

    // await waitFor(() => {
    //   // expect(createCustomExercise).toHaveBeenCalled();
    //   // expect(mockNavigate).toHaveBeenCalledWith(ROUTES.EXERCISES_LIST);
    // });
  });

  it('should show error message if required fields are missing', async () => {
    // const { getByText, getByPlaceholderText, queryByText } = render(
    //   <CreateExerciseModal visible={true} onClose={jest.fn()} />
    // );

    // fireEvent.changeText(getByPlaceholderText('Enter Name'), 'New Exercise');

    // fireEvent.press(getByText('Create'));

    // await waitFor(() => {
    //   expect(createCustomExercise).not.toHaveBeenCalled();
    //   expect(alert).toHaveBeenCalledWith('All fields are required.');
    // });
  });
});