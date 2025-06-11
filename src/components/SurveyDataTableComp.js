import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

export default function SurveyDataTableComp({item, navigation}) {
  return (
    <TouchableOpacity
      onPress={() => console.log(item)}
      style={{
        backgroundColor: 'white',
        padding: 13,
        marginBottom: 5,
        elevation: 2,
        borderRadius: 5,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{}}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 15,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 15,
            }}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
