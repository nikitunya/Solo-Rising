import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "../constants";
import PerfomanceScreen from "../screens/profile/PerfomanceScreen";
import ProfileScreen from "../screens/bottomTabs/ProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileSreen";

const Stack = createStackNavigator();

function ProfileNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTES.PROFILE}>
            <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
            <Stack.Screen name={ROUTES.PROFILE_PERFOMANCE} component={PerfomanceScreen} />
            <Stack.Screen name={ROUTES.PROFILE_EDIT} component={EditProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator;