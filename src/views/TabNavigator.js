import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Constants from '../common/Constants';
import Home from '../views/Home';
import Nearby from '../views/Nearby';
import Images from '../common/Images';
import TabBar from './TabBar';
import AllCategories from '../views/AllCategories';
import Notifications from './Notifications';
import Filter from './Filter';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
// const MoreStack = createStackNavigator();
// const MoreNavigator = () => {
//   return (
//     <MoreStack.Navigator
//       headerMode={'none'}
//       screenOptions={{
//         gestureEnabled: false,
//         ...TransitionPresets.SlideFromRightIOS,
//       }}>
//       <MoreStack.Screen name={Constants.moreScreen} component={More} />
//       <MoreStack.Screen
//         name={Constants.termsAndConditionsScreen}
//         component={TermsAndConditions}
//       />
//       <MoreStack.Screen name={Constants.helpScreen} component={Help} />
//       <MoreStack.Screen name={Constants.settingsScreen} component={Settings} />
//       <MoreStack.Screen name={Constants.updatesScreen} component={Updates} />
//       <MoreStack.Screen
//         name={Constants.favoritePetsScreen}
//         component={FavoritePets}
//       />
//       <MoreStack.Screen
//         name={Constants.orderHistoryScreen}
//         component={OrderHistory}
//       />
//     </MoreStack.Navigator>
//   );
// };

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

const TabScreens = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name={Constants.home}
        component={HomeNavigator}
        initialParams={{icon: Images.barHome}}
      />
      <Tab.Screen
        name={Constants.notifications}
        component={Notifications}
        initialParams={{icon: Images.barBell}}
      />
      <Tab.Screen
        name={Constants.plus}
        component={Home}
        initialParams={{icon: Images.barPlus}}
      />
      <Tab.Screen
        name={Constants.profile}
        component={Home}
        initialParams={{icon: Images.barProfile}}
      />
      <Tab.Screen
        name={Constants.more}
        component={Home}
        initialParams={{icon: Images.barMore}}
      />
    </Tab.Navigator>
  );
};

const TabNavigator = () => {
  return <TabScreens />;
};

export default TabNavigator;
