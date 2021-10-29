import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Image,
  LogBox,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Linking,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Colors from '../common/Colors';
import Constants, {
  height,
  SIZES,
  STYLES,
  FONTS,
  width,
} from '../common/Constants';
import Images from '../common/Images';
import ButtonRadius10 from '../components/ButtonRadius10';
import LightTextCB from '../components/LightTextCB';
import RegularTextCB from '../components/RegularTextCB';
import Axios from '../network/APIKit';
import utils from '../utils';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import BoldTextCB from '../components/BoldTextCB';
import NormalHeader from '../components/NormalHeader';
import StarRating from 'react-native-star-rating';
import {Icon} from 'native-base';

export default class QuickJobDetail extends React.Component {
  initialMapState = {
    region: {
      latitude: 24.9050562,
      longitude: 67.0785654,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      accessToken: '',
      viewJob: [],
      images: [],
      userData: {},
      userImage: '',
      username: '',
      title: '',
      price: '',
      location: '',
      time: '',
      region: this.initialMapState.region,
      latitude: '',
      longitude: '',
      description: '',
      jobService: [],
      thankYouModal: false,
      isMessageForOrderVisited: false,
    };
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.getUserAccessToken();
    this.props.navigation.addListener('focus', () => {
      this.getUserAccessToken();
    });
  }

  onMapLoad = (latitude, longitude) => {
    console.log({
      latitude: Number(latitude),
      longitude: Number(longitude),
    });

    setTimeout(() => {
      this.mapRef.animateToRegion(
        {
          latitude: Number(latitude),
          longitude: Number(longitude),
          latitudeDelta: 0.0004,
          longitudeDelta: 0.003,
        },
        1200,
      );
    }, 1500);
  };

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    const messageVisited = await AsyncStorage.getItem(
      `isMessageForOrderVisited${this.props.route.params.orderItem.id}`,
    );
    this.setState(
      {
        accessToken: token,
        isMessageForOrderVisited: JSON.parse(messageVisited),
      },
      () => {
        //   this.viewJob();
        // console.log(
        //   'priops======>>>> ',
        //   this.props.route.params.orderItem.vendor.phone,
        // );
      },
    );
  };

  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };

  handleServiceCompleteClick = () => {
    const formData = new FormData();
    formData.append('order_id', this.props.route.params.orderItem.id);
    formData.append('status', 'completed');

    const onSuccess = ({data}) => {
      console.log('data service completed=====>>>>', data);
      this.setState({isLoading: false});
      this.props.navigation.navigate(Constants.UserHome);
    };
    const onFailure = (error) => {
      console.log('error service completed=====>>>>', error);
    };
    this.setState({isLoading: true});
    Axios.post(Constants.orderStatus, formData, {
      headers: {
        Authorization: `${this.state.accessToken}`,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  render() {
    console.log(
      'quick job detail',
      this.props.route.params.orderItem.orderStatus,
    );
    return (
      <View style={STYLES.container}>
        <NormalHeader name="Quick Job Detail" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: SIZES.five}}>
            <View style={{padding: SIZES.twenty}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={styles.circleCard}>
                  <Image
                    source={{
                      uri:
                        Constants.imageURL +
                        this.props.route.params.orderItem.user.user_profiles
                          .image,
                    }}
                    style={styles.iconUser}
                    resizeMode="cover"
                  />
                </View>
                <View style={{marginStart: SIZES.ten}}>
                  <RegularTextCB
                    style={{
                      color: Colors.black,
                      fontSize: 16,
                    }}>
                    {this.props.route.params.orderItem.user.name}
                  </RegularTextCB>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: SIZES.five,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={Images.iconVerified}
                      style={{height: 15, width: 15, resizeMode: 'contain'}}
                    />
                    <RegularTextCB
                      style={{
                        color: Colors.turqoiseGreen,
                        fontSize: 12,
                        marginStart: SIZES.five,
                      }}>
                      Verified
                    </RegularTextCB>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.five,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <RegularTextCB
                  style={{
                    color: Colors.sickGreen,
                    fontSize: 16,
                  }}>
                  {this.props.route.params.orderItem.category.name}
                </RegularTextCB>
                <LightTextCB
                  style={[
                    FONTS.boldFont14,
                    {
                      color: Colors.black,
                      fontSize: 12,
                    },
                  ]}>
                  ${this.props.route.params.orderItem.grandTotal}
                </LightTextCB>
              </View>

              <RegularTextCB
                style={{
                  color: Colors.sickGreen,
                  fontSize: 12,
                }}>
                {/* {this.state.jobService[0]?.categories.name}dsadas */}
              </RegularTextCB>

              <RegularTextCB
                style={{
                  color: Colors.coolGrey,
                  marginVertical: SIZES.ten * 0.5,
                }}>
                {this.props.route.params.orderItem.description}
              </RegularTextCB>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.five,
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.iconLocationPin}
                  style={{height: 17, width: 17, resizeMode: 'contain'}}
                />
                <RegularTextCB
                  style={{
                    color: Colors.coolGrey,
                    marginStart: SIZES.five,
                  }}>
                  {/* {this.state.location} */}
                  {this.props.route.params.orderItem.location}
                </RegularTextCB>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: SIZES.ten,
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.iconStopWatch}
                  style={{height: 17, width: 17, resizeMode: 'contain'}}
                />
                <RegularTextCB
                  style={{
                    color: Colors.coolGrey,
                    marginStart: SIZES.five,
                  }}>
                  {/* {this.state.time} */}
                  {this.props.route.params.orderItem.start_time}
                </RegularTextCB>
              </View>
              <View
                style={{
                  backgroundColor: Colors.coolGrey,
                  height: 1,
                  width: '100%',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: SIZES.fifteen,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: 'red',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Image
                      source={{
                        uri:
                          Constants.imageURL +
                          this.props.route.params.orderItem?.vendor
                            ?.user_profiles?.image,
                      }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 60 / 2,
                        resizeMode: 'contain',
                      }}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={{marginStart: 10}}>
                    <BoldTextCB style={{color: Colors.black, fontSize: 16}}>
                      {this.props.route.params.orderItem?.vendor?.name}
                    </BoldTextCB>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 5,
                        alignItems: 'center',
                      }}>
                      <RegularTextCB
                        style={{
                          color: Colors.coolGrey,
                          fontSize: 13.5,
                        }}>
                        {/* {'Need Car Macanic'} */}
                      </RegularTextCB>
                    </View>
                  </View>
                </View>

                {this.props.route.params.orderItem?.orderStatus !==
                'completed' ? (
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate(Constants.chat, {
                          payload: this.props.route.params.orderItem,
                        });
                      }}
                      activeOpacity={0.7}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.sickGreen,
                        height: SIZES.ten * 4.5,
                        width: SIZES.ten * 4.5,
                        borderRadius: SIZES.ten * 5,
                        marginRight: SIZES.ten,
                      }}>
                      {this.state.isMessageForOrderVisited !== null ? (
                        //  Number(
                        Number(this.state.isMessageForOrderVisited.orderID) ===
                          this.props.route.params.orderItem.id &&
                        this.state.isMessageForOrderVisited.isRead === false ? (
                          <View
                            style={{
                              height: 10,
                              width: 10,
                              borderRadius: 10,
                              backgroundColor: 'red',
                              position: 'absolute',
                              zIndex: 1,
                              right: 0,
                              top: 0,
                            }}
                          />
                        ) : // console.log(
                        //   'this.state.isMessageForOrderVisited222222======>>>>>>',
                        //   this.state.isMessageForOrderVisited,
                        // )
                        null
                      ) : null}
                      <Icon
                        type={'MaterialCommunityIcons'}
                        name={'chat-processing-outline'}
                        style={{
                          color: Colors.white,
                          fontSize: SIZES.fifteen * 1.82,
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.dialCall(
                          this.props.route.params.orderItem?.vendor?.phone,
                        );
                      }}
                      activeOpacity={0.7}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.sickGreen,
                        height: SIZES.ten * 4.5,
                        width: SIZES.ten * 4.5,
                        borderRadius: SIZES.ten * 5,
                      }}>
                      <Icon
                        type={'MaterialIcons'}
                        name={'call'}
                        style={{
                          color: Colors.white,
                          fontSize: SIZES.fifteen * 1.82,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingHorizontal: SIZES.ten,
                  }}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    fullStar={Images.starFull}
                    emptyStar={Images.starHalf}
                    starSize={SIZES.fifteen}
                    rating={this.props.route.params.orderItem?.vendor?.ratings}
                    starStyle={{
                      width: SIZES.twenty,
                      height: SIZES.twenty,
                      marginRight: SIZES.five,
                    }}
                    containerStyle={{width: SIZES.fifty * 1.5}}
                  />

                  <RegularTextCB
                    style={{
                      color: Colors.sunflowerYellow,
                      fontSize: 13.5,
                      marginStart: SIZES.twenty * 1.8,
                      marginTop: SIZES.five / 2,
                    }}>
                    {this.props.route.params.orderItem.vendor.ratings} Ratings
                  </RegularTextCB>
                </View>
              </View>
            </View>

            <FlatList
              horizontal
              data={this.state.images}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => {
                // console.log('images===', item.images);
                return <Image source={Images.car1} style={styles.carImage} />;
              }}
              showsHorizontalScrollIndicator={false}
            />

            <MapView
              ref={(ref) => (this.mapRef = ref)}
              provider={PROVIDER_GOOGLE}
              onMapReady={() => {
                this.onMapLoad(
                  this.props.route.params?.orderItem?.lat,
                  this.props.route.params?.orderItem?.lng,
                );
              }}
              initialRegion={{
                latitude: Number(this.props.route.params?.orderItem?.lat),
                longitude: Number(this.props.route.params?.orderItem?.lng),
                latitudeDelta: 0.0000000000000003,
                longitudeDelta: 0.00000006,
              }}
              scrollEnabled={false}
              showsUserLocation={false}
              showsMyLocationButton={false}
              zoomEnabled={false}
              style={styles.mapStyle}>
              <Marker
                coordinate={{
                  latitude: Number(this.props.route.params?.orderItem?.lat),
                  longitude: Number(this.props.route.params?.orderItem?.lng),
                }}
              />
            </MapView>

            {this.props.route.params.orderItem?.orderStatus === 'completed' ? (
              <LightTextCB
                style={{
                  marginTop: SIZES.five * 1.3,
                  alignSelf: 'center',
                  color: Colors.coolGrey,
                }}>
                *This job has been completed{' '}
              </LightTextCB>
            ) : null}
            <View
              style={{
                marginVertical: SIZES.ten * 1.8,
                marginHorizontal: SIZES.twenty,
              }}>
              {this.props.route.params.orderItem?.orderStatus === 'progress' ? (
                <ButtonRadius10
                  label="SERVICE COMPLETED"
                  bgColor={Colors.sickGreen}
                  onPress={() => {
                    this.handleServiceCompleteClick();
                  }}
                />
              ) : null}
            </View>
          </View>
        </ScrollView>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF', fontFamily: Constants.fontRegular}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mapStyle: {
    height: SIZES.ten * 27,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    elevation: SIZES.ten,
  },
  circleCard: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: SIZES.ten * 3,
    shadowColor: '#c5c5c5',
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  carImage: {
    height: SIZES.fifty * 2,
    width: SIZES.fifty * 2,
  },
  carImageShadow: {
    height: SIZES.ten * 8,
    width: SIZES.ten * 8,
    borderRadius: SIZES.ten,
    shadowColor: '#c5c5c5',
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  iconUser: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: (SIZES.ten * 6) / 2,
    resizeMode: 'contain',
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
