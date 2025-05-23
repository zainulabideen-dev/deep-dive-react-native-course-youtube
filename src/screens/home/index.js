import {View, Text} from 'react-native';
import React from 'react';
import SafeAreaComp from '../../components/SafeAreaComp';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function HomeScreen() {
  return (
    <SafeAreaComp
      name={'Home'}
      rightIcons={[
        {
          id: 1,
          icon: <AntDesign name="plus" size={25} color="white" />,
        },
      ]}
      onPressRightIcons={icon => console.log(icon)}>
      <View style={{flex: 1}}></View>
    </SafeAreaComp>
  );
}
