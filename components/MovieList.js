import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { styles } from '../theme/theme'
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MovieList({title, data, hideSeeAll}) {
  const navigation = useNavigation();
  let movieName="The Green Mile"
  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row justify-between items-center bg-neutral-900 py-2 border-b-2 border-t-2 border-neutral-800">
        <Text className="text-white text-xl font-black mx-5 ">{title}</Text>
        {  
          !hideSeeAll &&(
            <TouchableOpacity>
              <Text style={styles.text} className="mx-2">Tümünü Gör</Text> 
            </TouchableOpacity>
          )  
      } 
      </View>
       {/* Film Satırı */}
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}>
          {
            data.map((item,index)=>{
              return(
                <TouchableWithoutFeedback key={index} onPress={()=>navigation.push('Movie',item)}
                >
                  <View className="space-y-1 mr-4">
                      <Image
                        source={require('../assets/image3.jpg')}
                        className="rounded-3xl"
                        style={{ width: windowWidth*0.3, height: windowHeight*0.22, borderRadius: 20 }}/>
                    
                    <Text className="text-neutral-300 ml-2">
                    {
                    movieName.length>15? movieName.slice(0,15)+"...": movieName
                    }</Text>
                  </View>
                </TouchableWithoutFeedback>
                )
              }
            )
          }
        </ScrollView>
      </View>
  )
}