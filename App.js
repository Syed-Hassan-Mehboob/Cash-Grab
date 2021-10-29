import React, {useEffect} from 'react';
import {Root} from 'native-base';
import Routes from './src/routes/Routes';
import FireBaseConfig from './src/FireBaseConfig';
import InternetConnectionAlert from 'react-native-internet-connection-alert';

const App = () => {
  useEffect(() => {
    FireBaseConfig();
  }, []);

  return (
    <InternetConnectionAlert>
      <Root>
        <Routes />
      </Root>
    </InternetConnectionAlert>
  );
};
export default App;
