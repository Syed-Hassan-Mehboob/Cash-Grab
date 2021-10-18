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
} from 'react-native';
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
import Modal from 'react-native-modal';
import BoldTextCB from '../../components/BoldTextCB';
import NormalHeader from '../../components/NormalHeader';

export default class JobInProgress extends React.Component {
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
      userData: {},
      region: this.initialMapState.region,
      latitude: '',
      longitude: '',
      jobService: [],
      thankYouModal: false,
    };
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.getUserAccessToken();
    this.props.navigation.addListener('focus', () => {
      this.getUserAccessToken();
    });
  }
  // componentWillMount() {
  //   LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  //   this.getUserAccessToken();
  //   this.props.navigation.addListener('focus', () => {
  //     this.getUserAccessToken();
  //   });
  // }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => {
      this.getBookingDetail(token);
    });
  };

  getBookingDetail = async (token) => {
    this.setState({
      isLoading: true,
    });
    const onSuccess = ({data}) => {
      // console.log(' Schedule Bookings Detail  =====', data.data);
      this.setState({
        userData: data.data,
      });
      this.setState({
        isLoading: false,
      });
    };

    const onFailure = (error) => {
      this.setState({
        isLoading: false,
      });
      utils.showResponseError(error);
      console.log('==================Error', error);
    };
    let params = {
      orderId: this.props.route.params.orderId,
    };
    Axios.get(Constants.orderDetail, {
      params: params,
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  progressOrder = async () => {
    let token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({
      isLoading: true,
    });
    const onSuccess = ({data}) => {
      // console.log('>>>>>>>> ', data);
      this.getUserAccessToken();
      this.setState({
        isLoading: false,
      });
    };

    const onFailure = (error) => {
      this.setState({
        isLoading: false,
      });
      utils.showResponseError(error);
      console.log('++++==========', error);
    };
    // console.log('==== Job id >>>>>>>', props.route.params.joid);
    const options = {
      headers: {
        Authorization: token,
      },
    };
    const params = {
      order_id: this.state.userData?.id,
      status: 'progress',
    };
    Axios.post(Constants.orderStatus, params, options)
      .then(onSuccess)
      .catch(onFailure);
    // setTimeout(() => {
    //   this.props.navigation.goBack();
    // }, 500);
  };

  render() {
    // console.log('>>>>>>>>>>>>', this.props.route.params.orderId);

    return (
      <View style={STYLES.container}>
        <NormalHeader name="Job Details" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: SIZES.five}}>
            <View style={{padding: SIZES.twenty}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={styles.circleCard}>
                  {this.state.userData?.user?.user_profiles.image !== '' &&
                  this.state.userData?.user?.user_profiles.image !==
                    undefined ? (
                    <Image
                      source={{
                        uri:
                          Constants.imageURL +
                          this.state.userData?.user?.user_profiles.image,
                      }}
                      style={styles.iconUser}
                      resizeMode="cover"
                    />
                  ) : null}
                </View>
                <View style={{marginStart: SIZES.ten}}>
                  <RegularTextCB
                    style={{
                      color: Colors.black,
                      fontSize: 16,
                    }}>
                    {this.state.userData?.name !== null &&
                    this.state.userData.name !== undefined
                      ? this.state.userData.name
                      : ''}
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
                  {this.state.userData?.category?.name}
                </RegularTextCB>
                <LightTextCB
                  style={[
                    {
                      color: Colors.black,
                      fontSize: 14,
                    },
                  ]}>
                  $ {this.state.userData?.grandTotal}
                </LightTextCB>
              </View>

              <RegularTextCB
                style={{
                  color: Colors.coolGrey,
                  marginVertical: SIZES.ten * 0.5,
                }}>
                {this.state.userData?.description}
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
                  {this.state.userData?.address}
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
                  {this.state.userData?.end_time}
                </RegularTextCB>
              </View>
            </View>

            <FlatList
              horizontal
              data={this.state.images}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => {
                console.log('images===', item.images);
                return <Image source={Images.car1} style={styles.carImage} />;
              }}
              showsHorizontalScrollIndicator={false}
            />

            <MapView
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 24.90628280557342,
                longitude: 67.07237028142383,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.04014281769006,
              }}
              scrollEnabled={false}
              showsUserLocation={true}
              showsMyLocationButton={false}
              zoomEnabled={false}
              style={styles.mapStyle}>
              <Marker
                coordinate={{
                  latitude: Number(this.state.latitude),
                  longitude: Number(this.state.longitude),
                }}
              />
            </MapView>
            <View
              style={{
                marginVertical: SIZES.ten * 1.8,
                marginHorizontal: SIZES.twenty,
              }}>
              {this.state.userData?.orderStatus ? (
                <ButtonRadius10
                  label={
                    this.state.userData?.orderStatus === 'accepted'
                      ? 'START NOW'
                      : 'WORK STARTED'
                  }
                  disabled={
                    this.state.userData?.orderStatus !== 'accepted'
                      ? true
                      : false
                  }
                  bgColor={Colors.sickGreen}
                  onPress={() => {
                    this.progressOrder();
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

        <Modal
          isVisible={this.state.thankYouModal}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <View
            style={{
              backgroundColor: Colors.white,
              padding: SIZES.fifteen,
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Image
              source={Images.greenTick}
              resizeMode="contain"
              style={{
                height: SIZES.fifteen * 5,
                width: SIZES.fifteen * 5,
                marginBottom: 15,
              }}
            />
            <BoldTextCB style={[{color: Colors.black, fontSize: 22}]}>
              Thank You
            </BoldTextCB>
            <RegularTextCB
              style={{
                marginVertical: SIZES.ten,
                fontSize: 16,
                color: Colors.coolGrey,
              }}>
              For your great service
            </RegularTextCB>
            <View
              style={{
                marginVertical: SIZES.ten * 3,
                width: '100%',
              }}>
              <ButtonRadius10
                label="JOB COMPLETED"
                bgColor={Colors.sickGreen}
                onPress={() => {
                  //   setThankYouModal();
                  this.setState({thankYouModal: false}, () => {
                    setTimeout(() => {
                      this.props.navigation.navigate(Constants.vendorHome);
                    }, 500);
                  });
                }}
              />
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
