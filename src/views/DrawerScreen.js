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
import Constants from '../common/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BoldTextCB from '../components/BoldTextCB';

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{name: Constants.login}],
});

export default class DrawerScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isVendor: false,
    isLogoutModalVisible: false,
  };

  componentDidMount() {
    this.getUserType();
  }

  getUserType = async () => {
    const user = await AsyncStorage.getItem(Constants.user);
    var userData = JSON.parse(user);
    this.setState({isVendor: userData === 'vendor'});
  };

  logout() {
    this.toggleModal();
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
              )
            }
            style={{
              width: '100%',
              flexDirection: 'row',
              height: 110,
              paddingTop: Platform.OS === 'android' ? 30 : 60,
              paddingBottom: 20,
              alignItems: 'center',
              paddingHorizontal: 25,
            }}>
            <View style={styles.circleCard}>
              <Image source={Images.emp2} style={styles.iconUser} />
            </View>
            <View style={{flex: 1, paddingHorizontal: 10}}>
              <RegularTextCB style={{fontSize: 16, color: Colors.sickGreen}}>
                Damien
              </RegularTextCB>
              <RegularTextCB style={{fontSize: 14, color: Colors.coolGrey}}>
                New York, USA
              </RegularTextCB>
            </View>
          </TouchableOpacity>
          <View style={[styles.formContainer2, {top: 50}]}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  padding: 15,
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
                  padding: 15,
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
                  padding: 15,
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
                  padding: 15,
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
                  padding: 15,
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
                  padding: 15,
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
              onPress={() => this.logout()}
              style={{
                flexDirection: 'row',
                width: '100%',
                flex: 0.3,
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
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
          <View style={{backgroundColor: Colors.navy, padding: 15}}>
            <BoldTextCB style={[{color: Colors.white, fontSize: 22}]}>
              CashGrab
            </BoldTextCB>
            <RegularTextCB
              style={{marginVertical: 10, fontSize: 16, color: Colors.white}}>
              Are you sure you want to logout?
            </RegularTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignSelf: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      isLogoutModalVisible: false,
                    },
                    () => {
                      AsyncStorage.removeItem('user');
                      this.props.navigation.dispatch(resetAction);
                    },
                  );
                }}
                style={{
                  padding: 10,
                  width: 50,
                  alignItems: 'center',
                  borderRadius: 15,
                  backgroundColor: Colors.white,
                  marginEnd: 5,
                }}>
                <RegularTextCB style={{color: Colors.navy}}>Yes</RegularTextCB>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.toggleModal();
                }}
                style={{
                  padding: 10,
                  width: 50,
                  alignItems: 'center',
                  borderRadius: 15,
                  backgroundColor: Colors.white,
                  marginStart: 5,
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
    paddingVertical: 10,
    color: Colors.white,
    paddingHorizontal: 10,
  },
  formContainer2: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  iconUser: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  iconDrawer: {
    width: 22,
    height: 22,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
