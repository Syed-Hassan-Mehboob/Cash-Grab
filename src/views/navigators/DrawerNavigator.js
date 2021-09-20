import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Constants from '../../common/Constants';
import DrawerScreen from '../DrawerScreen';
import UserTabNavigator from './UserTabNavigator';
import VendorTabNavigator from './VendorTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {isVendor: false, gotUser: false};

  componentDidMount() {
    this.getUserType();
  }

  getUserType = async () => {
    const user = await AsyncStorage.getItem('user');
    var userData = JSON.parse(user);
    this.setState({isVendor: userData.type === 'vendor'}, () =>
      // console.log('userType: ', this.state.isVendor),
      this.setState({gotUser: true}),
    );
  };

  DrawerScreens = () => {
    //

    return this.state.gotUser === false ? (
      <Spinner
        visible={true}
        textContent={'Loading...'}
        textStyle={{
          color: '#FFF',
          fontFamily: Constants.fontRegular,
        }}
      />
    ) : !this.state.isVendor ? (
      <Drawer.Navigator
        drawerType="slide"
        drawerStyle={{width: '70%'}}
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}
        initialRouteName={Constants.home}
        drawerContent={(props) => <DrawerScreen {...props} />}>
        <Drawer.Screen name="Tab" component={UserTabNavigator} />
      </Drawer.Navigator>
    ) : (
      <Drawer.Navigator
        drawerType="slide"
        drawerStyle={{width: '70%'}}
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}
        initialRouteName={Constants.home}
        drawerContent={(props) => <DrawerScreen {...props} />}>
        <Drawer.Screen name="Tab" component={VendorTabNavigator} />
      </Drawer.Navigator>
    );
    // return (

    // );
  };

  render() {
    return <this.DrawerScreens />;
  }
}
