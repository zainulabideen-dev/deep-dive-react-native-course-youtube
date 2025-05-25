import AsyncStorage from '@react-native-async-storage/async-storage';

export const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const storeInToAsyncStorage = async (Key, value) => {
  try {
    await AsyncStorage.setItem(Key, value);
  } catch (error) {
    console.log('=> Error storeInToAsyncStorage', error);
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

export function getFormattedDate() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', {month: 'short'});
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
