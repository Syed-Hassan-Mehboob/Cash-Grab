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
import utils from '../utils';
import Axios from '../network/APIKit';

export default class VerifyVia extends Component {
  payload = undefined;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      verifyVia: '',
    };
  }

  componentDidMount() {
    this.payload = this.props.route.params.payload;
  }

  signUp = () => {
    let verifyVia = this.state.verifyVia;
    if (utils.isEmpty(verifyVia)) {
      utils.showToast('Please Select Any Option To Continue');
      return;
    }

    const onSuccess = ({data}) => {
      this.props.navigation.navigate(Constants.otp, {
        email: this.payload.email,
      });
      this.setState({isLoading: false});
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
      this.setState({isLoading: false});
    };

    // Show spinner when call is made
    this.setState({isLoading: true});

    Axios.post(Constants.signUpURL, {
      name: this.payload.name,
      email: this.payload.email,
      type: this.payload.type,
      country_code: this.payload.country_code,
      country_flag: this.payload.country_flag,
      phone: this.payload.phone,
      password: this.payload.password,
      password_confirmation: this.payload.password_confirmation,
      verified_by: verifyVia,
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
              Verification
            </BoldTextCB>
            <RegularTextCB
              style={{
                fontSize: 18,
                color: Colors.coolGrey,
                textAlign: 'center',
              }}>
              Select an option to verify your account with
            </RegularTextCB>
          </View>
          <View style={{marginHorizontal: 20}}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                styles.card,
                {
                  marginTop: 50,
                  height: 60,
                  borderColor:
                    this.state.verifyVia === 'email'
                      ? Colors.sickGreen
                      : Colors.white,
                },
              ]}
              onPress={() => this.setState({verifyVia: 'email'})}>
              <RegularTextCB
                style={{
                  fontSize: 16,
                  color: Colors.coolGrey,
                }}>
                Email
              </RegularTextCB>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                styles.card,
                {
                  marginTop: 20,
                  height: 60,
                  borderColor:
                    this.state.verifyVia === 'phone'
                      ? Colors.sickGreen
                      : Colors.white,
                },
              ]}
              onPress={() => this.setState({verifyVia: 'phone'})}>
              <RegularTextCB
                style={{
                  fontSize: 16,
                  color: Colors.coolGrey,
                }}>
                Phone Number
              </RegularTextCB>
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 30, marginHorizontal: 15}}>
            <ButtonRadius10
              label="CONTINUE"
              bgColor={Colors.sickGreen}
              onPress={() => {
                this.signUp();
              }}
            />
          </View>
        </KeyboardAvoidingView>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 2,
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
