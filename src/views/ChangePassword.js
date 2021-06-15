import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import CountryPicker from 'react-native-country-picker-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../common/Images';
import Colors from '../common/Colors';
import LightTextCB from '../components/LightTextCB';
import RegularTextCB from '../components/RegularTextCB';
import ButtonRadius10 from '../components/ButtonRadius10';
import ImagePicker from 'react-native-image-crop-picker';
import EditText from '../components/EditText';
import Constants from '../common/Constants';
import Axios from '../network/APIKit';
import utils from '../utils';

const {width, height} = Dimensions.get('window');

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      accessToken: '',
      avatar: '',
      fullName: '',
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    };
  }

  componentDidMount() {
    this.getUserAccessToken();
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => this.getUserProfile());
  };

  changePasswordState() {
    if (this.state.secureText)
      this.setState({secureText: false, eyeIcon: 'eye'});
    else this.setState({secureText: true, eyeIcon: 'eye-off'});
  }

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  getUserProfile = () => {
    const onSuccess = ({data}) => {
      this.toggleIsLoading();
      this.setState({
        fullName: data.data.records.name,
      });
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
    };

    this.toggleIsLoading();
    Axios.get(Constants.getProfileURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  changePassword = () => {
    let currentPassword = this.state.oldPassword;
    let newPassword = this.state.newPassword;
    let confirmPassword = this.state.newPasswordConfirm;

    if (utils.isEmpty(currentPassword) || currentPassword.length < 8) {
      utils.showToast('Password Should Not Be Less Than 8 Characters');
      return;
    }

    if (utils.isEmpty(newPassword) || newPassword.length < 8) {
      utils.showToast('New Password Should Not Be Less Than 8 Characters');
      return;
    }

    if (confirmPassword !== newPassword) {
      utils.showToast('Passwords Did Not Match');
      return;
    }

    const onSuccess = ({data}) => {
      utils.showToast(data.message);
      this.toggleIsLoading();

      setTimeout(() => {
        this.props.navigation.goBack();
      }, 1000);
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
    };

    const params = {
      old_password: currentPassword,
      password: newPassword,
      password_confirmation: confirmPassword,
    };

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.state.accessToken,
      },
    };

    this.toggleIsLoading();

    Axios.post(Constants.updatePasswordURL, params, options)
      .then(onSuccess)
      .catch(onFailure);
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View
          style={{
            borderBottomStartRadius: 30,
            borderBottomEndRadius: 30,
            height: height / 3.75,
            backgroundColor: Colors.navy,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: 15,
              marginTop: Platform.OS === 'android' ? 0 : 20,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', left: 10}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={Images.arrowBack}
                style={[styles.iconBack, {tintColor: Colors.white}]}
              />
            </TouchableOpacity>
            <RegularTextCB style={{fontSize: 30, color: Colors.white}}>
              Change Password
            </RegularTextCB>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                paddingVertical: 5,
                paddingHorizontal: 15,
                backgroundColor: Colors.sickGreen,
                borderRadius: 5,
              }}
              onPress={() => {
                this.changePassword();
              }}>
              <RegularTextCB style={{color: Colors.white}}>Save</RegularTextCB>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={1.0}
            style={[
              styles.circleCard,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Image source={Images.emp1} style={styles.iconUser} />
          </TouchableOpacity>
          <RegularTextCB
            style={{color: Colors.white, fontSize: 20, marginTop: 10}}>
            {this.state.fullName}
          </RegularTextCB>
        </View>
        <ScrollView
          style={[styles.container, {paddingVertical: 20}]}
          showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: 20,
                flex: 0.5,
              }}>
              Current
            </RegularTextCB>
            <EditText
              placeholder={'Current Password'}
              secureTextEntry={true}
              value={this.state.oldPassword}
              onChangeText={(text) => {
                this.setState({oldPassword: text});
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: 20,
                flex: 0.5,
              }}>
              New
            </RegularTextCB>
            <EditText
              ref={'newPassword'}
              placeholder={'New Password'}
              secureTextEntry={true}
              value={this.state.newPassword}
              onChangeText={(text) => {
                this.setState({newPassword: text});
              }}
              style={[styles.textInput, {marginBottom: 20}]}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: 20,
                flex: 0.5,
              }}>
              Confirm
            </RegularTextCB>
            <EditText
              placeholder={'Confirm Password'}
              secureTextEntry={true}
              value={this.state.newPasswordConfirm}
              onChangeText={(text) => {
                this.setState({newPasswordConfirm: text});
              }}
              style={[styles.textInput, {marginBottom: 20}]}
            />
          </View>
        </ScrollView>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconBack: {
    height: 20,
    width: 20,
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
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    resizeMode: 'contain',
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  formLabel: {
    fontSize: 16,
    color: Colors.grey,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    height: 50,
    color: Colors.black,
    fontFamily: Constants.fontRegular,
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
    elevation: 8,
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
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
  card1: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
  iconUser: {
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height: 90,
    width: 90,
    borderRadius: 45,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
