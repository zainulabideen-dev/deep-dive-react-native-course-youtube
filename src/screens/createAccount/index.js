import {View, Text} from 'react-native';
import React from 'react';
import InputTextComp from '../../components/InputTextComp';
import ButtonComp from '../../components/ButtonComp';
import SafeAreaComp from '../../components/SafeAreaComp';

export default function CreateAccountScreen() {
  return (
    <SafeAreaComp>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 30,
        }}>
        {'Create New Account'}
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
          title={'Create Account'}
          extraStyle={{
            marginTop: 20,
          }}
        />
      </View>
    </SafeAreaComp>
  );
}
