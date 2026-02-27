import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "../theme/theme";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bars3Icon, HeartIcon } from "react-native-heroicons/outline";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MovieList from "../components/MovieList";
import { fallbackMoviePoster, image185, image342 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function FavouritesScreen() {
  const navigation = useNavigation();
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [favouritePersons, setFavouritePersons] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchFavourites();
    }, []),
  );

  const fetchFavourites = async () => {
    try {
      const savedMovies = await AsyncStorage.getItem("@favourite_movies");
      if (savedMovies) setFavouriteMovies(JSON.parse(savedMovies));

      const savedPersons = await AsyncStorage.getItem("@favourite_persons");
      if (savedPersons) setFavouritePersons(JSON.parse(savedPersons));
    } catch (error) {
      console.log("Error loading favorites:", error);
    }
  };

  const hasFavorites =
    favouriteMovies.length > 0 || favouritePersons.length > 0;

  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView className={ios ? "-mb-2" : "mb-2"}>
        <StatusBar style="light" />
        <View className="flex-row items-center bg-neutral-900 py-1 px-2">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View className="p-2 bg-neutral-800 rounded-r-full">
              <Bars3Icon size="30" strokeWidth={2} color="white" />
            </View>
          </TouchableOpacity>
          <Text className="text-yellow-300 text-3xl font-bold flex-1 text-center mr-10 ">
            Favorilerim
          </Text>
        </View>
      </SafeAreaView>

      {!hasFavorites ? (
        <View className="flex-1 justify-center items-center px-4">
          <View className="bg-neutral-800 rounded-full p-6 mb-6">
            <HeartIcon size="80" strokeWidth={1} color="gray" />
          </View>
          <Text className="text-white text-2xl font-bold mb-3 text-center">
            Henüz Favori Yok
          </Text>
          <Text className="text-neutral-400 text-base text-center mb-10 px-4">
            Beğendiğiniz filmleri favorilerinize ekleyerek daha sonra kolayca
            bulabilirsiniz.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Ana Sayfa")}
            style={{ backgroundColor: "#eab308" }}
            className="py-4 px-10 rounded-full"
          >
            <Text className="text-neutral-900 font-bold text-lg">
              Filmleri Keşfet
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {favouriteMovies.length > 0 && (
            <MovieList
              title="Favori Filmler"
              data={favouriteMovies}
              hideSeeAll={true}
            />
          )}

          {favouritePersons.length > 0 && (
            <View className="mb-8 space-y-4">
              <View className="flex-row justify-between items-center bg-neutral-900 py-2 border-b-2 border-t-2 border-neutral-800">
                <Text className="text-white text-xl font-black mx-5">
                  Favori Oyuncular
                </Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
              >
                {favouritePersons.map((person, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      if (navigation.push) {
                        navigation.push("Person", person);
                      } else {
                        navigation.navigate("Ana Sayfa", {
                          screen: "Person",
                          params: person,
                        });
                      }
                    }}
                  >
                    <View className="space-y-1 mr-4 items-center">
                      <Image
                        source={{
                          uri:
                            image185(person.profile_path) ||
                            fallbackMoviePoster,
                        }}
                        className="rounded-full"
                        style={{ width: width * 0.25, height: width * 0.25 }}
                      />
                      <Text className="text-neutral-300 mt-2">
                        {person?.name?.length > 12
                          ? person.name.slice(0, 12) + "..."
                          : person?.name}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
