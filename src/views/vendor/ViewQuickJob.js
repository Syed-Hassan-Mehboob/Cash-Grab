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
import NormalHeader from '../../components/NormalHeader';
export default class ViewQuickJob extends React.Component {
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
      initialRegion: {
        latitude: 24.90628280557342,
        longitude: 67.07237028142383,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.04014281769006,
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

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => {
      this.viewJob();
    });
  };

  viewJob = () => {
    this.setState({isLoading: true});
    const onSuccess = ({data}) => {
      console.log(
        'View Quick jjob detail vendor side Data ==== ==== ',
        data.data,
      );
      this.setState(
        {
          currentOrder: data.data,
          latitude: Number(data.data.lat),
          longitude: Number(data.data.lng),
          initialRegion: {
            latitude: Number(data.data.lat),
            longitude: Number(data.data.lng),
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.04014281769006,
          },
        },
        () => {
          this.setState(
            {
              isLoading: false,
            },
            () => {
              console.log(
                'marker coordinates =======>>>>>> ',
                this.state.initialRegion,
              );
            },
          );
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

  render() {
    return (
      <View style={STYLES.container}>
        <NormalHeader name="View Job" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: SIZES.twenty}}>
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
                provider={PROVIDER_GOOGLE}
                initialRegion={this.state.initialRegion}
                showsUserLocation={true}
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
                  .orderStatus !== 'completed' ? (
                <ButtonRadius10
                  label={
                    this.state.currentOrder.orderStatus === 'accepted'
                      ? 'START WORK'
                      : this.state.currentOrder.orderStatus === 'progress'
                      ? 'WORK STARTED'
                      : this.state.currentOrder.orderStatus === 'completed'
                      ? 'completed'
                      : null
                  }
                  disabled={
                    this.state.currentOrder.orderStatus === 'progress' ||
                    this.state.currentOrder.orderStatus === 'completed'
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
