import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Constants from '../../common/Constants';
import TabNavigator from './TabNavigator';
import TermsAndConditions from '../TermsAndConditions';
import Notifications from '../Notifications';
import DrawerScreen from '../DrawerScreen';

const Drawer = createDrawerNavigator()

const DrawerScreens = () => {
  return (
    <Drawer.Navigator
    drawerType='slide'
    drawerStyle={{ width: '70%' }}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 5 },
      }}
      initialRouteName={Constants.home}
      drawerContent={props => <DrawerScreen {...props} />}>
          <Drawer.Screen name='Home' component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const DrawerNavigator = () => {
  return <DrawerScreens/>;
};

export default DrawerNavigator;
