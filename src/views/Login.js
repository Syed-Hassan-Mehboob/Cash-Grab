import React, {Component} from 'react';
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
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Images from '../common/Images';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
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
      email: 'test@yopmail.com',
      password: '12345678',
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
      console.log(user)
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

    const onSuccess = ({data}) => {
      if (data.status === 2) {
        this.setState({isLoading: false});
        utils.showToast('Please verify to continue!\nOTP: ' + data.data.otp);
        this.props.navigation.navigate(Constants.otp, {email: email});
      } else {
        this.saveUser(data.data);
      }
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
      this.setState({isLoading: false});
    };

    this.setState({isLoading: true});

    Axios.post(Constants.loginURL, {
      email: email,
      password: password,
      device_type: Platform.OS === 'android' ? 'android' : 'ios',
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  render() {
    return (
      <ImageBackground
        source={Images.loginBgWeb}
        style={[styles.container, {width: '100%'}]}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={Images.cashGrabLogoNew2}
              style={{
                height: 70,
                width: '60%',
                resizeMode: 'contain',
                marginTop: 85,
              }}
            />
            <BoldTextCB
              style={{
                fontSize: 28,
                color: Colors.black,
                marginTop: 20,
              }}>
              Welcome Back
            </BoldTextCB>
            <RegularTextCB style={{fontSize: 18, color: Colors.coolGrey}}>
              Hello there, sign in to continue!
            </RegularTextCB>
          </View>
          <View>
            <View style={[styles.textInputContainer, {marginTop: 50}]}>
              <EditText
                ref={'email'}
                keyboardType="email-address"
                placeholder={'Email Address'}
                value={this.state.email}
                onChangeText={(text) => {
                  this.setState({email: text});
                }}
                style={[styles.textInput]}
              />
            </View>
            <View style={[styles.textInputContainer, {marginTop: 30}]}>
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
          <View style={{marginHorizontal: 15}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 30,
              }}>
              <RegularTextCB style={styles.noUnderlineText}>
                Rember Me
              </RegularTextCB>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(Constants.login);
                }}>
                <Switch
                  trackColor={{
                    false: Colors.lightGrey,
                    true: Colors.lighNewGreen,
                  }}
                  thumbColor={
                    this.state.isSwitchEnabled
                      ? Colors.sickGreen
                      : Colors.coolGrey
                  }
                  ios_backgroundColor={Colors.coolGrey}
                  onValueChange={this.toggleIsEnabled}
                  value={this.state.isSwitchEnabled}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: 30}}>
              <ButtonRadius10
                label="LOGIN"
                bgColor={Colors.sickGreen}
                onPress={() => this.login()}
              />
            </View>
            <TouchableOpacity
              style={{marginTop: 10, alignSelf: 'center'}}
              onPress={() =>
                this.props.navigation.navigate(Constants.forgetPassword)
              }>
              <RegularTextCB style={styles.noUnderlineText}>
                Forgot Password?
              </RegularTextCB>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              position: 'absolute',
              bottom: 20,
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
    height: 20,
    width: 20,
    marginTop: 20,
    resizeMode: 'contain',
  },
  iconTick: {
    height: 15,
    width: 15,
  },
  iconPassword: {
    fontSize: 20,
    height: 20,
    width: 20,
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
    marginHorizontal: 15,
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
