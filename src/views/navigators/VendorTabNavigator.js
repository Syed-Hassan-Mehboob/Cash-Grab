import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Platform, View} from 'react-native';
import Constants from '../../common/Constants';
import Colors from '../../common/Colors';
import Images from '../../common/Images';
import Filter from '../Filter';
import Notifications from '../Notifications';
import Settings from '../Settings';
import TermsAndConditions from '../TermsAndConditions';
import VendorHome from '../vendor/VendorHome';
import VendorProfile from '../vendor/VendorProfile';
import VendorEditProfile from '../vendor/VendorEditProfile';
import VendorAllCategories from '../vendor/VendorAllCategories';
import VendorSingleCategory from '../vendor/VendorSingleCategory';
import Dashboard from '../vendor/Dashboard';
import ViewJob from '../vendor/ViewJob';
import Support from '../Support';
import ChatListing from '../ChatListing';
import Chat from '../Chat';
import Faq from '../Faq';
import WithDraw from '../vendor/WithDraw';
import Search from '../Search';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={Constants.vendorHome}
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <HomeStack.Screen name={Constants.vendorHome} component={VendorHome} />
      <HomeStack.Screen name={Constants.search} component={Search} />
      <HomeStack.Screen
        name={Constants.vendorAllCategories}
        component={VendorAllCategories}
      />
      <HomeStack.Screen
        name={Constants.vendorSingleCategory}
        component={VendorSingleCategory}
      />
      <HomeStack.Screen name={Constants.filter} component={Filter} />
      <HomeStack.Screen name={Constants.viewJob} component={ViewJob} />
      <HomeStack.Screen
        name={Constants.termsAndConditionsScreen}
        component={TermsAndConditions}
      />
      <HomeStack.Screen name={Constants.faq} component={Faq} />
      <HomeStack.Screen name={Constants.support} component={Support} />
      <HomeStack.Screen
        name={Constants.notifications}
        component={Notifications}
      />
      <HomeStack.Screen name={Constants.settings} component={Settings} />
      <HomeStack.Screen name={Constants.chatListing} component={ChatListing} />
      <HomeStack.Screen name={Constants.chat} component={Chat} />
      <HomeStack.Screen
        name={Constants.vendorEditProfile}
        component={VendorEditProfile}
      />
    </HomeStack.Navigator>
  );
};

const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <DashboardStack.Screen name={Constants.dashboard} component={Dashboard} />
      <DashboardStack.Screen name={Constants.withDraw} component={WithDraw} />
      <DashboardStack.Screen name={Constants.viewJob} component={ViewJob} />
    </DashboardStack.Navigator>
  );
};

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <ProfileStack.Screen
        name={Constants.vendorProfile}
        component={VendorProfile}
      />
      <ProfileStack.Screen
        name={Constants.vendorEditProfile}
        component={VendorEditProfile}
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
      <SettingsStack.Screen
        name={Constants.chatListing}
        component={ChatListing}
      />
      <SettingsStack.Screen name={Constants.chat} component={Chat} />
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
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    height: Platform.OS === 'android' ? 60 : 80,
    marginTop: 2,
    elevation: 4,
    borderTopWidth: 0,
  },
  showLabel: false,
};
const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={Constants.vendorHome}
      tabBarOptions={customTabBarStyle}>
      <Tab.Screen
        name={Constants.vendorHome}
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
                bottom: 10,
              }}>
              <Image
                source={Images.barDashboard}
                style={{
                  height: 90,
                  width: 90,
                  resizeMode: 'contain',
                }}
              />
            </View>
          ),
        }}
        component={DashboardNavigator}
      />
      <Tab.Screen
        name={Constants.vendorProfile}
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
        component={Settings}
        listeners={({navigation}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.openDrawer();
          },
        })}
      />
    </Tab.Navigator>
  );
};

const VendorTabNavigator = () => {
  return <Tabs />;
};

export default VendorTabNavigator;
