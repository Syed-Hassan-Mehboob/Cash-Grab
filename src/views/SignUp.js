import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Images from '../common/Images';
import Colors from '../common/Colors';
import LightTextCB from '../components/LightTextCB';
import Constants, { SIZES } from '../common/Constants';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';
import BoldTextCB from '../components/BoldTextCB';
import EditText from '../components/EditText';
import utils from '../utils';
import Axios from '../network/APIKit';
import { MultiDropdownPicker } from '../components/MultiDropDownPicker'
export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelectionModalVisible: false,
      isCountryCodePickerVisible: false,
      isVendor: false,
      fullName: '',
      email: '',
      countryCode: '+1',
      countryFlag: 'US',
      phone: '12345678',
      password: '',
      confirmPassword: '',
      selections: [],
      services: []
    };
  }


  getServies = () => {
    const onSuccess = ({ data }) => {
      this.setState({ selections: data.data.records })
    };
    const onFailure = (error) => {
      utils.showResponseError(error);
    };
    Axios.get(Constants.servies).then(onSuccess).catch(onFailure);

  }

  componentDidMount() {
    this.getUserType();
    this.getServies();
  }

  getUserType = async () => {
    const value = await AsyncStorage.getItem('isVendor');
    const data = JSON.parse(value);
    this.setState({ isVendor: data });
  };

  toggleIsSelectionModalVisible = () => {
    this.setState({
      isSelectionModalVisible: !this.state.isSelectionModalVisible,
    });
  };

  toggleIsCountryCodePickerVisible = () => {
    this.setState({
      isCountryCodePickerVisible: !this.state.isCountryCodePickerVisible,
    });
  };



  onSelect = (country) => {
    this.setState({
      countryFlag: country.cca2,
      countryCode: country.callingCode[0],
    });
  };

  getServices = () => {
        const onSuccess = ({data}) => {
          console.log(data.data)
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
    };

    this.setState({isLoading: true});

    Axios.get(Constants.loginURL)
      .then(onSuccess)
      .catch(onFailure);
  };

  sendDataToVerifyVia = () => {
    let name = this.state.fullName;
    let services = this.state.services;
    let country_code = this.state.countryCode;
    let country_flag = this.state.countryFlag;
    let phone = this.state.phone;
    let email = this.state.email;
    let password = this.state.password;
    let password_confirmation = this.state.confirmPassword;


    if (name === '' || name === undefined) {
      utils.showToast('Invalid Name');
      return;
    }

    if (name.length < 3) {
      utils.showToast('Name Should Not Be Less Than 3 Characters');
      return;
    }

    if (name.length > 55) {
      utils.showToast('Name Should Not Be Greater Than 55 Characters');
      return;
    }

    if (!utils.validateEmail(email)) {
      utils.showToast('Invalid Email');
      return;
    }

    if (this.state.isVendor && services.length === 0) {
      utils.showToast('Please Select Any Service');
      return;
    }

    if (utils.isEmpty(phone)) {
      utils.showToast('Invalid Phone Number');
      return;
    }

    if (phone.length < 9) {
      utils.showToast('Phone Number Should Not Be Less Than 9 Characters');
      return;
    }

    if (phone.length > 14) {
      utils.showToast('Phone Number Should Not Be Greater Than 14 Characters');
      return;
    }

    if (utils.isEmpty(password)) {
      utils.showToast('Invalid Password');
      return;
    }

    if (password.length < 8) {
      utils.showToast('Password Should Not Be Less Than 8 Digits');
      return;
    }

    if (password_confirmation !== password) {
      utils.showToast('Passwords Did Not Match');
      return;
    }

    const payload = this.state.isVendor
      ? {
        name,
        services,
        email,
        password,
        password_confirmation,
        type: 'vendor',
        country_code,
        country_flag,
        phone,
      }
      : {
        name,
        email,
        password,
        password_confirmation,
        type: 'customer',
        country_code,
        country_flag,
        phone,
      };

    this.props.navigation.navigate(Constants.verifyVia, { payload });
  };

  render() {
    return (
      <ImageBackground
        source={Images.loginBgWeb}
        style={[styles.container, { flex: 1, width: '100%' }]}>
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 0 : SIZES.twenty }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                style={{
                  marginStart: SIZES.fifteen,
                  alignSelf: 'flex-start',
                }}>
                <Image source={Images.arrowBack} style={styles.iconBack} />
              </TouchableOpacity>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={Images.cashGrabLogoNew2}
                  style={{
                    height: SIZES.fifty,
                    width: '60%',
                    resizeMode: 'contain',
                    marginTop: SIZES.ten*4,
                  }}
                />
                <BoldTextCB
                  style={{
                    fontSize: 28,
                    color: Colors.black,
                    marginTop: SIZES.twenty,
                  }}>
                  Create an account
                </BoldTextCB>
                <RegularTextCB style={{ fontSize: 18, color: Colors.coolGrey }}>
                  Hello there, sign up to continue!
                </RegularTextCB>
              </View>
            </View>
            <View style={[styles.childContainer]}>
              <View style={[styles.textInputContainer, { marginTop: SIZES.ten*3 }]}>
                <EditText
                  ref={'fullName'}
                  placeholder={'Full Name'}
                  value={this.state.fullName}
                  onChangeText={(text) => {
                    this.setState({
                      fullName: text,
                    });
                  }}
                  style={[styles.textInput]}
                />
              </View>
              {this.state.isVendor &&
                <MultiDropdownPicker
                  viewProperty="name"
                  value={this.state.services}
                  data={this.state.selections}
                  onChangeValue={(val) => {
                    this.setState(
                      { services: val },
                      // () => { console.log("multidropdown picker ", this.state.services, "value", val) }
                    )
                  }}
                />
              }

              <View style={[styles.textInputContainer, { marginTop: SIZES.fifteen }]}>
                <EditText
                  ref={'email'}
                  keyboardType="email-address"
                  placeholder={'Email Address'}
                  value={this.state.email}
                  onChangeText={(text) => {
                    this.setState({ email: text });
                  }}
                  style={[styles.textInput]}
                />
              </View>
              <View style={[styles.textInputContainer, { marginTop: SIZES.fifteen }]}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.toggleIsCountryCodePickerVisible()}
                  style={[
                    styles.card,
                    {
                      borderRadius: SIZES.ten,
                      height: 60,
                      padding: SIZES.ten,
                      marginEnd: SIZES.ten,
                      flex: 0,
                      justifyContent: 'center',
                      alignContent: 'center',
                    },
                  ]}>
                  <CountryPicker
                    onSelect={this.onSelect}
                    countryCode={this.state.countryFlag}
                    visible={this.state.isCountryCodePickerVisible}
                    withCallingCode
                    theme={{
                      fontFamily: Constants.fontRegular,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
                <EditText
                  ref={'phone'}
                  keyboardType="phone-pad"
                  placeholder={'12345678'}
                  value={this.state.phone}
                  onChangeText={(text) => {
                    this.setState({ phone: text });
                  }}
                  style={[styles.textInput, { flex: 1 }]}
                />
              </View>
              <View style={[styles.textInputContainer, { marginTop: SIZES.fifteen }]}>
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
              <View style={[styles.textInputContainer, { marginTop: SIZES.fifteen }]}>
                <EditText
                  ref={'confirm_password'}
                  placeholder={'Confirm Password'}
                  secureTextEntry={true}
                  value={this.state.confirmPassword}
                  onChangeText={(text) => {
                    this.setState({
                      confirmPassword: text,
                    });
                  }}
                  style={[styles.textInput]}
                />
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end', marginHorizontal: SIZES.fifteen }}>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: SIZES.ten*3,
                  },
                ]}>
                <LightTextCB style={styles.noUnderlineText}>
                  Already have an account?
                </LightTextCB>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(Constants.login);
                  }}>
                  <LightTextCB style={styles.underlineText}>
                    Sign In
                  </LightTextCB>
                </TouchableOpacity>
              </View>
              <View style={{ marginVertical: SIZES.twenty }}>
                <ButtonRadius10
                  label="SIGN UP"
                  bgColor={Colors.sickGreen}
                  onPress={() => this.sendDataToVerifyVia()}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
          {/* <Modal
            isVisible={this.state.isSelectionModalVisible}
            coverScreen={false}
            style={styles.modal}>
            {this.renderSelectionBottomSheetContent()}
          </Modal> */}
        </View>
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
  iconUser: {
    height: SIZES.ten*12,
    width: SIZES.ten*12,
    borderRadius: SIZES.ten*12 / 2,
    resizeMode: 'contain',
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  childContainer: {
    justifyContent: 'flex-end',
  },
  formLabel: {
    fontSize: 16,
    color: Colors.grey,
  },
  textInput: {
    fontSize: 16,
    width: '100%',
    fontFamily: Constants.fontLight,
    color: Colors.black,
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
  },
  noUnderlineText: {
    color: Colors.black1,
    textDecorationLine: 'none',
    fontSize: 16,
  },
  bottomSheetHeader: {
    backgroundColor: Colors.white,
    shadowColor: '#333333',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    paddingTop: SIZES.twenty,
    borderTopStartRadius: SIZES.twenty,
    borderTopEndRadius: SIZES.twenty,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: SIZES.ten*4,
    height: SIZES.ten-2,
    borderRadius: SIZES.five-1,
    backgroundColor: '#00000040',
    marginBottom: SIZES.ten,
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: SIZES.twenty,
    borderTopStartRadius: SIZES.twenty,
    borderTopEndRadius: SIZES.twenty,
  },
  orangeCircle: {
    height: SIZES.ten*3,
    width: SIZES.ten*3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.ten*3 / 2,
    alignSelf: 'flex-end',
    right: SIZES.ten,
    backgroundColor: Colors.orange,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  selectedFilter: {
    alignItems: 'center',
    paddingVertical: SIZES.ten,
    margin: SIZES.five-3,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.sickGreen,
    borderRadius: SIZES.fifteen-3,
  },
  unselectedFilter: {
    alignItems: 'center',
    paddingVertical: SIZES.ten,
    margin: SIZES.five-3,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: SIZES.fifteen-3,
  },
});

