import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../common/Colors';
import Constants, {SIZES, STYLES} from '../common/Constants';
import NormalHeader from '../components/NormalHeader';
import RegularTextCB from '../components/RegularTextCB';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isGeneralSettingsSelected: false,
    isAccountSettingsSelected: false,
    isNotificationsSelected: false,
    isChatSelected: false,
    isVerificationSelected: false,
  };

  selectGeneralSettings = () => {
    this.setState({
      isGeneralSettingsSelected: true,
      isAccountSettingsSelected: false,
      isNotificationsSelected: false,
      isChatSelected: false,
      isVerificationSelected: false,
    });
  };

  selectAccountSettings = () => {
    this.setState({
      isGeneralSettingsSelected: false,
      isAccountSettingsSelected: true,
      isNotificationsSelected: false,
      isChatSelected: false,
      isVerificationSelected: false,
    });
  };

  selectNotifications = () => {
    this.setState({
      isGeneralSettingsSelected: false,
      isAccountSettingsSelected: false,
      isNotificationsSelected: true,
      isChatSelected: false,
      isVerificationSelected: false,
    });
    this.openNextScreen(Constants.notifications);
  };

  selectChat = () => {
    this.setState({
      isGeneralSettingsSelected: false,
      isAccountSettingsSelected: false,
      isNotificationsSelected: false,
      isChatSelected: true,
      isVerificationSelected: false,
    });
    this.openNextScreen(Constants.chatListing);
  };

  selectVerification = () => {
    this.setState({
      isGeneralSettingsSelected: false,
      isAccountSettingsSelected: false,
      isNotificationsSelected: false,
      isChatSelected: false,
      isVerificationSelected: true,
    });
  };

  openNextScreen = (screenName) => {
    setTimeout(() => {
      this.props.navigation.navigate(screenName);
    }, 500);
  };

  render() {
    return (
      <View style={STYLES.container}>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            // padding: SIZES.fifteen,
            // marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
          }}>
           <RegularTextCB style={{fontSize: 30, color: Colors.black}}>
            Settings
          </RegularTextCB>  */}
        <NormalHeader name="Settings" />
        {/* </View> */}
        <View style={{margin: SIZES.ten}}>
          <TouchableOpacity
            style={[
              styles.card,
              {
                padding: SIZES.fifteen,
                borderWidth: this.state.isGeneralSettingsSelected ? 2 : 0,
              },
            ]}
            onPress={() => {
              this.selectGeneralSettings();
            }}>
            <RegularTextCB style={{fontSize: 16, color: Colors.coolGrey}}>
              General Settings
            </RegularTextCB>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.card,
              {
                padding: SIZES.fifteen,
                borderWidth: this.state.isAccountSettingsSelected ? 2 : 0,
              },
            ]}
            onPress={() => {
              this.selectAccountSettings();
            }}>
            <RegularTextCB style={{fontSize: 16, color: Colors.coolGrey}}>
              Account Settings
            </RegularTextCB>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.card,
              {
                padding: SIZES.fifteen,
                borderWidth: this.state.isNotificationsSelected ? 2 : 0,
              },
            ]}
            onPress={() => {
              this.selectNotifications();
            }}>
            <RegularTextCB style={{fontSize: 16, color: Colors.coolGrey}}>
              Notifications
            </RegularTextCB>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.card,
              {
                padding: SIZES.fifteen,
                borderWidth: this.state.isChatSelected ? 2 : 0,
              },
            ]}
            onPress={() => {
              this.selectChat();
            }}>
            <RegularTextCB style={{fontSize: 16, color: Colors.coolGrey}}>
              Chat
            </RegularTextCB>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    padding: SIZES.twenty,
    margin: SIZES.ten,
    borderColor: Colors.sickGreen,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
});
