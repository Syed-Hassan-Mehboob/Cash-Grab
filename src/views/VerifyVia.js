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
import Constants, {SIZES} from '../common/Constants';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';
import BoldTextCB from '../components/BoldTextCB';
import utils from '../utils';
import Axios from '../network/APIKit';
import {CommonActions} from '@react-navigation/native';

export default class VerifyVia extends Component {
  payload = undefined;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      verifyVia: '',
    };
  }

  resetAction = CommonActions.reset({
    index: 0,
    routes: [
      {
        name: Constants.login,
      },
    ],
  });
  componentDidMount() {
    this.payload = this.props.route.params.payload;
    console.log('payload data =========>', this.props.route.params.payload);
  }

  signUp = () => {
    // this.props.navigation.dispatch(this.resetAction);
    let verifyVia = this.state.verifyVia;
    if (utils.isEmpty(verifyVia)) {
      utils.showToast('Please Select Any Option To Continue');
      return;
    }

    const onSuccess = ({data}) => {
      console.log('data', data);
      this.props.navigation.navigate(Constants.otp, {
        email: this.payload.email,
      });
      this.setState({isLoading: false});
    };

    const onFailure = (error) => {
      console.log('eeeeeeeeeeeeeeeeeeeeeeeee', error);
      utils.showResponseError(error);

      this.setState({isLoading: false});
    };
    console.log('user typeee', this.payload.type);
    console.log('user type', this.props.route.params.payload);
    // Show spinner when call is made
    this.setState({isLoading: true});
    var postData = null;

    if (this.payload.type === 'vendor') {
      postData = {
        name: this.payload.name,
        email: this.payload.email,
        country_code: this.payload.country_code,
        country_flag: this.payload.country_flag,
        phone: this.payload.phone,
        type: this.payload.type,
        password: this.payload.password,
        password_confirmation: this.payload.password_confirmation,
        verified_by: verifyVia,
        services: this.payload.services,
      };
    } else {
      postData = {
        name: this.payload.name,
        email: this.payload.email,
        country_flag: this.payload.country_flag,
        country_code: this.payload.country_code,
        phone: this.payload.phone,
        type: this.payload.type,
        password: this.payload.password,
        password_confirmation: this.payload.password_confirmation,
        verified_by: verifyVia,
      };
      console.log('User', postData);
    }
    console.log('postData=============>', postData);
    Axios.post(Constants.signUpURL, postData).then(onSuccess).catch(onFailure);
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
                height: SIZES.ten * 7,
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
              Select an option to verify your account with
            </RegularTextCB>
          </View>

          <View style={{paddingHorizontal: SIZES.five}}>
            <View style={{marginHorizontal: SIZES.twenty}}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.card,
                  {
                    marginTop: SIZES.fifty,
                    height: SIZES.ten * 6,
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

              {/* <BoldTextCB
                style={{
                  fontSize: 16,
                  color: Colors.black,
                  marginVertical: SIZES.fifteen,
                }}>
                OR
              </BoldTextCB>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.card,
                  {
                    marginTop: SIZES.twenty,
                    height: SIZES.ten * 6,
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
              </TouchableOpacity> */}
            </View>

            <View
              style={{
                marginVertical: SIZES.ten * 3,
                marginHorizontal: SIZES.fifteen,
              }}>
              <ButtonRadius10
                label="CONTINUE"
                bgColor={Colors.sickGreen}
                onPress={() => {
                  this.signUp();
                }}
              />
            </View>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.ten,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    justifyContent: 'center',
    paddingHorizontal: SIZES.twenty,
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
