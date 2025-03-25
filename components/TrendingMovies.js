import React from 'react'
import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import Animated from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

// const { width: screenWidth } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function TrendingMovies({data}) {
  const navigation = useNavigation()
  const handleClick = () => {
    navigation.navigate('Movie',item)
  }
  return (
    <View justifyContent="center">
        <Text className="text-white text-xl mt-5 font-black mx-5 ">Trend Filmler</Text>
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
            autoPlay={true}
            autoPlayInterval={1000}
            pagingEnabled={true}
            snapToAlignment="center"
          />
      </View>
    </View>
    
  )
}

const MovieCard = ({item,handleClick}) => {
    return (
        <TouchableWithoutFeedback onPress={handleClick} >
          <Image 
            source={require('../assets/image2.jpg')}
            style={{ width: windowWidth*0.6, height: windowHeight * 0.4, borderRadius: windowWidth*0.06 }}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
    )
}