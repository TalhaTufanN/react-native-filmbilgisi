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
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState();
  useEffect(() => {
    // console.log('itemid: ',item.id)
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
    checkFavouriteStatus(item.id);
  }, [item]);

  const checkFavouriteStatus = async (id) => {
    try {
      const savedMovies = await AsyncStorage.getItem("@favourite_movies");
      let favouriteMovies = savedMovies ? JSON.parse(savedMovies) : [];
      const isFav = favouriteMovies.some((movie) => movie.id === id);
      toggleFavourite(isFav);
    } catch (error) {
      console.log("Error reading favourite status:", error);
    }
  };

  const handleToggleFavourite = async () => {
    try {
      const savedMovies = await AsyncStorage.getItem("@favourite_movies");
      let favouriteMovies = savedMovies ? JSON.parse(savedMovies) : [];

      if (isFavourite) {
        // Remove from favorites
        favouriteMovies = favouriteMovies.filter(
          (movie) => movie.id !== item.id,
        );
      } else {
        // Add to favorites (saving a concise version of the object to save space)
        const movieToSave = {
          id: item.id,
          title: movie?.title || item.title,
          poster_path: movie?.poster_path || item.poster_path,
        };
        favouriteMovies.push(movieToSave);
      }

      await AsyncStorage.setItem(
        "@favourite_movies",
        JSON.stringify(favouriteMovies),
      );
      toggleFavourite(!isFavourite);
    } catch (error) {
      console.log("Error toggling favourite status:", error);
    }
  };

  const getMovieDetails = async (id) => {
    // Parametreyi parantez içine alın
    try {
      const data = await fetchMovieDetails(id); // id'yi parametre olarak gönder
      // console.log('got movie details: ', data);
      if (data) setMovie(data);
      setLoading(false);
    } catch (error) {
      console.error("Movie details fetch error: ", error);
      setLoading(false);
    }
  };

  const getMovieCredits = async (id) => {
    // Parametreyi parantez içine alın
    try {
      const data = await fetchMovieCredits(id); // id'yi parametre olarak gönder
      // console.log('got movie credits: ', data);
      if (data && data.cast) setCast(data.cast);
      setLoading(false);
    } catch (error) {
      console.error("Movie credits fetch error: ", error);
      setLoading(false);
    }
  };

  const getSimilarMovies = async (id) => {
    // Parametreyi parantez içine alın
    try {
      const data = await fetchSimilarMovies(id); // id'yi parametre olarak gönder
      // console.log('got movie credits: ', data);
      if (data && data.results) setSimilarMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Movie credits fetch error: ", error);
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="bg-neutral-900 flex-1"
    >
      {/* Geri butonu ve film afişi */}
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
              // source={require('../assets/image3.jpg')}
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
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

      {/* Film bilgileri */}
      <View style={{ marginTop: -windowHeight * 0.09 }} className="space-y-3">
        {/* Film Başlığı */}
        <Text className="text-white text-3xl font-bold text-center tracking-wider">
          {movie?.title}
        </Text>
        {/* Bazı Bilgiler */}
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Yayımlanma - {movie?.release_date?.split("-")[0]} - {movie?.runtime}{" "}
            dk
          </Text>
        ) : null}
        {/* Türler */}

        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showMinus = index + 1 != movie.genres.length;
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
        {/* Açıklama  */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>
      {/* Oyuncular */}
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}
      {/* Benzer filmler */}
      {similarMovies.length > 0 && (
        <MovieList
          title="Benzer Filmler"
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
}
