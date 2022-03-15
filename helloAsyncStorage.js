import { AsyncStorage } from 'react-native';

const StorageKey = '@MyApp:myKey';

(async () => {
  await AsyncStorage.setItem(StorageKey, JSON.stringify({ myKey : 'hello, world!' }));
  const value = await AsyncStorage.getItem(StorageKey);
  console.info(JSON.parse(value).myKey);
  //remove the key
  await AsyncStorage.removeItem(StorageKey);
});
