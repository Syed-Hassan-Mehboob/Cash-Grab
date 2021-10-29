import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {Icon} from 'native-base';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Colors from '../../common/Colors';
import Constants, {height, SIZES, STYLES, FONTS} from '../../common/Constants';
import Images from '../../common/Images';
import ButtonRadius10 from '../../components/ButtonRadius10';
import LightTextCB from '../../components/LightTextCB';
import RegularTextCB from '../../components/RegularTextCB';
import Axios from '../../network/APIKit';
import utils from '../../utils';
import Spinner from 'react-native-loading-spinner-overlay';
import NormalHeader from '../../components/NormalHeader';
export default class ViewQuickJob extends React.Component {
  initialMapState = {
    region: {
      latitude: 24.9050562,
      longitude: 67.0785654,
      latitudeDelta: 0.0004,
      longitudeDelta: 0.0005,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      accessToken: '',
      viewJob: [],
      images: [],
      currentOrder: {},
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
      buttonlabel: '',
      jobId: '',
      jobStatus: '',
      orderStatus: undefined,
      myRequestAceepted: undefined,
      isMessageForOrderVisited: false,
      initialRegion: {
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
    };
  }

  componentDidMount() {
    console.log(
      'yeh le idddddd===============> ',
      this.props.route.params.item,
    );
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
          latitudeDelta: 0.00064,
          longitudeDelta: 0.0005,
        },
        1200,
      );
    }, 1500);
  };

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);

    this.setState(
      {
        accessToken: token,
      },
      () => {
        this.viewJob();
      },
    );
  };

  viewJob = () => {
    this.setState({isLoading: true});
    const onSuccess = async ({data}) => {
      // console.log(
      //   'View Quick jjob detail vendor side Data ==== ==== ',
      //   data.data,
      // );
      const messageVisited = await AsyncStorage.getItem(
        `isMessageForOrderVisited${data.data.id}`,
      );
      this.setState(
        {
          currentOrder: data.data,
          latitude: Number(data.data.lat),
          longitude: Number(data.data.lng),
          isMessageForOrderVisited: JSON.parse(messageVisited),
          initialRegion: {
            latitude: Number(data.data.lat),
            longitude: Number(data.data.lng),
            latitudeDelta: 0.0004,
            longitudeDelta: 0.0005,
          },
        },
        () => {
          this.setState({
            isLoading: false,
          });
        },
      );

      this.setState({isLoading: false});
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    this.setState({isLoading: true});
    let params = {
      orderId: this.props.route.params.item,
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

  handleClick = (workStatus) => {
    const formData = new FormData();

    const onSuccess = ({data}) => {
      console.log('order status change vendor side success=====>>>.', data);
      this.viewJob();
      this.setState({isLoading: false});
    };
    const onFailure = (error) => {
      console.log('order status change vendor side failure =====>>>.', error);
      this.setState({isLoading: false});
    };

    formData.append('order_id', this.state.currentOrder.id);
    formData.append('status', workStatus);

    this.setState({isLoading: true});
    Axios.post(Constants.orderStatus, formData, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
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

  render() {
    return (
      <View style={STYLES.container}>
        <NormalHeader name="View Quick Job" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: SIZES.twenty}}>
          <View style={{marginBottom: SIZES.five}}>
            <View style={{padding: SIZES.twenty}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
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
                          this.state.currentOrder?.user?.user_profiles?.image,
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
                      {this.state.currentOrder?.user?.name}
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

                {this.state.currentOrder?.orderStatus !== 'completed' &&
                this.state.currentOrder.orderStatus !== 'pending' ? (
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate(Constants.chat, {
                          payload: this.state.currentOrder,
                        });
                      }}
                      activeOpacity={0.7}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.sickGreen,
                        height: SIZES.ten * 4.75,
                        width: SIZES.ten * 4.75,
                        borderRadius: SIZES.ten * 5,
                        marginRight: SIZES.ten,
                      }}>
                      {this.state.isMessageForOrderVisited !== null ? (
                        Number(this.state.isMessageForOrderVisited.orderID) ===
                          this.state.currentOrder.id &&
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
                        //   'this.state.isMessageForOrderVisited======>>>>>>',
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
                        this.dialCall(this.state.currentOrder.user.phone);
                      }}
                      activeOpacity={0.7}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.sickGreen,
                        height: SIZES.ten * 4.75,
                        width: SIZES.ten * 4.75,
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
                  marginTop: SIZES.five,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <RegularTextCB
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                  }}>
                  {this.state.currentOrder?.category?.name}
                </RegularTextCB>
                <LightTextCB
                  style={{
                    color: Colors.black,
                    fontSize: 12,
                  }}>
                  ${this.state.currentOrder?.grandTotal}
                </LightTextCB>
              </View>

              <RegularTextCB
                style={{
                  color: Colors.sickGreen,
                  fontSize: 12,
                }}>
                {/* {this.state.jobService[0]?.categories.name} */}
              </RegularTextCB>

              <RegularTextCB
                style={{
                  color: Colors.coolGrey,
                }}>
                {this.state.currentOrder?.description}
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
                  {this.state.currentOrder?.location}
                </RegularTextCB>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.five,
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
                  {this.state.currentOrder?.start_time}
                </RegularTextCB>
              </View>
            </View>

            <FlatList
              horizontal
              data={this.state.images}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => {
                return (
                  <Image
                    source={{uri: Constants.imageURL + item.images}}
                    style={styles.carImage}
                  />
                );
              }}
              showsHorizontalScrollIndicator={false}
            />

            {!this.state.isLoading ? (
              <MapView
                ref={(ref) => (this.mapRef = ref)}
                onMapReady={() =>
                  this.onMapLoad(
                    this.state.initialRegion.latitude,
                    this.state.initialRegion.longitude,
                  )
                }
                provider={PROVIDER_GOOGLE}
                initialRegion={this.state.initialRegion}
                showsUserLocation={false}
                showsMyLocationButton={false}
                zoomEnabled={false}
                scrollEnabled={false}
                style={styles.mapStyle}>
                <Marker
                  coordinate={{
                    latitude: this.state.initialRegion.latitude,
                    longitude: this.state.initialRegion.longitude,
                  }}
                />
              </MapView>
            ) : null}
            <View
              style={{
                marginVertical: SIZES.ten * 3,
                marginHorizontal: SIZES.twenty,
              }}>
              {this.state.isLoading ? null : this.state.currentOrder
                  .orderStatus !== 'completed' &&
                this.state.currentOrder.orderStatus !== 'pending' ? (
                <ButtonRadius10
                  label={
                    this.state.currentOrder.orderStatus === 'accepted'
                      ? 'START WORK'
                      : this.state.currentOrder.orderStatus === 'progress'
                      ? 'WORK STARTED'
                      : this.state.currentOrder.orderStatus === 'completed'
                      ? 'completed'
                      : this.state.currentOrder.orderStatus === 'pending'
                      ? 'PENDING'
                      : null
                  }
                  disabled={
                    this.state.currentOrder.orderStatus === 'progress' ||
                    this.state.currentOrder.orderStatus === 'completed' ||
                    this.state.currentOrder.orderStatus === 'pending'
                      ? true
                      : false
                  }
                  bgColor={Colors.sickGreen}
                  onPress={() => {
                    if (this.state.currentOrder.orderStatus === 'accepted') {
                      this.handleClick('progress');
                      return;
                    }
                    if (this.state.currentOrder.orderStatus === 'progress') {
                      // this.handleClick('completed');
                      return;
                    }
                  }}
                />
              ) : this.state.currentOrder.orderStatus === 'pending' ? (
                <LightTextCB
                  style={{
                    marginTop: SIZES.five,
                    alignSelf: 'center',
                    color: Colors.coolGrey,
                  }}>
                  *You have declined this job{' '}
                </LightTextCB>
              ) : (
                <LightTextCB
                  style={{
                    marginTop: SIZES.five,
                    alignSelf: 'center',
                    color: Colors.coolGrey,
                  }}>
                  *This job has been completed{' '}
                </LightTextCB>
              )}

              {/* {this.state.isLoading ? null  :
              this.state.currentOrder.orderStatus !== 'completed'  ? (
                <ButtonRadius10
                  label={this.state.currentOrder.orderStatus === 'accepted' ? 'START WORK' : this.state.currentOrder.orderStatus === 'progress' ?  'WORK STARTED' : this.state.currentOrder.orderStatus === 'completed' ? null }
                  disabled={this.state.buttonlabel === 'PENDING'}
                  bgColor={Colors.sickGreen}
                  onPress={() => {
                    this.createJobRequest();
                  }}
                />
              ) : null} */}
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
