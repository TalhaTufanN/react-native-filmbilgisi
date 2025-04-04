import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline";
import Loading from "../components/Loading";
import { debounce } from "lodash";
import { fallbackMoviePoster, image185, SearchMovies } from "../api/moviedb";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true),
        SearchMovies({
          query: value,
          include_adult: "false",
          language: "en-US",
          page: "1",
        }).then((data) => {
          setLoading(false);
          // console.log("filmler bolundu: ", data);
          if (data && data.results) setResults(data.results);
        });
    } else {
      setLoading(false);
      setResults([]);
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
      <View className="flex-row items-center bırder border-neutral-500 bg-neutral-900 py-2">
        <View className="ml-2 mr-2 flex-row items-center bg-neutral-800 px-1 py-1 rounded-full">
          <View className="ml-2 mr-1">
            <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
          </View>

          <TextInput
            onChangeText={handleTextDebounce}
            placeholder="Ara..."
            placeholderTextColor={"lightgray"}
            style={{ color: "white", fontSize: 20 }}
            className="flex-1"
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="rounded-full p-2 bg-neutral-700 m-1"
          >
            <XMarkIcon size="25" color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Sonuçlar */}

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Sonuçlar ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      // source={require("../assets/image3.jpg")}
                      source={{
                        uri: image185(item?.poster_path) || fallbackMoviePoster,
                      }}
                      style={{
                        width: windowWidth * 0.44,
                        height: windowHeight * 0.3,
                      }}
                    />
                    <Text className="text-neutral-400 ml-1">
                      {item?.title?.length > 20
                        ? item?.title.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/noResults.png")}
            className="h-80 w-80"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
