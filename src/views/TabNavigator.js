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

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

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
              source={Images.barBell}
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
        component={Home}
      />
      <Tab.Screen
        name={Constants.profile}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={Images.barProfile}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          ),
        }}
        component={ProfileNavigator}
      />
      <Tab.Screen
        name={Constants.more}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={Images.barMore}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          ),
        }}
        component={Home}
      />
    </Tab.Navigator>
  );
};

const TabNavigator = () => {
  return <Tabs />;
};

export default TabNavigator;
