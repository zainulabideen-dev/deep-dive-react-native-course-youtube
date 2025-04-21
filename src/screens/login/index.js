import {View, Text, SafeAreaView, TextInput} from 'react-native';
import React from 'react';
import InputTextComp from '../../components/InputTextComp';
import ButtonComp from '../../components/ButtonComp';

export default function LoginScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={{flex: 1, padding: 15}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          Login
        </Text>
        <View>
          <InputTextComp
            extraStyle={{
              marginTop: 20,
            }}
            placeHolder={'email address'}
            keyboardType={'email-address'}
            title={'Email Address'}
          />
          <InputTextComp
            extraStyle={{
              marginTop: 20,
            }}
            secureTextEntry={true}
            placeHolder={'password'}
            title={'Password'}
          />
          <ButtonComp
            title={'LOGIN'}
            extraStyle={{
              marginTop: 20,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
