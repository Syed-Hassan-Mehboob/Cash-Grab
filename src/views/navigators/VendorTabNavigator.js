import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Platform, View} from 'react-native';
import Constants, {SIZES} from '../../common/Constants';
import Colors from '../../common/Colors';
import Images from '../../common/Images';
import Filter from '../Filter';
import VenderNotifications from '../vendor/VenderNotifications';
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
import ChangePassword from '../ChangePassword';
import VendorAllJobs from '../../views/vendor/VendorAllJobs';
import VenderFilter from '../vendor/VenderFilter';
import VenderFileredScreen from '../vendor/VenderFiltered';
import ViewVendorProfile from '../ViewVendorProfile';
import VendorBookings from '../vendor/Bookings';
import VendorQuickJobs from '../vendor/QuickJob';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={Constants.splash}
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
      <HomeStack.Screen
        name={Constants.vendorAllJobs}
        component={VendorAllJobs}
      />
      <HomeStack.Screen
        name={Constants.venderFilter}
        component={VenderFilter}
      />
      <HomeStack.Screen
        name={Constants.venderFilterd}
        component={VenderFileredScreen}
      />
      <HomeStack.Screen name={Constants.viewJob} component={ViewJob} />
      <HomeStack.Screen
        name={Constants.viewVendorProfile}
        component={ViewVendorProfile}
      />
      <HomeStack.Screen
        name={Constants.VenderBookings}
        component={VendorBookings}
      />
      <HomeStack.Screen
        name={Constants.VendorQuickJob}
        component={VendorQuickJobs}
      />
      <HomeStack.Screen
        name={Constants.termsAndConditionsScreen}
        component={TermsAndConditions}
      />
      <HomeStack.Screen name={Constants.faq} component={Faq} />
      <HomeStack.Screen name={Constants.support} component={Support} />
      <HomeStack.Screen
        name={Constants.notifications}
        component={VenderNotifications}
      />
      <HomeStack.Screen name={Constants.settings} component={Settings} />
      <HomeStack.Screen name={Constants.chatListing} component={ChatListing} />
      <HomeStack.Screen name={Constants.chat} component={Chat} />
      <HomeStack.Screen
        name={Constants.vendorEditProfile}
        component={VendorEditProfile}
      />
      <HomeStack.Screen
        name={Constants.changePassword}
        component={ChangePassword}
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
        component={VenderNotifications}
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
    borderTopLeftRadius: SIZES.twenty,
    borderTopRightRadius: SIZES.twenty,
    shadowColor: '#000000 ',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    height: Platform.OS === 'android' ? SIZES.ten * 6 : SIZES.ten * 8,
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
              style={{
                height: SIZES.twentyFive,
                width: SIZES.twentyFive,
                resizeMode: 'contain',
              }}
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
              style={{
                height: SIZES.twentyFive,
                width: SIZES.twentyFive,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
        component={VenderNotifications}
      />
      <Tab.Screen
        name={Constants.plus}
        options={{
          tabBarIcon: ({color}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                bottom: SIZES.ten,
              }}>
              <Image
                source={Images.barDashboard}
                style={{
                  height: SIZES.ten * 9,
                  width: SIZES.ten * 9,
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
              style={{
                height: SIZES.twentyFive,
                width: SIZES.twentyFive,
                resizeMode: 'contain',
              }}
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
              style={{
                height: SIZES.twentyFive,
                width: SIZES.twentyFive,
                resizeMode: 'contain',
              }}
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
