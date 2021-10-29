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
import BoldTextCB from '../../components/BoldTextCB';
import RegularTextCB from '../../components/RegularTextCB';
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

import messaging from '@react-native-firebase/messaging';
import Axios from '../../network/APIKit';
import utils from '../../utils';
import moment from 'moment';
import ButtonRadius10 from '../../components/ButtonRadius10';
import Firebase from '../../FireBaseConfig';
import Geolocation from '@react-native-community/geolocation';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isVendor: false,
    gotUser: false,
    isVisible: false,
    quickNotifyOrderItem: '',
    quickNotifyOrderId: '',
    QuickJobCategoryName: '',
    QuickJobPrice: '',
    QuickJobLocation: '',
    QuickJobAddress: '',
    QuickJobTime: '',
    accessToken: '',
    vendorThankyoumodal: false,
    customerJobAcceptedModal: false,
  };

  componentDidMount() {
    this.getUserType();
  }

  getBookingDetail = async (orderId) => {
    let token = await AsyncStorage.getItem(Constants.accessToken);
    this.toggleIsLoading();

    const onSuccess = ({data}) => {
      console.log(' Schedule Bookings Detail  =====', data.data);

      if (
        data.data.orderStatus === 'pending' &&
        data.data.orderStatus === 'cancelled'
      ) {
        this.toggleIsLoading();
        this.props.navigation.navigate(Constants.BookingAcceptance, {
          orderId: orderId,
        });
      } else {
        this.toggleIsLoading();
        this.props.navigation.navigate(Constants.JobInProgress, {
          orderId: orderId,
        });
      }
    };

    const onFailure = (error) => {
      this.toggleIsLoading();

      utils.showResponseError(error);
      console.log('==================Error', error);
    };
    let params = {
      orderId: orderId,
    };
    Axios.get(Constants.orderDetail, {
      params: params,
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getUserType = async () => {
    const user = await AsyncStorage.getItem('user');
    var userData = JSON.parse(user);

    this.setState({accessToken: userData.token});
    this.setState({isVendor: userData.type === 'vendor'}, () => {
      console.log('userType: ', this.state.isVendor),
        this.setState({gotUser: true});
      if (!this.state.isVendor) {
        // Geolocation.requestAuthorization();
      }
      this.notificationListener();
    });
  };

  /*  ###################################   ###################################* */
  /*  ************************** FIREBASE NOTIFICATIION ************************ */
  /*  ###################################   ###################################* */
  notificationListener = async () => {
    // await Firebase();

    console.log('notificationListener started');

    // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //   console.log('Your message was handled in background', remoteMessage);
    // });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp((rm) => {
      console.log(
        'Notification caused app to open from background state:',
        rm.notification,
      );
      console.warn(
        'Notification caused app to open from background state:',
        rm,
      );

      // FOR SCHEDULEBOOKING
      if (this.state.isVendor && rm.data.source === 'Booking') {
        if (
          rm.data.trigger_type === 'order' &&
          rm.data.body === 'your order has completed successfully'
        ) {
          this.setState({vendorThankyoumodal: true});
        } else {
          this.getBookingDetail(rm.data.trigger_id);
        }
      }
      if (!this.state.isVendor && rm.data.source === 'Booking') {
        if (
          rm.data.trigger_type === 'order' ||
          rm.data.body === 'your order has completed successfully'
        ) {
          // this.setState({vendorThankyoumodal: true});
        } else {
          this.props.navigation.navigate(Constants.SchechuleJobDetail, {
            joid: rm.data.trigger_id,
          });
        }
      }

      // FOR POSTED JOB
      if (!this.state.isVendor && rm.data.source === 'Job') {
        this.props.navigation.navigate(Constants.JobAcceptance, {
          jobId: rm.data.job_id,
        });
      }
      if (this.state.isVendor && rm.data.source === 'Job') {
        if (
          rm.data.trigger_type === 'order' &&
          rm.data.body === 'your order has completed successfully'
        ) {
          this.setState({vendorThankyoumodal: true});
        } else {
          this.props.navigation.navigate(Constants.viewJob, {
            item: rm.data.job_id,
          });
        }
      }

      // FOR Quick JOB
      if (rm.data.source === 'Quick Notify') {
        if (rm.data.trigger_type === 'quick_notify') {
          this.setState({quickNotifyOrderId: rm.data.trigger_id});
          this.getQuickOrderRequestData(rm.data.trigger_id);
        }

        if (rm.data.trigger_type === 'no_vendor_found') {
          alert('no vendor available in your area');
        }
        if (
          rm.data.trigger_type === 'quick_order_accepted' ||
          rm.notification.body === 'your quick order has accepted successfully'
        ) {
          this.setState({customerJobAcceptedModal: true}, () => {
            console.log(
              'ttttttttttttttt========>>>>>>>>',
              this.state.customerJobAcceptedModal,
            );
          });
        }
        if (
          rm.data.trigger_type === 'order_started' ||
          rm.notification.body === 'your order has started successfully'
        ) {
          this.props.navigation.navigate(Constants.confirmPayment, {
            orderId: rm.data.trigger_id,
            from: 'notification',
          });
        }
      } else {
        if (
          rm.data.trigger_type === 'order_completed' &&
          rm.data.body === 'your order has completed successfully'
        ) {
          this.setState({vendorThankyoumodal: true});
        }
      }

      if (rm.data.trigger_type === 'message') {
        AsyncStorage.setItem(
          `isMessageForOrderVisited${rm.data.order_id}`,
          JSON.stringify({orderID: rm.data.order_id, isRead: false}),
        );

        this.props.navigation.navigate(Constants.chat, {
          trigger: 'notification',
          data: rm.data,
        });
      }
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async (rm) => {
      console.log('Message handled in the background! ', rm);
      if (rm.data.trigger_type === 'message') {
        AsyncStorage.setItem(
          `isMessageForOrderVisited${rm.data.order_id}`,
          JSON.stringify({orderID: rm.data.order_id, isRead: false}),
        );
      }

      // if (rm.data.trigger_type === 'quick_notify') {
      //   this.setState({quickNotifyOrderId: rm.data.trigger_id});
      //   this.getQuickOrderRequestData(rm.data.trigger_id);
      // }

      // if (rm.data.trigger_type === 'no_vendor_found') {
      //   // this.setState({quickNotifyOrderId: rm.data.trigger_id});
      //   // this.getQuickOrderRequestData(rm.data.trigger_id);
      //   alert('no vendor available in your area');
      // }

      // if (
      //   rm.data.trigger_type === 'quick_order_accepted' ||
      //   rm.notification.body === 'your quick order has accepted successfully'
      // ) {
      //   this.setState({customerJobAcceptedModal: true}, () => {
      //     console.log(
      //       'ttttttttttttttt========>>>>>>>>',
      //       this.state.customerJobAcceptedModal,
      //     );
      //   });
      // }

      // if (
      //   rm.data.trigger_type === 'order' &&
      //   rm.data.body === 'your order has completed successfully'
      // ) {
      //   this.setState({vendorThankyoumodal: true});
      // }
    });

    // Check foreGround
    messaging().onMessage(async (rm) => {
      console.log('recived in forground', rm);
      if (rm.data.trigger_type === 'message') {
        // this.props.navigation.navigate(Constants.chat, {
        //   trigger: 'notification',
        //   data: rm.data,
        // });

        AsyncStorage.setItem(
          `isMessageForOrderVisited${rm.data.order_id}`,
          JSON.stringify({orderID: rm.data.order_id, isRead: false}),
        );
      }

      if (rm.data.trigger_type === 'quick_notify') {
        this.setState({quickNotifyOrderId: rm.data.trigger_id});
        this.getQuickOrderRequestData(rm.data.trigger_id);
      }
      if (rm.data.trigger_type === 'no_vendor_found') {
        // this.setState({quickNotifyOrderId: rm.data.trigger_id});
        // this.getQuickOrderRequestData(rm.data.trigger_id);
        alert('no vendor available in your area');
      }
      if (rm.data.trigger_type === 'quick_order_accepted') {
        this.setState({customerJobAcceptedModal: true}, () => {
          console.log(
            'ttttttttttttttt========>>>>>>>>',
            this.state.customerJobAcceptedModal,
          );
        });
      }
      if (
        rm.data.trigger_type === 'order' &&
        rm.data.body === 'your order has completed successfully'
      ) {
        this.setState({vendorThankyoumodal: true});
      }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((rm) => {
        if (rm) {
          console.log(
            'Notification caused app to open from quit state:',
            rm.notification,
          );
          console.warn(
            'Notification caused app to open from quit state:',
            rm.notification,
          );
        }

        if (rm.data.trigger_type === 'quick_notify') {
          this.setState({quickNotifyOrderId: rm.data.trigger_id});
          this.getQuickOrderRequestData(rm.data.trigger_id);
        }
        if (rm.data.trigger_type === 'no_vendor_found') {
          // this.setState({quickNotifyOrderId: rm.data.trigger_id});
          // this.getQuickOrderRequestData(rm.data.trigger_id);
          alert('no vendor available in your area');
        }
        if (rm.data.trigger_type === 'quick_order_accepted') {
          // this.getQuickOrderRequestData(rm.data.trigger_id);
          // alert('Your quick job has been accepted.');
          this.setState({customerJobAcceptedModal: true}, () => {
            console.log(
              'ttttttttttttttt========>>>>>>>>',
              this.state.customerJobAcceptedModal,
            );
          });
        }
        if (
          rm.data.trigger_type === 'order' &&
          rm.data.body === 'your order has completed successfully'
        ) {
          this.setState({vendorThankyoumodal: true});
        }
      })
      .catch((error) => {
        console.log('getInitialNotification ======> ', error);
        console.log('getInitialNotification ======> ', error);
      });
  };

  getQuickOrderRequestData = (orderId) => {
    // console.log(`Bearer ${this.state.accessToken}`);
    const onSuccess = ({data}) => {
      console.log(
        'get quick job pop up success ======>>>>>>> ',
        // this.state.accessToken,
      );
      // console.log(data.data.address);
      this.setState(
        {
          quickNotifyOrderItem: data.data,
          QuickJobCategoryName: data.data.category.name,
          QuickJobPrice: data.data.grandTotal,
          QuickJobAddress: data.data.address,
          QuickJobLocation: data.data.location,
          QuickJobTime: data.data.start_time,
        },
        () => {
          this.setState({isVisible: true});
        },
      );
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
      console.log('get quick job pop up error==========', error);
    };

    const params = {
      orderId: orderId,
    };

    Axios.get(Constants.VendorviewOrderDetailUrl, {
      params,
      headers: {
        Authorization: `Bearer ${this.state.accessToken}`,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  Accept_DeclineQuickJob = (status) => {
    console.log(
      'bearer accept/decline ======>>>>>>> ',
      this.state.quickNotifyOrderId,
    );
    let params = {
      order_id: this.state.quickNotifyOrderId,
      status: status,
    };

    const onSuccess = ({data}) => {
      console.log(data);
      this.setState({isVisible: false});
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
      // this.setState({isVisible: false});
      console.log('accept/decline ==========', error.request);
      // console.log('accept/decline ==========', Object.keys(error));
    };

    Axios.get(Constants.ChangeQuickJobStatus_Vendor, {
      params,
      headers: {
        Authorization: `Bearer ${this.state.accessToken}`,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  DrawerScreens = () => {
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

        <View>
          <Modal
            isVisible={this.state.customerJobAcceptedModal}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}>
            <View
              style={{
                backgroundColor: Colors.white,
                padding: SIZES.fifteen,
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Image
                source={Images.greenTick}
                resizeMode="contain"
                style={{
                  height: SIZES.fifteen * 5,
                  width: SIZES.fifteen * 5,
                  marginBottom: 15,
                }}
              />
              <BoldTextCB style={[{color: Colors.black, fontSize: 22}]}>
                Job Accepted
              </BoldTextCB>
              <RegularTextCB
                style={{
                  marginVertical: SIZES.ten,
                  fontSize: 16,
                  color: Colors.coolGrey,
                }}>
                Your Job has been Accepted by one of our vendors.
              </RegularTextCB>
              <View
                style={{
                  marginVertical: SIZES.ten * 3,
                  width: '100%',
                }}>
                <ButtonRadius10
                  label="OKAY"
                  bgColor={Colors.sickGreen}
                  onPress={() => {
                    this.setState({customerJobAcceptedModal: false}, () => {
                      // setTimeout(() => {
                      //   this.props.navigation.replace(Constants.vendorHome);
                      // }, 500);
                    });
                  }}
                />
              </View>
            </View>
          </Modal>
        </View>
      </View>
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
                    Category
                  </Text>
                  <View
                    style={[
                      STYLES.card,
                      {borderWidth: 1, borderColor: Colors.sickGreen},
                    ]}>
                    <Text style={FONTS.mediumFont16}>
                      {this.state.QuickJobCategoryName}
                    </Text>
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
                    <Text style={FONTS.mediumFont16}>
                      ${this.state.QuickJobPrice}
                    </Text>
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
                    <Text style={FONTS.mediumFont16}>
                      {this.state.QuickJobLocation}
                    </Text>
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
                      {this.state.QuickJobAddress}
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
                    <Text style={FONTS.mediumFont16}>
                      {this.state.QuickJobTime}
                      {/* {moment(new Date(this.state.QuickJobTime)).format(
                        'hh:mm',
                      )} */}
                    </Text>
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
                    this.Accept_DeclineQuickJob('accepted');
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
                    this.Accept_DeclineQuickJob('cancelled');
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

        <View>
          <Modal
            isVisible={this.state.vendorThankyoumodal}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}>
            <View
              style={{
                backgroundColor: Colors.white,
                padding: SIZES.fifteen,
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Image
                source={Images.greenTick}
                resizeMode="contain"
                style={{
                  height: SIZES.fifteen * 5,
                  width: SIZES.fifteen * 5,
                  marginBottom: 15,
                }}
              />
              <BoldTextCB style={[{color: Colors.black, fontSize: 22}]}>
                Thank You
              </BoldTextCB>
              <RegularTextCB
                style={{
                  marginVertical: SIZES.ten,
                  fontSize: 16,
                  color: Colors.coolGrey,
                }}>
                For your great service
              </RegularTextCB>
              <View
                style={{
                  marginVertical: SIZES.ten * 3,
                  width: '100%',
                }}>
                <ButtonRadius10
                  label="JOB COMPLETED"
                  bgColor={Colors.sickGreen}
                  onPress={() => {
                    this.setState({vendorThankyoumodal: false}, () => {
                      // setTimeout(() => {
                      //   this.props.navigation.replace(Constants.vendorHome);
                      // }, 500);
                    });
                  }}
                />
              </View>
            </View>
          </Modal>
        </View>
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
