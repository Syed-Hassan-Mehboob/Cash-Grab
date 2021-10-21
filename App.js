import {Root} from 'native-base';
import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Routes from './src/routes/Routes';

const App = () => {
  useEffect(() => {
    Alert.alert('A new FCM message arrived!');
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <Root>
      <Routes />
    </Root>
  );
};
export default App;
