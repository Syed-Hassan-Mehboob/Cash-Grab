import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet} from 'react-native';
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
import Constants, {
  FONTS,
  height,
  SIZES,
  STYLES,
  width,
} from '../common/Constants';
import OTP from '../views/OTP';
import DrawerNavigator from '../views/navigators/DrawerNavigator';
import LoginOrJoin from '../views/LoginOrJoin';
import VerifyVia from '../views/VerifyVia';
import AddServices from '../views/vendor/AddServices';

import SelectIntrest from '../views/vendor/SelectIntrest';
import SelectIndustry from '../views/vendor/SelectIndustry';
import VendorSignUp from '../views/vendor/VendorSignUp';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {Text} from 'react-native';
import Colors from '../common/Colors';
import EditText from '../components/EditText';
import {TouchableOpacity} from 'react-native';
import ResetPassword from '../views/ResetPassword';
import Chat from '../views/Chat';

const Stack = createStackNavigator();

export default function Routes(props) {
  // state = {isVendor: false, gotUser: false, popUp: false};
  const [isVendor, setIsVendor] = useState(true);
  const [gotUser, setGotUser] = useState(false);

  const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   const user = AsyncStorage.getItem('user');
  //   // var userData = JSON.parse(user);
  //   // if (userData.type === 'vendor') {
  //   //   setIsVendor(true);
  //   // }
  //   console.log('=====', user);
  // }, []);

  // useEffect(() => {
  //   // const user = await AsyncStorage.getItem('user');
  //   // var userData = JSON.parse(user);
  //   // console.log('isVendor==========>>>', userData);
  //   // getUserType();
  //   getUserType();
  //   console.log('sssssssss=====>>>>', 'routes.js');
  // }, []);

  // const getUserType = async () => {
  //   const user = await AsyncStorage.getItem('user');
  //   var userData = JSON.parse(user);
  //   console.log('isVendor==========>>>', userData);
  //   // setIsVendor(userData.type === 'vendor' ? true : false);
  //   // if (userData) {
  //   //   setGotUser(true);
  //   // }
  // };

  const AppStack = () => {
    return (
      <View style={{flex: 1}}>
        <Stack.Navigator
          initialRouteName={Constants.splash}
          headerMode="none"
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <Stack.Screen name={Constants.splash} component={Splash} />
          <Stack.Screen name={Constants.loginOrJoin} component={LoginOrJoin} />
          <Stack.Screen name={Constants.login} component={EditProfile} />
          <Stack.Screen
            name={Constants.createAccount}
            component={CreateAccount}
          />
          <Stack.Screen name={Constants.signUp} component={SignUp} />
          <Stack.Screen
            name={Constants.VendorSignUp}
            component={VendorSignUp}
          />
          <Stack.Screen
            name={Constants.SelectIndustry}
            component={SelectIndustry}
          />
          <Stack.Screen
            name={Constants.SelectIntrest}
            component={SelectIntrest}
          />
          <Stack.Screen
            name={Constants.forgetPassword}
            component={ForgetPassword}
          />
          <Stack.Screen
            name={Constants.ResetPassword}
            component={ResetPassword}
          />
          <Stack.Screen name={Constants.verifyVia} component={VerifyVia} />
          <Stack.Screen name={Constants.otp} component={OTP} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="BestEmployees" component={BestEmployees} />
          <Stack.Screen name="EmergencyBooking" component={EmergencyBooking} />
          <Stack.Screen name="AdvanceBooking" component={AdvanceBooking} />
          <Stack.Screen
            name={Constants.drawerNavigator}
            component={DrawerNavigator}
          />
          <Stack.Screen name="ConfirmBooking" component={ConfirmBooking} />
          <Stack.Screen name="AddServices" component={AddServices} />
          <Stack.Screen name={Constants.chat} component={Chat} />
        </Stack.Navigator>

        {/* {isVendor ? (
          <View>
            <Modal isVisible={isVisible} style={styles.modal}>
              <View
                style={{
                  backgroundColor: Colors.white,
                  paddingHorizontal: SIZES.fifteen,
                  borderTopRightRadius: SIZES.fifteen,
                  borderTopLeftRadius: SIZES.fifteen,
                  paddingVertical: SIZES.ten,
                  paddingBottom: SIZES.twenty * 1.5,
                  // height: height,
                }}>
                <Text
                  style={[
                    FONTS.boldFont18,
                    {color: Colors.sickGreen, marginVertical: SIZES.ten},
                  ]}>
                  Do you wish to accept this order?
                </Text>
                <View>
                  <View style={{marginVertical: SIZES.five}}>
                    <Text
                      style={[
                        FONTS.mediumFont14,
                        {color: Colors.black, marginVertical: SIZES.five},
                      ]}>
                      Service
                    </Text>
                    <View
                      style={[
                        STYLES.card,
                        {borderWidth: 1, borderColor: Colors.sickGreen},
                      ]}>
                      <Text style={FONTS.mediumFont16}>Service</Text>
                    </View>
                  </View>
                  <View style={{marginVertical: SIZES.five}}>
                    <Text
                      style={[
                        FONTS.mediumFont14,
                        {color: Colors.black, marginVertical: SIZES.five},
                      ]}>
                      $Price
                    </Text>
                    <View
                      style={[
                        STYLES.card,
                        {borderWidth: 1, borderColor: Colors.sickGreen},
                      ]}>
                      <Text style={FONTS.mediumFont16}>$100.00</Text>
                    </View>
                  </View>
                  <View style={{marginVertical: SIZES.five}}>
                    <Text
                      style={[
                        FONTS.mediumFont14,
                        {color: Colors.black, marginVertical: SIZES.five},
                      ]}>
                      Location
                    </Text>
                    <View
                      style={[
                        STYLES.card,
                        {borderWidth: 1, borderColor: Colors.sickGreen},
                      ]}>
                      <Text style={FONTS.mediumFont16}>New York, USA</Text>
                    </View>
                  </View>
                  <View style={{marginVertical: SIZES.five}}>
                    <Text
                      style={[
                        FONTS.mediumFont14,
                        {color: Colors.black, marginVertical: SIZES.five},
                      ]}>
                      Address
                    </Text>
                    <View
                      style={[
                        STYLES.card,
                        {borderWidth: 1, borderColor: Colors.sickGreen},
                      ]}>
                      <Text style={FONTS.mediumFont16}>
                        111,NYC Street, NY 1121
                      </Text>
                    </View>
                  </View>
                  <View style={{marginVertical: SIZES.five}}>
                    <Text
                      style={[
                        FONTS.mediumFont14,
                        {color: Colors.black, marginVertical: SIZES.five},
                      ]}>
                      Exact Time
                    </Text>
                    <View
                      style={[
                        STYLES.card,
                        {borderWidth: 1, borderColor: Colors.sickGreen},
                      ]}>
                      <Text style={FONTS.mediumFont16}>12:00 PM</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: SIZES.ten * 1.5,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                      setIsVisible(false);
                    }}
                    style={{
                      padding: SIZES.fifteen,
                      backgroundColor: Colors.sickGreen,
                      paddingHorizontal: SIZES.twentyFive * 1.5,
                      borderRadius: SIZES.ten,
                      width: width / 2.5,
                      alignItems: 'center',
                    }}>
                    <Text style={FONTS.mediumFont18}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                      setIsVisible(false);
                    }}
                    style={{
                      padding: SIZES.fifteen,
                      backgroundColor: Colors.coolGrey,
                      paddingHorizontal: SIZES.twentyFive * 1.5,
                      borderRadius: SIZES.ten,
                      width: width / 2.5,
                      alignItems: 'center',
                    }}>
                    <Text style={[FONTS.mediumFont18, {color: Colors.white}]}>
                      Decline
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        ) : null} */}
      </View>
    );
  };

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
