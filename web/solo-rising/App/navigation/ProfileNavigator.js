import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "../constants";
import PerfomanceScreen from "../screens/profile/PerfomanceScreen";
import ProfileScreen from "../screens/bottomTabs/ProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileSreen";
import CreatePostScreen from "../screens/posts/CreatePostScreen";
import WorkoutHistoryScreen from "../screens/workout/WorkoutHistoryScreen";
import WorkoutReviewScreen from "../screens/workout/WorkoutReviewScreen";
import MyTrophiesScreen from "../screens/profile/MyTrophiesScreen";
import TrophiesInfoScreen from "../screens/profile/TrophieInfoScreen";

const Stack = createStackNavigator();

function ProfileNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTES.PROFILE}>
            <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
            <Stack.Screen name={ROUTES.PROFILE_PERFOMANCE} component={PerfomanceScreen} />
            <Stack.Screen name={ROUTES.PROFILE_EDIT} component={EditProfileScreen} />
            <Stack.Screen name={ROUTES.WORKOUT_HISTORY} component={WorkoutHistoryScreen} />
            <Stack.Screen name={ROUTES.WORKOUT_REVIEW} component={WorkoutReviewScreen} />
            <Stack.Screen name={ROUTES.MY_TROPHIES} component={MyTrophiesScreen} />
            <Stack.Screen name={ROUTES.TROPHIES_INFO} component={TrophiesInfoScreen} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator;