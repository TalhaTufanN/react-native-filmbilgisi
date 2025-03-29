import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Loading() {
  return (
    <View style={{height:windowHeight,width:windowWidth}} className="absolute items-center justify-center" >
        <Progress.CircleSnail size={168} thickness={12} color={['lightgray']} />
    </View>
  )
}