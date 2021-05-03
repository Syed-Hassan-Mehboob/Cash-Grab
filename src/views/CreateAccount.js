import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import BoldTextCB from '../components/BoldTextCB';
import RegularTextCB from '../components/RegularTextCB';

export default class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isUserSelected: false,
    isVendorSelected: false,
  };

  openSignUp(isVendor) {
    AsyncStorage.setItem('isVendor', JSON.stringify(isVendor));
    setTimeout(() => {
      this.props.navigation.navigate(Constants.signUp, {
        isVendor: isVendor,
      });
    }, 500);
  }

  render() {
    return (
      <ImageBackground
        source={Images.loginBgWeb}
        style={[styles.main, {width: '100%'}]}>
        <KeyboardAvoidingView style={{flex: 1, alignItems: 'center'}}>
          <Image
            source={Images.cashGrabLogoNew2}
            style={{
              height: 70,
              width: '60%',
              resizeMode: 'contain',
              marginTop: 100,
            }}
          />
          <BoldTextCB
            style={{fontSize: 28, color: Colors.black, marginTop: 50}}>
            Create an account
          </BoldTextCB>
          <RegularTextCB style={{fontSize: 18, color: Colors.coolGrey}}>
            Which type of account would you like?
          </RegularTextCB>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isUserSelected: true,
                isVendorSelected: false,
              });
              this.openSignUp(false);
            }}
            style={[
              styles.card,
              {
                height: 120,
                marginTop: 20,
                paddingHorizontal: 25,
                borderWidth: this.state.isUserSelected ? 2 : 0,
              },
            ]}>
            <Image source={Images.becomeAUser} style={styles.circularImage} />
            <View style={{marginHorizontal: 15}}>
              <RegularTextCB style={{fontSize: 18, color: Colors.black}}>
                Become a user
              </RegularTextCB>
              <RegularTextCB style={{fontSize: 18, color: Colors.coolGrey}}>
                Lorem ipsum eluit fold sed, {'\n'}fludin gem
              </RegularTextCB>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isUserSelected: false,
                isVendorSelected: true,
              });
              this.openSignUp(true);
            }}
            style={[
              styles.card,
              {
                height: 120,
                marginTop: 20,
                paddingHorizontal: 25,
                borderWidth: this.state.isVendorSelected ? 2 : 0,
              },
            ]}>
            <Image source={Images.becomeAVendor} style={styles.circularImage} />
            <View style={{marginHorizontal: 15}}>
              <RegularTextCB style={{fontSize: 18, color: Colors.black}}>
                Become a vendor
              </RegularTextCB>
              <RegularTextCB style={{fontSize: 18, color: Colors.coolGrey}}>
                Lorem ipsum eluit fold sed, {'\n'}fludin gem
              </RegularTextCB>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  card: {
    backgroundColor: '#fff',
    borderColor: Colors.sickGreen,
    borderRadius: 15,
    width: '90%',
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    padding: 15,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circularImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
});
