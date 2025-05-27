import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

export default function SurveyItemComp({item}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        padding: 13,
        marginBottom: 5,
        elevation: 2,
        borderRadius: 5,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            flex: 0.2,
          }}>
          <Image
            style={{
              width: 40,
              height: 40,
            }}
            source={require('../assets/images/survey.png')}
          />
        </View>
        <View style={{flex: 0.8}}>
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
            {item.date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
