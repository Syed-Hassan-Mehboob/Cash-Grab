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
import Constants, { SIZES } from '../common/Constants';
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
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
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

  toggleIsLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };


  postJob = () => {

    const PostData={
       title : this.state.serviceCaption,
       price :this.state.rateRequested, 
       description:this.state.jobDesc,
       expiry_date:this.state.expirydate,
       address: this.state.location,
       location:this.state.location,
       images :this.state.jobImages,
       services : this.state.services,
    }

    // const formData = new FormData();
    // formData.append('title', this.state.serviceCaption);
    // formData.append('price' ,this.state.rateRequested);
    // formData.append('description',this.state.jobDesc);
    // formData.append('expiry_date',this.state.expirydate);
    // formData.append('address', this.state.location);
    // formData.append('location',this.state.location);;
    // formData.append('image[]',this.state.jobImages)  
    // formData.append('services[]',this.state.services);


    // cons
 

console.log('post Data =======================================================',PostData)

    this.setState({ isLoading: true });
    const onSuccess = ({ data }) => {
      console.log('Post Jobe Data =====================================================',data);
      utils.showToast(data.message);
      this.setState({ isLoading: false });
    
    };

    const onFailure = (error) => {
      console.log("error =========================================== ==========================>", Object.keys(error))
      utils.showResponseError(error);
      this.setState({ isLoading: false });
    };


    const options = {
      headers: {
        // Accept: "application/x-www-form-urlencoded",
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: this.state.accessToken,
      },
    };

    Axios.post(Constants.postJob,PostData,options)
    .then(onSuccess)
    .catch(onFailure);

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
        console.log('=======responce',response);
        var imageuri = [];
        response.assets.map((item) => {
          console.log('Image Uri ==== ==== ',item.uri)
          imageuri.push(item.uri);
        }
        );

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
      // console.log('date ====>', this.state.expirydate);
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
                  style={{height: SIZES.twenty, width: SIZES.twenty, resizeMode: 'contain'}}
                />
              ) : (
                <Image
                  source={Images.arrowBack}
                  style={{
                    transform: [{scaleX: -1}],
                    height: SIZES.twenty,
                    width: SIZES.twenty,
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
              padding: SIZES.fifteen,
              marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
            }}>
            <RegularTextCB style={{fontSize: SIZES.ten*3, color: Colors.black}}>
              Post a Job
            </RegularTextCB>
          </View>
          <View style={{paddingHorizontal: SIZES.twenty, paddingTop: SIZES.ten}}>
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
            <View style={{marginTop: SIZES.twenty}}>
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

            <View style={[{marginTop: SIZES.twenty}]}>
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
            <View style={[{marginTop: SIZES.twenty}]}>
              <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
                Location
              </RegularTextCB>
              <View
                style={[
                  {
                    height: SIZES.ten*6,
                    backgroundColor: Colors.white,
                    borderRadius: SIZES.ten,
                    shadowColor: '#c5c5c5',
                    shadowOffset: {width: SIZES.five, height: SIZES.five},
                    shadowOpacity: 1.0,
                    shadowRadius: SIZES.ten,
                    elevation: SIZES.ten,
                    justifyContent: 'center',
                    paddingLeft: SIZES.twenty,
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
            <View style={[{marginTop: SIZES.twenty}]}>
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
            <View style={{marginTop: SIZES.twenty}}>
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
            <View style={[{marginTop: SIZES.twenty}]}>
              <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
                Job Description
              </RegularTextCB>
              <View style={styles.card}>
                <TextInput
                  ref={'job_desc'}
                  placeholder={'Enter Job Description'}
                  multiline={true}
                  numberOfLines={SIZES.five}
                  value={this.state.jobDesc}
                  onChangeText={(text) => {
                    this.setState({jobDesc: text});
                  }}
                  style={[
                    styles.textInput,
                    {
                      height: SIZES.ten*12,
                      paddingTop: SIZES.ten,
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
              style={[styles.dashBorder, {marginTop: SIZES.ten*3, padding: 25}]}>
              <Image
                source={Images.cloud}
                style={{height: SIZES.fifty, width: SIZES.ten*8, resizeMode: 'contain'}}
              />
              <RegularTextCB
                style={{marginTop: SIZES.ten, color: Colors.black, fontSize: 16}}>
                Upload Photo
              </RegularTextCB>
              <RegularTextCB style={{color: Colors.coolGrey}}>
                Please upload a clear high-quality photo
              </RegularTextCB>
            </TouchableOpacity>
            {this.state.jobImages.length > 0 ? (
              <View style={{height: '8%', marginVertical: SIZES.ten*3}}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {this.state.jobImages.map((item) => {
                    return (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          style={{
                            height: SIZES.ten*9,
                            width: SIZES.ten*9,
                            marginHorizontal: SIZES.ten,
                            borderRadius: SIZES.ten,
                          }}
                          source={{uri:item}}
                          resizeMode="cover"
                        />
                        <View
                          style={{
                            position: 'absolute',
                            padding: SIZES.five,
                            top: SIZES.five-2,
                            right: SIZES.ten,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              this.remove(item);
                            }}
                            style={{
                              padding: 4,
                              height: SIZES.fifteen+2,
                              width: SIZES.fifteen+2,
                              backgroundColor: Colors.white,
                              borderRadius: SIZES.ten,
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
                marginVertical: this.state.jobImages.length > 0 ? 0 : SIZES.ten*3,
                paddingBottom: this.state.jobImages.length > 0 ? SIZES.ten*4 : 0,
              }}>
              <ButtonRadius10
                bgColor={Colors.sickGreen}
                label="POST"
                onPress={() => {
                  this.postJob()
            //       setTimeout(() => {
            //   this.props.navigation.navigate(Constants.home);
            //  }, 5000);
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
              padding: SIZES.twenty,
              backgroundColor: 'rgba(52, 52, 52, 0.SIZES.five)',
            }}>
            <View style={{flex: 1, padding: SIZES.five, flexDirection: 'row'}}>
              {this.GooglePlacesInput()}
              <TouchableOpacity
                style={{marginTop: SIZES.fifteen, marginLeft: SIZES.five}}
                onPress={() => {
                  this.setState({showModal: false});
                }}>
                <Image
                  style={{height: SIZES.fifteen, width: SIZES.fifteen}}
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
    height: SIZES.twenty,
    width: SIZES.twenty,
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
    height: SIZES.ten*12,
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
  dashBorder: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.sickGreen,
    borderRadius: SIZES.ten,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: SIZES.twenty,
    borderTopLeftRadius: SIZES.twenty,
    borderTopRightRadius: SIZES.twenty,
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
    borderRadius: SIZES.fifteen,
  },
  unselectedFilter: {
    alignItems: 'center',
    paddingVertical: SIZES.ten,
    margin: SIZES.five-3,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: SIZES.fifteen,
  },
  selectedDateBG: {
    height: SIZES.ten*3,
    width: SIZES.ten*3,
    backgroundColor: Colors.sickGreen,
    borderRadius: SIZES.fifteen,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  bottomSheetBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  dateButton: {
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    paddingHorizontal: SIZES.twenty,
    paddingVertical: SIZES.five,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    height: SIZES.ten*6,
    justifyContent: 'center',
  },
});
