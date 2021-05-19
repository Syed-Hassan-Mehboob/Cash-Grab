import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
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
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: 15,
          }}>
          <RegularTextCB style={{fontSize: 30, color: Colors.black}}>
            Settings
          </RegularTextCB>
        </View>
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={[
              styles.card,
              {
                padding: 15,
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
                padding: 15,
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
                padding: 15,
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
              {padding: 15, borderWidth: this.state.isChatSelected ? 2 : 0},
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
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    borderColor: Colors.sickGreen,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});
