import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Images from '../common/Images';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';
import BoldTextCB from '../components/BoldTextCB';
import EditText from '../components/EditText';
import Axios from '../network/APIKit';
import utils from '../utils';

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isLoading: false,
    };
  }

  forgotPassword = () => {
    let email = this.state.email;

    if (utils.isEmpty(email)) {
      utils.showToast('Invalid Email');
      return;
    }

    if (!utils.validateEmail(email)) {
      utils.showToast('Invalid Email');
      return;
    }

    const onSuccess = ({data}) => {
      this.setState({isLoading: false});
      utils.showToast(data.message);

      setTimeout(() => {
        this.props.navigation.goBack();
      }, 1000);
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    this.setState({isLoading: true});
    var params = {
      email: email,
    };

    Axios.get(Constants.forgotPasswordURL, {
      params: params,
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  render() {
    return (
      <ImageBackground
        source={Images.loginBgWeb}
        style={[styles.container, {width: '100%'}]}>
        <KeyboardAvoidingView
          style={{flex: 1, paddingTop: Platform.OS === 'android' ? 0 : 20}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{marginStart: 15, alignSelf: 'flex-start'}}>
            <Image source={Images.arrowBack} style={styles.iconBack} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Image
              source={Images.cashGrabLogoNew2}
              style={{
                height: 70,
                width: '60%',
                resizeMode: 'contain',
                marginTop: 40,
              }}
            />
            <BoldTextCB
              style={{
                fontSize: 28,
                color: Colors.black,
                marginTop: 30,
              }}>
              Forgot Password
            </BoldTextCB>
            <RegularTextCB
              style={{
                fontSize: 18,
                color: Colors.coolGrey,
                textAlign: 'center',
              }}>
              Enter your email & we will send you a {'\n'} verification code
            </RegularTextCB>
          </View>
          <View style={[styles.childContainer]}>
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
          </View>
          <View style={{marginVertical: 30, marginHorizontal: 15}}>
            <ButtonRadius10
              label="CONTINUE"
              bgColor={Colors.sickGreen}
              onPress={() => this.forgotPassword()}
            />
          </View>
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
  iconPassword: {
    fontSize: 20,
    height: 20,
    width: 20,
    alignSelf: 'center',
    color: Colors.orange,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
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
  },
  noUnderlineText: {
    color: Colors.black1,
    textDecorationLine: 'none',
    fontSize: 16,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
