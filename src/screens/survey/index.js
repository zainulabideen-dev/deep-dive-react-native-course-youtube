import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SafeAreaComp from '../../components/SafeAreaComp';
import MapView, {
  Marker,
  Polygon,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import SurveyFormBottomSheet from '../../assets/bottomSheets/SurveyFormBottomSheet';
import {getDataFromSqlite} from '../../config/sqliteStorage';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const plotIcons = [
  {
    id: 1,
    image: require('../../assets/images/pin.png'),
  },
  {
    id: 2,
    image: require('../../assets/images/line.png'),
  },
  {
    id: 3,
    image: require('../../assets/images/polygon.png'),
  },
];

const polylineControls = [
  {
    id: 1,
    image: <Feather size={25} name="x" />,
  },
  {
    id: 2,
    image: <SimpleLineIcons size={25} name="action-redo" />,
  },
  {
    id: 3,
    image: <Ionicons size={25} name="save-outline" color="green" />,
  },
];

//GOOGLE_MAPS_API_KEY

export default function SurveyScreen({route, navigation}) {
  const params = route.params;
  const {survey} = params;
  const refRBSheet = useRef();
  const [data, setData] = useState({
    activePlotIcons: plotIcons[0],
    collectedDataList: [],
    plottedMarker: undefined,
    plottedLine: undefined,
    plottedPolygon: undefined,
    markerPressed: false,
    polylineCoordinates: [],
  });

  const ignoreNextMapPress = useRef(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const tableName = `survey_${survey.id}`;
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

  const handleMarkerPress = () => {
    ignoreNextMapPress.current = true;
    setTimeout(() => {
      ignoreNextMapPress.current = false;
    }, 100); // Short enough to skip just the next map press
  };

  const handleMapPress = async coordinate => {
    if (ignoreNextMapPress.current) {
      ignoreNextMapPress.current = false; // Reset flag
      return;
    }
    if (data.activePlotIcons.id == 1) {
      const mapCoordinates = {
        coordinate,
      };
      if (data.markerPressed) return;
      setData(prevData => ({
        ...prevData,
        plottedMarker:
          data.activePlotIcons.id == 1 ? mapCoordinates : undefined,
      }));
      refRBSheet.current.open();
    } else if (data.activePlotIcons.id == 2) {
      console.log('create polyline', coordinate);
      setData(prevData => ({
        ...prevData,
        polylineCoordinates: [...prevData.polylineCoordinates, coordinate],
      }));
    }
  };

  return (
    <SafeAreaComp
      name={survey.name}
      goBack
      navigation={navigation}
      needPadding={false}>
      <SurveyFormBottomSheet
        refRBSheet={refRBSheet}
        plotData={{
          point: data.plottedMarker,
          line: data.plottedLine,
          polygon: data.plottedPolygon,
        }}
        survey={survey}
        onClose={() => refRBSheet.current.close()}
      />
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
          }}>
          {plotIcons.map(plot => {
            return (
              <TouchableOpacity
                key={plot.id}
                onPress={() => {
                  setData(prevData => ({
                    ...prevData,
                    activePlotIcons: plot,
                    polylineCoordinates:
                      plot.id != 2 ? [] : prevData.polylineCoordinates,
                  }));
                }}
                style={{
                  borderColor: '#abb2b9',
                  borderWidth: 1,
                  padding: 7,
                  backgroundColor:
                    data.activePlotIcons.id === plot.id ? '#76d7c4' : 'white',
                  marginRight: 15,
                  borderRadius: 5,
                }}>
                <View>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    source={plot.image}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
          }}>
          {data.polylineCoordinates.length > 0 ? (
            <View
              style={{
                zIndex: 1,
                flexDirection: 'row',
                position: 'absolute',
                bottom: 5,
                left: 5,
              }}>
              {polylineControls.map(plot => {
                return (
                  <TouchableOpacity
                    key={plot.id}
                    onPress={() => {}}
                    style={{
                      borderColor: '#abb2b9',
                      borderWidth: 1,
                      padding: 7,
                      backgroundColor: 'white',
                      marginRight: 15,
                      borderRadius: 5,
                    }}>
                    <View>{plot.image}</View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            zoomControlEnabled
            onPress={event => {
              const {coordinate} = event.nativeEvent;
              handleMapPress(coordinate);
            }}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            {data.collectedDataList.map((marker, id) => {
              if (marker.plotType != 'point') return;
              return (
                <Marker
                  key={id}
                  title={marker.name}
                  onPress={handleMarkerPress}
                  coordinate={{
                    latitude: parseFloat(marker.latitude),
                    longitude: parseFloat(marker.longitude),
                  }}
                />
              );
            })}
            {data.polylineCoordinates.length > 0 ? (
              <Marker
                title={'start'}
                pinColor={'#52be80'}
                coordinate={data.polylineCoordinates[0]}
              />
            ) : null}
            <Polyline
              coordinates={data.polylineCoordinates}
              strokeColor="#FF0000" // red line
              strokeWidth={4}
            />
          </MapView>
        </View>
      </View>
    </SafeAreaComp>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
