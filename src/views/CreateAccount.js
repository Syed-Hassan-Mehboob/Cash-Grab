import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'native-base';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Platform,
} from 'react-native';
import Colors from '../common/Colors';
import Constants, {FONTS, SIZES} from '../common/Constants';
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
      this.props.navigation.navigate(Constants.signUp);
    }, 500);
  }

  render() {
    return (
      <ImageBackground
        source={Images.loginBgWeb}
        style={[styles.main, {width: '100%'}]}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{
              position: 'absolute',
              top: SIZES.twenty,
              left: SIZES.five,
            }}>
            <Icon
              type="AntDesign"
              name="left"
              style={{color: Colors.black, fontSize: SIZES.ten * 3}}
            />
          </TouchableOpacity>

          <Image
            source={Images.cashGrabLogoNew2}
            style={{
              height: SIZES.ten * 7,
              width: '60%',
              resizeMode: 'contain',
              marginTop: SIZES.ten * 10,
            }}
          />
          <BoldTextCB
            style={{fontSize: 28, color: Colors.black, marginTop: SIZES.fifty}}>
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
              setTimeout(() => {
                this.props.navigation.navigate(Constants.signUp);
              }, 500);
            }}
            style={[
              styles.card,
              {
                paddingVertical: SIZES.fifteen,
                marginTop: SIZES.twenty,
                paddingHorizontal: SIZES.fifteen,
                borderWidth: this.state.isUserSelected ? 2 : 0,
              },
            ]}>
            <Image source={Images.becomeAUser} style={styles.circularImage} />
            <View style={{marginHorizontal: SIZES.ten, flexShrink: 1}}>
              <RegularTextCB style={[FONTS.boldFont22, {color: Colors.black}]}>
                Need Help
              </RegularTextCB>
              <RegularTextCB style={{fontSize: 16, color: Colors.coolGrey}}>
                Lorem ipsum eluit fold sed, fludin gem
              </RegularTextCB>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({
                isUserSelected: false,
                isVendorSelected: true,
              });
              setTimeout(() => {
                this.props.navigation.navigate(Constants.VendorSignUp);
              }, 500);
            }}
            style={[
              styles.card,
              {
                paddingVertical: SIZES.fifteen,
                marginTop: SIZES.twenty,
                paddingHorizontal: SIZES.fifteen,
                borderWidth: this.state.isVendorSelected ? 2 : 0,
              },
            ]}>
            <Image source={Images.becomeAVendor} style={styles.circularImage} />
            <View style={{marginHorizontal: SIZES.ten, flexShrink: 1}}>
              <RegularTextCB style={[FONTS.boldFont22, {color: Colors.black}]}>
                Make Money
              </RegularTextCB>
              <RegularTextCB style={{fontSize: 16, color: Colors.coolGrey}}>
                Lorem ipsum eluit fold sed, fludin gem
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
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    marginTop: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#fff',
    borderColor: Colors.sickGreen,
    borderRadius: SIZES.fifteen,
    width: '90%',
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    padding: SIZES.fifteen,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circularImage: {
    height: SIZES.ten * 9,
    width: SIZES.ten * 9,
    borderRadius: 45,
  },
});
