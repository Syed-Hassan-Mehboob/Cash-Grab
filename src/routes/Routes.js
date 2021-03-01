import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import Login from '../views/Login';
import Splash from '../views/Splash';
import SignUp from '../views/SignUp';
import ForgetPassword from '../views/ForgetPassword';
import Categories from '../views/Categories';
import BestEmployees from '../views/BestEmployees';
import BookingConfirmed from '../views/BookingConfirmed';
import ConfirmBooking from '../views/ConfirmBooking';
import EmergencyBooking from '../views/EmergencyBooking';
import Nearby from '../views/Nearby';
import AdvanceBooking from '../views/AdvanceBooking';
import Home from '../views/Home';
import EditProfile from '../views/EditProfile';

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
    <Stack.Navigator initialRouteName="Splash" headerMode="none">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="BestEmployees" component={BestEmployees} />
      <Stack.Screen name="BookingConfirmed" component={BookingConfirmed} />
      <Stack.Screen name="EmergencyBooking" component={EmergencyBooking} />
      <Stack.Screen name="Nearby" component={Nearby} />
      <Stack.Screen name="AdvanceBooking" component={AdvanceBooking} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ConfirmBooking" component={ConfirmBooking} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};
