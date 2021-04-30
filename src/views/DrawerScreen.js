/* @flow */
import React, {Component} from 'react';
import {
  View,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {CommonActions} from '@react-navigation/native';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{name: Constants.login}],
});

export default class DrawerScreen extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    Alert.alert(
      'Dynout',
      'Are you sure you want to logout?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            AsyncStorage.removeItem('isVendor');
            this.props.navigation.dispatch(resetAction);
          },
        },
      ],
      {cancelable: false},
    );
  }

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
            onPress={() => this.props.navigation.navigate('EditProfile')}
            style={{
              width: '100%',
              flexDirection: 'row',
              height: 110,
              paddingTop: 30,
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
                  this.props.navigation.navigate(
                    Constants.termsAndConditionsScreen,
                  );
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
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
  iconDrawer: {
    width: 22,
    height: 22,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
