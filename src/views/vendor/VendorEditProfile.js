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
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import CountryPicker from 'react-native-country-picker-modal';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../../common/Colors';
import Images from '../../common/Images';
import ButtonRadius10 from '../../components/ButtonRadius10';
import LightTextCB from '../../components/LightTextCB';
import RegularTextCB from '../../components/RegularTextCB';
import EditText from '../../components/EditText';
import Constants, {FONTS, SIZES} from '../../common/Constants';
import Axios from '../../network/APIKit';
import utils from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Icon} from 'native-base';

const {width, height} = Dimensions.get('window');

export default class VendorEditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCountryCodePickerVisible: false,
      avatar: '',
      fullName: '',
      email: '',
      countryCode: '',
      countryFlag: '',
      phoneNumber: '',
      location: '',
      oldPassword: '',
      newPassword: '',
      isModalVisible: false,
      isLoading: false,
      accessToken: '',
      showModal: false,
      showModal2: false,
      lat: '',
      lng: '',
      secureText: false,
      companyLocation: '',
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

  toggleIsModalVisible = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
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
          {
            this.state.showModal
              ? this.setState(
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
                )
              : this.setState(
                  {
                    companyLocation: details.formatted_address,
                    lat: details.geometry.location.lat,
                    lng: details.geometry.location.lng,
                  },
                  () => {
                    setTimeout(() => {
                      this.setState({showModal2: false});
                    }, 400);
                  },
                );
          }
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

  validateEmail = (text) => {
    this.setState({email: text});

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({tickIcon: 'cross'});
    } else {
      this.setState({tickIcon: 'check'});
    }
  };

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  toggleIsCountryCodePickerVisible = () => {
    this.setState({
      isCountryCodePickerVisible: !this.state.isCountryCodePickerVisible,
    });
  };

  getUserProfile = () => {
    const onSuccess = ({data}) => {
      this.toggleIsLoading();
      console.log('User Profile Data ===== === =', data);
      this.setState({
        avatar: Constants.imageURL + data.data.records.user_profiles.image,
        fullName: data.data.records.name,
        email: data.data.records.email,
        countryCode: data.data.records.country_code,
        countryFlag: data.data.records.country_flag.toUpperCase(),
        phoneNumber: data.data.records.phone,
        location: data.data.records.user_profiles.location,
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

  editUserProfile = () => {
    let name = this.state.fullName;
    let email = this.state.email;
    let countryCode = this.state.countryCode;
    let phone = this.state.phoneNumber;
    let image = this.state.avatar;
    let location = this.state.location;
    let countryFlag = this.state.countryFlag;
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

    if (this.validateEmail(email)) {
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

    this.toggleIsLoading();
    const onSuccess = ({data}) => {
      console.log('upload======', data);
      this.toggleIsLoading();
      utils.showToast(data.message);

      setTimeout(() => {
        this.props.navigation.goBack();
      }, 1000);
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
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
    formData.append('lat', lat);
    formData.append('lng', lng);
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

  renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <LightTextCB style={{fontSize: 30}}>Upload Photo</LightTextCB>
          <TouchableOpacity
            onPress={() => {
              this.toggleIsModalVisible();
            }}>
            <Image
              source={Images.iconClose}
              style={{
                height: SIZES.fifteen,
                width: SIZES.fifteen,
                tintColor: Colors.coolGrey,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <LightTextCB style={{fontSize: 16, color: Colors.grey}}>
          Upload a photo from
        </LightTextCB>
        <View style={{marginTop: 30}}>
          <ButtonRadius10
            bgColor={Colors.sickGreen}
            label="CAMERA"
            onPress={() => this.takePhotoFromCamera()}
          />
        </View>
        <View style={{marginTop: SIZES.twenty}}>
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
      width: SIZES.five * 100,
      height: SIZES.five * 100,
      cropping: true,
    }).then((image) => {
      this.setState({avatar: image.path});
    });
  };

  takePhotoFromCamera = () => {
    this.toggleIsModalVisible();
    ImagePicker.openCamera({
      width: SIZES.five * 100,
      height: SIZES.five * 100,
      cropping: true,
    }).then((image) => {
      // console.log('=====Image',image.path)
      this.setState({avatar: image.path});
      // console.log('Avator===',this.state.avatar)
    });
  };

  onSelect = (country) => {
    console.log('Country Flag === ==== ', country.cca2);
    this.setState({
      countryFlag: country.cca2,
      countryCode: country.callingCode[0],
    });
  };

  renderTeamMember = ({item}) => {
    return (
      <View
        style={{
          marginLeft: SIZES.ten,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: item.image}}
          style={{
            height: SIZES.twenty * 3,
            width: SIZES.twenty * 3,
            borderRadius: SIZES.twenty * 3,
          }}
        />

        {item.index == 1 && (
          <TouchableOpacity
            style={{
              height: SIZES.fifty,
              width: SIZES.fifty,
              borderRadius: SIZES.fifty,
              backgroundColor: Colors.sickGreen,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              // props.navigation.goBack();
            }}
            activeOpacity={0.6}>
            <Icon
              type="AntDesign"
              name="plus"
              style={{
                color: Colors.black,
                fontSize: SIZES.fifteen * 2.3,
              }}
            />
          </TouchableOpacity>
        )}

        <RegularTextCB style={{fontSize: 12}}>{item.name}</RegularTextCB>
      </View>
    );
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
              // padding: SIZES.fifteen,
              marginTop:
                Platform.OS === 'android'
                  ? SIZES.ten
                  : getStatusBarHeight(true) + SIZES.five,
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
            <RegularTextCB style={{fontSize: 30, color: Colors.white}}>
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
              onPress={() => this.editUserProfile()}>
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
            style={{
              color: Colors.white,
              fontSize: SIZES.TWENTY,
              marginTop: SIZES.ten,
            }}>
            {this.state.fullName}
          </RegularTextCB>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: SIZES.ten,
            paddingBottom: SIZES.twenty * 2,
          }}
          style={[styles.container, {paddingVertical: SIZES.twenty}]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart: SIZES.twenty,
                flex: 0.37,
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
                flex: 0.37,
                marginStart: SIZES.twenty,
              }}>
              Email
            </RegularTextCB>
            <EditText
              ref={'email'}
              keyboardType="email-address"
              placeholder={'Email Address'}
              value={this.state.email}
              onChangeText={(text) => {
                this.validateEmail(text);
              }}
              style={[styles.textInput]}
              isEditable={false}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // marginVertical: SIZES.ten,
            }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                flex: 0.45,
                marginStart: SIZES.twenty,
              }}>
              Phone No.
            </RegularTextCB>
            <View
              style={[
                styles.card1,
                {flexDirection: 'row', marginVertical: SIZES.ten},
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
              justifyContent: 'space-between',
            }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                flex: 0.35,
                marginStart: SIZES.twenty,
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

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.showModal2}
            onRequestClose={() => {
              this.setState({showModal2: false});
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
                    this.setState({showModal2: false});
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
                flex: 0.37,
                marginStart: SIZES.twenty,
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
                flex: 0.37,
                marginStart: SIZES.twenty,
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
              style={[styles.textInput, {marginBottom: SIZES.TWENTY}]}
            />
          </View>

          <Text
            style={[
              FONTS.boldFont18,
              {marginVertical: SIZES.twenty, marginLeft: SIZES.twenty},
            ]}>
            Additional information
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 15,
                flex: 0.37,
                marginStart: SIZES.fifteen,
              }}>
              Company Name
            </RegularTextCB>
            <EditText
              placeholder={'Company Name'}
              // value={this.state.newPassword}
              // onChangeText={(text) => {
              //   this.setState({newPassword: text});
              // }}
              style={[styles.textInput, {}]}
            />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                flex: 0.37,
                marginStart: SIZES.fifteen,
              }}>
              Email address
            </RegularTextCB>
            <EditText
              placeholder={'Email address'}
              // value={this.state.newPassword}
              // onChangeText={(text) => {
              //   this.setState({newPassword: text});
              // }}
              style={[styles.textInput, {}]}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                flex: 0.34,
                marginStart: SIZES.twenty,
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
                    showModal2: true,
                  });
                }}>
                <RegularTextCB>
                  {this.state.companyLocation
                    ? this.state.companyLocation
                    : 'Get Location'}
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

          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                flex: 0.9,
                marginStart: SIZES.fifteen,
              }}>
              Team
            </RegularTextCB>
            <FlatList
              horizontal
              data={TeamData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={this.renderTeamMember}
              contentContainerStyle={{
                marginLeft: SIZES.twenty,
              }}
            />
          </View> */}

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                flex: 0.37,
                marginStart: SIZES.fifteen,
              }}>
              Team
            </RegularTextCB>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: SIZES.ten,
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={{
                    uri: 'https://media.gettyimages.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?s=612x612',
                  }}
                  style={{
                    height: SIZES.twenty * 3,
                    width: SIZES.twenty * 3,
                    borderRadius: SIZES.twenty * 3,
                  }}
                />
                <Text>Jojn wick</Text>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={{
                    uri: 'https://media.gettyimages.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?s=612x612',
                  }}
                  style={{
                    height: SIZES.twenty * 3,
                    width: SIZES.twenty * 3,
                    borderRadius: SIZES.twenty * 3,
                  }}
                />
                <Text>Devid Jack</Text>
              </View>
              <TouchableOpacity
                style={{
                  height: SIZES.fifty,
                  width: SIZES.fifty,
                  borderRadius: SIZES.fifty,
                  backgroundColor: Colors.sickGreen,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  this.props.navigation.navigate(Constants.AddTeamMember);
                }}
                activeOpacity={0.6}>
                <Icon
                  type="AntDesign"
                  name="plus"
                  style={{
                    color: Colors.black,
                    fontSize: SIZES.fifteen * 2.3,
                  }}
                />
              </TouchableOpacity>
            </View>
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
    fontSize: SIZES.TWENTY,
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
  card1: {
    flex: 1,
    flexDirection: 'row',
    // marginHorizontal: SIZES.fifteen + 2,
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    paddingHorizontal: SIZES.fifteen + 4,
    // paddingVertical: SIZES.five - 1,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  formLabel: {
    fontSize: 16,
    color: Colors.grey,
  },
  textInput: {
    fontSize: 16,
    flex: 0.8,
    marginVertical: SIZES.ten,
    // marginHorizontal: SIZES.twenty,
    height: SIZES.fifty,
    color: Colors.black,
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
    paddingTop: SIZES.twenty,
    borderTopStartRadius: SIZES.twenty,
    borderTopEndRadius: SIZES.twenty,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: SIZES.fifty - 10,
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
  iconUser: {
    height: SIZES.ten * 9,
    width: SIZES.ten * 9,
    borderRadius: (SIZES.ten * 9) / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height: SIZES.ten * 9,
    width: SIZES.ten * 9,
    borderRadius: SIZES.fifty - 5,
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

const TeamData = [
  {
    id: 1,
    image:
      'https://media.istockphoto.com/photos/indoor-photo-of-handsome-european-guy-pictured-isolated-on-grey-to-picture-id1034357476?k=20&m=1034357476&s=612x612&w=0&h=OpiBGaVDU02LI1WVpb02Wza6AAdTGopRpf0Kx6q8V-Q=',
    name: 'John Wick',
  },
  {
    id: 2,
    image:
      'https://media.istockphoto.com/photos/indoor-photo-of-handsome-european-guy-pictured-isolated-on-grey-to-picture-id1034357476?k=20&m=1034357476&s=612x612&w=0&h=OpiBGaVDU02LI1WVpb02Wza6AAdTGopRpf0Kx6q8V-Q=',
    name: 'John Wick',
  },
  {
    id: 3,
    image:
      'https://media.istockphoto.com/photos/indoor-photo-of-handsome-european-guy-pictured-isolated-on-grey-to-picture-id1034357476?k=20&m=1034357476&s=612x612&w=0&h=OpiBGaVDU02LI1WVpb02Wza6AAdTGopRpf0Kx6q8V-Q=',
    name: 'John Wick',
  },
];
