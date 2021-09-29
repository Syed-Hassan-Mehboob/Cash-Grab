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
      location: '',
      address: '',
      exactTime: '',
      selections: [],
      startTime: '08:55',
      isDatePickerVisible: false,
      showModal: false,
      lat: '',
      long: '',
      servicesid: '',
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
      // this.getServies();
    });
  };

  GooglePlacesInput = (props) => {
    return (
      <GooglePlacesAutocomplete
        placeholder={'Search'}
        //   renderLeftButton={() => }
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

  // getServies = () => {
  //   this.setState({isLoading: true});
  //   const onSuccess = ({data}) => {
  //     this.setState({selections: data.data.records});
  //     this.setState({isLoading: false});
  //   };
  //   const onFailure = (error) => {
  //     this.setState({isLoading: false});
  //     utils.showResponseError(error);
  //   };
  //   Axios.get(Constants.servies).then(onSuccess).catch(onFailure);
  // };

  handleConfirm = (date) => {
    const newTime = Moment(date).format('h:mm:ss');
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
      service_id: this.state.servicesid,
      time: this.state.startTime,
      lat: this.state.lat,
      lng: this.state.long,
      price: this.state.rateRequested,
      location: this.state.location,
    };

    this.setState({isLoading: true});
    const onSuccess = ({data}) => {
      utils.showToast(data.message);
      this.setState({isLoading: false});
      this.props.navigation.navigate(Constants.home);
    };
    const onFailure = (error) => {
      console.log(
        'error =====================================================================>',
        error,
      );
      utils.showResponseError(error.massage);
      this.setState({isLoading: false});
    };
    const options = {
      headers: {
        Authorization: this.state.accessToken,
        //    'Content-Type':'application/x-www-form-urlencoded'
      },
    };
    Axios.post(Constants.quickOrder, postData, options)
      .then(onSuccess)
      .catch(onFailure);
  };

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={STYLES.container}
        contentContainerStyle={[
          {paddingHorizontal: SIZES.ten * 2, paddingBottom: 120},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: SIZES.twenty,
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
            // borderRadius: SIZES.twenty,
            // backgroundColor: 'red',
            height: 60,
            backgroundColor: Colors.white,
            borderRadius: height * 0.01,
            shadowColor: '#c5c5c5',
            shadowOffset: {width: SIZES.five, height: SIZES.five},
            shadowOpacity: 1.0,
            shadowRadius: SIZES.ten,
            elevation: SIZES.ten,
            justifyContent: 'center',
            // paddingLeft: SIZES.twenty,
            marginTop: SIZES.ten,
          }}>
          <MultiDropdownPicker
            viewProperty="name"
            value={this.state.services}
            data={this.state.selections}
            onChangeValue={(val) => {
              this.setState({servicesid: val}, () => {
                console.log(
                  'multidropdown picker ',
                  this.state.servicesid,
                  'value',
                  val,
                );
              });
            }}
          />
        </View>

        <RegularTextCB
          style={{fontSize: 18, color: Colors.black, marginTop: SIZES.twenty}}>
          Rate Requested
        </RegularTextCB>
        <EditText
          ref={'rate'}
          placeholder={'Enter Rate'}
          value={this.state.rateRequested}
          onChangeText={(text) => {
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
              <RegularTextCB>
                {this.state.location ? this.state.location : 'Get Location'}
              </RegularTextCB>
            </TouchableOpacity>
          </View>
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
            <View style={{flex: 1, padding: SIZES.five, flexDirection: 'row'}}>
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
                    tintColor: Colors.turqoiseGreen,
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
          <RegularTextCB style={{fontSize: 18, color: Colors.black}}>
            Job Description
          </RegularTextCB>

          <View
            style={[
              {
                marginTop: SIZES.ten,
                height: SIZES.twentyFive * 5,
              },
            ]}>
            <EditText
              placeholderTextColor={Colors.grey}
              autoCapitalize="none"
              blurOnSubmit={true}
              selectionColor={Colors.sickGreen}
              placeholder={'Enter Job Description '}
              keyboardType={'default'}
              placeholderTextColor={Colors.coolGrey}
              numberOfLines={4}
              multiline={true}
              style={{height: SIZES.twentyFive * 5}}
              styles={{
                flex: 1,
                textAlignVertical: 'top',
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
              // this.postQuickOrder();
            }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate(Constants.home)}
          style={{alignSelf: 'flex-end'}}>
          <Image
            source={Images.iconSearch}
            style={{height: SIZES.fifty * 1.5, width: SIZES.fifty * 1.5}}
          />
        </TouchableOpacity>

        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </ScrollView>
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
    // borderWidth:1,
    // borderColor:Colors.lightYellowGreen,
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
