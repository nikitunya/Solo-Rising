import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {
  getAllTrophies,
  getTrophiesByType,
  saveTrophiesCustom,
} from "../../../services/trophiesService";
import Border from "../../components/Border";
import { getImage } from "../../../services/imageService";
import { ROUTES } from "../../constants";
import { auth } from "../../../services/firebase.config";

function MyTrophiesScreen() {
  const navigation = useNavigation();
  const [trophies, setTrophies] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        const trophiesData = await getAllTrophies();
        const trophiesWithImages = await Promise.all(
          trophiesData.map(async (trophy) => {
            const imageUrl = await getImage(trophy.image);
            return { ...trophy, imageUrl };
          })
        );

        const groupedTrophies = {};

        trophiesWithImages.forEach((trophy) => {
          if (!groupedTrophies[trophy.name]) {
            groupedTrophies[trophy.name] = [];
          }
          groupedTrophies[trophy.name].push(trophy);
        });

        const sortedTrophies = [];
        Object.values(groupedTrophies).forEach((trophies) => {
          let bestTrophy = null;
          trophies.forEach((trophy) => {
            if (trophy.unlockedBy == auth.currentUser.uid) {
              if (!bestTrophy || trophy.type === "gold") {
                bestTrophy = trophy;
              } else if (
                trophy.type === "silver" &&
                bestTrophy.type !== "gold"
              ) {
                bestTrophy = trophy;
              } else if (
                trophy.type === "bronze" &&
                bestTrophy.type === "bronze"
              ) {
                bestTrophy = trophy;
              }
            }
          });

          if (bestTrophy) {
            sortedTrophies.push(bestTrophy);
          }
        });

        setTrophies(sortedTrophies);
      } catch (error) {
        console.error("Error fetching trophies:", error);
      }
    };

    fetchTrophies();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="flex-1"
      onPress={() =>
        navigation.navigate(ROUTES.TROPHIES_INFO, { trophie: item })
      }
    >
      <View className="flex-1 items-center m-2">
        <View className="border-2 border-blue-700 rounded-lg p-2 bg-zinc-800">
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: 80, height: 80 }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black px-4 pt-3">
      <View className="flex-row items-center mt-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-tr-2xl rounded-bl-2xl mt-2 bg-blue-700 ml-4"
        >
          <AntDesign name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
        <Text className="flex text-white ml-20 text-xl font-bold">
          My Trophies
        </Text>
      </View>
      <Border />
      <Border />
      <FlatList
        data={trophies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
}

export default MyTrophiesScreen;
