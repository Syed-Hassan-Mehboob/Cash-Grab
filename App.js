import React, {useEffect} from 'react';
import {Root} from 'native-base';
import Routes from './src/routes/Routes';
import FireBaseConfig from './src/FireBaseConfig';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Colors from './src/common/Colors';
import {StatusBar} from 'react-native';

const App = () => {
  useEffect(() => {
    FireBaseConfig();
  }, []);

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.navy} />
      <SafeAreaView
        style={{flex: 1, backgroundColor: Colors.navy}}
        edges={['top', 'left', 'right']}>
        <InternetConnectionAlert>
          <Root>
            <Routes />
          </Root>
        </InternetConnectionAlert>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default App;

// "#002926"
