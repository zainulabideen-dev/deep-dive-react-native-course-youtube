import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import InputTextComp from '../../components/InputTextComp';
import ButtonComp from '../../components/ButtonComp';
import SafeAreaComp from '../../components/SafeAreaComp';

export default function LoginScreen({navigation}) {
  return (
    <SafeAreaComp>
      <Text
        style={{
          fontFamily: 'Poppins-Bold',
          fontSize: 30,
        }}>
        {'Welcome to GeoSurvey\nLogin'}
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
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateAccountScreen')}
          style={{
            marginTop: 3,
          }}>
          <Text
            style={{
              textAlign: 'right',
              color: '#3498db',
              fontFamily: 'Poppins-Medium',
            }}>
            Create New Account?
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 0.4,
              height: 1,
              backgroundColor: 'black',
            }}
          />
          <Text
            style={{
              flex: 0.2,
              textAlign: 'center',
            }}>
            OR
          </Text>
          <View
            style={{
              flex: 0.4,
              height: 1,
              backgroundColor: 'black',
            }}
          />
        </View>
        <ButtonComp
          title={'SIGN IN WITH GOOGLE'}
          icon={require('../../assets/images/google.png')}
          extraStyle={{
            marginTop: 20,
          }}
        />
      </View>
    </SafeAreaComp>
  );
}
