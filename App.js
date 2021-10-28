import {Root} from 'native-base';
import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Routes from './src/routes/Routes';
import FireBaseConfig from './src/FireBaseConfig';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  useEffect(() => {
    FireBaseConfig();
    // let auth = Geolocation.requestAuthorization(() => {});
  }, []);

  return (
    <Root>
      <Routes />
    </Root>
  );
};
export default App;
