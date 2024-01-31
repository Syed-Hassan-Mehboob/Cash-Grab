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
import Constants, {SIZES} from '../common/Constants';
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
        avatar: Constants.imageURL + data.data.records.user_profiles.image,
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
            borderBottomStartRadius: SIZES.ten * 3,
            borderBottomEndRadius: SIZES.ten * 3,
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
              marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', left: SIZES.ten}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={Images.arrowBack}
                style={[styles.iconBack, {tintColor: Colors.white}]}
              />
            </TouchableOpacity>
            <RegularTextCB
              style={{fontSize: SIZES.ten * 3, color: Colors.white}}>
              Change Password
            </RegularTextCB>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: SIZES.ten,
                paddingVertical: SIZES.five,
                paddingHorizontal: 15,
                backgroundColor: Colors.sickGreen,
                borderRadius: SIZES.five,
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
            <Image
              source={{uri: this.state.avatar}}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <RegularTextCB
            style={{
              color: Colors.white,
              fontSize: SIZES.twenty,
              marginTop: SIZES.ten,
            }}>
            {this.state.fullName}
          </RegularTextCB>
        </View>
        <ScrollView
          style={[styles.container, {paddingVertical: SIZES.twenty}]}
          showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: SIZES.twenty,
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
                marginStart: SIZES.twenty,
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
              style={[styles.textInput, {marginBottom: SIZES.twenty}]}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: SIZES.twenty,
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
              style={[styles.textInput, {marginBottom: SIZES.twenty}]}
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
    height: SIZES.twenty,
    width: SIZES.twenty,
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
    height: SIZES.ten * 8,
    width: SIZES.ten * 8,
    borderRadius: (SIZES.ten * 8) / 2,
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
    marginVertical: SIZES.ten,
    marginHorizontal: SIZES.twenty,
    height: SIZES.fif,
    color: Colors.black,
    fontFamily: Constants.fontRegular,
  },
  textInputContainer: {
    borderBottomWidth: 0.3,
    height: SIZES.ten * 4,
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
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: 8,
    paddingTop: SIZES.twenty,
    borderTopStartRadius: SIZES.twenty,
    borderTopEndRadius: SIZES.twenty,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: SIZES.ten * 4,
    height: SIZES.ten - 2,
    borderRadius: SIZES.five - 1,
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
    height: SIZES.ten * 3,
    width: SIZES.ten * 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (SIZES.ten * 3) / 2,
    alignSelf: 'flex-end',
    right: SIZES.ten,
    backgroundColor: Colors.orange,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    padding: SIZES.twenty,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    alignItems: 'center',
  },
  card1: {
    flexDirection: 'row',
    height: SIZES.fif,
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    paddingHorizontal: SIZES.twenty,
    paddingVertical: SIZES.five,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    alignItems: 'center',
  },
  iconUser: {
    height: SIZES.ten * 9,
    width: SIZES.ten * 9,
    borderRadius: (SIZES.ten * 9) / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height: SIZES.ten * 9,
    width: SIZES.ten * 9,
    borderRadius: SIZES.ten * 4,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
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
