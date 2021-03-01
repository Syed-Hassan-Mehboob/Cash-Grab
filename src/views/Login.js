import React, {Component} from 'react';
import {
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Images from '../common/Images';
import Colors from '../common/Colors';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import LightTextCB from '../components/LightTextCB';
import Constants from '../common/Constants';
import {Icon} from 'native-base';
import ButtonRadius10 from '../components/ButtonRadius10';
import {CommonActions} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const resetAction = CommonActions.reset({
  index: 0,
  routes: [{name: 'Home'}],
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      tickIcon: 'cross',
      secureText: true,
      eyeIcon: 'eye-off',
    };
  }

  changePasswordState() {
    if (this.state.secureText)
      this.setState({secureText: false, eyeIcon: 'eye'});
    else this.setState({secureText: true, eyeIcon: 'eye-off'});
  }

  validateEmail = (text) => {
    this.setState({email: text});

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({tickIcon: 'cross'});
    } else {
      this.setState({tickIcon: 'check'});
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        {/* <ScrollView bounces={false} showsVerticalScrollIndicator={false}> */}
        <LightTextCB style={{fontSize: 30, marginTop: 30}}>
          Hi, Login
        </LightTextCB>
        <View style={styles.childContainer}>
          <LightTextCB style={[styles.formLabel, {marginTop: 50}]}>
            Email Address
          </LightTextCB>
          <View style={styles.textInputContainer}>
            <TextInput
              ref={'email'}
              placeholder={'Enter Email'}
              placeholderTextColor={Colors.grey}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              blurOnSubmit={true}
              keyboardType="email-address"
              returnKeyType={'next'}
              value={this.state.email}
              onChangeText={(text) => {
                this.validateEmail(text);
              }}
              style={[styles.textInput, {flex: 1}]}
            />
            <Icon
              type={'Entypo'}
              name={this.state.tickIcon}
              style={styles.iconPassword}
            />
          </View>
          <LightTextCB style={[styles.formLabel, {marginTop: 20}]}>
            Password
          </LightTextCB>
          <View style={styles.textInputContainer}>
            <TextInput
              ref={'password'}
              placeholder={'Enter Password'}
              placeholderTextColor={Colors.grey}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              blurOnSubmit={true}
              returnKeyType={'done'}
              secureTextEntry={this.state.secureText}
              value={this.state.password}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
              style={[styles.textInput, {flex: 1}]}
            />
            <TouchableOpacity
              onPress={() => {
                this.changePasswordState();
              }}>
              <Icon
                type={'Ionicons'}
                name={this.state.eyeIcon}
                style={styles.iconPassword}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgetPassword')}>
              <LightTextCB style={styles.underlineText}>
                Forget Password?
              </LightTextCB>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SignUp');
              }}>
              <LightTextCB style={styles.underlineText}>Sign Up</LightTextCB>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 40}}>
            <ButtonRadius10
              onPress={() => {
                this.props.navigation.dispatch(resetAction);
              }}
              label="Login"
            />
          </View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
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
    justifyContent: 'flex-end',
    backgroundColor: Colors.white,
    flex: 1,
    padding: 20,
  },
  childContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  formLabel: {
    fontSize: 16,
    color: Colors.grey,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: Constants.fontLight,
    color: Colors.black1,
  },
  textInputContainer: {
    borderBottomWidth: 0.3,
    height: 45,
    borderColor: Colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  underlineText: {
    color: Colors.black1,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
