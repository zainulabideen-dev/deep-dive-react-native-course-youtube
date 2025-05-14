import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';

export default function LoadingModal({visible = false}) {
  return (
    <Modal transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.35)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <ActivityIndicator />
          <Text
            style={{
              marginHorizontal: 15,
            }}>
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
}
