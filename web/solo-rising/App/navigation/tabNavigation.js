import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/tabs/ProfileScreen";
import FriendsScreen from "../screens/tabs/FriendsScreen";
import TrainingScreen from "../screens/tabs/TrainingScreen";
import ForumScreen from "../screens/tabs/ForumScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const tabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "#64cc4f",
        tabBarStyle: {
          backgroundColor: "black",
          borderRadius: 15,
        },
      }}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Training"
        component={TrainingScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fitness" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Forum"
        component={ForumScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default tabNavigation;
