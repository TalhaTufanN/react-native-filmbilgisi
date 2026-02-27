import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "../theme/theme";
import { fallbackMoviePoster, image185 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function SeeAllScreen() {
  const navigation = useNavigation();
  const {
    params: { title, data },
  } = useRoute();

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* Header */}
      <SafeAreaView
        className={
          "w-full flex-row justify-between items-center px-4 mt-3" +
          (ios ? "" : " mt-3")
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-xl p-1 bg-yellow-400"
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold flex-1 text-center mr-8">
          {title}
        </Text>
      </SafeAreaView>

      {/* Movies Grid */}
      <View className="flex-row justify-between flex-wrap px-4 mt-6">
        {data && data.length > 0 ? (
          data.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    source={{
                      uri: image185(item.poster_path) || fallbackMoviePoster,
                    }}
                    className="rounded-3xl"
                    style={{
                      width: width * 0.44,
                      height: height * 0.3,
                    }}
                  />
                  <Text className="text-gray-300 ml-1">
                    {item?.title?.length > 22
                      ? item.title.slice(0, 22) + "..."
                      : item?.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })
        ) : (
          <Text className="text-white text-center w-full mt-10">
            Film bulunamadı.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
