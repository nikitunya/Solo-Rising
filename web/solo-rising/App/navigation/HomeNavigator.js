import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/bottomTabs/ProfileScreen";
import FriendsScreen from "../screens/bottomTabs/FriendsScreen";
import TrainingScreen from "../screens/bottomTabs/TrainingScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ROUTES } from "../constants";
import TrainingNavigator from "./TrainingNavigator";
const Tab = createBottomTabNavigator();

function HomeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: COLORS.primaryBlue,
        tabBarStyle: {
          backgroundColor: "#27272A",
          borderTopWidth: 0,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === ROUTES.PROFILE) {
            iconName = "person";
          } else if (route.name === ROUTES.FRIENDS) {
            iconName = "person-add";
          } else if (route.name === ROUTES.TRAINING_NAVIGATOR) {
            iconName = "fitness";
          }

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      <Tab.Screen name={ROUTES.FRIENDS} component={FriendsScreen} />
      <Tab.Screen name={ROUTES.TRAINING_NAVIGATOR} component={TrainingNavigator} />
    </Tab.Navigator>
  );
}

export default HomeNavigator;
