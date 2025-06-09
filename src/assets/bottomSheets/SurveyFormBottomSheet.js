import {View, Text, Dimensions} from 'react-native';
import React, {useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import InputTextComp from '../../components/InputTextComp';
import ButtonComp from '../../components/ButtonComp';
import Toast from 'react-native-toast-message';
import {getFormattedDate} from '../../config/helper';
import {
  createNewTable,
  insertDataInSqliteTable,
} from '../../config/sqliteStorage';

export default function SurveyFormBottomSheet({
  refRBSheet,
  onClose,
  plotData,
  survey,
}) {
  const [data, setData] = useState({
    name: undefined,
    description: '',
  });

  function getPlotType() {
    if (plotData.point != undefined) {
      return 'point';
    } else if (plotData.line != undefined) {
      return 'line';
    } else if (plotData.polygon != undefined) {
      return 'polygon';
    }
  }

  async function createNewSurvey() {
    const tableName = `survey_${survey.id}`;
    if (data.name === undefined || data.name.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Please provide survey name',
      });
      return;
    }

    const latitude =
      plotData.point == undefined ? '' : plotData.point.coordinate.latitude;
    const longitude =
      plotData.point == undefined ? '' : plotData.point.coordinate.longitude;
    const coordinates =
      plotData.line == undefined ? '' : JSON.stringify(plotData.line);
    const address = '';
    let plotType = getPlotType();

    const result = await insertDataInSqliteTable(
      `INSERT INTO ${tableName} (name, latitude, longitude, coordinates, address, description, plotType, date) VALUES (?,?,?,?,?,?,?,?)`,
      [
        data.name,
        latitude,
        longitude,
        coordinates,
        address,
        data.description,
        plotType,
        getFormattedDate(),
      ],
    );
    if (result.success) console.log('=> data inserted successfully');
    onClose(result.success, plotData, survey);
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
            title={'Name'}
            value={data.name}
            onChangeText={text =>
              setData(prevData => ({
                ...prevData,
                name: text,
              }))
            }
          />
          <InputTextComp
            extraStyle={{
              marginTop: 20,
            }}
            placeHolder={'Description'}
            title={'Description'}
            value={data.description}
            onChangeText={text =>
              setData(prevData => ({
                ...prevData,
                description: text,
              }))
            }
          />
          <ButtonComp
            onPress={() => createNewSurvey()}
            title={'Submit'}
            extraStyle={{
              marginTop: 20,
            }}
          />
        </View>
      </View>
    </RBSheet>
  );
}
