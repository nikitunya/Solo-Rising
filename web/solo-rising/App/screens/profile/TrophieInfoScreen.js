import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {
  getTrophiesByName,
  getTrophiesByType,
  saveTrophiesCustom,
} from "../../../services/trophiesService";
import Border from "../../components/Border";
import { getImage } from "../../../services/imageService";
import { COLORS } from "../../constants";

const { width, height } = Dimensions.get("window");

function TrophiesInfoScreen({ route }) {
  const trophie = route.params.trophie;
  const navigation = useNavigation();
  const [trophies, setTrophies] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        const trophiesData = await getTrophiesByName(trophie.name);
        const trophiesWithImages = await Promise.all(
          trophiesData.map(async (trophy) => {
            const imageUrl = await getImage(trophy.image);
            return { ...trophy, imageUrl };
          })
        );
        const sortedTrophies = trophiesWithImages.sort((a, b) => {
          const order = { bronze: 1, silver: 2, gold: 3 };
          return order[a.type] - order[b.type];
        });

        setTrophies(sortedTrophies);
      } catch (error) {
        console.error("Error fetching trophies:", error);
      }
    };

    fetchTrophies();
  }, []);

  const handleScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  const renderItem = ({ item }) => (
    <View style={{ width, alignItems: "center" }}>
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: 250, height: 250 }}
        resizeMode="contain"
      />
    </View>
  );

  const renderExercises = ({ item }) => (
    <View
      style={{ width: width - 64 }}
      className="items-center bg-zinc-800 py-4 rounded-2xl"
    >
      <Text style={{ color: "white", fontSize: 16 }}>{item.name}</Text>
    </View>
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
      </View>
      <Border />
      <View className="mt-4">
        <FlatList
          data={trophies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={handleScrollEnd}
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ alignItems: "center" }}
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={width}
        />
        {trophies.length > 0 && (
          <View className="items-center mt-4">
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              {trophies[currentIndex].name}
            </Text>
            <Text style={{ color: "white", marginTop: 10, fontSize: 18 }}>
              {trophies[currentIndex].description}
            </Text>
            {/* <Text style={{ color: "white", marginTop: 20, fontSize: 18 }}> // todo: make exercise record
              {trophies[currentIndex].progress}/{trophies[currentIndex].target}
            </Text>
            <Text style={{ color: "white", marginTop: 20, fontSize: 18 }}>
              {trophies[currentIndex].requirements}
            </Text> */}
            <Text className="text-white font-bold text-2xl my-4">
              Exercises:
            </Text>
            <FlatList
              data={trophie.exercises}
              renderItem={renderExercises}
              keyExtractor={(item) => item.name}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default TrophiesInfoScreen;
