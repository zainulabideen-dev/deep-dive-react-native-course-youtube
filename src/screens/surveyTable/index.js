import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeAreaComp from '../../components/SafeAreaComp';
import {getDataFromSqlite} from '../../config/sqliteStorage';
import SurveyDataTableComp from '../../components/SurveyDataTableComp';

export default function SurveyTableScreen({navigation, route}) {
  const params = route.params;
  const {tableName} = params;

  const [data, setData] = useState({
    collectedDataList: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await getDataFromSqlite(`SELECT * FROM ${tableName}`);
      setData(prevData => ({
        ...prevData,
        collectedDataList: response.dataList,
      }));
    } catch (error) {
      console.log('=> error', error);
    }
  }

  return (
    <SafeAreaComp name={'Survey Data Table'} goBack navigation={navigation}>
      <FlatList
        data={data.collectedDataList}
        renderItem={({item}) => (
          <SurveyDataTableComp item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaComp>
  );
}
