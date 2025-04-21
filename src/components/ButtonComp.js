import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function ButtonComp({extraStyle, title}) {
  return (
    <TouchableOpacity
      onPress={() => console.log('pressed')}
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
      <View>
        <Text
          style={{
            color: 'white',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
