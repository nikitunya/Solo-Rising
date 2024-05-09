import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./App/navigation/AuthNavigator";


function App() {
  return (
    // isAuthntecited
    <NavigationContainer>
      {/* isAuthntecited ? AuthNavigator : DrawerNavigator */}
      <AuthNavigator />
    </NavigationContainer>
  );
}
 
export default App;