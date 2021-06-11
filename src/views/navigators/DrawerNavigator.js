import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Constants from '../../common/Constants';
import DrawerScreen from '../DrawerScreen';
import UserTabNavigator from './UserTabNavigator';
import VendorTabNavigator from './VendorTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isVendor: false,
  };

  componentDidMount() {
    this.getUserType();
  }

  getUserType = async () => {
    const user = await AsyncStorage.getItem('user');
    var userData = JSON.parse(user);
    this.setState({isVendor: userData === 'vendor'});
  };

  DrawerScreens = () => {
    return (
      <Drawer.Navigator
        drawerType="slide"
        drawerStyle={{width: '70%'}}
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}
        initialRouteName={Constants.home}
        drawerContent={(props) => <DrawerScreen {...props} />}>
        <Drawer.Screen
          name="Tab"
          component={
            this.state.isVendor ? VendorTabNavigator : UserTabNavigator
          }
        />
      </Drawer.Navigator>
    );
  };

  render() {
    return <this.DrawerScreens />;
  }
}
