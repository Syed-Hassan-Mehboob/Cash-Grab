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
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import Constants, {height, SIZES, width} from '../common/Constants';
import Axios from '../network/APIKit';
import utils from '../utils';
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
    console.log('User Home ===== ');

    this.checkLocationPermission();

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    this.props.navigation.addListener('focus', () => {
      // this.getUserAccessToken();
      this.checkLocationPermission();
    });
  }

  getLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        // _map.current.animateToRegion(
        //   {
        //     longitude: Number(position.coords.latitude),
        //     latitude: Number(position.coords.longitude),
        //     latitudeDelta: 0.002,
        //     longitudeDelta: 0.002,
        //   },
        //   1500,
        // );

        console.log('======Geolocation ', position.coords);

        this.setState({
          currentLat: position.coords.latitude,
          currentLong: position.coords.longitude,
        });

        // //console.log('humzaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      },
      (error) => {
        // //console.log(
        //   'BBBBBBBBBBBAAAAAAAAAAAAABBBBBBBBBBBBAAAAAAAAAAAARRRRRRRRRRRRR: error => ',
        //   error,
        // );
      },
    );

    // watchID = Geolocation.watchPosition((position) => {
    //   const lastPosition = JSON.stringify(position);
    //   ////console.log('humzaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    // });
  };

  checkLocationPermission = async () => {
    try {
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
        // ////console.log('location permission denied');
        this.setState({permissionModalVisibility: true});
      }
    } catch (err) {
      ////console.log('getLocation catch: ==================> ', err);
    }
  };

  openNearbyScreen = () => {
    this.setState({seeAllClicked: false}, () => {
      this.props.navigation.navigate(Constants.nearby, {
        avatar: this.state.avatar,
      });
    });
  };

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => {
      this.getUserProfile();
      this.getCategories();
      this.getTopServices();
      // //console.log(
      //   'coordinates',
      //   this.state.currentLat,
      //   ' =============>>>>',
      //   this.state.currentLong,
      // );
      this.getVendorAroundYou();
    });
  };

  getUserProfile = () => {
    this.setState({isLoading: true});
    const onSuccess = ({data}) => {
      this.setState({
        isLoading: false,
        avatar: data.data.records.userProfile.image,
        name: data.data.records.name,
      });
      let latitude = data.data.records.userProfile.latitude;
      let longitude = data.data.records.userProfile.longitude;
      // this.getVendorAroundYou(latitude, longitude);
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    Axios.get(Constants.getProfileURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getCategories = () => {
    const onSuccess = ({data}) => {
      this.setState({isLoading: false, categories: data.data.records});
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    // this.setState({isLoading: true});
    Axios.get(Constants.customerCategoriesURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getVendorAroundYou = () => {
    const onSuccess = ({data}) => {
      this.setState({
        isLoading: false,
        vendorAround: data.data,
      });
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    let params = {
      latitude: Number(this.state.currentLat),
      longitude: Number(this.state.currentLong),
      limit: 4,
    };

    // console.log('vender Around you Params ', params);

    Axios.get(Constants.getvendorAround, {
      params,
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getTopServices = () => {
    const onSuccess = ({data}) => {
      this.setState({
        isLoading: false,
        topServices: data.data.records,
      });
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    // this.setState({isLoading: true});

    let params = {
      limit: SIZES.ten,
    };
    Axios.get(Constants.getTopSerVices, {
      params,
      headers: {Authorization: this.state.accessToken},
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  renderCategoryItem = ({item}) => {
    // ////console.log('Catagory Item ====',item)
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

  renderVendorsAroundYouItem = ({item}) => {
    // ////console.log('Vender item ======', item);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          {
            padding: SIZES.ten,
            marginHorizontal: SIZES.fifteen,
            marginBottom: SIZES.twenty,
            marginTop: SIZES.five,
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
            1.0
          </RegularTextCB>
        </View>
      </TouchableOpacity>
    );
  };

  renderUrgentServicesItem = ({item}) => {
    // ////console.log('Urgent Services =======',item.userProfile)
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          {
            height: SIZES.ten * 20,
            padding: SIZES.ten,
            marginHorizontal: SIZES.ten,
            marginTop: SIZES.five,
            marginBottom: SIZES.ten * 4,
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
          <View style={styles.circleCard}>
            <Image
              source={{uri: Constants.imageURL + item.userProfile.image}}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
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
        <RegularTextCB
          style={{
            color: Colors.coolGrey,
          }}>
          {item.userProfile.bio}
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
            {item.ratings}
          </RegularTextCB>
        </View>
        <Image
          source={Images.circularArrowForward}
          style={{
            height: SIZES.fifty,
            width: SIZES.fifty,
            position: 'absolute',
            bottom: -SIZES.twentyFive,
            alignSelf: 'center',
          }}
        />
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
                paddingHorizontal: SIZES.twenty,
                marginTop:
                  Platform.OS === 'android' ? SIZES.twenty : SIZES.ten * 6,
              }}>
              <TouchableOpacity
                style={{
                  width: SIZES.fifteen * 1,
                  height: SIZES.fifteen * 1,
                }}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image
                  source={Images.arrowBack}
                  style={[
                    styles.iconBack,
                    {
                      tintColor: Colors.black1,
                      width: SIZES.fifteen * 1,
                      height: SIZES.fifteen * 1,
                    },
                  ]}
                />
              </TouchableOpacity>

              <RegularTextCB style={{fontSize: SIZES.ten * 3}}>
                Explore
              </RegularTextCB>

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
            </View>
            <TouchableOpacity
              style={{
                marginVertical: SIZES.ten,
                paddingHorizontal: SIZES.twenty,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate(Constants.search)}>
              <RegularTextCB style={{fontSize: 16, color: Colors.coolGrey}}>
                Search Service...
              </RegularTextCB>
              <Image
                source={Images.iconSearch}
                style={{height: SIZES.fifty, width: SIZES.fifty}}
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
                  fontSize: SIZES.twenty,
                  color: Colors.black,
                }}>
                Browse categories
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
                  fontSize: SIZES.twenty,
                  color: Colors.black,
                }}>
                Vendors Around You
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
              data={this.state.vendorAround}
              keyExtractor={(item) => item.id.toString()}
              renderItem={this.renderVendorsAroundYouItem}
              showsHorizontalScrollIndicator={false}
            />
            <RegularTextCB
              style={{
                fontSize: SIZES.twenty,
                marginTop: SIZES.ten,
                paddingHorizontal: SIZES.twenty,
              }}>
              Top Services
            </RegularTextCB>
            <FlatList
              style={{paddingBottom: SIZES.ten * 10}}
              numColumns={2}
              data={this.state.topServices}
              keyExtractor={(item) => item.id.toString()}
              renderItem={this.renderUrgentServicesItem}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            padding: SIZES.ten,
            backgroundColor: Colors.navy,
            borderRadius: SIZES.ten,
            position: 'absolute',
            bottom: SIZES.fifteen,
            right: SIZES.fifteen,
          }}
          onPress={() => {
            this.props.navigation.navigate(Constants.QuickNotify);
          }}>
          <RegularTextCB style={{color: Colors.white}}>
            Quick Service
          </RegularTextCB>
        </TouchableOpacity>
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
});

vendors = [
  {
    id: '1',
    image: Images.emp1,
    title: 'Ray Hammond',
    type: 'Car Mechanic, NY (2km)',
    ratings: '1.0',
  },
  {
    id: '2',
    image: Images.emp2,
    title: 'Jay Almond',
    type: 'Car Wash, NY (1km)',
    ratings: '1.1',
  },
  {
    id: '3',
    image: Images.emp3,
    title: 'Ray Hammond',
    type: 'Puncture, NY (1.2km)',
    ratings: '1.2',
  },
  {
    id: '4',
    image: Images.emp4,
    title: 'Jay Almond',
    type: 'Plumber, NY (0.2km)',
    ratings: '1.3',
  },
  {
    id: 'SIZES.five',
    image: Images.emp1,
    title: 'Ray Hammond',
    type: 'Bike Electrician, NY (0.5km)',
    ratings: '1.4',
  },
];

urgentServices = [
  {
    id: '1',
    image: Images.emp1,
    name: 'Ray Hammond',
    title: 'Home Renovation',
    type: 'Lorem ipsum',
    ratings: '1.0',
  },
  {
    id: '2',
    image: Images.emp2,
    name: 'Ray Hammond',
    title: 'Car Mechanic',
    type: 'Lorem ipsum',
    ratings: '1.0',
  },
  {
    id: '3',
    image: Images.emp3,
    name: 'Ray Hammond',
    title: 'Home Renovation',
    type: 'Lorem ipsum',
    ratings: '1.0',
  },
  {
    id: '4',
    image: Images.emp1,
    name: 'Ray Hammond',
    title: 'Car Mechanic',
    type: 'Lorem ipsum',
    ratings: '1.0',
  },
  {
    id: 'SIZES.five',
    image: Images.emp2,
    name: 'Ray Hammond',
    title: 'Home Renovation',
    type: 'Lorem ipsum',
    ratings: '1.0',
  },
  {
    id: '6',
    image: Images.emp1,
    name: 'Ray Hammond',
    title: 'Car Mechanic',
    type: 'Lorem ipsum',
    ratings: '1.0',
  },
];
