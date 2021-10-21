import {Root} from 'native-base';
import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Routes from './src/routes/Routes';
import FireBaseConfig from './src/FireBaseConfig';

const App = () => {
  useEffect(() => {
    FireBaseConfig();
  }, []);

  return (
    <Root>
      <Routes />
    </Root>
  );
};
export default App;
