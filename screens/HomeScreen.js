import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bars3Icon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from "../theme/theme";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTrendingTv,
  fetchTopRatedTv,
} from "../api/moviedb";

const ios = Platform.OS == "ios";
export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Movies"); // "Movies" or "TvShows"
  const navigation = useNavigation();

  useEffect(() => {
    getMoviesAndTvData();
  }, []);

  const getMoviesAndTvData = async () => {
    setLoading(true);
    await Promise.all([
      getTrendMovies(),
      getUpcomingMovies(),
      getTopRatedMovies(),
      getTrendTv(),
      getTopRatedTv(),
    ]);
    setLoading(false);
  };

  const getTrendMovies = async () => {
    try {
      const data = await fetchTrendingMovies();
      if (data && data.results) setTrending(data.results);
    } catch (error) {
      console.log("TrendMovies HATASI: " + error.message);
    }
  };
  const getUpcomingMovies = async () => {
    try {
      const data = await fetchUpcomingMovies();
      if (data && data.results) setUpcoming(data.results);
    } catch (error) {
      console.log("UpcomingMovies HATASI: " + error.message);
    }
  };
  const getTopRatedMovies = async () => {
    try {
      const data = await fetchTopRatedMovies();
      if (data && data.results) setTopRated(data.results);
    } catch (error) {
      console.log("TopRatedMovies HATASI: " + error.message);
    }
  };

  const getTrendTv = async () => {
    try {
      const data = await fetchTrendingTv();
      if (data && data.results) setTrendingTv(data.results);
    } catch (error) {
      console.log("TrendTv HATASI: " + error.message);
    }
  };
  const getTopRatedTv = async () => {
    try {
      const data = await fetchTopRatedTv();
      if (data && data.results) setTopRatedTv(data.results);
    } catch (error) {
      console.log("TopRatedTv HATASI: " + error.message);
    }
  };

  return (
    <View className="flex-1 bg-neutral-900 p-1">
      {/* Arama bölümü ve logo*/}
      <SafeAreaView className={ios ? "-mb-2" : "mb-2"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center bg-neutral-900 py-1">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View className="p-2 bg-neutral-800 rounded-r-full">
              <Bars3Icon size="30" strokeWidth={2} color="white" />
            </View>
          </TouchableOpacity>

          <Text className="text-yellow-300 text-3xl font-bold">
            <Text style={styles.text}>Ne</Text>
            {" "}İzlesek?
            <Text style={styles.text}></Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <View className="p-2 rounded-full bg-black">
              <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Tab Switcher */}
      <View className="flex-row justify-center items-center mt-2 mb-4 mx-4 bg-neutral-800 rounded-full p-1">
        <TouchableOpacity
          onPress={() => setActiveTab("Movies")}
          className={`flex-1 py-2 rounded-full items-center ${
            activeTab === "Movies" ? "bg-yellow-500" : "bg-transparent"
          }`}
        >
          <Text className={`font-semibold ${activeTab === "Movies" ? "text-white" : "text-neutral-400"}`}>Filmler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("TvShows")}
          className={`flex-1 py-2 rounded-full items-center ${
            activeTab === "TvShows" ? "bg-yellow-500" : "bg-transparent"
          }`}
        >
          <Text className={`font-semibold ${activeTab === "TvShows" ? "text-white" : "text-neutral-400"}`}>Diziler</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {activeTab === "Movies" ? (
            <>
              {/* Trend Filmler carousel */}
              {trending.length > 0 && <TrendingMovies data={trending} />}
              {/* Yakında Gelecek Filmler*/}
              <MovieList title="Yakında" data={upcoming} />
              {/* En iyi Filmler*/}
              <MovieList title="En İyiler" data={topRated} />
            </>
          ) : (
            <>
              {/* Trend Diziler carousel (we can reuse TrendingMovies or create TrendingTv) */}
              {trendingTv.length > 0 && <TrendingMovies data={trendingTv} isTv={true} />}
              {/* En iyi Diziler*/}
              <MovieList title="En İyi Diziler" data={topRatedTv} isTv={true} />
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}
