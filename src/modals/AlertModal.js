import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import ButtonComp from '../components/ButtonComp';

export default function AlertModal({
  visible = false,
  title = 'Alert',
  description = 'An Error Occured.',
  buttons = [
    {
      id: 1,
      text: 'Okay',
    },
  ],
  onPress,
}) {
  return (
    <Modal transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.35)',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            alignItems: 'center',
            borderRadius: 5,
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Poppins-Bold',
            }}>
            {title}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
            }}>
            {description}
          </Text>
          <View
            style={{
              marginTop: 20,
            }}>
            {buttons.map(item => {
              return (
                <ButtonComp
                  key={item.id}
                  onPress={() => onPress(item)}
                  title={item.text.toUpperCase()}
                  extraStyle={{
                    width: 200,
                    height: 40,
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}
