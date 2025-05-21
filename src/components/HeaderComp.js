import {View, Text, Platform, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function HeaderComp({name, goBack = false, navigation}) {
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: Platform.OS === 'android' ? '#3498db' : 'white',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {goBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name={Platform.OS === 'android' ? 'arrowleft' : 'left'}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      ) : null}
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: Platform.OS === 'ios' ? 25 : 20,
          color: Platform.OS === 'android' ? 'white' : 'black',
          includeFontPadding: false,
          marginLeft: goBack ? 15 : 0,
        }}>
        {name}
      </Text>
    </View>
  );
}
