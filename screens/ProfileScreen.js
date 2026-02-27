import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { styles } from "../theme/theme";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3Icon,
  UserCircleIcon,
  PencilSquareIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ios = Platform.OS == "ios";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [favCount, setFavCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      fetchFavCount();
    }, []),
  );

  const fetchFavCount = async () => {
    try {
      const savedMovies = await AsyncStorage.getItem("@favourite_movies");
      const savedPersons = await AsyncStorage.getItem("@favourite_persons");

      const movies = savedMovies ? JSON.parse(savedMovies).length : 0;
      const persons = savedPersons ? JSON.parse(savedPersons).length : 0;

      setFavCount(movies + persons);
    } catch (error) {
      console.log("Error loading favorites count:", error);
    }
  };

  const handleEditProfile = () => {
    Alert.alert(
      "Profili Düzenle",
      "Profil düzenleme sayfası yakında aktif edilecek.",
    );
  };

  const handleAccountSettings = () => {
    Alert.alert(
      "Hesap Ayarları",
      "Hesap ayarları seçenekleri yapım aşamasındadır.",
    );
  };

  const handleLogout = () => {
    Alert.alert("Çıkış Yap", "Hesabınızdan çıkmak istediğinize emin misiniz?", [
      { text: "İptal", style: "cancel" },
      {
        text: "Çıkış Yap",
        style: "destructive",
        onPress: () => console.log("Çıkış yapıldı"),
      },
    ]);
  };

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
            Profil
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* User Info Section */}
        <View className="items-center mt-6 mb-8">
          <View className="bg-neutral-800 rounded-full p-2 border-2 border-yellow-500">
            <UserCircleIcon size="100" strokeWidth={1} color="white" />
          </View>
          <Text className="text-white text-2xl font-bold mt-4">
            Kullanıcı Adı
          </Text>
          <Text className="text-neutral-400 text-base mt-1">
            kullanici@ornek.com
          </Text>
        </View>

        {/* Stats Row */}
        <View className="flex-row justify-around bg-neutral-800 mx-4 py-4 rounded-2xl mb-8 border border-neutral-700">
          <View className="items-center">
            <Text className="text-white text-xl font-bold">120</Text>
            <Text className="text-neutral-400 text-sm mt-1">İzlenen</Text>
          </View>
          <View className="w-px bg-neutral-600" />
          <View className="items-center">
            <Text className="text-white text-xl font-bold">{favCount}</Text>
            <Text className="text-neutral-400 text-sm mt-1">Favoriler</Text>
          </View>
          <View className="w-px bg-neutral-600" />
          <View className="items-center">
            <Text className="text-white text-xl font-bold">12</Text>
            <Text className="text-neutral-400 text-sm mt-1">Yorumlar</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View className="mx-4 space-y-3">
          <Text className="text-neutral-300 font-bold ml-2 mb-2">
            Hesap Detayları
          </Text>

          <TouchableOpacity
            onPress={handleEditProfile}
            className="flex-row items-center justify-between bg-neutral-800 p-4 rounded-2xl"
          >
            <View className="flex-row items-center">
              <PencilSquareIcon size="24" color="white" className="mr-4" />
              <Text className="text-white text-lg ml-4">Profili Düzenle</Text>
            </View>
            <ChevronRightIcon size="20" color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleAccountSettings}
            className="flex-row items-center justify-between bg-neutral-800 p-4 rounded-2xl"
          >
            <View className="flex-row items-center">
              <CogIcon size="24" color="white" className="mr-4" />
              <Text className="text-white text-lg ml-4">Hesap Ayarları</Text>
            </View>
            <ChevronRightIcon size="20" color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-between bg-neutral-800 p-4 rounded-2xl mt-4"
          >
            <View className="flex-row items-center">
              <ArrowRightOnRectangleIcon
                size="24"
                color="#ef4444"
                className="mr-4"
              />
              <Text className="text-red-500 text-lg ml-4">Çıkış Yap</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
