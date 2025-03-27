import { StatusBar, Text, View, TouchableOpacity, Image, ScrollView, Platform} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bars3Icon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../theme/theme'
import TrendingMovies from '../components/TrendingMovies'
import MovieList from '../components/MovieList'

const ios=Platform.OS=="ios"
export default function HomeScreen() {
  const [trending, setTrending] = useState([1,2,3])
  const [upcoming, setUpcoming] = useState([1,2,3])
  const [topRated, setTopRated] = useState([1,2,3])
  return (
    <View className="flex-1 bg-neutral-900 p-1">
      {/* Arama bölümü ve logo*/}
      <SafeAreaView className={ios?"-mb-2": "mb-2"}>
        <StatusBar style="light" />
          <View className="flex-row justify-between items-center bg-neutral-800 py-1">
            <Bars3Icon size="30" strokeWidth={2} color="white"/>
            <Text className="text-yellow-100 text-3xl font-bold">
              <Text style={styles.text}>Filmovie</Text>
              TR
              <Text style={styles.text}></Text>
            </Text>
            <TouchableOpacity> 
              <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 10}}
      >
        {/* Trend Filmler carousel */}
        <TrendingMovies data={trending} />
        {/* Yakında Gelecek Filmler*/}
        <MovieList title="Yakında" data={upcoming}/>
        {/* En iyi Filmler*/}
        <MovieList title="En İyiler" data={topRated}/>

      </ScrollView>
    </View>
  )
}
