import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { COLORS, ROUTES } from "../../constants";
import {
  acceptFriendRequest,
  deleteFriendRequest,
  getFriendRequests,
} from "../../../services/friendsService";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../services/firebase.config";
import { getCurrentUserData } from "../../../services/auth";

const FriendsRoute = ({ friends }) => {
  if (!friends) 
    return <View />
  return (
    <View className="flex-1 bg-neutral-900">
      {friends.map((friend) => (
        <View
          key={friend.id}
          className="flex-row justify-center items-center bg-zinc-800 py-2 px-4 rounded-3xl my-1 mx-2 mt-5"
        >
          <Text className="text-white text-lg font-bold">
            username: {friend.username}
          </Text>
        </View>
      ))}
    </View>
  );
};

const RequestRoute = ({ friendRequests }) => {
  const navigation = useNavigation();
  const handleReject = async (requestId) => {
    try {
      await deleteFriendRequest(requestId);
      console.log("Friend request deleted successfully!");
    } catch (error) {
      console.error("Error deleting friend request:", error);
    }
  };

  const handleAccept = async (requestId, senderId) => {
    try {
      await acceptFriendRequest(requestId, senderId);
      navigation.navigate(ROUTES.FRIENDS);
      //   console.log(`Accepted friend request from ${senderUsername}`);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };
  return (
    <View className="flex-1 bg-neutral-900">
      {friendRequests.map((request) => (
        <View
          key={request.id}
          className="flex-row justify-between items-center bg-zinc-800 py-2 px-4 rounded-3xl my-1 mx-2 mt-5"
        >
          <TouchableOpacity
            className="flex-row items-center justify-between w-full"
            onPress={() => handleReject(request.id)}
          >
            <AntDesign name="close" size={30} color={COLORS.red} />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">
            {request.senderUsername}
          </Text>
          <TouchableOpacity
            className="flex-row items-center justify-between w-full"
            onPress={() => handleAccept(request.id, request.senderId)}
          >
            <AntDesign name="check" size={30} color={COLORS.primaryBlue} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

function ViewFriendsScreen() {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [friendRequests, setFriendRequests] = useState([]);
  //   const [userData, setUserData] = useState([
  //     {
  //       friendList: [
  //         {
  //           fullName: "Testinis",
  //           id: "6p0TygTBxsY4QarDWmGsf2Qk79n2",
  //           username: "test",
  //         },
  //       ],
  //     },
  //   ]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const renderScene = SceneMap({
    friends: () => <FriendsRoute friends={userData.friendList} />,
    requests: () => <RequestRoute friendRequests={friendRequests} />,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = await getFriendRequests();
        setFriendRequests(requests);

        const userData = await getCurrentUserData();
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [routes] = React.useState([
    { key: "friends", title: "Friends" },
    { key: "requests", title: "Requests" },
  ]);

  if (loading) {
    return <View className="flex-1 bg-neutral-900"></View>;
  }
  return (
    <View className="flex-1 bg-neutral-900">
      <View className="flex-row items-center mt-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl mt-2 bg-blue-700 ml-4"
        >
          <AntDesign name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View className="items-center">
        <Text className="text-white font-bold text-3xl">My Friends</Text>
      </View>
      <TabView
        className="mt-5"
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        activeColor={COLORS.primaryBlue}
        style={{ indicatorStyle: COLORS.primaryBlue }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: COLORS.secondaryBackground }}
            indicatorStyle={{ backgroundColor: COLORS.primaryBlue }}
          />
        )}
      />
    </View>
  );
}

export default ViewFriendsScreen;
