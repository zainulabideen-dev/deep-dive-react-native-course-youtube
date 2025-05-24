import {View, Text, Dimensions} from 'react-native';
import React, {useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import InputTextComp from '../../components/InputTextComp';
import ButtonComp from '../../components/ButtonComp';
import Toast from 'react-native-toast-message';

export default function CreateSurveyBottomSheet({refRBSheet}) {
  const [data, setData] = useState({
    name: undefined,
  });

  async function createNewSurvey() {
    if (data.name === undefined || data.name.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Please provide survey name',
      });
      return;
    }

    // create new survey
  }

  return (
    <RBSheet
      ref={refRBSheet}
      height={Dimensions.get('screen').height / 2}
      //useNativeDriver={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.35)',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}
      customModalProps={{
        animationType: 'slide',
        statusBarTranslucent: true,
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}>
      <View style={{padding: 15, flex: 1}}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 20,
          }}>
          Create New Survey
        </Text>
        <View>
          <InputTextComp
            extraStyle={{
              marginTop: 20,
            }}
            placeHolder={'Name'}
            title={'Name Of Survey'}
            value={data.name}
            onChangeText={text =>
              setData(prevData => ({
                ...prevData,
                name: text,
              }))
            }
          />

          <ButtonComp
            onPress={() => createNewSurvey()}
            title={'Create Survey'}
            extraStyle={{
              marginTop: 20,
            }}
          />
        </View>
      </View>
    </RBSheet>
  );
}
