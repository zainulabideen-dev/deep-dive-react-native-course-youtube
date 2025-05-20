import {View, Text, Platform} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function HeaderComp({name}) {
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: Platform.OS === 'android' ? '#3498db' : 'white',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <AntDesign
        name={Platform.OS === 'android' ? 'arrowleft' : 'left'}
        size={20}
        color="white"
      />
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: Platform.OS === 'ios' ? 25 : 20,
          color: Platform.OS === 'android' ? 'white' : 'black',
          includeFontPadding: false,
          marginLeft: 15,
        }}>
        {name}
      </Text>
    </View>
  );
}
