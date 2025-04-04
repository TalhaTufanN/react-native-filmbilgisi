import {
  View,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, setFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // console.log('person',item)
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    // console.log("oyuncu bilgileri: ", data);
    if (data) setPerson(data);
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    // console.log("oyuncunun filmleri: ", data);
    if (data && data.cast) setPersonMovies(data.cast);
    setLoading(false);
  };

  return (
    <ScrollView
      className="z-20 flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Üst Bölüm - Geri-Favori Butonları*/}
      <SafeAreaView className="flex-row justify-between items-center z-20 px-4 bg-neutral-800  py-1">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
          <ChevronLeftIcon size="30" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl p-1 font-black mx-4">Oyuncu</Text>
        <TouchableOpacity
          onPress={() => setFavourite(!isFavourite)}
          className="p-1"
        >
          <HeartIcon
            size="30"
            strokeWidth={2}
            strokeOpacity={1}
            stroke={isFavourite ? "white" : "white"}
            fill={isFavourite ? "white" : "transparent"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Oyuncu Bilgileri */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="mt-3">
            <View className="flex-row justify-center">
              <View className="items-center border-2 border-neutral-600 rounded-full overflow-hidden h-72 w-72">
                <Image
                  // source={require('../assets/tomhanks.jpg')}
                  source={{ uri: image342(person?.profile_path) }}
                  style={{
                    width: windowWidth * 0.8,
                    height: windowHeight * 0.4,
                    borderRadius: 0,
                  }}
                />
              </View>
            </View>

            <View className="mt-6 items-center">
              <Text className="mt-2 text-white font-bold text-3xl text-center">
                {person?.name}
              </Text>

              <Text className="text-base text-neutral-500 text-center">
                {person?.place_of_birth}
              </Text>
            </View>

            <View className="mt-5 p-4 items-center mx-2 flex-row justify-between bg-neutral-800 rounded-full">
              <View className="border-r-2 border-neutral-400 px-3 items-center">
                <Text className="text-white font-semibold">Cinsiyet</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.gender == 1 ? "Kadın" : "Erkek"}
                </Text>
              </View>

              <View className="border-r-2 border-neutral-400 px-3 items-center">
                <Text className="text-white font-semibold">Doğum Günü</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.birthday}
                </Text>
              </View>

              <View className="border-r-2 border-neutral-400 px-3 items-center">
                <Text className="text-white font-semibold">Rolü</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.known_for_department}
                </Text>
              </View>

              <View className=" px-3 items-center">
                <Text className="text-white font-semibold">Popülerlik</Text>
                <Text className="text-neutral-300 text-sm">
                  {person?.popularity}
                </Text>
              </View>
            </View>
          </View>

          {/* Biyografi */}
          <View className="mt-6 mx-4">
            <Text className="text-white font-bold text-2xl">Biyografi</Text>
            <Text className="text-neutral-300 mt-2">
              {person?.biography || "N/A"}
            </Text>
          </View>

          {/* Filmleri */}
          <View className="mt-6">
            <MovieList
              data={personMovies}
              hideSeeAll={true}
              title={"Oynadığı Diğer Filmler"}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}
