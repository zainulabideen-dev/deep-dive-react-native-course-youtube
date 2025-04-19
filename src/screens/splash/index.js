import {View, Text, StatusBar, Image} from 'react-native';
import React from 'react';

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor={'#3498db'} />
      <Image
        style={{
          width: 90,
          height: 90,
        }}
        source={require('../../assets/images/globe.png')}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: 'white',
        }}>
        Geo Surveyor
      </Text>
    </View>
  );
}
