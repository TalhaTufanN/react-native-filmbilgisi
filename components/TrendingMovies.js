import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import { image500 } from "../api/moviedb";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ios = Platform.OS == "ios";

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View justifyContent="center">
      <View className="bg-neutral-800 border border-l-2 border-r-2 border-y-neutral-900 border-x-cyan-50 ">
        <Text className="text-cyan-50 text-xl p-1 font-black self-center">
          Trend Filmler
        </Text>
      </View>

      <View
        dataSet={{ kind: "basic-layouts", name: "parallax" }}
        id="carousel-component"
      >
        <Carousel
          loop={false}
          width={windowWidth}
          mode="parallax"
          modeConfig={{
            parallaxScrollingOffset: 170, // Öğeler arası yakınlık
            parallaxScrollingScale: 0.9, // Aktif öğenin boyutu
            parallaxAdjacentItemScale: 0.7, // Yanındaki öğenin boyutu
          }}
          height={windowHeight * 0.4}
          data={data}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <MovieCard item={item} handleClick={handleClick} />
          )}
          autoPlay={true}
          autoPlayInterval={1000}
          pagingEnabled={true}
          snapEnabled={true}
          snapToAlignment="center"
          style={{
            alignSelf: "center",
            width: windowWidth,
          }}
        />
      </View>
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: windowWidth * 0.65, // Film posterinin genişliği
          height: windowHeight * 0.4,
          borderRadius: windowWidth * 0.06,
        }}
        resizeMode="cover"
        className="self-center"
      />
    </TouchableWithoutFeedback>
  );
};
