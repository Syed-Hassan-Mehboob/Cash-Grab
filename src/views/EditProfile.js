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
  Text,
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
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const {width, height} = Dimensions.get('window');

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
      showModal: false,
      lat: '',
      lng: '',
      abouteMe: '',
      secureText: false,
    };
  }

  componentDidMount() {
    this.getUserAccessToken();
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token});
    this.getUserProfile();
  };

  changePasswordState() {
    if (this.state.secureText)
      this.setState({secureText: false, eyeIcon: 'eye'});
    else this.setState({secureText: true, eyeIcon: 'eye-off'});
  }

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  toggleIsModalVisible = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  getUserProfile = () => {
    const onSuccess = ({data}) => {
      this.toggleIsLoading();
      console.log('User Profile Data ===== === =', data);
      this.setState({
        avatar: Constants.imageURL + data.data.records.userProfile.image,
        fullName: data.data.records.name,
        email: data.data.records.email,
        countryCode: data.data.records.country_code,
        countryFlag: data.data.records.country_flag.toUpperCase(),
        phoneNumber: data.data.records.phone,
        location: data.data.records.userProfile.location,
        abouteMe: data.data.records.userProfile.about_me,
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

  renderBottomSheetHeader = () => {
    return (
      <View style={styles.bottomSheetHeader}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    );
  };

  GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder={'Search'}
        //   renderLeftButton={() => }
        minLength={2}
        keyboardKeyType={'search'}
        fetchDetails={true}
        onPress={(data, details = null) => {
          // console.log("response===========================================>", details.formatted_address);
          this.setState(
            {
              location: details.formatted_address,
              lat: details.geometry.location.lat,
              lng: details.geometry.location.lng,
            },
            () => {
              setTimeout(() => {
                this.setState({showModal: false});
              }, 400);
            },
          );
        }}
        query={{
          key: 'AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM',
          language: 'en',
        }}
        enablePoweredByContainer={false}
        styles={{
          textInputContainer: {
            backgroundColor: '#fff',
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: SIZES.five,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            elevation: 11,
            paddingHorizontal: SIZES.five,
            borderRadius: 8,
          },
          textInput: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
          },
          listView: {
            marginTop: SIZES.ten,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: '#fff',
          },
          row: {borderRadius: 8},
        }}
        GooglePlacesSearchQuery={{rankby: 'distance'}}
        GooglePlacesDetailsQuery={{fields: ['formatted_address', 'geometry']}}
        renderDescription={(row) => row.description}
        nearbyPlacesAPI="GooglePlacesSearch"
        predefinedPlaces={[]}
        debounce={200}
        google
      />
    );
  };

  renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.ten,
            paddingVertical: SIZES.five,
          }}>
          <LightTextCB style={{fontSize: SIZES.ten * 3}}>
            Upload Photo
          </LightTextCB>
          <TouchableOpacity
            onPress={() => {
              this.toggleIsModalVisible();
            }}>
            <Image
              source={Images.iconClose}
              style={{
                height: SIZES.twenty,
                width: SIZES.twenty,
                tintColor: Colors.coolGrey,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <LightTextCB style={{fontSize: 16, color: Colors.grey}}>
          Upload a photo from
        </LightTextCB>
        <View style={{marginTop: SIZES.ten * 3}}>
          <ButtonRadius10
            label="CAMERA"
            onPress={() => this.takePhotoFromCamera()}
          />
        </View>
        <View style={{marginTop: SIZES.ten * 3}}>
          <ButtonRadius10
            label="GALLERY"
            onPress={() => this.choosePhotoFromGallery()}
          />
        </View>
        <View style={{height: SIZES.fifty}} />
      </View>
    );
  };

  choosePhotoFromGallery = () => {
    this.toggleIsModalVisible();
    ImagePicker.openPicker({
      width: SIZES.ten * 40,
      height: SIZES.ten * 40,
      cropping: true,
      cropperCircleOverlay: true,
    }).then((image) => {
      this.setState({avatar: image.path});
    });
  };

  takePhotoFromCamera = () => {
    this.toggleIsModalVisible();
    ImagePicker.openCamera({
      width: SIZES.ten * 40,
      height: SIZES.ten * 40,
      cropping: true,
      cropperCircleOverlay: true,
    }).then((image) => {
      this.setState({avatar: image.path});
    });
  };

  onSelect = (country) => {
    this.setState({
      countryFlag: country.cca2,
      countryCode: country.callingCode[0],
    });
  };

  editUserProfile = () => {
    let name = this.state.fullName;
    let email = this.state.email;
    let countryCode = this.state.countryCode;
    let countryFlag = this.state.countryFlag;
    let phone = this.state.phoneNumber;
    let image = this.state.avatar;
    let location = this.state.location;
    let lat = this.state.lat;
    let lng = this.state.lng;

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

    const onSuccess = ({data}) => {
      this.toggleIsLoading();
      utils.showToast(data.message);

      setTimeout(() => {
        this.props.navigation.goBack();
      }, 1000);
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      // console.log('Error===== Responce ==', Object.keys(error));
      console.log('Error===== Responce ==', error.isAxiosError);
      utils.showResponseError('Error===== Responce ==', error);
    };

    // const params = {
    //   name: name,
    //   email: email,
    //   country_code: countryCode,
    //   country_flag: countryFlag,
    //   phone: phone,
    //   image: image,
    //   location: location,
    // };

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('country_code', countryCode);
    formData.append('country_flag', countryFlag);
    formData.append('phone', phone);
    formData.append('location', location);
    // formData.append('latitude', latitude);
    // formData.append('longitude', longitude);
    formData.append('image', {
      ...image,
      uri: Platform.OS === 'android' ? image : image.replace('file:///', ''),
      name: `image-profile`,
      type: 'image/jpeg',
    });

    formData.append('about_me', this.state.abouteMe);
    formData.append('lat', lat);
    formData.append('lng', lng);

    console.log('Form data ==== ', formData);
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: this.state.accessToken,
      },
    };

    this.toggleIsLoading();
    Axios.post(Constants.updateProfileURL, formData, options)
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
            height: height / 3.1,
            backgroundColor: Colors.navy,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: SIZES.fifteen,
              marginTop: Platform.OS === 'android' ? 0 : SIZES.five,
              paddingVertical: SIZES.ten,
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
              Profile
            </RegularTextCB>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: SIZES.ten,
                paddingVertical: SIZES.five,
                paddingHorizontal: SIZES.fifteen,
                backgroundColor: Colors.sickGreen,
                borderRadius: SIZES.five,
              }}
              onPress={() => {
                this.editUserProfile();
              }}>
              <RegularTextCB style={{color: Colors.white}}>Save</RegularTextCB>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.circleCard,
              {justifyContent: 'center', alignItems: 'center'},
            ]}
            onPress={() => this.toggleIsModalVisible()}>
            <Image
              source={{uri: this.state.avatar}}
              style={styles.iconUser}
              resizeMode="cover"
            />

            <Image
              source={Images.iconCamera}
              style={{
                height: SIZES.twentyFive,
                width: SIZES.twentyFive,
                position: 'absolute',
                resizeMode: 'contain',
                opacity: 0.2,
              }}
            />
          </TouchableOpacity>
          <RegularTextCB
            style={{color: Colors.white, fontSize: 16, marginTop: SIZES.ten}}>
            {this.state.fullName}
          </RegularTextCB>
          <View
            style={{
              backgroundColor: Colors.white,
              // paddingHorizontal: SIZES.ten * 3,
              borderRadius: SIZES.ten,
              width: SIZES.ten * 30,
              marginVertical: SIZES.five,
            }}>
            <TextInput
              multiline={true}
              placeholder="About Me"
              value={this.state.abouteMe}
              style={{
                fontFamily: Constants.fontRegular,
                fontSize: 16,
              }}
              onChangeText={(text) => {
                this.setState({abouteMe: text});
              }}
            />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: SIZES.ten}}
          style={[styles.container, {paddingVertical: SIZES.five}]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: SIZES.five,
                flex: 0.5,
              }}>
              Name
            </RegularTextCB>
            <EditText
              ref={'name'}
              placeholder={'Name'}
              value={this.state.fullName}
              onChangeText={(text) => {
                this.setState({fullName: text});
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: SIZES.five,
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
                this.setState({email: text});
              }}
              style={[styles.textInput]}
              isEditable={false}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginEnd: SIZES.five,
              marginVertical: SIZES.ten,
            }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: SIZES.five,
                flex: 0.5,
              }}>
              Phone No.
            </RegularTextCB>
            <View style={[styles.card1, {flexDirection: 'row', flex: 0.85}]}>
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
                  height: SIZES.fifty,
                  color: Colors.black,
                  fontFamily: Constants.fontRegular,
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: SIZES.five,
                flex: 0.48,
              }}>
              Location
            </RegularTextCB>
            <View
              style={[
                styles.textInput,
                {
                  height: 53,
                  paddingHorizontal: SIZES.fifteen,
                  backgroundColor: Colors.white,
                  marginVertical: SIZES.ten,
                  borderRadius: SIZES.ten,
                  shadowColor: '#c5c5c5',
                  shadowOffset: {width: 5, height: 5},
                  shadowOpacity: 1.0,
                  shadowRadius: 10,
                  elevation: 10,
                  justifyContent: 'center',
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showModal: true,
                  });
                }}>
                <RegularTextCB>
                  {this.state.location ? this.state.location : 'Get Location'}
                </RegularTextCB>
              </TouchableOpacity>
            </View>

            {/* <EditText
              ref={'location'}
              placeholder={'Location'}
              value={this.state.location}
              onChangeText={(text) => {
                this.setState({location: text});
              }}
              style={[styles.textInput]}
            /> */}
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => {
              this.setState({showModal: false});
            }}>
            <View
              style={{
                flex: 1,
                padding: SIZES.twenty,
                backgroundColor: 'rgba(52, 52, 52, 0.SIZES.five)',
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {this.GooglePlacesInput()}
                <TouchableOpacity
                  style={{
                    marginTop: SIZES.fifteen,
                    marginLeft: SIZES.five * 1.3,
                  }}
                  onPress={() => {
                    this.setState({showModal: false});
                  }}>
                  <Image
                    style={{
                      height: SIZES.fifteen,
                      width: SIZES.fifteen,
                      tintColor: '#fff',
                    }}
                    resizeMode="contain"
                    source={Images.iconClose}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: SIZES.five,
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
                marginStart: SIZES.five,
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
              style={[styles.textInput, {marginBottom: SIZES.fifteen}]}
            />
          </View>
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
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  iconPassword: {
    fontSize: SIZES.five,
    height: SIZES.five,
    width: SIZES.five,
    alignSelf: 'center',
    color: Colors.orange,
  },
  iconUser: {
    height: SIZES.ten * 8,
    width: SIZES.ten * 8,
    borderRadius: (SIZES.ten * 8) / 2,
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
    marginVertical: SIZES.ten,
    marginHorizontal: SIZES.five,
    height: SIZES.fifty,
    color: Colors.black,
    fontFamily: Constants.fontRegular,
  },
  textInputContainer: {
    borderBottomWidth: 0.3,
    height: SIZES.fifty - 5,
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
    paddingTop: SIZES.five,
    borderTopStartRadius: SIZES.five,
    borderTopEndRadius: SIZES.five,
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
    padding: SIZES.five,
    borderTopStartRadius: SIZES.five,
    borderTopEndRadius: SIZES.five,
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
    padding: SIZES.five,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    alignItems: 'center',
  },
  card1: {
    flexDirection: 'row',
    height: SIZES.fifty,
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    paddingHorizontal: SIZES.ten * 4,
    paddingVertical: SIZES.five,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
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
    borderRadius: (SIZES.ten * 9) / 2,
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
