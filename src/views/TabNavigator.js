import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Constants from '../common/Constants';
import Home from '../views/Home';
import Images from '../common/Images';
import AllCategories from '../views/AllCategories';
import Notifications from './Notifications';
import Filter from './Filter';
import {Image, View} from 'react-native';
import Colors from '../common/Colors';
import Profile from './Profile';
import EditProfile from './EditProfile';
import BookingConfirmed from './BookingConfirmed';
import Settings from './Settings';
import ViewVendorProfile from './ViewVendorProfile';
import PostJob from './PostJob';
import Nearby from './Nearby';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={Constants.home}
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <HomeStack.Screen name={Constants.home} component={Home} />
      <HomeStack.Screen
        name={Constants.allCategories}
        component={AllCategories}
      />
      <HomeStack.Screen name={Constants.filter} component={Filter} />
      <HomeStack.Screen name={Constants.nearby} component={Nearby} />
      <HomeStack.Screen
        name={Constants.bookingConfirmed}
        component={BookingConfirmed}
      />
      <HomeStack.Screen
        name={Constants.viewVendorProfile}
        component={ViewVendorProfile}
      />
    </HomeStack.Navigator>
  );
};

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <ProfileStack.Screen name={Constants.profile} component={Profile} />
      <ProfileStack.Screen
        name={Constants.editProfile}
        component={EditProfile}
      />
    </ProfileStack.Navigator>
  );
};

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <SettingsStack.Screen name={Constants.settings} component={Settings} />
      <SettingsStack.Screen
        name={Constants.notifications}
        component={Notifications}
      />
    </SettingsStack.Navigator>
  );
};

const customTabBarStyle = {
  activeTintColor: Colors.navy,
  inactiveTintColor: Colors.coolGrey,
  backgroundColor: Colors.white,
  style: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000 ',
    shadowOffset: {width: 0, height: -5},
    shadowOpacity: 0.5,
    height: 60,
    shadowRadius: 2,
    marginTop: 2,
    elevation: 4,
    borderTopWidth: 0,
  },
  showLabel: false,
};
const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={Constants.home}
      tabBarOptions={customTabBarStyle}>
      <Tab.Screen
        name={Constants.home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              source={focused ? Images.barHomeSelected : Images.barHome}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          ),
        }}
        component={HomeNavigator}
      />
      <Tab.Screen
        name={Constants.notifications}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              source={focused ? Images.barBellSelected : Images.barBell}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          ),
        }}
        component={Notifications}
      />
      <Tab.Screen
        name={Constants.plus}
        options={{
          tabBarIcon: ({color}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={Images.barPlus}
                style={{
                  height: 180,
                  width: 180,
                  resizeMode: 'contain',
                  bottom: 10,
                }}
              />
            </View>
          ),
        }}
        component={PostJob}
      />
      <Tab.Screen
        name={Constants.profile}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              source={focused ? Images.barProfileSelected : Images.barProfile}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          ),
        }}
        component={ProfileNavigator}
      />
      <Tab.Screen
        name={Constants.settings}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              source={focused ? Images.barMoreSelected : Images.barMore}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          ),
        }}
        component={SettingsNavigator}
      />
    </Tab.Navigator>
  );
};

const TabNavigator = () => {
  return <Tabs />;
};

export default TabNavigator;
