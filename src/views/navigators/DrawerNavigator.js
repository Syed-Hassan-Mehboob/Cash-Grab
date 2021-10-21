import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Image,
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Constants, {
  FONTS,
  height,
  SIZES,
  STYLES,
  width,
} from '../../common/Constants';
import Colors from '../../common/Colors';
import Images from '../../common/Images';
import Modal from 'react-native-modal';
import DrawerScreen from '../DrawerScreen';
import UserTabNavigator from './UserTabNavigator';
import VendorTabNavigator from './VendorTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import ConfirmPayment from './../ConfirmPayment';
import BookingConfirmed from '../BookingConfirmed';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {isVendor: false, gotUser: false, isVisible: false};

  componentDidMount() {
    this.notificationListener();

    // this.interval = setInterval(() => {
    //   this.setState({isVisible: true}, () => {
    //     console.log(
    //       'after two seconds pop is visible========>>>>>',
    //       this.state.isVisible,
    //     );
    //   });
    // }, 10000);
    this.getUserType();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getUserType = async () => {
    const user = await AsyncStorage.getItem('user');
    var userData = JSON.parse(user);
    this.setState(
      {isVendor: userData.type === 'vendor'},
      () => console.log('userType: ', this.state.isVendor),
      this.setState({gotUser: true}),
    );
  };

  /*  ###################################   ###################################* */
  /*  ************************** FIREBASE NOTIFICATIION ************************ */
  /*  ###################################   ###################################* */
  notificationListener = async () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      console.warn(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check forGround
    messaging().onMessage(async (rm) => {
      console.log('recived in forground', rm);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          console.warn(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      })
      .catch((error) => {
        console.log('getInitialNotification ======> ', error);
        console.log('getInitialNotification ======> ', error);
      });
  };

  DrawerScreens = () => {
    //

    return this.state.gotUser === false ? (
      <Spinner
        visible={true}
        textContent={'Loading...'}
        textStyle={{
          color: '#FFF',
          fontFamily: Constants.fontRegular,
        }}
      />
    ) : !this.state.isVendor ? (
      <Drawer.Navigator
        drawerType="slide"
        drawerStyle={{width: '70%'}}
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
        }}
        initialRouteName={Constants.home}
        drawerContent={(props) => <DrawerScreen {...props} />}>
        <Drawer.Screen name="Tab" component={UserTabNavigator} />
        <Drawer.Screen
          name={Constants.confirmPayment}
          component={ConfirmPayment}
        />
        <Drawer.Screen
          name={Constants.bookingConfirmed}
          component={BookingConfirmed}
        />
      </Drawer.Navigator>
    ) : (
      <View style={{flex: 1}}>
        <Drawer.Navigator
          drawerType="slide"
          drawerStyle={{width: '70%'}}
          drawerContentOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {marginVertical: 5},
          }}
          initialRouteName={Constants.home}
          drawerContent={(props) => <DrawerScreen {...props} />}>
          <Drawer.Screen name="Tab" component={VendorTabNavigator} />
        </Drawer.Navigator>
        {/* {this.state.is ? ( */}
        <View>
          <Modal isVisible={this.state.isVisible} style={styles.modal}>
            <View
              style={{
                backgroundColor: Colors.white,
                paddingHorizontal: SIZES.fifteen,
                borderTopRightRadius: SIZES.fifteen,
                borderTopLeftRadius: SIZES.fifteen,
                paddingVertical: SIZES.ten,
                paddingBottom: SIZES.twenty * 1.5,
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
                  activeOpacity={0.7}
                  onPress={() => {
                    this.setState({isVisible: false});
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
                  activeOpacity={0.7}
                  onPress={() => {
                    this.setState({isVisible: false});
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
        {/* ) : null} */}
      </View>
    );
  };

  render() {
    return <this.DrawerScreens />;
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
