/* @flow */
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {CommonActions} from '@react-navigation/native';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import Colors from '../common/Colors';
import Constants, {SIZES} from '../common/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BoldTextCB from '../components/BoldTextCB';
import utils from '../utils';
import Axios from '../network/APIKit';

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{name: Constants.login}],
});

export default class DrawerScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isLoading: false,
    isVendor: false,
    isLogoutModalVisible: false,
    accessToken: '',
    avatar: '',
    name: '',
    email: '',
    countryCode: '',
    phone: '',
    location: '',
  };

  componentDidMount() {
    this.getUserType();
  }

  getUserType = async () => {
    const user = await AsyncStorage.getItem(Constants.user);
    var userData = JSON.parse(user);

    this.setState(
      {
        isVendor: userData.type === 'vendor',
        accessToken: 'Bearer ' + userData.token,
      },
      () => this.getUserProfile(),
    );
  };

  getUserProfile = () => {
    const onSuccess = ({data}) => {
      console.log(
        'ssssssssssssssssssssdsdsssdsdsdsdsdssdsdsdsdsdsd ======== >>>>> ',
        Constants.imageURL + data.data.records.user_profiles.image,
      );
      this.setState({
        avatar: Constants.imageURL + data.data.records.user_profiles.image,
        name: data.data.records.name,
        email: data.data.records.email,
        countryCode: data.data.records.country_code,
        phone: data.data.records.phone,
        location: data.data.records.user_profiles.location,
      });
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
    };

    // console.log(this.state.accessToken);

    Axios.get(Constants.getProfileURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  logout() {
    const onSuccess = ({data}) => {
      this.setState({isLoading: false});

      AsyncStorage.removeItem('user');
      this.props.navigation.dispatch(resetAction);
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.state.accessToken,
      },
    };

    this.setState({isLoading: true});
    Axios.get(Constants.logoutURL, options).then(onSuccess).catch(onFailure);
  }

  toggleModal = () => {
    this.setState({
      isLogoutModalVisible: !this.state.isLogoutModalVisible,
    });
  };

  getUserName() {
    const {userData} = this.state;
    if (userData != null) {
      return (
        <RegularTextCB
          numberOfLines={1}
          style={{fontSize: 22, fontFamily: Constants.fontBold, color: '#000'}}>
          {userData.name}
        </RegularTextCB>
      );
    }
  }

  render() {
    return (
      <View style={styles.drawerContainer}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(
                this.state.isVendor
                  ? Constants.vendorEditProfile
                  : Constants.editProfile,
                {
                  avatar: this.state.avatar,
                  name: this.state.name,
                  email: this.state.email,
                  countryCode: this.state.countryCode,
                  phone: this.state.phone,
                  location: this.state.location,
                },
              )
            }
            style={{
              width: '100%',
              flexDirection: 'row',
              height: SIZES.ten * 11,
              paddingTop:
                Platform.OS === 'android' ? SIZES.ten * 3 : SIZES.ten * 6,
              paddingBottom: 20,
              alignItems: 'center',
              paddingHorizontal: 25,
            }}>
            <View style={styles.circleCard}>
              <Image
                source={{uri: this.state.avatar}}
                style={styles.iconUser}
                resizeMode="cover"
              />
            </View>
            <View style={{flex: 1, paddingHorizontal: SIZES.ten}}>
              <RegularTextCB style={{fontSize: 16, color: Colors.sickGreen}}>
                {this.state.name}
              </RegularTextCB>
              <RegularTextCB style={{fontSize: 14, color: Colors.coolGrey}}>
                {this.state.location}
              </RegularTextCB>
            </View>
          </TouchableOpacity>
          <View style={[styles.formContainer2, {top: SIZES.ten * 2}]}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  padding: SIZES.fifteen,
                }}
                onPress={() => {
                  {
                    this.state.isVendor
                      ? this.props.navigation.navigate(Constants.VenderBookings)
                      : this.props.navigation.navigate(Constants.allCategories);
                  }
                }}>
                <Image source={Images.bookings} style={styles.iconDrawer} />
                <RegularTextCB style={styles.drawerSubText}>
                  {this.state.isVendor ? 'Bookings' : 'Schedule Bookings'}
                </RegularTextCB>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  padding: SIZES.fifteen,
                }}
                onPress={() => {
                  this.props.navigation.navigate(Constants.notifications);
                }}>
                <Image
                  source={Images.iconDrawerBell}
                  style={styles.iconDrawer}
                />
                <RegularTextCB style={styles.drawerSubText}>
                  Notifications
                </RegularTextCB>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  padding: SIZES.fifteen,
                }}
                onPress={() => {
                  this.props.navigation.navigate(Constants.chatListing);
                }}>
                <Image
                  source={Images.iconDrawerChat}
                  style={styles.iconDrawer}
                />
                <RegularTextCB style={styles.drawerSubText}>Chat</RegularTextCB>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  padding: SIZES.fifteen,
                }}
                onPress={() => {
                  this.props.navigation.navigate(Constants.settings);
                }}>
                <Image
                  source={Images.iconDrawerSettings}
                  style={styles.iconDrawer}
                />
                <RegularTextCB style={styles.drawerSubText}>
                  Settings
                </RegularTextCB>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  padding: SIZES.fifteen,
                }}
                onPress={() => {
                  this.props.navigation.navigate(Constants.changePassword);
                }}>
                <Image
                  source={Images.iconDrawerLock}
                  style={styles.iconDrawer}
                />
                <RegularTextCB style={styles.drawerSubText}>
                  Change Password
                </RegularTextCB>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  padding: SIZES.fifteen,
                }}
                onPress={() => {
                  this.props.navigation.navigate(Constants.faq);
                }}>
                <Image
                  source={Images.iconDrawerFaq}
                  style={styles.iconDrawer}
                />
                <RegularTextCB style={styles.drawerSubText}>
                  FAQ's
                </RegularTextCB>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  padding: SIZES.fifteen,
                }}
                onPress={() => {
                  this.props.navigation.navigate(
                    Constants.termsAndConditionsScreen,
                  );
                }}>
                <Image
                  source={Images.iconDrawerTermsAndCond}
                  style={styles.iconDrawer}
                />
                <RegularTextCB style={styles.drawerSubText}>
                  Terms & Conditions
                </RegularTextCB>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  padding: SIZES.fifteen,
                }}
                onPress={() => {
                  this.props.navigation.navigate(Constants.support);
                }}>
                <Image
                  source={Images.iconDrawerSupport}
                  style={styles.iconDrawer}
                />
                <RegularTextCB style={styles.drawerSubText}>
                  Support
                </RegularTextCB>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this.toggleModal()}
              style={{
                flexDirection: 'row',
                width: '100%',
                flex: 0.3,
                alignItems: 'center',
                paddingHorizontal: SIZES.ten,
                paddingVertical: SIZES.ten,
              }}>
              <Image
                source={Images.iconDrawerLogOut}
                style={styles.iconDrawer}
              />
              <RegularTextCB style={styles.drawerSubText}>Logout</RegularTextCB>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          isVisible={this.state.isLogoutModalVisible}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <View style={{backgroundColor: Colors.navy, padding: SIZES.fifteen}}>
            <BoldTextCB style={[{color: Colors.white, fontSize: 22}]}>
              CashGrab
            </BoldTextCB>
            <RegularTextCB
              style={{
                marginVertical: SIZES.ten,
                fontSize: 16,
                color: Colors.white,
              }}>
              Are you sure you want to logout?
            </RegularTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.ten,
                alignSelf: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      isLogoutModalVisible: false,
                    },
                    () => {
                      this.logout();
                    },
                  );
                }}
                style={{
                  padding: SIZES.ten,
                  width: SIZES.fifty,
                  alignItems: 'center',
                  borderRadius: SIZES.fifteen,
                  backgroundColor: Colors.white,
                  marginEnd: SIZES.five,
                }}>
                <RegularTextCB style={{color: Colors.navy}}>Yes</RegularTextCB>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.toggleModal();
                }}
                style={{
                  padding: SIZES.ten,
                  width: SIZES.fifty,
                  alignItems: 'center',
                  borderRadius: SIZES.fifteen,
                  backgroundColor: Colors.white,
                  marginStart: SIZES.five,
                }}>
                <RegularTextCB style={{color: Colors.navy}}>No</RegularTextCB>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: Colors.navy,
    overflow: 'hidden',
  },
  drawerSubText: {
    paddingVertical: SIZES.ten,
    color: Colors.white,
    paddingHorizontal: SIZES.ten,
  },
  formContainer2: {
    flex: 1,
    width: '100%',
    paddingHorizontal: SIZES.ten,
  },
  iconUser: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: (SIZES.ten * 6) / 2,
    resizeMode: 'contain',
    borderColor: Colors.sickGreen,
    borderWidth: 1,
  },
  circleCard: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: SIZES.ten * 3,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  iconDrawer: {
    width: SIZES.twenty + 2,
    height: SIZES.twenty + 2,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
