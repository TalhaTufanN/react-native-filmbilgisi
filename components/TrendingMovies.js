import React from 'react'
import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import Animated from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { Platform } from 'react-native'
import { image500 } from '../api/moviedb'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ios=Platform.OS=="ios"

export default function TrendingMovies({data}) {
  const navigation = useNavigation()
  const handleClick = (item) => {
    navigation.navigate('Movie',item)
  }
  return (
    <View justifyContent="center">
      <View className="bg-neutral-800"> 
        <Text className="text-white text-xl p-1 font-black mx-4">Trend Filmler</Text>
      </View>
      
        <View dataSet={{ kind: "basic-layouts", name: "parallax" }} id="carousel-component">
        
          <Carousel
            loop={false}
            width={windowWidth}
            mode="parallax"
            modeConfig={{
              parallaxScrollingOffset: 0.9,
              parallaxScrollingScale: 0.9,
            }}
            height={windowHeight * 0.4}
            data={data}
            scrollAnimationDuration={1000}
            renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
            autoPlay={false}
            // autoPlayInterval={1000}
            pagingEnabled={true}
            snapToAlignment="center"
          />
      </View>
    </View>
    
  )
}

const MovieCard = ({item,handleClick}) => {
    // console.log('item.poster_path',item.poster_path);
    return (
        <TouchableWithoutFeedback onPress={()=>handleClick(item)} >
          <Image 
            // source={require('../assets/image2.jpg')}
            source={{uri:image500(item.poster_path)}}
            style={{ width: windowWidth*0.6, height: windowHeight * 0.4, borderRadius: windowWidth*0.06 }}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
    )
}
