import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SafeAreaComp from '../../components/SafeAreaComp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CreateSurveyBottomSheet from '../../assets/bottomSheets/CreateSurveyBottomSheet';
import Toast from 'react-native-toast-message';
import {checkMyDb, getDataFromSqlite} from '../../config/sqliteStorage';
import SurveyItemComp from '../../components/SurveyItemComp';

export default function HomeScreen({navigation}) {
  const refRBSheet = useRef();
  const [data, setData] = useState({
    listOfSurveys: [],
  });

  useEffect(() => {
    //checkMyDb();
    fetchData();
  }, []);

  async function fetchData() {
    const list = await getDataFromSqlite('SELECT * FROM Surveys');
    if (list) {
      setData(prevData => ({
        ...prevData,
        listOfSurveys: list.dataList,
      }));
    }
  }

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
            fetchData();
          }}
        />
        <FlatList
          data={data.listOfSurveys}
          renderItem={({item}) => (
            <SurveyItemComp item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaComp>
  );
}
