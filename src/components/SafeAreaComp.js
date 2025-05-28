import {View, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import HeaderComp from './HeaderComp';

export default function SafeAreaComp({
  children,
  name,
  goBack = false,
  navigation,
  rightIcons,
  onPressRightIcons,
  needPadding = true,
}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar backgroundColor={'#3498db'} />
      <HeaderComp
        name={name}
        goBack={goBack}
        navigation={navigation}
        rightIcons={rightIcons}
        onPressRightIcons={icon => onPressRightIcons(icon)}
      />
      <View style={{flex: 1, padding: needPadding ? 15 : 0}}>{children}</View>
    </SafeAreaView>
  );
}
