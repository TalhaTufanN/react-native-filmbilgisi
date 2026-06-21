import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fallbackMoviePoster,
  fetchTvCredits,
  fetchTvDetails,
  fetchSimilarTv,
  fetchTvWatchProviders,
  image500,
} from "../api/moviedb";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TvScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarTv, setSimilarTv] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  const [tv, setTv] = useState();
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    setLoading(true);
    getTvDetails(item.id);
    getTvCredits(item.id);
    getSimilarTvShows(item.id);
    getWatchProviders(item.id);
    checkFavouriteStatus(item.id);
  }, [item]);

  const checkFavouriteStatus = async (id) => {
    try {
      const savedTvShows = await AsyncStorage.getItem("@favourite_tv");
      let favouriteTvShows = savedTvShows ? JSON.parse(savedTvShows) : [];
      const isFav = favouriteTvShows.some((t) => t.id === id);
      toggleFavourite(isFav);
    } catch (error) {
      console.log("Error reading favourite status:", error);
    }
  };

  const handleToggleFavourite = async () => {
    try {
      const savedTvShows = await AsyncStorage.getItem("@favourite_tv");
      let favouriteTvShows = savedTvShows ? JSON.parse(savedTvShows) : [];

      if (isFavourite) {
        favouriteTvShows = favouriteTvShows.filter((t) => t.id !== item.id);
      } else {
        const tvToSave = {
          id: item.id,
          name: tv?.name || item.name,
          poster_path: tv?.poster_path || item.poster_path,
        };
        favouriteTvShows.push(tvToSave);
      }

      await AsyncStorage.setItem(
        "@favourite_tv",
        JSON.stringify(favouriteTvShows),
      );
      toggleFavourite(!isFavourite);
    } catch (error) {
      console.log("Error toggling favourite status:", error);
    }
  };

  const getTvDetails = async (id) => {
    try {
      const data = await fetchTvDetails(id);
      if (data) setTv(data);
      setLoading(false);
    } catch (error) {
      console.error("Tv details fetch error: ", error);
      setLoading(false);
    }
  };

  const getTvCredits = async (id) => {
    try {
      const data = await fetchTvCredits(id);
      if (data && data.cast) setCast(data.cast);
      setLoading(false);
    } catch (error) {
      console.error("Tv credits fetch error: ", error);
      setLoading(false);
    }
  };

  const getSimilarTvShows = async (id) => {
    try {
      const data = await fetchSimilarTv(id);
      if (data && data.results) setSimilarTv(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Similar Tv fetch error: ", error);
      setLoading(false);
    }
  };

  const getWatchProviders = async (id) => {
    try {
      const data = await fetchTvWatchProviders(id);
      if (data && data.results && data.results.TR && data.results.TR.flatrate) {
        setProviders(data.results.TR.flatrate);
      }
    } catch (error) {
      console.error("Watch providers fetch error: ", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="bg-neutral-900 flex-1"
    >
      <View classname="w-full">
        <SafeAreaView className="flex-row justify-between items-center z-20 px-4 bg-neutral-800 py-1">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
            <ChevronLeftIcon size="30" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggleFavourite} className="p-1">
            <HeartIcon
              size="30"
              strokeWidth={2}
              strokeOpacity={1}
              stroke={isFavourite ? "white" : "white"}
              fill={isFavourite ? "white" : "transparent"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: image500(tv?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width: windowWidth, height: windowHeight * 0.5 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.5)", "rgba(23,23,23,1)"]}
              style={{ width: windowWidth, height: windowHeight * 0.5 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      <View style={{ marginTop: -windowHeight * 0.09 }} className="space-y-3">
        <Text className="text-white text-3xl font-bold text-center tracking-wider">
          {tv?.name}
        </Text>
        {tv?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            İlk Yayın - {tv?.first_air_date?.split("-")[0]} - {tv?.number_of_seasons} Sezon
          </Text>
        ) : null}

        <View className="flex-row justify-center mx-4 space-x-2">
          {tv?.genres?.map((genre, index) => {
            let showMinus = index + 1 != tv.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre?.name} {showMinus ? "-" : null}
              </Text>
            );
          })}
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {tv?.overview}
        </Text>
      </View>

      {/* İzleme Platformları */}
      {providers.length > 0 && (
        <View className="mx-4 mt-4 space-y-2">
          <Text className="text-white text-lg font-bold">Nereden İzleyebilirim?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-2">
            {providers.map((provider, index) => (
              <View key={index} className="mr-3 items-center">
                <Image
                  source={{ uri: image500(provider.logo_path) }}
                  className="w-12 h-12 rounded-xl"
                />
                <Text className="text-neutral-400 text-xs mt-1 font-semibold">{provider.provider_name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}
      {similarTv.length > 0 && (
        <MovieList
          title="Benzer Diziler"
          hideSeeAll={true}
          data={similarTv}
          isTv={true}
        />
      )}
    </ScrollView>
  );
}
