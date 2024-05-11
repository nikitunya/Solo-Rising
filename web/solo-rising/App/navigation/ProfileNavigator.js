import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "../constants";
import PerfomanceScreen from "../screens/profile/PerfomanceScreen";
import ProfileScreen from "../screens/bottomTabs/ProfileScreen";

const Stack = createStackNavigator();

function ProfileNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTES.PROFILE}>
            <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
            <Stack.Screen name={ROUTES.PROFILE_PERFOMANCE} component={PerfomanceScreen} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator;