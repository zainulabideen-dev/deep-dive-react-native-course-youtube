import {View, Text} from 'react-native';
import React, {useState} from 'react';
import InputTextComp from '../../components/InputTextComp';
import ButtonComp from '../../components/ButtonComp';
import SafeAreaComp from '../../components/SafeAreaComp';
import {isValidEmail} from '../../config/helper';
import Toast from 'react-native-toast-message';
import LoadingModal from '../../modals/LoadingModal';

export default function CreateAccountScreen() {
  const [data, setData] = useState({
    email: undefined,
    password: undefined,
    showModal: false,
  });

  async function createAccount() {
    if (!isValidEmail(data.email)) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid email',
      });
      return;
    }

    if (data.password == undefined || data.password.length < 5) {
      Toast.show({
        type: 'error',
        text1: 'Please enter password. Must be 8 digit',
      });
      return;
    }

    setData(prevData => ({
      ...prevData,
      showModal: true,
    }));

    //firebase code
    //set loader false
  }

  return (
    <SafeAreaComp>
      <LoadingModal visible={data.showModal} />
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'Poppins-Bold',
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
          onChangeText={text =>
            setData(prevData => ({
              ...prevData,
              email: text,
            }))
          }
        />
        <InputTextComp
          extraStyle={{
            marginTop: 20,
          }}
          secureTextEntry={true}
          placeHolder={'password'}
          title={'Password'}
          onChangeText={text =>
            setData(prevData => ({
              ...prevData,
              password: text,
            }))
          }
        />
        <ButtonComp
          onPress={() => createAccount()}
          title={'Create Account'}
          extraStyle={{
            marginTop: 20,
          }}
        />
      </View>
    </SafeAreaComp>
  );
}
