import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
  TextInput,
  Text
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

const { width, height } = Dimensions.get('window');

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isModalVisible: false,
      isCountryCodePickerVisible: false,
      accessToken: '',
      avatar: '',
      fullName: '',
      email: '',
      countryCode: '',
      countryFlag: '',
      phoneNumber: '',
      location: '',
      oldPassword: '',
      newPassword: '',
    };
  }

  componentDidMount() {
    this.getUserAccessToken();
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({ accessToken: token }, () => this.getUserProfile());
  };

  changePasswordState() {
    if (this.state.secureText)
      this.setState({ secureText: false, eyeIcon: 'eye' });
    else this.setState({ secureText: true, eyeIcon: 'eye-off' });
  }

  toggleIsLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };

  toggleIsModalVisible = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  toggleIsCountryCodePickerVisible = () => {
    this.setState({
      isCountryCodePickerVisible: !this.state.isCountryCodePickerVisible,
    });
  };

  renderBottomSheetHeader = () => {
    return (
      <View style={styles.bottomSheetHeader}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    );
  };

  renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <LightTextCB style={{ fontSize: 30 }}>Upload Photo</LightTextCB>
          <TouchableOpacity
            onPress={() => {
              this.toggleIsModalVisible();
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
        <LightTextCB style={{ fontSize: 16, color: Colors.grey }}>
          Upload a photo from
        </LightTextCB>
        <View style={{ marginTop: 30 }}>
          <ButtonRadius10
            label="CAMERA"
            onPress={() => this.takePhotoFromCamera()}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <ButtonRadius10
            label="GALLERY"
            onPress={() => this.choosePhotoFromGallery()}
          />
        </View>
        <View style={{ height: 50 }} />
      </View>
    );
  };

  choosePhotoFromGallery = () => {
    this.toggleIsModalVisible();
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperCircleOverlay: true,
    }).then((image) => {
      this.setState({ avatar: image.path });
    });
  };

  takePhotoFromCamera = () => {
    this.toggleIsModalVisible();
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      cropperCircleOverlay: true,
    }).then((image) => {
      this.setState({ avatar: image.path });
    });
  };

  onSelect = (country) => {
    this.setState({
      countryFlag: country.cca2,
      countryCode: country.callingCode[0],
    });
  };

  getUserProfile = () => {
    const onSuccess = ({ data }) => {
    console.log('Edite profile Data========',data)
      this.toggleIsLoading();
      this.setState({
        avatar: Constants.imageURL + data.data.records.userProfile.image,
        fullName: data.data.records.name,
        email: data.data.records.email,
        countryCode: data.data.records.country_code,
        countryFlag: data.data.records.country_flag,
        phoneNumber: data.data.records.phone,
        location: data.data.records.userProfile.location,
      });
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
    };


    this.toggleIsLoading();
    Axios.get(Constants.getProfileURL,{
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };



  editUserProfile = () => {
    let name = this.state.fullName;
    let email = this.state.email;
    let countryCode = this.state.countryCode;
    let countryFlag = this.state.countryFlag;
    let phone = this.state.phoneNumber;
    let image = this.state.avatar;
    let location = this.state.location;

    if (utils.isEmpty(name)) {
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

    const onSuccess = ({ data }) => {
      this.toggleIsLoading();
      utils.showToast(data.message);

      setTimeout(() => {
        // this.props.navigation.goBack();
      }, 1000);
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
    };

    const params = {
      name: name,
      email: email,
      country_code: countryCode,
      country_flag: countryFlag,
      phone: phone,
      image: image,
      location: location,
    };


    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('country_code', countryCode);
    formData.append('country_flag', countryFlag);
    formData.append('phone', phone);
    formData.append('location', location);
    formData.append('image', {
      ...image,
      uri: Platform.OS === 'android' ? image : image.replace('file:///', ''),
      name: `image-profile`,
      type: 'image/jpeg',
    });

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.state.accessToken,
      },
    };

    this.toggleIsLoading();
    Axios.post(Constants.updateProfileURL,formData, options)
      .then(onSuccess)
      .catch(onFailure);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View
          style={{
            borderBottomStartRadius: 30,
            borderBottomEndRadius: 30,
            height: height / 3.10,
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
              paddingVertical: 10
            }}>
            <TouchableOpacity
              style={{ position: 'absolute', left: 10 }}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={Images.arrowBack}
                style={[styles.iconBack, { tintColor: Colors.white }]}
              />
            </TouchableOpacity>
            <RegularTextCB style={{ fontSize: 30, color: Colors.white }}>
              Profile
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
                this.editUserProfile();
              }}>
              <RegularTextCB style={{ color: Colors.white }}>Save</RegularTextCB>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.circleCard,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            onPress={() => this.toggleIsModalVisible()}>
            <Image
              source={{ uri: this.state.avatar }}
              style={styles.iconUser}
              resizeMode="cover"
            />

            <Image
              source={Images.iconCamera}
              style={{
                height: 25,
                width: 25,
                position: 'absolute',
                resizeMode: 'contain',
                opacity: 0.2,
              }}
            />
          </TouchableOpacity>
          <RegularTextCB
            style={{ color: Colors.white, fontSize: 20, marginTop: 10 }}>
            {this.state.fullName}
          </RegularTextCB>
          <View style={{ backgroundColor: Colors.white, paddingHorizontal: 30, borderRadius: 10 }} >
            <TextInput multiline={true} placeholder="About Me" style={{ fontFamily: Constants.fontRegular, fontSize: 15, }} />
          </View>
        </View>
        <ScrollView
          style={[styles.container, { paddingVertical: 20 }]}
          showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: 20,
                flex: 0.5,
              }}>
              Name
            </RegularTextCB>
            <EditText
              ref={'name'}
              placeholder={'Name'}
              value={this.state.fullName}
              onChangeText={(text) => {
                this.setState({ fullName: text });
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: 20,
                flex: 0.5,
              }}>
              Email
            </RegularTextCB>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginEnd: 20,
              marginVertical: 10,
            }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: 20,
                flex: 0.5,
              }}>
              Phone No.
            </RegularTextCB>
            <View style={[styles.card1, { flexDirection: 'row', flex: 0.85 }]}>
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
              <TextInput
                ref={'phone'}
                keyboardType={
                  Platform.OS === 'android' ? 'numeric' : 'number-pad'
                }
                placeholder={'Phone Number'}
                value={this.state.phoneNumber}
                onChangeText={(text) => {
                  this.setState({
                    phoneNumber: text,
                  });
                }}
                style={{
                  fontSize: 16,
                  flex: 1,
                  height: 50,
                  color: Colors.black,
                  fontFamily: Constants.fontRegular,
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: 20,
                flex: 0.5,
              }}>
              Location
            </RegularTextCB>
            <EditText
              ref={'location'}
              placeholder={'Location'}
              value={this.state.location}
              onChangeText={(text) => {
                this.setState({ location: text });
              }}
              style={[styles.textInput]}
            />
          </View>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: 20,
                flex: 0.5,
              }}>
              Old Password
            </RegularTextCB>
            <EditText
              ref={'oldPassword'}
              placeholder={'Old Password'}
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
              New Password
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
          </View> */}
        </ScrollView>
        <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
          {this.renderBottomSheetContent()}
        </Modal>
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
    overflow: 'hidden',
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
    shadowOffset: { width: 5, height: 5 },
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
    shadowOffset: { width: 5, height: 5 },
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
    shadowOffset: { width: 5, height: 5 },
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
    borderRadius: 90 / 2,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
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
