import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Images from '../common/Images';
import Colors from '../common/Colors';
import LightTextCB from '../components/LightTextCB';
import Constants from '../common/Constants';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';
import BoldTextCB from '../components/BoldTextCB';
import EditText from '../components/EditText';
import utils from '../utils';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelectionModalVisible: false,
      isCountryCodePickerVisible: false,
      isVendor: false,
      fullName: '',
      service: 'Select',
      email: '',
      countryCode: '+1',
      countryFlag: 'US',
      phone: '12345678',
      password: '',
      confirmPassword: '',
      selections: [
        {
          id: '0',
          text: 'Service 1',
          isSelected: false,
        },
        {
          id: '1',
          text: 'Service 2',
          isSelected: false,
        },
        {
          id: '2',
          text: 'Service 3',
          isSelected: false,
        },
        {
          id: '3',
          text: 'Service 4',
          isSelected: false,
        },
        {
          id: '4',
          text: 'Service 5',
          isSelected: false,
        },
        {
          id: '5',
          text: 'Service 6',
          isSelected: false,
        },
      ],
    };
  }

  componentDidMount() {
    this.getUserType();
  }

  getUserType = async () => {
    const value = await AsyncStorage.getItem('isVendor');
    const data = JSON.parse(value);
    this.setState({isVendor: data});
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

  renderSelectionBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <RegularTextCB style={{fontSize: 16, color: Colors.sickGreen}}>
            Select
          </RegularTextCB>
          <TouchableOpacity
            onPress={() => {
              this.clearSelection();
              this.toggleIsSelectionModalVisible();
            }}>
            <Image
              source={Images.iconClose}
              style={{
                height: 15,
                width: 15,
                tintColor: Colors.coolGrey,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{marginTop: 5}}
          data={this.state.selections}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={this.renderSelectionItem}
          extraData={this.state.selections}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
        />
      </View>
    );
  };

  renderSelectionItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          item.isSelected === false
            ? styles.unselectedFilter
            : styles.selectedFilter,
        ]}
        onPress={() => {
          this.handleOnSelectionItemClick(index);
        }}>
        <RegularTextCB
          style={{
            fontSize: 14,
            color: Colors.black,
          }}>
          {item.text}
        </RegularTextCB>
      </TouchableOpacity>
    );
  };

  handleOnSelectionItemClick = (index) => {
    let mSelection = this.state.selections;
    mSelection.forEach((item) => {
      item.isSelected = false;
    });
    mSelection[index].isSelected = true;
    this.setState({selections: mSelection, service: mSelection[index].text});
    this.toggleIsSelectionModalVisible();
  };

  clearSelection() {
    this.state.selections.forEach((item) => {
      item.isSelected = false;
    });
    this.state.service = 'Select';
  }

  onSelect = (country) => {
    this.setState({
      countryFlag: country.cca2,
      countryCode: country.callingCode[0],
    });
  };

  sendDataToVerifyVia = () => {
    let name = this.state.fullName;
    let service = this.state.service;
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

    if (name.length > 3) {
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

    if (this.state.isVendor && service === 'Select') {
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
          service,
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

    this.props.navigation.navigate(Constants.verifyVia, {payload});
  };

  render() {
    return (
      <ImageBackground
        source={Images.loginBgWeb}
        style={[styles.container, {flex: 1, width: '100%'}]}>
        <View style={{flex: 1}}>
          <KeyboardAwareScrollView
            style={{flex: 1, paddingTop: Platform.OS === 'android' ? 0 : 20}}
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                style={{
                  marginStart: 15,
                  alignSelf: 'flex-start',
                }}>
                <Image source={Images.arrowBack} style={styles.iconBack} />
              </TouchableOpacity>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={Images.cashGrabLogoNew2}
                  style={{
                    height: 50,
                    width: '60%',
                    resizeMode: 'contain',
                    marginTop: 40,
                  }}
                />
                <BoldTextCB
                  style={{
                    fontSize: 28,
                    color: Colors.black,
                    marginTop: 20,
                  }}>
                  Create an account
                </BoldTextCB>
                <RegularTextCB style={{fontSize: 18, color: Colors.coolGrey}}>
                  Hello there, sign up to continue!
                </RegularTextCB>
              </View>
            </View>
            <View style={[styles.childContainer]}>
              <View style={[styles.textInputContainer, {marginTop: 30}]}>
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
              {this.state.isVendor && (
                <View style={{marginTop: 15, marginHorizontal: 15}}>
                  <TouchableOpacity
                    style={[
                      styles.card,
                      {
                        height: 60,
                        borderRadius: 10,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                      },
                    ]}
                    onPress={() => this.toggleIsSelectionModalVisible()}>
                    <RegularTextCB style={{color: Colors.black}}>
                      {this.state.service}
                    </RegularTextCB>
                  </TouchableOpacity>
                </View>
              )}
              <View style={[styles.textInputContainer, {marginTop: 15}]}>
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
              <View style={[styles.textInputContainer, {marginTop: 15}]}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.toggleIsCountryCodePickerVisible()}
                  style={[
                    styles.card,
                    {
                      borderRadius: 10,
                      height: 60,
                      padding: 10,
                      marginEnd: 10,
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
                    this.setState({phone: text});
                  }}
                  style={[styles.textInput, {flex: 1}]}
                />
              </View>
              <View style={[styles.textInputContainer, {marginTop: 15}]}>
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
              <View style={[styles.textInputContainer, {marginTop: 15}]}>
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
            <View style={{justifyContent: 'flex-end', marginHorizontal: 15}}>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 30,
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
              <View style={{marginVertical: 20}}>
                <ButtonRadius10
                  label="SIGN UP"
                  bgColor={Colors.sickGreen}
                  onPress={() => this.sendDataToVerifyVia()}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
          <Modal
            isVisible={this.state.isSelectionModalVisible}
            coverScreen={false}
            style={styles.modal}>
            {this.renderSelectionBottomSheetContent()}
          </Modal>
        </View>
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
  iconUser: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
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
  bottomSheetHeader: {
    backgroundColor: Colors.white,
    shadowColor: '#333333',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    paddingTop: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  orangeCircle: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30 / 2,
    alignSelf: 'flex-end',
    right: 10,
    backgroundColor: Colors.orange,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  selectedFilter: {
    alignItems: 'center',
    paddingVertical: 10,
    margin: 2,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.sickGreen,
    borderRadius: 12,
  },
  unselectedFilter: {
    alignItems: 'center',
    paddingVertical: 10,
    margin: 2,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
});
