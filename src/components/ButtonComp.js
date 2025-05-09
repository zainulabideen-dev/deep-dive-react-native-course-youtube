import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

export default function ButtonComp({
  extraStyle,
  title,
  icon = undefined,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        {
          backgroundColor: '#3498db',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        },
        extraStyle,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {icon != undefined ? (
          <Image
            style={{
              width: 27,
              height: 27,
              marginRight: 10,
            }}
            source={icon}
          />
        ) : null}
        <Text
          style={{
            color: 'white',
            fontFamily: 'Poppins-Regular',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
