import {View, Text, Platform, TouchableOpacity, Image} from 'react-native';
import React, {use, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getDataFromAsyncStorage} from '../config/helper';

export default function HeaderComp({
  name,
  goBack = false,
  navigation,
  rightIcons = [],
  onPressRightIcons,
}) {
  const [data, setData] = useState({
    user: undefined,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const user = await getDataFromAsyncStorage('userCredentials');
    setData(prevData => ({
      ...prevData,
      user: JSON.parse(user),
    }));

    console.log(JSON.parse(user));
  }

  const ProfileIcon = () => {
    const screensNoNeedProfileIcon = ['Survey Data Table'];
    if (data.user == undefined || screensNoNeedProfileIcon.includes(name))
      return;

    if (data.user.photoURL == null) {
      return (
        <TouchableOpacity>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('../assets/images/user.png')}
          />
        </TouchableOpacity>
      );
    }
    return <Text>Z</Text>;
  };

  return (
    <View
      style={{
        padding: 15,
        backgroundColor: Platform.OS === 'android' ? '#3498db' : 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {goBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name={Platform.OS === 'android' ? 'arrowleft' : 'left'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        ) : null}
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: Platform.OS === 'ios' ? 25 : 20,
            color: Platform.OS === 'android' ? 'white' : 'black',
            includeFontPadding: false,
            marginLeft: goBack ? 15 : 0,
          }}>
          {name}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <ProfileIcon />
        {rightIcons.map(icon => {
          return (
            <TouchableOpacity
              key={icon.id}
              onPress={() => onPressRightIcons(icon)}>
              <View
                style={{
                  marginLeft: 10,
                }}>
                {icon.icon}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
