import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import ButtonRadius10 from '../components/ButtonRadius10';
import EditText from '../components/EditText';
import RegularTextCB from '../components/RegularTextCB';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import utils from '../utils';
import Axios from '../network/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MultiDropdownPicker} from '../components/MultiDropDownPicker';
import {LocationPicker} from '../components/LocationPicker';
import {Calendar} from 'react-native-calendars';
import GetLocation from 'react-native-get-location';
const {height, width} = Dimensions.get('window');
import axios from 'axios';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import RNFetchBlob from 'react-native-fetch-blob';
export default class postJob extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    serviceCaption: '',
    services: [],
    isModalVisible: false,
    rateRequested: '',
    location: null,
    address: '',
    availability: '',
    jobDesc: '',
    jobImages: [],
    accessToken: '',
    showImages: false,
    isLoading: false,
    expirydate: '',
    selections: [],
    latitude: '',
    longitude: '',
    showModal: false,
  };

  componentDidMount() {
    this.getUserAccessToken();
    this.getServies();
    this._requestLocation();
  }

  GooglePlacesInput = (props) => {
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
          types: '',
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
              height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            elevation: 11,
            paddingHorizontal: 5,
            borderRadius: 8,
          },
          textInput: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
          },
          listView: {
            marginTop: 10,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: '#fff',
          },
          row: {borderRadius: 8},
        }}
        GooglePlacesSearchQuery={{rankby: 'distance'}}
        GooglePlacesDetailsQuery={{fields: ['formatted_address', 'geometry']}}
        renderDescription={(row) => row.description}
        currentLocation={true}
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch"
        predefinedPlaces={[]}
        debounce={200}
        google
      />
    );
  };

  _requestLocation = () => {
    // this.setState({ loading: true, location: null });

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 150000,
    })
      .then((location) => {
        this.setState({
          latitude: location.altitude,
          longitude: location.longitude,
        });
      })
      .catch((ex) => {
        const {code, message} = ex;
        console.warn(code, message);
        if (code === 'CANCELLED') {
          Alert.alert('Location cancelled by user or by another request');
        }
        if (code === 'UNAVAILABLE') {
          Alert.alert('Location service is disabled or unavailable');
        }
        if (code === 'TIMEOUT') {
          Alert.alert('Location request timed out');
        }
        if (code === 'UNAUTHORIZED') {
          Alert.alert('Authorization denied');
        }

        this.setState({
          latitude: location.altitude,
          longitude: location.longitude,
        });
      });
  };

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token});
  };

  getServies = () => {
    const onSuccess = ({data}) => {
      this.setState({selections: data.data.records});
    };
    const onFailure = (error) => {
      utils.showResponseError(error);
    };
    Axios.get(Constants.servies).then(onSuccess).catch(onFailure);
  };

  // checkValidation = () => {
  //   let serviceCaption = this.state.serviceCaption;
  //   let services = this.state.services;
  //   let rateRequested = this.state.rateRequested;
  //   let location = this.state.location;
  //   let expirydate = this.state.expirydate;
  //   let jobDesc = this.state.jobDesc;
  //   let jobImages = this.state.jobImages;

  //   // if (serviceCaption === '' || serviceCaption === undefined) {
  //   //   utils.showToast('Invalid serviceCaption');
  //   //   return;
  //   // }
  //   // if (services.length === 0 || services === undefined) {
  //   //   utils.showToast('Invalid services');
  //   //   return;
  //   // }

  //   // if (rateRequested === '' || rateRequested === undefined) {
  //   //   utils.showToast('Invalid rateRequested');
  //   //   return;
  //   // }
  //   // if (location === '' || location === undefined) {
  //   //   utils.showToast('Invalid location');
  //   //   return;
  //   // }
  //   // if (expirydate === '' || expirydate === undefined) {
  //   //   utils.showToast('Invalid availability');
  //   //   return;
  //   // }
  //   // if (jobDesc === '' || jobDesc === undefined) {
  //   //   utils.showToast('Invalid Job Description');
  //   //   return;
  //   // }
  //   this.postJob()

  // }

  checkValidation = async () => {
    // var formData = new FormData();
    // formData.append("title", "shohab");
    // formData.append("price", 100);
    // formData.append("description", "test");
    // formData.append("expiry_date", "2021 - 07 - 30");
    // formData.append("address", "test");
    // // formData.append("image", "file:///data/user/0/com.cashgrab/cache/rn_image_picker_lib_temp_7362e0f2-90b9-413c-8dfb-c481f32f4559.jpg");
    // // formData.append("services", this.state.services);
    // formData.append("services", this.state.services.map((item) => {
    //   return item
    // }))
    // console.log("============>", formData._parts[0])

    console.log('images ======>', typeof this.state.jobImages[0]);
    const postData = {
      title: 'shohab',
      price: '100',
      description: 'test',
      expiry_date: '2021 - 07 - 30',
      address: 'test',
      // image: this.state.jobImages,
      services: this.state.services,
    };

    // Please change file upload URL
    let res = await fetch(
      'https://cash-grab.reignsol.net/api/v1/customer/jobs/create',
      {
        method: 'post',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.state.accessToken,
        },
      },
    );
    let responseJson = await res.json();
    console.log(responseJson);
  };

  postJob = () => {
    // const postData = {
    //   title: this.state.serviceCaption,
    //   price: this.state.rateRequested,
    //   description: this.state.jobDesc,
    //   expiry_date: this.state.expirydate,
    //   address: this.state.location,
    //   image: this.state.jobImages,
    //   services: this.state.services,
    // };

    var formData = new FormData();
    formData.append('title', 'shohab');
    formData.append('price', 100);
    formData.append('description', 'test');
    formData.append('expiry_date', '2021 - 07 - 30');
    formData.append('address', 'test');
    formData.append(
      'image',
      'file:///data/user/0/com.cashgrab/cache/rn_image_picker_lib_temp_7362e0f2-90b9-413c-8dfb-c481f32f4559.jpg',
    );
    formData.append('services', '6');
    console.log(formData._parts);

    axios({
      method: 'post',
      url: 'https://cash-grab.reignsol.net/api/v1/customer/jobs/create',
      data: formData,
      headers: {
        Authorization: this.state.accessToken,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => console.log(res))
      .catch((error) => {
        console.log('error ======>', error);
      });

    // const onSuccess = ({ data }) => {
    //   console.log("data =============>", data)
    //   this.setState({ isLoading: false });
    // };

    // const onFailure = (error) => {
    //   console.log("error =====================================================================>", error)
    //   utils.showResponseError(error);
    //   this.setState({ isLoading: false });
    // };

    // this.setState({ isLoading: true });
    // const options = {
    //   headers: {
    //     "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
    //     Authorization: this.state.accessToken,
    //   },
    // };

    // Axios.post(Constants.postJob, formData, options).then(onSuccess).catch(onFailure);
  };

  openGallery = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 4}, (response) => {
      if (response.didCancel) {
        console.log('user conacel image  picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error', response.errorCode);
      } else if (response.errorMessage) {
        console.log('Image Picker Error', response.errorMessage);
      } else if (response.assets) {
        console.log(response);
        var imageuri = [];
        response.assets.map((item) => {
          imageuri.push(item.uri);
        });
        this.setState({jobImages: imageuri, showImages: true});
      } else {
      }
    });
  };
  remove(image) {
    let images = [];
    this.state.jobImages.filter((item) => {
      if (item !== image) {
        images.push(item);
      }
    });
    this.setState({jobImages: images});
  }

  onDayPress = (day) => {
    this.setState({expirydate: day.dateString}, () => {
      console.log('date ====>', this.state.expirydate);
      setTimeout(() => {
        this.setState({isModalVisible: false});
      }, 200);
    });
  };

  renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View>
          <Calendar
            firstDay={1}
            minDate={new Date()}
            monthFormat={'MMM yyyy'}
            disabledByDefault={true}
            onDayPress={this.onDayPress}
            enableSwipeMonths={true}
            markingType={'custom'}
            renderArrow={(direction) =>
              direction === 'left' ? (
                <Image
                  source={Images.arrowBack}
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                />
              ) : (
                <Image
                  source={Images.arrowBack}
                  style={{
                    transform: [{scaleX: -1}],
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                  }}
                />
              )
            }
            markedDates={{
              [this.state.expirydate]: {
                customStyles: {
                  container: styles.selectedDateBG,
                  text: {
                    color: Colors.white,
                    fontFamily: Constants.fontRegular,
                  },
                },
              },
            }}
            theme={{
              textDayFontFamily: Constants.fontRegular,
              textMonthFontFamily: Constants.fontRegular,
              textDayHeaderFontFamily: Constants.fontRegular,
              dayTextColor: Colors.navy,
              monthTextColor: Colors.navy,
            }}
            style={{width: width / 1.15, height: height / 2}}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: 15,
              marginTop: Platform.OS === 'android' ? 0 : 20,
            }}>
            <RegularTextCB style={{fontSize: 30, color: Colors.black}}>
              Post a Job
            </RegularTextCB>
          </View>
          <View style={{paddingHorizontal: 20, paddingTop: 10}}>
            <View>
              <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
                Service Caption
              </RegularTextCB>
              <EditText
                ref={'service_caption'}
                placeholder={'Service Caption'}
                value={this.state.serviceCaption}
                onChangeText={(text) => {
                  this.setState({
                    serviceCaption: text,
                  });
                }}
                style={[styles.textInput]}
              />
            </View>
            <View style={{marginTop: 20}}>
              <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
                Select Service
              </RegularTextCB>
              <MultiDropdownPicker
                viewProperty="name"
                value={this.state.services}
                data={this.state.selections}
                screenName="postJob"
                onChangeValue={(val) => {
                  this.setState({services: val});
                }}
              />
            </View>

            <View style={[{marginTop: 20}]}>
              <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
                Rate Requested
              </RegularTextCB>
              <EditText
                ref={'rate'}
                placeholder={'Enter Rate'}
                value={this.state.rateRequested}
                onChangeText={(text) => {
                  this.setState({rateRequested: text});
                }}
                style={[styles.textInput]}
              />
            </View>
            <View style={[{marginTop: 20}]}>
              <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
                Location
              </RegularTextCB>
              <View
                style={[
                  {
                    height: 60,
                    backgroundColor: Colors.white,
                    borderRadius: 10,
                    shadowColor: '#c5c5c5',
                    shadowOffset: {width: 5, height: 5},
                    shadowOpacity: 1.0,
                    shadowRadius: 10,
                    elevation: 10,
                    justifyContent: 'center',
                    paddingLeft: 20,
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

              {/* <LocationPicker
                viewProperty="name"
                onChangeValue={(val) => {
                  this.setState({ services: val })
                }}
              /> */}
            </View>
            <View style={[{marginTop: 20}]}>
              <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
                Address
              </RegularTextCB>
              <EditText
                ref={'address'}
                placeholder={'Enter Address'}
                value={this.state.address}
                onChangeText={(text) => {
                  this.setState({address: text});
                }}
                style={[styles.textInput]}
              />
            </View>
            <View style={{marginTop: 20}}>
              <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
                Expiry date
              </RegularTextCB>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({isModalVisible: true});
                }}
                style={styles.dateButton}>
                <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
                  {this.state.expirydate
                    ? this.state.expirydate
                    : 'Select Date'}
                </RegularTextCB>
              </TouchableOpacity>
            </View>
            <View style={[{marginTop: 20}]}>
              <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
                Job Description
              </RegularTextCB>
              <View style={styles.card}>
                <TextInput
                  ref={'job_desc'}
                  placeholder={'Enter Job Description'}
                  multiline={true}
                  numberOfLines={5}
                  value={this.state.jobDesc}
                  onChangeText={(text) => {
                    this.setState({jobDesc: text});
                  }}
                  style={[
                    styles.textInput,
                    {
                      height: 120,
                      paddingTop: 10,
                      alignItems: 'flex-start',
                      textAlignVertical: 'top',
                    },
                  ]}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.openGallery();
              }}
              style={[styles.dashBorder, {marginTop: 30, padding: 25}]}>
              <Image
                source={Images.cloud}
                style={{height: 50, width: 80, resizeMode: 'contain'}}
              />
              <RegularTextCB
                style={{marginTop: 10, color: Colors.black, fontSize: 16}}>
                Upload Photo
              </RegularTextCB>
              <RegularTextCB style={{color: Colors.coolGrey}}>
                Please upload a clear high-quality photo
              </RegularTextCB>
            </TouchableOpacity>
            {this.state.jobImages.length > 0 ? (
              <View style={{height: '8%', marginVertical: 30}}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {this.state.jobImages.map((item) => {
                    return (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          style={{
                            height: 90,
                            width: 90,
                            marginHorizontal: 10,
                            borderRadius: 10,
                          }}
                          source={{uri: item}}
                          resizeMode="cover"
                        />
                        <View
                          style={{
                            position: 'absolute',
                            padding: 5,
                            top: 3,
                            right: 10,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              this.remove(item);
                            }}
                            style={{
                              padding: 4,
                              height: 17,
                              width: 17,
                              backgroundColor: Colors.white,
                              borderRadius: 10,
                              overflow: 'hidden',
                            }}>
                            <Image
                              style={{height: '100%', width: '100%'}}
                              resizeMode="contain"
                              source={Images.iconClose}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            ) : null}

            <View
              style={{
                marginVertical: this.state.jobImages.length > 0 ? 0 : 30,
                paddingBottom: this.state.jobImages.length > 0 ? 40 : 0,
              }}>
              <ButtonRadius10
                bgColor={Colors.sickGreen}
                label="POST"
                onPress={() => {
                  this.checkValidation();
                }}
              />
            </View>
          </View>
        </ScrollView>
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
              padding: 20,
              backgroundColor: 'rgba(52, 52, 52, 0.5)',
            }}>
            <View style={{flex: 1, padding: 5, flexDirection: 'row'}}>
              {this.GooglePlacesInput()}
              <TouchableOpacity
                style={{marginTop: 12, marginLeft: 5}}
                onPress={() => {
                  this.setState({showModal: false});
                }}>
                <Image
                  style={{height: 15, width: 15}}
                  resizeMode="contain"
                  source={Images.iconClose}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationIn="pulse"
          isVisible={this.state.isModalVisible}
          style={styles.modal}>
          {this.renderBottomSheetContent()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  iconBack: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: Constants.fontRegular,
    color: Colors.black,
  },
  card: {
    flexDirection: 'row',
    height: 120,
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
  dashBorder: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.sickGreen,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  selectedDateBG: {
    height: 30,
    width: 30,
    backgroundColor: Colors.sickGreen,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  bottomSheetBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  dateButton: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
    height: 60,
    justifyContent: 'center',
  },
});
