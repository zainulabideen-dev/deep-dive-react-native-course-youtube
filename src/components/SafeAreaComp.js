import {View, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import HeaderComp from './HeaderComp';

export default function SafeAreaComp({children, name}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar backgroundColor={'#3498db'} />
      <HeaderComp name={name} />
      <View style={{flex: 1, padding: 15}}>{children}</View>
    </SafeAreaView>
  );
}
