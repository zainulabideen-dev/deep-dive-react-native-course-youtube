import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import InputTextComp from '../../components/InputTextComp';
import ButtonComp from '../../components/ButtonComp';
import SafeAreaComp from '../../components/SafeAreaComp';
import {isValidEmail} from '../../config/helper';
import Toast from 'react-native-toast-message';
import LoadingModal from '../../modals/LoadingModal';
import {
  createUserWithEmailAndPassword,
  getAuth,
} from '@react-native-firebase/auth';
import AlertModal from '../../modals/AlertModal';

export default function CreateAccountScreen({navigation}) {
  const [data, setData] = useState({
    email: undefined,
    password: undefined,
    showModal: false,
    showAlertModal: false,
    showAlertTitle: undefined,
    showAlertDescription: undefined,
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

    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      data.email.trim(),
      data.password.trim(),
    )
      .then(userCredentials => {
        setData(prevData => ({
          ...prevData,
          showModal: false,
          email: undefined,
          password: undefined,
          showAlertModal: true,
          showAlertTitle: 'New Account',
          showAlertDescription: 'Account Created Successfully',
        }));
      })
      .catch(error => {
        let errorObj = {
          showAlertTitle: 'Alert',
          showAlertDescription: 'An Error Occured',
        };
        if (error.code === 'auth/email-already-in-use') {
          errorObj.showAlertTitle = 'Accound Exist';
          errorObj.showAlertDescription =
            'This Email Account is Already in use. Please try with another Email';
        }
        setData(prevData => ({
          ...prevData,
          showModal: false,
          email: undefined,
          password: undefined,
          showAlertModal: true,
          showAlertTitle: errorObj.showAlertTitle,
          showAlertDescription: errorObj.showAlertDescription,
        }));
        console.log('=> Create Account Error', error);
      });
  }

  return (
    <SafeAreaComp name={'Create Account'} goBack={true} navigation={navigation}>
      <LoadingModal visible={data.showModal} />
      <AlertModal
        visible={data.showAlertModal}
        title={data.showAlertTitle}
        description={data.showAlertDescription}
        onPress={() => {
          setData(prevData => ({
            ...prevData,
            showAlertModal: false,
          }));
        }}
      />
      <View>
        <InputTextComp
          extraStyle={{
            marginTop: 20,
          }}
          value={data.email}
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
          value={data.password}
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
