import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./App/navigation/AuthNavigator";
import Toast from 'react-native-toast-message';

function App() {
  return (
    // isAuthntecited
    <NavigationContainer>
      <AuthNavigator />
      <Toast />
    </NavigationContainer>
  );
}

export default App;
