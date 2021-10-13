import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  TextInput,
  Switch,
  Platform,
  Text,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Slider from '@react-native-community/slider';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Modal from 'react-native-modal';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import Colors from '../common/Colors';
import Constants, {FONTS, SIZES} from '../common/Constants';
import ButtonRadius10 from '../components/ButtonRadius10';
import MessageEditText from '../components/MessageEditText';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from '../network/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditText from './../components/EditText';
import CountryPicker from 'react-native-country-picker-modal';

const {height, width} = Dimensions.get('window');

export default class DateTimeSlots extends Component {
  timeDurations = [
    {
      id: '1',
      time: '2:30',
      unit: 'PM',
    },
    {
      id: '2',
      time: '3:00',
      unit: 'PM',
    },
    {
      id: '3',
      time: '3:30',
      unit: 'PM',
    },
    {
      id: '4',
      time: '4:00',
      unit: 'PM',
    },
    {
      id: '5',
      time: '4:30',
      unit: 'PM',
    },
    {
      id: '6',
      time: '5:00',
      unit: 'PM',
    },
    {
      id: '7',
      time: '5:30',
      unit: 'PM',
    },
    {
      id: '8',
      time: '6:00',
      unit: 'PM',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
      name: '',
      avatar: '',
      isCountryCodePickerVisible: false,
      countryCode: '+1',
      countryFlag: 'US',
      phone: '',
      location: '',
      address: '',
      lat: '',
      lng: '',
      selected: '',
      selectedTimeSlot: '',
      sliderValue: 0,
      isSwitchEnabled: false,
      hrFrom: '',
      minFrom: '',
      hrTo: '',
      minTo: '',
      isLoading: false,
      showModal: false,
    };
  }

  componentDidMount() {
    console.log(
      'BBBBBBBBBBAAAAAABBBBBBBBBBAAAAAAAAAARRRRRRRRR =================== ',
      this.props.route.params,
    );
    this.getUserAccessToken();
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => {
      this.getUserProfile();
    });
  };

  getUserProfile = () => {
    const onSuccess = ({data}) => {
      this.toggleIsLoading();
      this.setState({
        avatar: data.data.records.user_profiles.image,
        name: data.data.records.name,
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

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  toggleIsCountryCodePickerVisible = () => {
    this.setState({
      isCountryCodePickerVisible: !this.state.isCountryCodePickerVisible,
    });
  };

  onSelect = (country) => {
    this.setState({
      countryFlag: country.cca2,
      countryCode: country.callingCode[0],
    });
  };

  onDayPress = (day) => {
    console.log('day press===============>>>>', day);
    this.setState(
      {
        selected: day.dateString,
      },
      () => {
        console.log('state callback day press===============>>>>', day);
      },
    );
  };

  selectTimeSlot = (slot) => {
    this.setState({selectedTimeSlot: slot});
  };

  renderTimeSlotItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={
          this.state.selectedTimeSlot === item.time
            ? styles.selectedTimeBG
            : styles.unSelectedTimeBG
        }
        onPress={() => this.selectTimeSlot(item.time)}>
        <RegularTextCB>{item.time}</RegularTextCB>
        <RegularTextCB>{item.unit}</RegularTextCB>
      </TouchableOpacity>
    );
  };

  toggleIsEnabled = () =>
    this.setState({isSwitchEnabled: !this.state.isSwitchEnabled});

  render() {
    return (
      <View style={styles.container}>
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
            <TouchableOpacity
              style={{position: 'absolute', left: SIZES.ten}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image source={Images.arrowBack} style={[styles.iconBack]} />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <View style={styles.circleCard}>
                <Image
                  source={{uri: Constants.imageURL + this.state.avatar}}
                  style={styles.iconUser}
                />
              </View>
              <RegularTextCB style={{fontSize: 14}}>
                {this.state.name}
              </RegularTextCB>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: SIZES.fifteen,
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: Constants.imageURL + this.props.route.params.item.image,
              }}
              style={{height: 35, width: 35, resizeMode: 'contain'}}
            />
            <View style={{marginStart: SIZES.ten}}>
              <RegularTextCB style={{fontSize: 16, color: Colors.black}}>
                {this.props.route.params.item.name}
              </RegularTextCB>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              marginHorizontal: SIZES.fifteen,
            }}>
            <Image
              source={Images.iconCalendar}
              style={{
                width: SIZES.twentyFive,
                height: SIZES.twentyFive,
                resizeMode: 'contain',
              }}
            />
            <Calendar
              firstDay={1}
              minDate={new Date()}
              monthFormat={'MMM yyyy'}
              disabledByDefault={true}
              hideExtraDays
              onDayPress={this.onDayPress}
              markingType={'custom'}
              renderArrow={(direction) =>
                direction === 'left' ? (
                  <Image
                    source={Images.arrowBack}
                    style={{
                      height: SIZES.twenty,
                      width: SIZES.twenty,
                      resizeMode: 'contain',
                    }}
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
                [this.state.selected]: {
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
                textDisabledColor: Colors.navy,
                monthTextColor: Colors.navy,
                dayTextColor: 'red',
                todayTextColor: 'yellow',
                textSectionTitleColor: Colors.navy,
              }}
              style={{
                width: width / 1.15,
                height: height / 2,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              marginHorizontal: SIZES.fifteen,
              marginTop: SIZES.ten * 3,
            }}>
            <Image
              source={Images.iconStopWatchGrey}
              style={{
                width: SIZES.twentyFive,
                height: SIZES.twentyFive,
                resizeMode: 'contain',
              }}
            />
            <View
              style={{
                borderWidth: 2,
                borderRadius: SIZES.ten,
                marginStart: SIZES.twenty,
                borderColor: Colors.sickGreen,
              }}>
              <FlatList
                horizontal
                data={this.timeDurations}
                extraData={this.state.selectedTimeSlot}
                keyExtractor={(timeSlot) => timeSlot.id}
                renderItem={this.renderTimeSlotItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingEnd: SIZES.fifty,
                }}
              />
            </View>
          </View>
          {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: SIZES.fifteen,
            alignSelf: 'flex-end',
            marginTop: SIZES.fifteen,
          }}>
          <RegularTextCB style={{fontSize: 14}}>
            {this.state.sliderValue}
          </RegularTextCB>
          <Slider
            style={{
              width: width / 1.3,
              height: 55,
              marginStart: SIZES.ten,
            }}
            minimumValue={0}
            maximumValue={340}
            minimumTrackTintColor={Colors.silver}
            maximumTrackTintColor={Colors.silver}
            thumbImage={Images.sliderThumb}
            onValueChange={(number) =>
              this.setState({sliderValue: parseInt(number)})
            }
          />
        </View> */}
          <Text
            style={[
              FONTS.mediumFont16,
              {marginHorizontal: SIZES.fifteen, marginTop: SIZES.fifteen * 1.8},
            ]}>
            Add Custom Time
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: SIZES.fifteen,
              flex: 1,
              marginTop: SIZES.fifteen,
            }}>
            <View
              style={[
                styles.card,
                {borderWidth: 2, borderColor: Colors.sickGreen, flex: 1},
              ]}>
              <View style={{alignItems: 'center'}}>
                <RegularTextCB style={{fontSize: 12, color: Colors.coolGrey}}>
                  From
                </RegularTextCB>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    placeholderTextColor={Colors.black}
                    placeholder={'Hr'}
                    style={styles.textInput}
                    maxLength={2}
                    value={this.state.hrFrom}
                    keyboardType={'numeric'}
                    onChangeText={(text) =>
                      this.setState({hrFrom: text.replace(/[^0-9]/g, '')})
                    }
                  />
                  <TextInput
                    placeholderTextColor={Colors.black}
                    placeholder={'Min'}
                    style={styles.textInput}
                    maxLength={2}
                    keyboardType={'numeric'}
                    value={this.state.minFrom}
                    onChangeText={(text) =>
                      this.setState({minFrom: text.replace(/[^0-9]/g, '')})
                    }
                  />
                </View>
              </View>
            </View>
            <View
              style={[
                styles.card,
                {borderWidth: 2, borderColor: Colors.sickGreen, flex: 1},
              ]}>
              <View style={{alignItems: 'center'}}>
                <RegularTextCB style={{fontSize: 12, color: Colors.coolGrey}}>
                  To
                </RegularTextCB>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    placeholderTextColor={Colors.black}
                    placeholder={'Hr'}
                    placeholderTextColor={Colors.black}
                    style={styles.textInput}
                    maxLength={2}
                    value={this.state.hrTo}
                    keyboardType={'numeric'}
                    onChangeText={(text) =>
                      this.setState({hrTo: text.replace(/[^0-9]/g, '')})
                    }
                  />
                  <TextInput
                    placeholderTextColor={Colors.black}
                    placeholder={'Min'}
                    style={styles.textInput}
                    maxLength={2}
                    value={this.state.hrMin}
                    keyboardType={'numeric'}
                    onChangeText={(text) =>
                      this.setState({hrMin: text.replace(/[^0-9]/g, '')})
                    }
                  />
                </View>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.textInputContainer,
              {marginTop: SIZES.fifteen, flexDirection: 'column'},
            ]}>
            <RegularTextCB style={[FONTS.mediumFont14, {color: Colors.black}]}>
              Phone
            </RegularTextCB>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.toggleIsCountryCodePickerVisible()}
                style={[
                  styles.card,
                  {
                    borderRadius: SIZES.ten,
                    height: 60,
                    padding: SIZES.ten,
                    marginEnd: SIZES.ten,
                    flex: 0,
                    justifyContent: 'center',
                    alignContent: 'center',
                  },
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
              </TouchableOpacity>
              <EditText
                ref={'phone'}
                keyboardType="phone-pad"
                placeholder={'12345678'}
                value={this.state.phone}
                onChangeText={(text) => {
                  this.setState({phone: text});
                }}
                style={[styles.textInput, {flex: 1}]}
              />
            </View>
          </View>
          <View
            style={[
              {marginTop: SIZES.twenty, marginHorizontal: SIZES.fifteen},
            ]}>
            <RegularTextCB style={[FONTS.mediumFont14, {color: Colors.black}]}>
              Location
            </RegularTextCB>
            <View style={[styles.card, {marginTop: 10, marginHorizontal: 5}]}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showModal: true,
                  });
                }}>
                <RegularTextCB numberOfLines={1}>
                  {this.state.location
                    ? this.state.location
                    : 'Search Location'}
                </RegularTextCB>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              {marginTop: SIZES.twenty, marginHorizontal: SIZES.fifteen},
            ]}>
            <RegularTextCB style={[FONTS.mediumFont14, {color: Colors.black}]}>
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
          <View>
            <Text
              style={[
                FONTS.mediumFont14,
                {
                  paddingHorizontal: SIZES.fifteen,
                  marginVertical: SIZES.twenty,
                },
              ]}>
              Description
            </Text>
            <View style={{paddingHorizontal: SIZES.fifteen}}>
              <MessageEditText
                placeholder={'Write'}
                height={SIZES.twentyFive * 4.5}
              />
            </View>
          </View>

          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: SIZES.fifteen,
              marginVertical: SIZES.fifteen * 1.6,
            }}>
            <Image
              source={Images.barHome}
              style={{
                height: SIZES.twentyFive,
                width: SIZES.twentyFive,
                resizeMode: 'contain',
                tintColor: Colors.coolGrey,
              }}
            />
            <View style={{marginHorizontal: SIZES.ten, flex: 1}}>
              <RegularTextCB style={{fontSize: 16, color: Colors.black}}>
                Get service at home
              </RegularTextCB>
              <RegularTextCB style={{fontSize: 14, color: Colors.coolGrey}}>
                Set this service at my place
              </RegularTextCB>
            </View>
            <Switch
              trackColor={{
                false: Colors.lightGrey,
                true: Colors.lighNewGreen,
              }}
              thumbColor={
                this.state.isSwitchEnabled ? Colors.sickGreen : Colors.sickGreen
              }
              ios_backgroundColor={Colors.lightGrey}
              onValueChange={this.toggleIsEnabled}
              value={this.state.isSwitchEnabled}
            />
          </View> */}
          <View
            style={{
              marginVertical: SIZES.ten * 3,
              marginHorizontal: SIZES.fifteen,
            }}>
            <ButtonRadius10
              label="NEXT"
              bgColor={Colors.sickGreen}
              onPress={() =>
                this.props.navigation.navigate(Constants.bookingConfirmed)
              }
            />
          </View>
        </ScrollView>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
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
  card: {
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    padding: SIZES.twenty,
    margin: SIZES.ten,
    borderColor: Colors.sickGreen,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  circleCard: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    borderRadius: SIZES.twentyFive,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  selectedDateBG: {
    height: SIZES.ten * 3,
    width: SIZES.ten * 3,
    padding: 2,
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
  selectedTimeBG: {
    paddingHorizontal: SIZES.fifteen,
    paddingVertical: SIZES.fifteen,
    marginHorizontal: SIZES.five,
    marginVertical: SIZES.five,
    backgroundColor: Colors.sickGreen,
    borderRadius: SIZES.fifteen,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    alignItems: 'center',
    elevation: SIZES.ten,
    marginBottom: SIZES.fifteen,
  },
  unSelectedTimeBG: {
    paddingHorizontal: SIZES.fifteen,
    paddingVertical: SIZES.fifteen,
    borderRadius: SIZES.fifteen,
    marginHorizontal: SIZES.five,
    marginVertical: SIZES.five,
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginBottom: SIZES.fifteen,
  },
  iconUser: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    borderRadius: SIZES.fifty * 2,
    resizeMode: 'contain',
  },
  textInputContainer: {
    flexDirection: 'row',
    marginHorizontal: SIZES.fifteen,
  },
  textInput: {
    fontSize: 16,
    fontFamily: Constants.fontBold,
    color: Colors.black,
    borderColor: Colors.sickGreen,
    borderBottomWidth: SIZES.five,
    margin: SIZES.five,
    flex: 1,
    textAlign: 'center',
  },
  selector: {
    backgroundColor: Colors.sickGreen,
    borderRadius: SIZES.ten,
    flex: 1,
  },
  unselector: {
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    flex: 1,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
