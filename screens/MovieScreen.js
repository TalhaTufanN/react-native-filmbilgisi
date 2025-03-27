import { View, Text, TouchableOpacity, ScrollView, Dimensions, Platform,Image } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useRoute,useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ios=Platform.OS=="ios"

export default function MovieScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    let movieName="The Green Mile"
    const [cast, setCast] = useState([1,2,3,4,5]);
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5]);

    useEffect(() => {
        // Apiden film bilgilerini çekeceğiz.
    }, [item])

  return (
    <ScrollView
    contentContainerStyle={{paddingBottom: 20}}
    className="bg-neutral-900 flex-1"

    >
    {/* Geri butonu ve film afişi */}
    <View classname="w-full">
        <SafeAreaView className="flex-row justify-between items-center z-20 px-4 bg-neutral-800 py-1">
            <TouchableOpacity onPress={()=>navigation.goBack()} className="p-1">
                <ChevronLeftIcon size="30" strokeWidth={2.5} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>toggleFavourite(!isFavourite)} className="p-1">
                <HeartIcon size="30" strokeWidth={2} strokeOpacity={1} stroke={isFavourite ? "white" : "white"}  fill={isFavourite? "white":"transparent"}/>
            </TouchableOpacity>
        </SafeAreaView>
        <View>
            <Image
            source={require('../assets/image3.jpg')}
            style={{ width: windowWidth, height: windowHeight*0.5 }}
            />
            <LinearGradient
            colors={['transparent', 'rgba(23,23,23,0.5)', 'rgba(23,23,23,1)']}
            style={{width:windowWidth, height: windowHeight*0.5}}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
            />
        </View>
    </View>
    {/* Film bilgileri */}
    <View style={{marginTop: -windowHeight*0.09}} className="space-y-3">
        {/* Film Başlığı */}
        <Text className="text-white text-3xl font-bold text-center tracking-wider">
            {movieName}
        </Text>
        {/* Bazı Bilgiler */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
            Yayımlanma - 1999 - 189 dk
        </Text>
        {/* Tür */}
        <View className="flex-row justify-center mx-4 space-x-2">
            <Text className="text-neutral-400 font-semibold text-base text-center">
                Drama  -
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
                Gerilim  - 
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
                Suç
            </Text>
        </View>
        {/* Açıklama  */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et felis at nunc ultricies ultricies. Nullam nec est et mi auctor posuere.
        </Text>
    </View>
    {/* Oyuncular */} 
    <Cast navigation={navigation} cast={cast} />
    {/* Benzer filmler */}
    <MovieList title="Benzer Filmler" hideSeeAll={true} data={similarMovies}/>

    </ScrollView>
  )
}