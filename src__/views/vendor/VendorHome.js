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
  Text,
} from 'react-native';
import ButtonRadius10 from '../../components/ButtonRadius10';
import EditText from '../../components/EditText';
import Constants, {
  FIREBASECONSTANTS,
  FONTS,
  SIZES,
  STYLES,
} from '../../common/Constants';
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
import {StatusBar} from 'react-native';

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
      scheduleBookings: [],
      ordrStatus: '',
      isVendor: false,
      quickOrder: [],
    };
  }

  componentDidMount() {
    // console.log('Vendor Home ===== ');
    this.getUserAccessToken();
    this.getUserType();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.props.navigation.addListener('focus', () => {
      // this.checkLocationPermission();
      this.getUserAccessToken();
      this.getUserType();
    });
  }

  getUserType = async () => {
    const user = await AsyncStorage.getItem('user');
    var userData = JSON.parse(user);
    this.setState({isVendor: userData.type === 'vendor'}, () => {
      console.log('userType: ', this.state.isVendor),
        this.setState({gotUser: true});
    });
  };

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    // console.log('access token============>>>', token);
    this.setState({accessToken: token}, async () => {
      this.getUserProfile(token);
      this.getJobAroundYou();
      this.getBookings();
      this.getQuickOrder();
    });
  };

  getUserProfile = async (token) => {
    const onSuccess = ({data}) => {
      // console.log(
      //   'get profile success===========>>>>',
      //   data.data.records.user_profiles.image,
      // );
      this.setState({
        isLoading: false,
        avatar: data.data.records.user_profiles.image,
        name: data.data.records.name,
      });
      // this.getJobAroundYou(latitude, longitude, token);
    };

    // //console.log('lat',this.state.lat)

    const onFailure = (error) => {
      // console.log('get profile success===========>>>>', error);

      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    this.setState({isLoading: true});
    Axios.get(Constants.getProfileURL, {
      headers: {
        Authorization: token,
        // Authorization: this.state.accessToken,
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

    const onSuccess = ({data}) => {
      // console.log(' Job for You =====', data);
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
    this.setState({isLoading: true});
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

  getQuickOrder = async () => {
    const onSuccess = ({data}) => {
      // console.log(' Quick Jobs for You =====', data.data.records);
      // utils.showToast(data.message)
      this.setState({
        isLoading: false,
        quickOrder: data.data.records,
      });
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
      //console.log('==================Error', error);
    };
    this.setState({isLoading: true});
    Axios.get(Constants.quickJobsVendor, {
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

  getBookings = async () => {
    const onSuccess = ({data}) => {
      // console.log(' Schedule Bookings  =====', data.data.records);
      this.setState({
        scheduleBookings: data.data.records,
      });
      // utils.showToast(data.message)
      this.setState({
        isLoading: false,
      });
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
      // console.log('==================Error', error);
    };

    this.setState({isLoading: true});

    Axios.get(Constants.getScheduleBookings, {
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

  getQuickJobDetails = (id) => {
    const onSuccess = ({data}) => {
      console.log('ssssssss>>>>>>>>>>', data.data.id);
      this.setState({currentOrder: data.data});
      this.props.navigation.navigate(Constants.ViewQuickJob, {item: id});
    };

    const onFailure = (error) => {
      console.log('ssssssss>>>>>>>>>>', error);
    };
    let params = {
      orderId: id,
    };
    Axios.get(Constants.orderDetail, {
      params,
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
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

  renderJobsForYouItem = ({item}) => {
    // //console.log('Job Around data ======',item)
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.card,
          {
            padding: SIZES.fifteen,
            marginHorizontal: SIZES.five * 2.3,
            marginVertical: SIZES.five * 1.5,
          },
        ]}
        onPress={
          () =>
            this.props.navigation.navigate(Constants.viewJob, {
              item: item.id,
            })
          // console.log("item lele tu===========> ", item)
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.circleCard}>
            <Image
              source={{
                uri:
                  item.user.userProfile.image !== null &&
                  item.user.userProfile.image !== undefined
                    ? Constants.imageURL + item.user.userProfile.image
                    : '',
              }}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View style={{marginStart: 10}}>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {item.user.name !== null && item.user.name !== undefined
                ? item.user.name
                : ''}
            </RegularTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <Image
                source={Images.iconVerified}
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  tintColor:
                    item.email_verified_at !== null
                      ? Colors.turqoiseGreen
                      : 'red',
                }}
              />
              <RegularTextCB
                style={{
                  color:
                    item.email_verified_at !== null
                      ? Colors.turqoiseGreen
                      : 'red',
                  fontSize: 12,
                  marginStart: 5,
                }}>
                {item.email_verified_at !== null ? 'Verified' : 'Unverified'}
              </RegularTextCB>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
            {item.title !== null && item.title !== undefined ? item.title : ''}
          </RegularTextCB>

          <LightTextCB style={{color: Colors.black}}>
            ${item.price !== null && item.price !== undefined ? item.price : ''}
          </LightTextCB>
        </View>
        <View style={{}}>
          <RegularTextCB style={{color: Colors.coolGrey}}>
            {item.description !== null && item.description !== undefined
              ? item.description
              : ''}
          </RegularTextCB>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Image
            source={Images.iconLocationPin}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
          />
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
              marginStart: 5,
            }}>
            {item.address !== null && item.address !== undefined
              ? item.address
              : ''}
          </RegularTextCB>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Image
            source={Images.iconStopWatch}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
          />
          <View
            style={{
              flexDirection: 'row',
              marginStart: 5,
              alignItems: 'center',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
              }}>
              {item.time !== null && item.time !== undefined ? item.time : ''}
            </RegularTextCB>
            <RegularTextCB
              style={{
                color: Colors.black,
                fontSize: 18,
                textDecorationLine: 'underline',
              }}>
              {'View Job'}
            </RegularTextCB>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderQuickJob = ({item}) => {
    // //console.log('Job Around data ======',item)
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.card,
          {
            padding: SIZES.fifteen,
            marginHorizontal: SIZES.five * 2.3,
            marginVertical: SIZES.five * 1.5,
          },
        ]}
        onPress={() => {
          this.getQuickJobDetails(item.id);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.circleCard}>
            <Image
              source={{uri: Constants.imageURL + item.user_image}}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View style={{marginStart: 10}}>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {item.name}
            </RegularTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <Image
                source={Images.iconVerified}
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  tintColor:
                    item.user_email_verified_at !== null
                      ? Colors.turqoiseGreen
                      : 'red',
                }}
              />
              <RegularTextCB
                style={{
                  color:
                    item.user_email_verified_at !== null
                      ? Colors.turqoiseGreen
                      : 'red',
                  fontSize: 12,
                  marginStart: 5,
                }}>
                {item.user_email_verified_at !== null
                  ? 'Verified'
                  : 'Unverified'}
              </RegularTextCB>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {item.category_name}
            </RegularTextCB>
          </View>

          <LightTextCB style={{color: Colors.black, fontSize: 12}}>
            ${item.grand_total}
          </LightTextCB>
        </View>
        <View style={{}}>
          <RegularTextCB style={{color: Colors.coolGrey}}>
            {item.description !== '' ? item.description : 'N/A'}
          </RegularTextCB>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Image
            source={Images.iconLocationPin}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
          />
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
              marginStart: 5,
            }}>
            {item.location}
          </RegularTextCB>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Image
            source={Images.iconStopWatch}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
          />
          <View
            style={{
              flexDirection: 'row',
              marginStart: 5,
              alignItems: 'center',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
              }}>
              {item.from_time}
            </RegularTextCB>
            <RegularTextCB
              style={{
                color: Colors.black,
                fontSize: 18,
                textDecorationLine: 'underline',
              }}>
              {'View Job'}
            </RegularTextCB>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderBookings = ({item}) => {
    // console.log('...................', item.order_status);
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.card,
          {
            padding: SIZES.fifteen,
            marginHorizontal: SIZES.five * 2.3,
            marginVertical: SIZES.five * 1.5,
          },
        ]}
        onPress={() => {
          item.order_status === 'pending' || item.order_status === 'cancelled'
            ? this.props.navigation.navigate(Constants.BookingAcceptance, {
                orderId: item.id,
              })
            : this.props.navigation.navigate(Constants.JobInProgress, {
                orderId: item.id,
              });
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.circleCard}>
            <Image
              source={{
                uri:
                  item.user_image !== null && item.user_image !== undefined
                    ? Constants.imageURL + item.user_image
                    : '',
              }}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View style={{marginStart: 10}}>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {item.user_name !== null && item.user_name !== undefined
                ? item.user_name
                : ''}
            </RegularTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <Image
                source={Images.iconVerified}
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  tintColor:
                    item.user_email_verified_at !== null
                      ? Colors.turqoiseGreen
                      : 'red',
                }}
              />
              <RegularTextCB
                style={{
                  color:
                    item.user_email_verified_at !== null
                      ? Colors.turqoiseGreen
                      : 'red',
                  fontSize: 12,
                  marginStart: 5,
                }}>
                {item.user_email_verified_at !== null
                  ? 'Verified'
                  : 'Unverified'}
              </RegularTextCB>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
            {item.category_name !== null && item.category_name !== undefined
              ? item.category_name
              : ''}
          </RegularTextCB>

          <LightTextCB style={[{color: Colors.black, fontSize: 14}]}>
            ${' '}
            {item.grand_total !== null && item.grand_total !== undefined
              ? item.grand_total
              : ''}
          </LightTextCB>
        </View>
        <View style={{}}>
          {item.description ? (
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 15,
              }}>
              {item.description}
            </RegularTextCB>
          ) : null}
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Image
            source={Images.iconLocationPin}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
          />
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
              marginStart: 5,
            }}>
            {item.location !== null && item.location !== undefined
              ? item.location
              : ''}
          </RegularTextCB>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Image
            source={Images.iconStopWatch}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
          />
          <View
            style={{
              flexDirection: 'row',
              marginStart: 5,
              alignItems: 'center',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
              }}>
              {item.from_time !== null && item.from_time !== undefined
                ? item.from_time
                : ''}
            </RegularTextCB>
            <RegularTextCB
              style={{
                color: Colors.black,
                fontSize: 18,
                textDecorationLine: 'underline',
              }}>
              {'View Job'}
            </RegularTextCB>
          </View>
          {/* <Text style={{textDecorationLine='underline'}}></Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <>
        <ScrollView
          style={STYLES.container}
          showsVerticalScrollIndicator={false}>
          {/* <StatusBar barStyle="dark-content" /> */}
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                paddingHorizontal: SIZES.twenty,
              }}>
              <TouchableOpacity
                activeOpacity={0.85}
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
                data={this.state.quickOrder}
                // horizontal
                keyExtractor={(item) => item.id}
                renderItem={this.renderQuickJob}
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
                data={this.state.scheduleBookings}
                // horizontal
                keyExtractor={(item) => item.id}
                renderItem={this.renderBookings}
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
