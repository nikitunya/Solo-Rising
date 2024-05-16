import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { ROUTES } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import Border from "../../components/Border";
import { getImage } from "../../../services/imageService";
import { getAllPosts } from "../../../services/postsService";

function FriendsScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const postsData = await getAllPosts();
      console.log(postsData)
      const postsWithImages = postsData.filter((post) => post.image);
      const urls = await Promise.all(
        postsWithImages.map(async (post) => {
          const imageUrl = await getImage(post.image);
          return { [post.id]: imageUrl };
        })
      );
      const imageUrlMap = Object.assign({}, ...urls);
      setPosts(postsData);
      setImageUrls(imageUrlMap);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity className="flex-row items-center justify-between py-2">
      <View className="flex-row justify-between items-center bg-zinc-800 py-4 px-4 rounded-3xl my-1 mx-4">
        {item.image ? (
          <Image
            source={{ uri: imageUrls[item.id] }}
            style={{ width: 50, height: 50 }}
          />
        ) : (
          <AntDesign name="user" size={50} color="white" className="mr-4" />
        )}
        <View className="flex-1 items-center">
          <Text className="text-3lg font-bold text-white">{item.name}</Text>
          <Text className="text-base text-white">{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-neutral-900">
      <View className="flex-row items-center justify-between mt-14">
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.VIEW_FRIENDS)}
        >
          <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl ml-4">
            <Text className="text-white py-1 px-9">View Friends</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.ADD_FRIEND)}
        >
          <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl mr-4">
            <Text className="text-white py-1 px-9">Add Friends</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Border />
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Loading...</Text>
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.CREATE_POST);
        }}
      >
        <View className="flex justify-center items-center bg-blue-700 py-1 rounded-3xl my-4 mx-6">
          <Text className="text-white font-bold text-lg">Create Post</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default FriendsScreen;
