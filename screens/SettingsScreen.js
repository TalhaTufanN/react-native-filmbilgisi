import {
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "../theme/theme";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3Icon,
  PaintBrushIcon,
  LanguageIcon,
  BellIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const ios = Platform.OS == "ios";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const settingsOptions = [
    {
      id: 1,
      title: "Tema Ayarları",
      icon: <PaintBrushIcon size="24" color="white" />,
      onPress: () =>
        Alert.alert(
          "Tema Ayarları",
          "Karanlık ve Aydınlık tema seçeneği yakında eklenecektir.",
        ),
    },
    {
      id: 2,
      title: "Uygulama Dili",
      icon: <LanguageIcon size="24" color="white" />,
      onPress: () =>
        Alert.alert(
          "Uygulama Dili",
          "Geçerli dil: Türkçe. Diğer dil seçenekleri yapım aşamasındadır.",
        ),
    },
    {
      id: 3,
      title: "Bildirimler",
      icon: <BellIcon size="24" color="white" />,
      onPress: () =>
        Alert.alert(
          "Bildirimler",
          "Film güncellemeleri ve hatırlatmalar için bildirim izinlerini cihaz ayarlarınızdan yönetebilirsiniz.",
        ),
    },
    {
      id: 4,
      title: "Gizlilik",
      icon: <ShieldCheckIcon size="24" color="white" />,
      onPress: () =>
        Alert.alert(
          "Gizlilik",
          "Verileriniz yalnızca cihazınızda güvenle saklanmaktadır.",
        ),
    },
    {
      id: 5,
      title: "Hakkında",
      icon: <InformationCircleIcon size="24" color="white" />,
      onPress: () =>
        Alert.alert(
          "Film Bilgisi Hakkında",
          "Bu uygulama The Movie Database (TMDB) API kullanmaktadır. Sürüm: 1.0.0",
        ),
    },
  ];

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
            Ayarlar
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="mt-4"
      >
        <View className="mx-4 space-y-3">
          {settingsOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={option.onPress}
              className="flex-row items-center justify-between bg-neutral-800 p-4 rounded-2xl"
            >
              <View className="flex-row items-center">
                <View className="bg-neutral-700 p-2 rounded-xl mr-4">
                  {option.icon}
                </View>
                <Text className="text-white text-lg">{option.title}</Text>
              </View>
              <ChevronRightIcon size="20" color="gray" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
