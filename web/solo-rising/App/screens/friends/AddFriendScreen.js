import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Dimensions, Image } from "react-native";
import { COLORS, ROUTES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import Border from "../../components/Border";
import { getFriends } from "../../../services/friendsService";

const screenWidth = Dimensions.get("window").width;

function AddFriendScreen() {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getFriends(searchInput);
      setUsers(usersList);
    };

    fetchUsers();
  }, [searchInput]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(ROUTES.ADD_FRIEND_PROFILE, { user: item })
      }
    >
      <View className="flex-row justify-between items-center bg-zinc-800 py-2 px-4 rounded-3xl my-1 mx-2">
        <Image
          source={require("../../utils/images/logo.png")}
          style={{ width: screenWidth * 0.15, height: screenWidth * 0.15 }}
        />
        <Text className="text-blue-700 font-bold text-lg flex-1 ml-3">
          {item.level}
        </Text>
        <View className="flex-1 items-center">
          <Text className="text-white text-center font-bold">
            {item.username}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
      <View className="flex-row items-center justify-between bg-gray-100 rounded-full py-2 px-4 mt-8">
        <TextInput
          className="flex-1 text-gray-700"
          placeholder="Freesearch"
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
        <AntDesign name="search1" size={24} color={COLORS.textColor} />
      </View>
      <Text className="text-white mt-4 text-lg font-bold ml-4">
        Recommended for you
      </Text>
      <Border />
      {users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

export default AddFriendScreen;
