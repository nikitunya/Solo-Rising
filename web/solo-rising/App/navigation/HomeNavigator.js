import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, ROUTES } from "../constants";
import TrainingNavigator from "./TrainingNavigator";
import ProfileNavigator from "./ProfileNavigator";
import FriendsNavigator from "./FriendsNavigator";

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

          if (route.name === ROUTES.PROFILE_NAVIGATOR) {
            iconName = "person";
          } else if (route.name === ROUTES.FRIENDS_NAVIGATOR) {
            iconName = "person-add";
          } else if (route.name === ROUTES.TRAINING_NAVIGATOR) {
            iconName = "fitness";
          }

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={ROUTES.PROFILE_NAVIGATOR}
        component={ProfileNavigator}
      />
      <Tab.Screen name={ROUTES.FRIENDS_NAVIGATOR} component={FriendsNavigator} />
      <Tab.Screen
        name={ROUTES.TRAINING_NAVIGATOR}
        component={TrainingNavigator}
      />
    </Tab.Navigator>
  );
}

export default HomeNavigator;
