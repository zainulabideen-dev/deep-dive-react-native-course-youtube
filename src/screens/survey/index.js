import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import SafeAreaComp from '../../components/SafeAreaComp';

const plotIcons = [
  {
    id: 1,
    image: require('../../assets/images/pin.png'),
  },
  {
    id: 2,
    image: require('../../assets/images/line.png'),
  },
  {
    id: 3,
    image: require('../../assets/images/polygon.png'),
  },
];

export default function SurveyScreen({route, navigation}) {
  const params = route.params;
  const {survey} = params;
  return (
    <SafeAreaComp
      name={survey.name}
      goBack
      navigation={navigation}
      needPadding={false}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
          }}>
          {plotIcons.map(plot => {
            return (
              <TouchableOpacity
                key={plot.id}
                style={{
                  borderColor: '#abb2b9',
                  borderWidth: 1,
                  padding: 7,
                  backgroundColor: 'white',
                  marginRight: 15,
                  borderRadius: 5,
                }}>
                <View>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    source={plot.image}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
          }}></View>
      </View>
    </SafeAreaComp>
  );
}
