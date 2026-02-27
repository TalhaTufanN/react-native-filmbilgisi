import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../theme/theme";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bars3Icon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
const ios = Platform.OS == "ios";
export default function ProfileScreen() {
  const navigation = useNavigation();
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
            <Text style={styles.text}>Film</Text>
            Bilgisi
            <Text style={styles.text}></Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
