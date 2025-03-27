import { View, Text, Image, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'

export default function Cast({cast,navigation}) {
  let personName="Tom Hanks";
  let characterName="Paul Edgecomb";
  return (
    <View className="my-6">
      <Text className="text-white text-xl font-black mx-4">Oyuncular</Text>
      <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 15}}
      className="mt-2"
      >
        {
          cast && cast.map((person,index)=>{
            return(
             <TouchableOpacity
              key={index}
              className="mr-4 items-center"
              onPress={()=>navigation.navigate('Person',person)}
              >
                <View className="overflow-hidden rounded-full h-25 w-25 items-center border border-neutral-600">
                  <Image
                    source={require('../assets/tomhanks.jpg')}
                    className="rounded-3xl"
                    style={{ width: 100, height: 150, borderRadius: 20 }}
                  />
                </View>

                <Text className="text-neutral-300 text-center text-xs mt-1">
                  {
                    characterName.length>15? characterName.slice(0,15)+"...": characterName
                  }
                </Text>
                <Text className="text-neutral-300 text-center text-xs mt-1">
                  {
                    personName.length>15? personName.slice(0,15)+"...": personName
                  }
                </Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  )
}