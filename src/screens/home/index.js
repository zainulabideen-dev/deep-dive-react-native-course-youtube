import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import SafeAreaComp from '../../components/SafeAreaComp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CreateSurveyBottomSheet from '../../assets/bottomSheets/CreateSurveyBottomSheet';
import Toast from 'react-native-toast-message';

export default function HomeScreen() {
  const refRBSheet = useRef();

  function onRightIconPress(icon) {
    if (icon.id === 1) {
      refRBSheet.current.open();
    }
  }

  return (
    <SafeAreaComp
      name={'Home'}
      rightIcons={[
        {
          id: 1,
          icon: <AntDesign name="plus" size={25} color="white" />,
        },
      ]}
      onPressRightIcons={icon => onRightIconPress(icon)}>
      <View style={{flex: 1}}>
        <CreateSurveyBottomSheet
          refRBSheet={refRBSheet}
          onClose={result => {
            refRBSheet.current.close();
            Toast.show({
              text1: result
                ? 'Survey Create Successfully'
                : 'Uanle to create Survey',
              type: result ? 'success' : 'error',
            });
          }}
        />
      </View>
    </SafeAreaComp>
  );
}
