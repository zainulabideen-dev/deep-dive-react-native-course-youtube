import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import InputTextComp from '../../components/InputTextComp';
import ButtonComp from '../../components/ButtonComp';
import SafeAreaComp from '../../components/SafeAreaComp';
import LoadingModal from '../../modals/LoadingModal';
import AlertModal from '../../modals/AlertModal';
import {isValidEmail} from '../../config/helper';
import Toast from 'react-native-toast-message';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {FIRE_BASE_WEB_CLIENT_ID} from '@env';

export default function LoginScreen({navigation}) {
  const [data, setData] = useState({
    email: undefined,
    password: undefined,
    showModal: false,
    showAlertModal: false,
    showAlertTitle: undefined,
    showAlertDescription: undefined,
  });

  async function loginUsingEmailPassword() {
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
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredentials => {
        setData(prevData => ({
          ...prevData,
          showModal: false,
          email: undefined,
          password: undefined,
        }));
        console.log('Login Successfully', userCredentials);
      })
      .catch(error => {
        setData(prevData => ({
          ...prevData,
          showModal: false,
          email: undefined,
          password: undefined,
          showAlertModal: true,
          showAlertTitle: 'Wrong Credentials',
          showAlertDescription: 'Incorrect Email or Password',
        }));
        console.log('=> Login Error', error);
      });
  }

  async function googleSignIn(params) {
    try {
      const auth = getAuth();
      GoogleSignin.configure({
        offlineAccess: false,
        webClientId: FIRE_BASE_WEB_CLIENT_ID,
        scopes: ['profile', 'email'],
      });
      await GoogleSignin.hasPlayServices();
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.data?.idToken;
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      const userCredentials = await signInWithCredential(
        auth,
        googleCredentials,
      );
      const user = userCredentials.user;
      console.log('=> signIn with google success', user);
    } catch (error) {
      setData(prevData => ({
        ...prevData,
        showModal: false,
        showAlertModal: true,
        showAlertTitle: 'Error Occured',
        showAlertDescription: 'Unable to SignIn.',
      }));
      console.log('=> GoogleSignIn Error', error);
    }
  }

  return (
    <SafeAreaComp name={'Login'}>
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
        {'Welcome to GeoSurvey'}
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
        <InputTextComp
          extraStyle={{
            marginTop: 20,
          }}
          secureTextEntry={true}
          placeHolder={'password'}
          title={'Password'}
          value={data.password}
          onChangeText={text =>
            setData(prevData => ({
              ...prevData,
              password: text,
            }))
          }
        />
        <ButtonComp
          onPress={() => loginUsingEmailPassword()}
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
          onPress={() => googleSignIn()}
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
