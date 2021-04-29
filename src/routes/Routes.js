import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React, {Component} from 'react';
import Login from '../views/Login';
import Splash from '../views/Splash';
import CreateAccount from '../views/CreateAccount';
import SignUp from '../views/SignUp';
import ForgetPassword from '../views/ForgetPassword';
import Categories from '../views/Categories';
import BestEmployees from '../views/BestEmployees';
import BookingConfirmed from '../views/BookingConfirmed';
import ConfirmBooking from '../views/ConfirmBooking';
import EmergencyBooking from '../views/EmergencyBooking';
import Nearby from '../views/Nearby';
import AdvanceBooking from '../views/AdvanceBooking';
import EditProfile from '../views/EditProfile';
import Constants from '../common/Constants';
import OTP from '../views/OTP';
import TabNavigator from '../views/TabNavigator';

const Stack = createStackNavigator();

export default class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );
  }
}

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Constants.splash}
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name={Constants.splash} component={Splash} />
      <Stack.Screen name={Constants.login} component={Login} />
      <Stack.Screen name={Constants.createAccount} component={CreateAccount} />
      <Stack.Screen name={Constants.signUp} component={SignUp} />
      <Stack.Screen
        name={Constants.forgetPassword}
        component={ForgetPassword}
      />
      <Stack.Screen name={Constants.otp} component={OTP} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="BestEmployees" component={BestEmployees} />
      <Stack.Screen name="EmergencyBooking" component={EmergencyBooking} />
      <Stack.Screen name="AdvanceBooking" component={AdvanceBooking} />
      <Stack.Screen name={Constants.tabNavigator} component={TabNavigator} />
      <Stack.Screen name="ConfirmBooking" component={ConfirmBooking} />
    </Stack.Navigator>
  );
};
