import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React from "react";
import { styles } from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { fallbackMoviePoster, image185 } from "../api/moviedb";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function MovieList({ title, data, hideSeeAll, isTv }) {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row justify-between items-center bg-neutral-900 py-2 border-b-2 border-t-2 border-neutral-800">
        <Text className="text-white text-xl font-black mx-5 ">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity
            onPress={() => {
              if (navigation.push) {
                navigation.push("SeeAll", { title, data, isTv });
              } else {
                navigation.navigate("Ana Sayfa", {
                  screen: "SeeAll",
                  params: { title, data, isTv },
                });
              }
            }}
          >
            <Text style={styles.text} className="mx-2">
              Tümünü Gör
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Film Satırı */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                const screenName = isTv ? "Tv" : "Movie";
                if (navigation.push) {
                  navigation.push(screenName, item);
                } else {
                  navigation.navigate("Ana Sayfa", {
                    screen: screenName,
                    params: item,
                  });
                }
              }}
            >
              <View className="space-y-1 mr-4 items-center">
                <Image
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  // source={require('../assets/image3.jpg')}
                  className="rounded-3xl"
                  style={{
                    width: windowWidth * 0.3,
                    height: windowHeight * 0.22,
                    borderRadius: 20,
                  }}
                />

                <Text className="text-neutral-300">
                  {((item?.title || item?.name) || "").length > 15
                    ? ((item?.title || item?.name) || "").slice(0, 15) + "..."
                    : (item?.title || item?.name) || ""}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
