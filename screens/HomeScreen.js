import { StatusBar, Text, View, TouchableOpacity, Image, ScrollView, Platform} from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bars3Icon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../theme/theme'
import TrendingMovies from '../components/TrendingMovies'
import MovieList from '../components/MovieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb'

const ios=Platform.OS=="ios"
export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading , setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(()=> {
    getTrendMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  },[])

  const getTrendMovies= async()=>{
    const data = await fetchTrendingMovies();
    // console.log('Trend filmler: ',data);
    if(data && data.results) setTrending(data.results);
    setLoading(false);
  }
  const getUpcomingMovies= async()=>{
    const data = await fetchUpcomingMovies();
    // console.log('Yakındaki filmler: ',data);
    if(data && data.results) setUpcoming(data.results);

  }
  const getTopRatedMovies= async()=>{
    const data = await fetchTopRatedMovies();
    // console.log('Top filmler: ',data);
    if(data && data.results) setTopRated(data.results);
  
  }

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
            <TouchableOpacity onPress={()=>navigation.navigate("Search")}>
              <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
            </TouchableOpacity>
          </View>
     
      </SafeAreaView>

     
      {
        loading?(
          <Loading />
        ):(
          <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}
          >
            {/* Trend Filmler carousel */}
            {trending.length>0 && <TrendingMovies data={trending} />}
            {/* Yakında Gelecek Filmler*/}
            <MovieList title="Yakında" data={upcoming}/>
            {/* En iyi Filmler*/}
            <MovieList title="En İyiler" data={topRated}/>

          </ScrollView>

        )
      }
     
   

    </View>
  )
}
