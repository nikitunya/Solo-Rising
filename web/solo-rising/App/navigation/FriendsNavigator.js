import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "../constants";
import FriendsScreen from "../screens/bottomTabs/FriendsScreen";
import AddFriendScreen from "../screens/friends/AddFriendScreen";
import AddFriendProfile from "../screens/friends/AddFriendProfile";
import ViewFriendsScreen from "../screens/friends/ViewFriendsScreen";

const Stack = createStackNavigator();

function FriendsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ROUTES.FRIENDS}
    >
      <Stack.Screen name={ROUTES.FRIENDS} component={FriendsScreen} />
      <Stack.Screen name={ROUTES.ADD_FRIEND} component={AddFriendScreen} />
      <Stack.Screen name={ROUTES.ADD_FRIEND_PROFILE} component={AddFriendProfile} />
      <Stack.Screen name={ROUTES.VIEW_FRIENDS} component={ViewFriendsScreen} />
    </Stack.Navigator>
  );
}

export default FriendsNavigator;
