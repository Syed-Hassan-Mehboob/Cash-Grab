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
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import ButtonRadius10 from '../components/ButtonRadius10';
import EditText from '../components/EditText';
import Constants, {SIZES} from '../common/Constants';
import Axios from '../network/APIKit';
import utils from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimePicker from '../components/TimePicker';
import Moment from 'moment';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Component} from 'react';
import RegularTextCB from './RegularTextCB';
import Colors from '../common/Colors';
import Images from '../common/Images';
import {MultiDropdownPicker} from '../components/quickNotifyServeses';

export default class QuickNotify extends Component {
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
      getAllCategories: [],
    };
  }

  componentDidMount() {
    this.getUserAccessToken();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.props.navigation.addListener('focus', () => this.getUserAccessToken());
  }

  getUserAccessToken = async () => {
    // console.log("All Category ==========> ");
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => {
      this.getServies();
      this.getAllCategories();
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

  getServies = () => {
    this.setState({isLoading: true});
    const onSuccess = ({data}) => {
      this.setState({selections: data.data.records});
      this.setState({isLoading: false});
    };
    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };
    Axios.get(Constants.servies).then(onSuccess).catch(onFailure);
  };

  getAllCategories = () => {
    const onSuccess = ({data}) => {
      // console.log("All Category ==========> ", data.data.records);
      this.setState({isLoading: false, getAllCategories: data.data.records});
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      // console.log("=================", error);
      utils.showResponseError(error);
    };

    this.setState({isLoading: true});

    Axios.get(Constants.getCategories, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

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
      // console.log(
      //   "error =====================================================================>",
      //   error
      // );
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
      <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: SIZES.twenty,
          }}>
          <TouchableOpacity
            style={{
              height: SIZES.twenty,
              width: SIZES.twenty,
            }}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={Images.arrowBack}
              style={[styles.iconBack, {tintColor: Colors.black1}]}
            />
          </TouchableOpacity>
          <RegularTextCB
            style={{
              fontSize: 18,
              color: Colors.lightYellowGreen,
              marginLeft: SIZES.ten,
            }}>
            Quick Services
          </RegularTextCB>
        </View>

        <View
          style={{
            backgroundColor: 'pink',
            height: SIZES.ten * 6,
            borderRadius: SIZES.twenty,
          }}>
          <MultiDropdownPicker
            viewProperty="name"
            value={this.state.services}
            data={this.state.selections}
            onChangeValue={(val) => {
              this.setState({servicesid: val}, () => {
                // console.log(
                //   "multidropdown picker ",
                //   this.state.servicesid,
                //   "value",
                //   val
                // );
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
          style={{height: SIZES.ten * 6, marginTop: SIZES.ten}}
        />
        <View style={[{marginTop: SIZES.twenty}]}>
          <RegularTextCB style={{fontSize: 18, color: Colors.black}}>
            Location
          </RegularTextCB>
          <View
            style={[
              {
                height: SIZES.ten * 6,
                backgroundColor: Colors.white,
                borderRadius: SIZES.ten,
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
                {this.state.location ? this.state.location : 'Search Location'}
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
                  style={{height: SIZES.fifteen, width: SIZES.fifteen}}
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
            style={{height: SIZES.ten * 6, marginTop: SIZES.ten}}
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
      </View>
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
