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
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Spinner from 'react-native-loading-spinner-overlay';
import Images from '../common/Images';
import Colors from '../common/Colors';
import Constants, {SIZES} from '../common/Constants';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';
import BoldTextCB from '../components/BoldTextCB';
import Axios from '../network/APIKit';
import utils from '../utils';

export default class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      code: '',
    };
  }

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  verifyOTP = () => {
    let code = this.state.code;

    if (utils.isEmpty(code) || code.length < 4) {
      utils.showToast('Invalid OTP');
      return;
    }

    const onSuccess = ({data}) => {
      this.toggleIsLoading();
      utils.showToast(data.message);

      setTimeout(() => {
        this.props.navigation.navigate(Constants.login);
      }, 1000);
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
    };

    this.toggleIsLoading();

    Axios.post(Constants.verifyOtpURL, {
      email: this.props.route.params.email,
      otp: code,
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
          style={{
            flex: 1,
            paddingTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{marginStart: SIZES.fifteen, alignSelf: 'flex-start'}}>
            <Image source={Images.arrowBack} style={styles.iconBack} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Image
              source={Images.cashGrabLogoNew2}
              style={{
                height: 70,
                width: '60%',
                resizeMode: 'contain',
                marginTop: SIZES.ten * 4,
              }}
            />
            <BoldTextCB
              style={{
                fontSize: 28,
                color: Colors.black,
                marginTop: SIZES.ten * 3,
              }}>
              Verification
            </BoldTextCB>
            <RegularTextCB
              style={{
                fontSize: 18,
                color: Colors.coolGrey,
                textAlign: 'center',
              }}>
              Enter your verification code that we sent{'\n'}you through your
              email or phone number
            </RegularTextCB>
          </View>
          <View style={[styles.childContainer]}>
            <View style={[styles.textInputContainer]}>
              <OTPInputView
                style={{
                  width: '90%',
                  height: SIZES.ten * 7,
                  marginTop: SIZES.ten * 3,
                }}
                pinCount={4}
                code={this.state.code}
                onCodeChanged={(code) => {
                  this.setState({code});
                }}
                autoFocusOnLoad
                codeInputFieldStyle={styles.card}
                codeInputHighlightStyle={styles.card}
                onCodeFilled={(code) => {}}
              />
            </View>
          </View>
          <View
            style={{
              marginVertical: SIZES.fifty,
              marginHorizontal: SIZES.fifteen,
            }}>
            <ButtonRadius10
              label="VERIFY"
              bgColor={Colors.sickGreen}
              onPress={() => this.verifyOTP()}
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
    height: SIZES.twenty,
    width: SIZES.twenty,
    marginTop: SIZES.twenty,
    resizeMode: 'contain',
  },
  iconPassword: {
    fontSize: SIZES.twenty,
    height: SIZES.twenty,
    width: SIZES.twenty,
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
    justifyContent: 'center',
    marginHorizontal: SIZES.fifteen,
  },
  card: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    backgroundColor: Colors.white,
    borderColor: Colors.sickGreen,
    borderRadius: SIZES.ten,
    paddingHorizontal: SIZES.twenty,
    paddingVertical: SIZES.five,
    shadowColor: '#c5c5c5',
    color: Colors.black,
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    alignItems: 'center',
    fontFamily: Constants.fontRegular,
    fontSize: 24,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
