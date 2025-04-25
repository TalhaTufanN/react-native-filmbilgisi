import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { styles } from "../theme/theme";

export default function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      {/* Header / Logo */}
      <View style={{ padding: 20, borderBottomWidth: 1, borderColor: "#333" }}>
        <Text className="text-yellow-300 text-3xl font-bold">
          <Text style={styles.text}>Film</Text>
          Bilgisi
          <Text style={styles.text}></Text>
        </Text>
      </View>

      {/* Drawer Menüsü */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 10 }}
      >
        <DrawerItemList {...props} />
        <DrawerItem
          inactiveTintColor="red"
          activeTintColor="white"
          label="Help"
          onPress={() => Linking.openURL("https://github.com/TalhaTufanN")}
        />
      </DrawerContentScrollView>

      {/* Alt Kısım */}
      <View style={{ padding: 20, borderTopWidth: 1, borderColor: "#333" }}>
        <TouchableOpacity onPress={() => console.log("Çıkış yap")}>
          <Text style={{ color: "white" }}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
