import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import SafeAreaComp from '../../components/SafeAreaComp';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import SurveyFormBottomSheet from '../../assets/bottomSheets/SurveyFormBottomSheet';

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

//GOOGLE_MAPS_API_KEY

export default function SurveyScreen({route, navigation}) {
  const params = route.params;
  const {survey} = params;
  const refRBSheet = useRef();
  const [data, setData] = useState({
    activePlotIcons: plotIcons[0],
    listOfMarkers: [],
    plotMarkerInfo: undefined,
  });

  const handleMapPress = event => {
    const newMarker = {
      coordinate: event.nativeEvent.coordinate,
    };
    setData(prevData => ({
      ...prevData,
      plotMarkerInfo: newMarker,
    }));
    refRBSheet.current.open();
    // setData(prevData => ({
    //   ...prevData,
    //   listOfMarkers: [...prevData.listOfMarkers, newMarker],
    // }));
  };

  return (
    <SafeAreaComp
      name={survey.name}
      goBack
      navigation={navigation}
      needPadding={false}>
      <SurveyFormBottomSheet
        refRBSheet={refRBSheet}
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
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            zoomControlEnabled
            onPress={handleMapPress}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            {data.listOfMarkers.map((marker, id) => (
              <Marker key={id} coordinate={marker.coordinate} />
            ))}
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
