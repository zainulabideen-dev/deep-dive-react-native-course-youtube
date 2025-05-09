import {View, Text, TextInput} from 'react-native';
import React from 'react';

export default function InputTextComp({
  placeHolder,
  title,
  keyboardType = 'default',
  extraStyle,
  secureTextEntry = false,
}) {
  return (
    <View style={[extraStyle]}>
      <Text
        style={{marginLeft: 5, marginBottom: 3, fontFamily: 'Poppins-Regular'}}>
        {title}
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#d7dbdd',
          borderRadius: 10,
        }}>
        <TextInput
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={{
            height: 50,
            paddingHorizontal: 15,
          }}
          placeholder={placeHolder}
        />
      </View>
    </View>
  );
}
