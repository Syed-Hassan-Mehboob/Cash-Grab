import React, {Component} from 'react';
import {requestUserPermission} from '../FirebaseServices';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  Switch,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import Images from '../common/Images';
import Colors from '../common/Colors';
import Constants, {SIZES} from '../common/Constants';
import ButtonRadius10 from '../components/ButtonRadius10';
import EditText from '../components/EditText';
import BoldTextCB from '../components/BoldTextCB';
import RegularTextCB from '../components/RegularTextCB';
import utils from '../utils';
import Axios from '../network/APIKit';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: Platform.OS === 'android' ? 'user99@cashgrab.com' : '',
      password: Platform.OS === 'android' ? '123456789' : '',
      isSwitchEnabled: false,
      tickIcon: 'cross',
      secureText: true,
      eyeIcon: 'eye-off',
    };
  }

  toggleIsEnabled = () =>
    this.setState({isSwitchEnabled: !this.state.isSwitchEnabled});

  changePasswordState() {
    if (this.state.secureText)
      this.setState({secureText: false, eyeIcon: 'eye'});
    else this.setState({secureText: true, eyeIcon: 'eye-off'});
  }

  async saveUser(user) {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: Constants.drawerNavigator}],
    });

    try {
      await AsyncStorage.setItem(Constants.accessToken, 'Bearer ' + user.token);
      var data = JSON.stringify(user);
      // console.log('User======',user)
      await AsyncStorage.setItem('user', data);
      this.setState({isLoading: false});
      setTimeout(() => {
        this.props.navigation.dispatch(resetAction);
      }, 500);
    } catch (error) {
      utils.showToast(error);
    }
  }

  login = () => {
    let email = this.state.email;
    let password = this.state.password;

    if (utils.isEmpty(email)) {
      utils.showToast('Invalid Email');
      return;
    }

    if (!utils.validateEmail(email)) {
      utils.showToast('Invalid Email');
      return;
    }

    if (utils.isEmpty(password)) {
      utils.showToast('Invalid Password');
      return;
    }

    this.setState({isLoading: true});

    const onSuccess = ({data}) => {
      if (data.status === 2) {
        this.setState({isLoading: false});
        utils.showToast('Please verify to continue!\nOTP: ' + data.data.otp);
        this.props.navigation.navigate(Constants.otp, {email: email});
      } else {
        console.log('=========LOGIN-LOGS=======>>>>>>>>>>>>>', data.data.id);
        this.saveUser(data.data);
        requestUserPermission(data.data.token, data.data.id);
      }
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
      this.setState({isLoading: false});
    };

    Axios.post(Constants.loginURL, {
      email: email,
      password: password,
      device_type: Platform.OS === 'android' ? 'android' : 'ios',
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  // mera comment
  render() {
    return (
      <ImageBackground
        source={Images.loginBgWeb}
        style={[styles.container, {width: '100%'}]}>
        <KeyboardAvoidingView enabled style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={Images.cashGrabLogoNew2}
              style={{
                height: SIZES.ten * 7,
                width: '60%',
                resizeMode: 'contain',
                marginTop: 85,
              }}
            />
            <BoldTextCB
              style={{
                fontSize: 28,
                color: Colors.black,
                marginTop: SIZES.twenty,
              }}>
              Welcome Back
            </BoldTextCB>
            <RegularTextCB style={{fontSize: 18, color: Colors.coolGrey}}>
              Hello there, sign in to continue!
            </RegularTextCB>
          </View>
          {/* Textinput starts here */}
          <View style={{paddingHorizontal: SIZES.five}}>
            <View>
              <View
                style={[styles.textInputContainer, {marginTop: SIZES.fifty}]}>
                <EditText
                  ref={'email'}
                  keyboardType="email-address"
                  placeholder={'Email Address'}
                  secureTextEntry={false}
                  value={this.state.email}
                  onChangeText={(text) => {
                    this.setState({email: text});
                  }}
                  style={[styles.textInput]}
                />
              </View>
              <View
                style={[styles.textInputContainer, {marginTop: SIZES.ten * 3}]}>
                <EditText
                  ref={'password'}
                  placeholder={'Password'}
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                  style={[styles.textInput]}
                />
              </View>
            </View>
            <View style={{marginHorizontal: SIZES.fifteen}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: SIZES.ten * 3,
                }}>
                <RegularTextCB style={styles.noUnderlineText}>
                  Rember Me
                </RegularTextCB>
                <TouchableOpacity
                  // style={{backgroundColor: 'red'}}
                  onPress={() => {
                    // this.props.navigation.navigate(Constants.login);
                  }}>
                  <Switch
                    trackColor={{
                      false: Colors.lightGrey,
                      true: Colors.lighNewGreen,
                    }}
                    thumbColor={
                      this.state.isSwitchEnabled
                        ? Colors.sickGreen
                        : Colors.sickGreen
                    }
                    ios_backgroundColor={Colors.lightGrey}
                    onValueChange={this.toggleIsEnabled}
                    value={this.state.isSwitchEnabled}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginVertical: SIZES.ten * 3}}>
                <ButtonRadius10
                  label="LOGIN"
                  bgColor={Colors.sickGreen}
                  onPress={() => this.login()}
                />
              </View>
              <TouchableOpacity
                style={{marginTop: SIZES.ten, alignSelf: 'center'}}
                onPress={() =>
                  this.props.navigation.navigate(Constants.forgetPassword)
                }>
                <RegularTextCB style={styles.noUnderlineText}>
                  Forgot Password?
                </RegularTextCB>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              position: 'absolute',
              bottom: SIZES.twenty,
            }}
            onPress={() => {
              this.props.navigation.navigate(Constants.createAccount);
            }}>
            <RegularTextCB style={styles.noUnderlineText}>
              Don't have any account?
            </RegularTextCB>
            <RegularTextCB style={styles.underlineText}>Sign Up</RegularTextCB>
          </TouchableOpacity>
          <Spinner
            visible={this.state.isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    marginTop: SIZES.twenty,
    resizeMode: 'contain',
  },
  iconTick: {
    height: SIZES.fifteen,
    width: SIZES.fifteen,
  },
  iconPassword: {
    fontSize: SIZES.twenty,
    height: SIZES.twenty,
    width: SIZES.twenty,
    alignSelf: 'center',
    color: Colors.orange,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  formLabel: {
    fontSize: 16,
    color: Colors.grey,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    color: Colors.black1,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.fifteen,
  },
  underlineText: {
    color: Colors.black1,
    textDecorationLine: 'underline',
    fontSize: 16,
    color: Colors.sickGreen,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
