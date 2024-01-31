import React from 'react';
import {
  FlatList,
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Modal,
  TextInput,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import ButtonRadius10 from '../components/ButtonRadius10';
import EditText from '../components/EditText';
import Constants, {SIZES, FONTS, STYLES, height} from '../common/Constants';
import Axios from '../network/APIKit';
import utils from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimePicker from '../components/TimePicker';
import Moment from 'moment';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Component} from 'react';
import RegularTextCB from '../components/RegularTextCB';
import Colors from '../common/Colors';
import Images from '../common/Images';
import {MultiDropdownPicker} from '../components/quickNotifyServeses';
import MesageEditText from '../components/MessageEditText';
import {Text} from 'react-native';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isQuickServiceModalVisible: false,
      isSelectionModalVisible: false,
      accessToken: '',
      services: '',
      rateRequested: '',
      description: '',
      location: '',
      address: '',
      exactTime: '',
      selections: [],
      startTime: 'Select Time',
      isDatePickerVisible: false,
      showModal: false,
      lat: '',
      long: '',
      servicesid: undefined,
      getAllCategories: [],
      selectedCategory: '',
      selectedCard: '',
      price: '',
    };
  }

  componentDidMount() {
    this.getUserAccessToken();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.props.navigation.addListener('focus', () => this.getUserAccessToken());
  }
  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => {
      this.getAllCategories();
      this.getUserProfile();
      this.getAllCards();
    });
  };

  getUserProfile = () => {
    const onSuccess = ({data}) => {
      // console.log('Profile data ==== ', data.data.records);
      this.setState({
        avatar: data.data.records.user_profiles.image,
        name: data.data.records.name,
        email: data.data.records.email,
        countryCode: data.data.records.country_code,
        countryFlag: data.data.records.country_flag,
        phone: data.data.records.phone,
        location: data.data.records.user_profiles.location,
        abouteMe: data.data.records.user_profiles.about_me,
      });
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
    };

    // this.toggleIsLoading();
    Axios.get(Constants.getProfileURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  GooglePlacesInput = (props) => {
    return (
      <GooglePlacesAutocomplete
        textInputProps={{
          clearButtonMode: 'always',
        }}
        placeholder={'Search Location'}
        minLength={2}
        keyboardKeyType={'search'}
        fetchDetails={true}
        onPress={(data, details = null) => {
          this.setState(
            {
              location: details.formatted_address,
              lat: details.geometry.location.lat,
              long: details.geometry.location.lng,
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
            marginTop: Platform.OS === 'ios' ? 20 : 0,
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
  handleConfirm = (date) => {
    const newTime = Moment(date).format('h:mm').toString();
    this.setState({startTime: newTime});
    this.hideDatePicker();
  };

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  postQuickOrder = () => {
    const postData = {
      address: this.state.address,
      category_id: this.state.selectedCategory,
      from_time: this.state.startTime,
      lat: this.state.lat,
      lng: this.state.long,
      price: Number(this.state.rateRequested),
      location: this.state.location,
      description: this.state.description,
      card_id: this.state.selectedCard,
    };

    console.log('myData=======>>>>> ', postData);

    const formData = new FormData();
    for (const key in postData) {
      formData.append(key, postData[key]);
    }

    if (!postData['category_id']) {
      utils.showToast('Please Select Category');
      return;
    }

    if (!postData['card_id']) {
      utils.showToast('Please Select Card');
      return;
    }

    if (!postData.price) {
      utils.showToast("Rate field can't be empty");
      this.setState({isLoading: false});
      return;
    }
    if (utils.isEmpty(postData.location)) {
      utils.showToast("Location field can't be empty");
      this.setState({isLoading: false});
      return;
    }
    if (utils.isEmpty(postData.address)) {
      utils.showToast("Address field can't be empty");
      this.setState({isLoading: false});
      return;
    }
    if (utils.isEmpty(postData.from_time)) {
      utils.showToast("time field can't be empty");
      this.setState({isLoading: false});
      return;
    } else if (utils.isEmpty(postData.description)) {
      utils.showToast("Description field can't be empty");
      return;
    }

    const onSuccess = ({data}) => {
      this.setState({
        isLoading: false,
        address: '',
        selectedCategory: '',
        startTime: 'Select Time',
        lat: '',
        long: '',
        rateRequested: '',
        location: '',
        description: '',
        selectedCard: '',
      });

      utils.showToast('Your Request was successfull.');
      console.log(data?.message);
    };
    const onFailure = (error) => {
      console.log(
        'error =====================================================================>',
        error,
      );
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    const options = {
      headers: {
        Authorization: this.state.accessToken,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    this.setState({isLoading: true});

    Axios.post(Constants.quickOrder2, formData, options)
      .then(onSuccess)
      .catch(onFailure);
  };

  getAllCategories = () => {
    const onSuccess = ({data}) => {
      // console.log('All Categoryyyyy ==========> ', data.data.records);
      this.setState({isLoading: false, getAllCategories: data.data.records});
    };
    const onFailure = (error) => {
      this.setState({isLoading: false});
      // console.log('=================', error);
      utils.showResponseError(error);
    };
    this.setState({isLoading: true});

    console.log('STATE', this.state.accessToken);
    Axios.get(Constants.getCategories, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })

      .then(onSuccess)
      .catch(onFailure);
  };

  getAllCards = () => {
    const onSuccess = ({data}) => {
      console.log('CARDS ==========> ', data?.data);
      this.setState({isLoading: false, getAllCards: data?.data});
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      // console.log('=================', error);
      utils.showResponseError(error);
    };
    this.setState({isLoading: true});

    Axios.get(Constants.getCard, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })

      .then(onSuccess)
      .catch(onFailure);
  };

  render() {
    const {open, value, items} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          style={STYLES.container}
          contentContainerStyle={[
            {paddingHorizontal: SIZES.ten * 2, paddingBottom: 100},
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: SIZES.twenty,
            }}>
            <Image
              source={{uri: Constants.imageURL + this.state.avatar}}
              style={{
                height: SIZES.twentyFive * 2,
                width: SIZES.twentyFive * 2,
                borderRadius: SIZES.fifteen * 2.85,
              }}
              resizeMode="cover"
            />

            <Text style={[FONTS.mediumFont16, {marginLeft: SIZES.ten}]}>
              Welcome,{' '}
              <Text style={[FONTS.boldFont18, {color: Colors.sickGreen}]}>
                {this.state.name}
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: SIZES.fifteen,
            }}>
            <RegularTextCB
              style={[
                FONTS.boldFont22,
                {
                  color: Colors.black,
                },
              ]}>
              Quick Services
            </RegularTextCB>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate(Constants.home)}>
              <Image
                source={Images.iconSearch}
                style={{height: SIZES.fifty * 1, width: SIZES.fifty * 1}}
              />
            </TouchableOpacity>
          </View>
          <RegularTextCB
            style={[
              FONTS.mediumFont18,
              {
                color: Colors.black,
                marginVertical: SIZES.ten,
              },
            ]}>
            Select Services
          </RegularTextCB>
          <View
            style={{
              height: 60,
              backgroundColor: Colors.white,
              borderRadius: height * 0.01,
              shadowColor: '#c5c5c5',
              shadowOffset: {width: SIZES.five, height: SIZES.five},
              shadowOpacity: 1.0,
              shadowRadius: 10,
              justifyContent: 'center',
              marginTop: SIZES.ten,
            }}>
            <MultiDropdownPicker
              viewProperty="name"
              value={this.state.services}
              data={this.state.getAllCategories}
              onChangeValue={(val) => {
                this.setState({selectedCategory: val}, () => {
                  // console.log(
                  //   'multidropdown picker ',
                  //   typeof this.state.servicesid,
                  //   'value',
                  //   val,
                  // );
                });
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: SIZES.twenty,
            }}>
            <RegularTextCB style={{fontSize: 18, color: Colors.black}}>
              Rate Requested
            </RegularTextCB>
            <RegularTextCB
              style={{
                fontSize: 12,
                color: Colors.coolGrey,
                marginStart: SIZES.five,
              }}>
              (for complete job)
            </RegularTextCB>
          </View>
          <EditText
            ref={'rate'}
            placeholder={'Enter Rate'}
            keyboardType={'number-pad'}
            value={this.state.rateRequested}
            onChangeText={(text) => {
              var numbers = /^[0-9]+$/;
              if (!text.match(numbers)) {
                utils.showToast('Price can only be Number');
                return;
              }
              this.setState({
                rateRequested: text,
              });
            }}
            style={{marginTop: SIZES.ten}}
          />
          <View style={[{marginTop: SIZES.twenty}]}>
            <RegularTextCB style={{fontSize: 18, color: Colors.black}}>
              Location
            </RegularTextCB>
            <View
              style={[
                {
                  height: 60,
                  backgroundColor: Colors.white,
                  borderRadius: height * 0.01,
                  shadowColor: '#c5c5c5',
                  shadowOffset: {width: SIZES.five, height: SIZES.five},
                  shadowOpacity: 1.0,
                  shadowRadius: SIZES.ten,
                  elevation: SIZES.ten,
                  justifyContent: 'center',
                  paddingLeft: SIZES.twenty,
                  marginTop: SIZES.ten,
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showModal: true,
                  });
                }}>
                <RegularTextCB style={{fontSize: 16}}>
                  {this.state.location
                    ? this.state.location
                    : 'Search Location'}
                </RegularTextCB>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => {
              this.setState({showModal: false});
            }}>
            <View
              style={{
                flex: 1,
                padding: SIZES.twenty,
                backgroundColor: '#00000085',
              }}>
              <View
                style={{
                  // flex: 1,
                  padding: SIZES.five,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {this.GooglePlacesInput()}
                <TouchableOpacity
                  style={{marginTop: SIZES.fifteen, marginLeft: SIZES.five}}
                  onPress={() => {
                    this.setState({showModal: false});
                  }}>
                  <Image
                    style={{
                      height: SIZES.fifteen,
                      width: SIZES.fifteen,
                      tintColor: Colors.white,
                      marginLeft: SIZES.five,
                    }}
                    resizeMode="contain"
                    source={Images.iconClose}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={{marginTop: SIZES.twenty}}>
            <RegularTextCB style={{fontSize: 18, color: Colors.black}}>
              Address
            </RegularTextCB>
            <EditText
              ref={'rate'}
              placeholder={'Enter Address'}
              value={this.state.address}
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
              style={{
                marginTop: SIZES.ten,
              }}
            />
          </View>
          <View style={[{marginTop: SIZES.twenty}]}>
            <RegularTextCB
              style={{fontSize: 18, color: '#000', marginBottom: SIZES.ten}}>
              Exact Time
            </RegularTextCB>

            <TimePicker
              onPress={this.showDatePicker}
              isVisible={this.state.isDatePickerVisible}
              mode="time"
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker}
              is24Hour={false}
              hideTitleContainerIOS={true}
              time={this.state.startTime}
            />
          </View>
          <View style={{marginTop: SIZES.twenty}}>
            <RegularTextCB
              style={{
                fontSize: 18,
                color: Colors.black,
                marginBottom: SIZES.fifteen,
              }}>
              Job Description
            </RegularTextCB>

            <MesageEditText
              placeholder={'Enter Job Description '}
              height={SIZES.twentyFive * 4.5}
              value={this.state.description}
              onChangeText={(text) => {
                this.setState({description: text});
              }}
            />

            <RegularTextCB
              style={[
                FONTS.mediumFont18,
                {
                  color: Colors.black,
                  marginTop: SIZES.fifteen,
                  marginBottom: SIZES.ten,
                },
              ]}>
              Select Card
            </RegularTextCB>
            <View
              style={{
                height: 60,
                backgroundColor: Colors.white,
                borderRadius: height * 0.01,
                shadowColor: '#c5c5c5',
                shadowOffset: {width: SIZES.five, height: SIZES.five},
                shadowOpacity: 1.0,
                shadowRadius: 10,
                justifyContent: 'center',
                marginTop: SIZES.ten,
              }}>
              <MultiDropdownPicker
                sample="Select Card"
                viewProperty="cardholder_name"
                value={this.state.selectedCard}
                data={this.state.getAllCards}
                onChangeValue={(val) => {
                  this.setState({selectedCard: val}, () => {
                    console.log('CARD ID', val);
                    // Handle the selected card value
                  });
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: SIZES.ten * 5,
              paddingBottom: SIZES.ten,
              marginHorizontal: SIZES.ten,
            }}>
            <ButtonRadius10
              bgColor={Colors.sickGreen}
              label="QUICK NOTIFY"
              onPress={() => {
                this.postQuickOrder();
              }}
            />
          </View>

          <Spinner
            visible={this.state.isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'red',
    paddingVertical: SIZES.five,
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: SIZES.twenty,
    borderTopLeftRadius: SIZES.twenty,
    borderTopRightRadius: SIZES.twenty,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  textInputContainer: {
    marginHorizontal: SIZES.ten,
    height: SIZES.ten * 7,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
});

const data = [
  {
    id: 1,
    name: 'test1',
  },
  {
    id: 2,
    name: 'test2',
  },
];
