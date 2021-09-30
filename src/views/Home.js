import React, {Component} from 'react';
import RegularTextCB from '../components/RegularTextCB';
import Images from '../common/Images';
import Colors from '../common/Colors';
import {
  FlatList,
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  PermissionsAndroid,
  Text,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import Constants, {FONTS, height, SIZES, width} from '../common/Constants';
import Axios from '../network/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BoldTextCB from '../components/BoldTextCB';
import Geolocation from '@react-native-community/geolocation';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isQuickServiceModalVisible: false,
      isSelectionModalVisible: false,
      permissionModalVisibility: false,
      accessToken: '',
      service: 'Select',
      avatar: '',
      name: '',
      rateRequested: '',
      location: '',
      address: '',
      exactTime: '',
      vendorAround: [],
      topServices: [],
      selections: [],
      categories: [],
      startTime: '08:55',
      isDatePickerVisible: false,
      showModal: false,
      lat: '',
      long: '',
      seeAllClicked: false,
      servicesid: [],
      currentLat: '',
      currentLong: '',
    };
  }

  componentDidMount() {
    this.checkLocationPermission();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    this.props.navigation.addListener('focus', () => {
      // this.getUserAccessToken();
      this.checkLocationPermission();
    });
  }

  //  Check user Location Permssion
  checkLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        this.getLocation();
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          if (this.state.seeAllClicked) {
            // this.getLocation();
            // this.getUserAccessToken();
            this.openNearbyScreen();
          } else {
            this.getLocation();
            this.getUserAccessToken();
          }
        } else {
          this.setState({permissionModalVisibility: true});
        }
      }
    } catch (err) {
      console.log('getLocation catch: ==================> ', err);
    }
  };

  //  Get user Location
  getLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('======Geolocation ', position.coords.longitude);
        this.setState({
          currentLat: position.coords.latitude,
          currentLong: position.coords.longitude,
        });
        this.getUserAccessToken();
      },
      (error) => {
        console.log('Home Screen Get Location error ', error);
        this.getUserAccessToken();
      },
    );
  };

  // Get Access Token
  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => {
      this.getCategories();
      this.getVendorAroundYou();
    });
  };

  // Get All Categories Api
  getCategories = () => {
    const onSuccess = ({data}) => {
      this.setState({isLoading: false, categories: data.data.records});
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
    };

    Axios.get(Constants.customerCategoriesURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  // Get Vendor Arround You Api
  getVendorAroundYou = () => {
    const onSuccess = ({data}) => {
      this.setState({
        isLoading: false,
        vendorAround: data.data,
      });
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
    };

    let params = {
      latitude: Number(this.state.currentLat),
      longitude: Number(this.state.currentLong),
      limit: 4,
    };

    Axios.get(Constants.getvendorAround, {
      params,
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  openNearbyScreen = () => {
    this.setState({seeAllClicked: false}, () => {
      this.props.navigation.navigate(Constants.nearby, {
        avatar: this.state.avatar,
      });
    });
  };

  // getUserProfile = () => {
  //   this.setState({isLoading: true});
  //   const onSuccess = ({data}) => {
  //     this.setState({
  //       isLoading: false,
  //       avatar: data.data.records.userProfile.image,
  //       name: data.data.records.name,
  //     });
  //     let latitude = data.data.records.userProfile.latitude;
  //     let longitude = data.data.records.userProfile.longitude;
  //     // this.getVendorAroundYou(latitude, longitude);
  //   };

  //   const onFailure = (error) => {
  //     this.setState({isLoading: false});
  //   };

  //   Axios.get(Constants.getProfileURL, {
  //     headers: {
  //       Authorization: this.state.accessToken,
  //     },
  //   })
  //     .then(onSuccess)
  //     .catch(onFailure);
  // };

  // getTopServices = () => {
  //   const onSuccess = ({data}) => {
  //     this.setState({
  //       isLoading: false,
  //       topServices: data.data.records,
  //     });
  //   };

  //   const onFailure = (error) => {
  //     this.setState({isLoading: false});
  //   };

  //   // this.setState({isLoading: true});

  //   let params = {
  //     limit: SIZES.ten,
  //   };
  //   Axios.get(Constants.getTopSerVices, {
  //     params,
  //     headers: {Authorization: this.state.accessToken},
  //   })
  //     .then(onSuccess)
  //     .catch(onFailure);
  // };

  renderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate(Constants.singleCategory, {
            item: item,
          })
        }
        style={{alignItems: 'center', marginLeft: SIZES.ten}}>
        <Image
          style={styles.circle}
          source={{uri: Constants.imageURL + item.image}}
        />
        <RegularTextCB
          style={{
            fontSize: 14,
            marginTop: SIZES.five,
            color: Colors.coolGrey,
          }}>
          {item.name}
        </RegularTextCB>
      </TouchableOpacity>
    );
  };

  formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }

    return data;
  };

  renderVendorsAroundYouItem = ({item}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          {
            padding: SIZES.ten,
            marginHorizontal: SIZES.fifteen,
            marginTop: SIZES.ten,
          },
        ]}
        onPress={() => {
          this.props.navigation.navigate(Constants.viewVendorProfile, {
            item: item.id,
          });
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: Constants.imageURL + item.image}}
            style={{
              height: width * 0.12,
              width: width * 0.12,
              borderRadius: width * 0.12,
            }}
            resizeMode="cover"
          />
          {/* <View style={styles.circleCard}>
   
          </View> */}
          <RegularTextCB
            style={{
              color: Colors.black,
              textDecorationLine: 'underline',
              marginStart: SIZES.five,
              fontSize: 14,
            }}>
            View Profile
          </RegularTextCB>
        </View>
        <RegularTextCB
          style={{
            color: Colors.black,
            marginTop: SIZES.ten,
            fontSize: 14,
          }}>
          {item.name}
        </RegularTextCB>

        <View style={{flexDirection: 'row', marginTop: SIZES.five}}>
          <Image
            source={Images.iconVerified}
            style={{
              height: SIZES.fifteen,
              width: SIZES.fifteen,
              resizeMode: 'contain',
              tintColor:
                item.email_verified_at !== null ? Colors.turqoiseGreen : 'red',
            }}
          />
          <RegularTextCB
            style={{
              color: Colors.turqoiseGreen,
              fontSize: 12,
              marginStart: SIZES.five,
            }}>
            {item.email_verified_at !== null ? 'Verified' : 'Unverified'}
          </RegularTextCB>
        </View>
        <RegularTextCB
          style={{
            color: Colors.coolGrey,
            marginTop: SIZES.five,
          }}>
          {item.categroy}
        </RegularTextCB>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={Images.star}
            style={{
              height: SIZES.fifteen,
              width: SIZES.fifteen,
              resizeMode: 'contain',
              tintColor: Colors.orangeYellow,
            }}
          />
          <RegularTextCB
            style={{
              fontSize: 14,
              color: Colors.orangeYellow,
              marginStart: 2,
            }}>
            1.0 ratings
          </RegularTextCB>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',

                marginTop:
                  Platform.OS === 'android' ? SIZES.twenty : SIZES.ten * 6,
              }}>
              <TouchableOpacity
                style={{
                  padding: 20,
                }}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image
                  source={Images.arrowBack}
                  style={{
                    tintColor: Colors.black1,
                    width: SIZES.fifteen * 1,
                    height: SIZES.fifteen * 1,
                  }}
                />
              </TouchableOpacity>

              <RegularTextCB style={[{fontSize: 22}]}>Explore</RegularTextCB>

              <TouchableOpacity
                style={{
                  padding: 12,
                }}
                onPress={() => {
                  this.props.navigation.navigate(Constants.filter);
                }}>
                <Image
                  source={Images.iconHamburger}
                  resizeMode="contain"
                  style={{
                    width: SIZES.fifteen * 1.5,
                    height: SIZES.fifteen * 1.5,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(Constants.filter);
              }}
              style={{}}>
              <Image
                source={Images.iconHamburger}
                style={{
                  height: SIZES.twenty,
                  width: SIZES.twenty,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                paddingHorizontal: SIZES.twenty,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RegularTextCB
                style={{
                  color: Colors.black,
                  textDecorationLine: 'underline',
                }}>
                See All
              </RegularTextCB>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(Constants.allCategories)
                }>
                <RegularTextCB
                  style={{
                    color: Colors.black,
                    textDecorationLine: 'underline',
                  }}>
                  See All
                </RegularTextCB>
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal
              data={this.state.categories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={this.renderCategoryItem}
              showsHorizontalScrollIndicator={false}
              contentInset={{
                // for ios
                top: 0,
                bottom: 0,
                left: SIZES.ten,
                right: SIZES.ten,
              }}
              contentContainerStyle={{
                // for android
                paddingHorizontal: Platform.OS === 'android' ? SIZES.ten : 0,
              }}
            />

            <View
              style={{
                paddingHorizontal: SIZES.twenty,
                paddingTop: SIZES.twenty,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RegularTextCB
                style={{
                  color: Colors.black,
                  textDecorationLine: 'underline',
                }}>
                See All
              </RegularTextCB>
              <TouchableOpacity
                onPress={() => {
                  this.setState({seeAllClicked: true}, () => {
                    this.checkLocationPermission();
                  });
                }}>
                <RegularTextCB
                  style={{
                    color: Colors.black,
                    textDecorationLine: 'underline',
                  }}>
                  See All
                </RegularTextCB>
              </TouchableOpacity>
            </View>

            <FlatList
              numColumns={2}
              // horizontal
              data={this.formatData(this.state.vendorAround, 2)}
              keyExtractor={(index) => index}
              renderItem={this.renderVendorsAroundYouItem}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{flex: 1, alignItems: 'center', paddingTop: 100}}>
                    <Text style={FONTS.mediumFont18}>Vendor Not Found</Text>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Modal
          isVisible={this.state.permissionModalVisibility}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <View style={{backgroundColor: Colors.navy, padding: SIZES.fifteen}}>
            <BoldTextCB style={[{color: Colors.white, fontSize: 22}]}>
              CashGrab
            </BoldTextCB>
            <RegularTextCB
              style={{
                marginVertical: SIZES.ten,
                fontSize: 16,
                color: Colors.white,
              }}>
              Please enable your location to see nearby vendors...
            </RegularTextCB>
            <View
              style={{
                marginTop: SIZES.ten,
                alignSelf: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({permissionModalVisibility: false});
                }}
                style={{
                  padding: SIZES.ten,
                  width: SIZES.fifty,
                  alignItems: 'center',
                  borderRadius: SIZES.fifteen,
                  marginTop: SIZES.ten,
                  backgroundColor: Colors.white,
                }}>
                <RegularTextCB style={{color: Colors.navy}}>Ok</RegularTextCB>
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
  textInputContainer: {
    marginHorizontal: SIZES.ten,
    height: SIZES.ten * 7,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    color: Colors.black1,
  },
  iconUser: {
    height: '100%',
    width: '100%',
    // borderRadius: SIZES.ten*6 / 2,
  },
  circle: {
    height: SIZES.ten * 8,
    width: SIZES.ten * 8,
  },
  circleCard: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: SIZES.ten * 3,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
    overflow: 'hidden',
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
    margin: SIZES.five - 3,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.sickGreen,
    borderRadius: SIZES.fifteen - 3,
  },
  unselectedFilter: {
    alignItems: 'center',
    paddingVertical: SIZES.ten,
    margin: SIZES.five - 3,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: SIZES.fifteen - 3,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },

  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    // height: Dimensions.get('window').width / 2, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    padding: SIZES.ten,
    marginHorizontal: SIZES.fifteen,
    marginBottom: SIZES.twenty,
    marginTop: SIZES.five,
  },
});
