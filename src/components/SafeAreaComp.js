import {View, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';

export default function SafeAreaComp({children}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar backgroundColor={'#3498db'} />
      <View style={{flex: 1, padding: 15}}>{children}</View>
    </SafeAreaView>
  );
}
