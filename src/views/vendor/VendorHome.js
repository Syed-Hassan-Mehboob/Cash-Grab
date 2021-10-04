import React, {Component} from 'react';
import {
  FlatList,
  Image,
  LogBox,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import ButtonRadius10 from '../../components/ButtonRadius10';
import EditText from '../../components/EditText';
import Constants, {FONTS, SIZES, STYLES} from '../../common/Constants';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import Colors from '../../common/Colors';
import LightTextCB from '../../components/LightTextCB';
import utils from '../../utils';
import Axios from '../../network/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import ListComponent from '../../components/ListComponent';
import Geolocation from '@react-native-community/geolocation';
import BoldTextCB from '../../components/BoldTextCB';
import Modal from 'react-native-modal';

export default class VendorHome extends Component {
  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      categories: [],
      accessToken: '',
      jobAround: [],
      avatar: '',
      name: '',
      currentLat: '',
      currentLong: '',
      permissionModalVisibility: false,
    };
  }

  componentDidMount() {
    console.log('Vendor Home ===== ');
    this.getUserAccessToken();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.props.navigation.addListener('focus', () => {
      // this.checkLocationPermission();
      this.getUserAccessToken();
    });
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, async () => {
      this.getUserProfile();
      this.getJobAroundYou();
      this.getCategories();
    });
  };

  getCategories = () => {
    const onSuccess = ({data}) => {
      //console.log('All Category ================', data.data.records);

      this.setState({isLoading: false, categories: data.data.records});
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    this.setState({isLoading: true});

    let params = {
      limit: 2,
    };

    Axios.get(Constants.getVenderAllCategory, {
      // params: params,
      headers: {Authorization: this.state.accessToken},
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getUserProfile = async () => {
    const onSuccess = ({data}) => {
      this.setState({
        isLoading: false,
        avatar: data.data.records.userProfile.image,
        name: data.data.records.name,
      });
      // this.getJobAroundYou(latitude, longitude, token);
    };

    // //console.log('lat',this.state.lat)

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    this.setState({isLoading: true});
    Axios.get(Constants.getProfileURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getJobAroundYou = async () => {
    // let params = {
    //   lat: this.state.currentLat,
    //   lng: this.state.currentLong,
    // };

    this.setState({isLoading: true});
    const onSuccess = ({data}) => {
      //console.log(' Job for You =====', data);
      // utils.showToast(data.message)
      this.setState({
        isLoading: false,
        jobAround: data.data.records,
      });
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
      //console.log('==================Error', error);
    };

    Axios.get(Constants.getAllJobs, {
      params: {
        limit: 1,
        offset: 0,
      },
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  checkLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.props.navigation.navigate(Constants.venderFilter);
      } else {
        // ////console.log('location permission denied');
        this.setState({permissionModalVisibility: true});
      }
    } catch (err) {
      ////console.log('getLocation catch: ==================> ', err);
    }
  };

  renderCategoryItem = ({item}) => {
    // //console.log('All Category Home ite======',item);

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(Constants.vendorSingleCategory, {
            image: item.image,
            name: item.name,
            item: item.id,
          });
        }}
        style={{
          alignItems: 'center',
          paddingHorizontal: SIZES.ten,
          paddingVertical: SIZES.five,
        }}>
        <Image
          style={styles.circle}
          source={{uri: Constants.imageURL + item.image}}
        />
        <RegularTextCB
          style={{
            fontSize: 14,
            marginTop: SIZES.ten,
            color: Colors.coolGrey,
          }}>
          {item.name}
        </RegularTextCB>
      </TouchableOpacity>
    );
  };

  renderJobsForYouItem = ({item}) => {
    // //console.log('Job Around data ======',item)
    return <ListComponent item={item} />;
  };

  render() {
    return (
      <>
        <ScrollView
          style={STYLES.container}
          showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                paddingHorizontal: SIZES.twenty,
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() =>
                  this.props.navigation.navigate(Constants.vendorProfile)
                }>
                <View style={styles.circleCard}>
                  <Image
                    source={{uri: Constants.imageURL + this.state.avatar}}
                    style={styles.iconUser}
                    resizeMode="cover"
                  />
                </View>
                <RegularTextCB style={{fontSize: 16, marginStart: SIZES.ten}}>
                  Welcome,
                </RegularTextCB>
                <RegularTextCB
                  style={[FONTS.boldFont18, {color: Colors.black}]}>
                  {this.state.name}
                </RegularTextCB>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => {
                  this.checkLocationPermission();
                }}
                style={{position: 'absolute', right: SIZES.twenty}}>
                <Image
                  source={Images.iconHamburger}
                  style={{
                    height: SIZES.twenty,
                    width: SIZES.twenty,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity> */}
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
            {/* <View
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
                  this.props.navigation.navigate(Constants.vendorAllCategories)
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
              keyExtractor={(item) => item.id}
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
            /> */}
            <View
              style={{
                paddingHorizontal: SIZES.twenty,
                paddingVertical: SIZES.twenty,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RegularTextCB style={[FONTS.boldFont18, {color: Colors.black}]}>
                Jobs For You
              </RegularTextCB>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(Constants.vendorAllJobs, {
                    accessToken: this.state.accessToken,
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

            <View style={{paddingHorizontal: SIZES.twenty}}>
              <FlatList
                data={this.state.jobAround}
                // horizontal
                keyExtractor={(item) => item.id}
                renderItem={this.renderJobsForYouItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: SIZES.twentyFive,
                }}
              />
            </View>

            <View
              style={{
                paddingHorizontal: SIZES.twenty,
                paddingVertical: SIZES.twenty,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RegularTextCB style={[FONTS.boldFont18, {color: Colors.black}]}>
                Quick Job
              </RegularTextCB>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(Constants.VendorQuickJob);
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

            <View style={{paddingHorizontal: SIZES.twenty}}>
              <FlatList
                data={this.state.jobAround}
                // horizontal
                keyExtractor={(item) => item.id}
                renderItem={this.renderJobsForYouItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: SIZES.twentyFive,
                }}
              />
            </View>

            <View
              style={{
                paddingHorizontal: SIZES.twenty,
                paddingVertical: SIZES.twenty,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RegularTextCB style={[FONTS.boldFont18, {color: Colors.black}]}>
                Bookings
              </RegularTextCB>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(Constants.VenderBookings, {});
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

            <View style={{paddingHorizontal: SIZES.twenty}}>
              <FlatList
                data={this.state.jobAround}
                // horizontal
                keyExtractor={(item) => item.id}
                renderItem={this.renderJobsForYouItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: SIZES.twentyFive * 3.5,
                  //   alignItems: 'center',
                }}
              />
            </View>
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
          <View
            style={{
              backgroundColor: Colors.navy,
              padding: SIZES.fifteen,
            }}>
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
      </>
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
    height: SIZES.fifty + SIZES.twenty,
  },
  textInput: {
    fontSize: SIZES.fifteen + 1,
    flex: 1,
    color: Colors.black1,
  },
  iconUser: {
    height: SIZES.fifty + SIZES.ten,
    width: SIZES.fifty + SIZES.ten,
    borderRadius: SIZES.fifty + SIZES.ten / 2,
    resizeMode: 'contain',
  },
  circle: {
    height: SIZES.ten * 8,
    width: SIZES.ten * 8,
    borderRadius: SIZES.ten * 8,
  },
  circleCard: {
    height: SIZES.fifty + SIZES.ten,
    width: SIZES.fifty + SIZES.ten,
    borderRadius: SIZES.twenty + SIZES.ten,
    // shadowColor: '#c5c5c5',
    // shadowOffset: {width: SIZES.five, height: SIZES.five},
    // shadowOpacity: 0.15,
    // shadowRadius: SIZES.five,
    // elevation: SIZES.five,
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
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
