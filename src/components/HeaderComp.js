import {View, Text, Platform} from 'react-native';
import React from 'react';

export default function HeaderComp({name}) {
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: Platform.OS === 'android' ? '#3498db' : 'white',
      }}>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: Platform.OS === 'ios' ? 25 : 20,
          color: Platform.OS === 'android' ? 'white' : 'black',
          includeFontPadding: false,
        }}>
        {name}
      </Text>
    </View>
  );
}
