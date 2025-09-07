import AsyncStorage from '@react-native-async-storage/async-storage'

export async function storeData(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

export async function getData(key: string) {
  try {
   const data = await AsyncStorage.getItem(key);

   if (!data) return null;

   return JSON.parse(data);
  } catch (error) {
    console.error('Error getting data:', error);
  }
};