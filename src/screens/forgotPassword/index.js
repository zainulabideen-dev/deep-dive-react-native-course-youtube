import {View, Text} from 'react-native';
import React, {useState} from 'react';
import SafeAreaComp from '../../components/SafeAreaComp';
import LoadingModal from '../../modals/LoadingModal';
import AlertModal from '../../modals/AlertModal';
import InputTextComp from '../../components/InputTextComp';
import ButtonComp from '../../components/ButtonComp';
import {isValidEmail} from '../../config/helper';
import Toast from 'react-native-toast-message';
import {getAuth} from '@react-native-firebase/auth';

export default function ForgotPasswordScreen({navigation}) {
  const [data, setData] = useState({
    email: undefined,
    showModal: false,
    showAlertModal: false,
    showAlertTitle: undefined,
    showAlertDescription: undefined,
  });

  async function recoverPassword() {
    if (!isValidEmail(data.email.trim())) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid email',
      });
      return;
    }

    try {
      const auth = getAuth();
      const response = await auth.sendPasswordResetEmail(data.email);
      console.log('=> success sending recovery email', response);
      setData(prevData => ({
        ...prevData,
        showModal: false,
        email: undefined,
        showAlertModal: true,
        showAlertTitle: 'Email Sent',
        showAlertDescription:
          'Successsfully Sent Recovery Email. Please check your inbox',
      }));
    } catch (error) {
      setData(prevData => ({
        ...prevData,
        showModal: false,
        email: undefined,
        showAlertModal: true,
        showAlertTitle: 'Error Occured',
        showAlertDescription: 'Unable to Send Recovery Email',
      }));
      console.log('=> Recovery Email Error', error);
    }
  }

  return (
    <SafeAreaComp name={'Forgot Passowrd'} goBack navigation={navigation}>
      <View style={{flex: 1}}>
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
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 30,
          }}>
          {'Recover Email'}
        </Text>
        <View>
          <InputTextComp
            extraStyle={{
              marginTop: 20,
            }}
            placeHolder={'email address'}
            keyboardType={'email-address'}
            title={'Email Address'}
            value={data.email}
            onChangeText={text =>
              setData(prevData => ({
                ...prevData,
                email: text,
              }))
            }
          />

          <ButtonComp
            onPress={() => recoverPassword()}
            title={'Send Recovery Email'}
            extraStyle={{
              marginTop: 20,
            }}
          />
        </View>
      </View>
    </SafeAreaComp>
  );
}
