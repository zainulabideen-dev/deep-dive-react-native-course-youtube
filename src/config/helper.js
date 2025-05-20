import AsyncStorage from '@react-native-async-storage/async-storage';

export const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const storeInToAsynStorage = async (Key, value) => {
  try {
    await AsyncStorage.setItem(Key, value);
  } catch (error) {
    console.log('=> Error storeInToAsynStorage', error);
  }
};

export const getDataFromAsyncStorage = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.log('=> Error getDataFromAsyncStorage', error);
  }
};

export const deleteDataFromAsyncStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('=> Error deleteDataFromAsyncStorage', error);
  }
};
