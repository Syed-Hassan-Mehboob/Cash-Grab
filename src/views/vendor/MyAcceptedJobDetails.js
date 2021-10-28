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
export default class MyAcceptedJobDetails extends React.Component {
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
      buttonlabel: '',
      jobId: '',
      jobStatus: '',
      orderStatus: undefined,
      myRequestAceepted: undefined,
      orderId: '',
    };
  }

  componentDidMount() {
    // console.log(
    //   'yeh le idddddd===============> ',
    //   this.props.route.params.item,
    // );
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.getUserAccessToken();
    this.props.navigation.addListener('focus', () => {
      this.getUserAccessToken();
    });
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    // console.log('============================', token);
    this.setState({accessToken: token}, () => {
      this.getMyAcceptedJobDetails();
    });
  };

  getMyAcceptedJobDetails = () => {
    const onSuccess = ({data}) => {
      // console.log(
      //   'View my accepted Job Data ==== ==== ',
      //   JSON.stringify(data.data),
      // );

      this.setState({
        userImage: data.data.user.user_profiles.image,
        time: data.data.start_time,
        location: data.data.address,
        username: data.data.name,
        latitude: data.data.lat !== null ? data.data.lat : '',
        longitude: data.data.lng !== null ? data.data.lng : '',
        buttonlabel:
          data.data.orderStatus === 'accepted' ? 'START NOW' : 'WORK STARTED',
        orderId: data.data.id,
        price: data.data.grandTotal,
        description: data.data.description,
      });
      this.setState({});

      // this.setState(
      //   {
      //     userImage: data.data.user.user_profiles.image,
      //     title: data.data.category.name,
      //     location: data.data.address,
      //     time: data.data.start_time,
      //     // images: data.data.records.images,
      //     username: data.data.name,
      //     latitude: data.data.lat !== null ? data.data.lat : '',
      //     longitude: data.data.lng !== null ? data.data.lng : '',
      //     price: data.data.grandTotal,
      //     description: data.data.description,
      //     buttonlabel:
      //       data.data.orderStatus === 'accepted' ? 'START NOW' : 'WORK STARTED',
      //     orderId: data.data.id,
      //   },
      //   () => {
      //     console.log(
      //       '=========================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      //       this.state.userImage,
      //     );
      //   },
      // );

      // utils.showToast(data.message)

      this.setState({isLoading: false});
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    this.setState({isLoading: true});
    let params = {
      orderId: this.props.route.params.orderId,
    };
    Axios.get(Constants.VendorviewOrderDetailUrl, {
      params,
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  progressOrder = () => {
    this.setState({
      isLoading: true,
    });
    const onSuccess = ({data}) => {
      console.log('>>>>>>>> ', data);
      this.getUserAccessToken();
      this.setState({
        isLoading: false,
      });

      utils.showToast('Work Has Been Started');
    };

    const onFailure = (error) => {
      this.setState({
        isLoading: false,
      });
      utils.showResponseError(error);
      // console.log('++++==========', error);
    };
    // console.log('==== Job id >>>>>>>', props.route.params.joid);
    const options = {
      headers: {
        Authorization: this.state.accessToken,
      },
    };
    const params = {
      order_id: this.state.orderId,
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
    console.log(this.props.route.params.orderId);
    return (
      <View style={STYLES.container}>
        <NormalHeader name="My Job Details" />

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
                    source={{uri: Constants.imageURL + this.state.userImage}}
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
                    {this.state.username}
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
                  {this.state.title === null ? '' : this.state.title}
                </RegularTextCB>
                <LightTextCB
                  style={{
                    color: Colors.black,
                    fontSize: 12,
                  }}>
                  ${this.state.price}
                </LightTextCB>
              </View>

              <RegularTextCB
                style={{
                  color: Colors.sickGreen,
                  fontSize: 12,
                }}>
                {this.state.jobService[0]?.categories.name}
              </RegularTextCB>

              <RegularTextCB
                style={{
                  color: Colors.coolGrey,
                }}>
                {this.state.description}
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
                  {this.state.location}
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
                  {this.state.time}
                </RegularTextCB>
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
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                // latitude: 24.90628280557342,
                // longitude: 67.07237028142383,

                latitude: Number(this.state.latitude),
                longitude: Number(this.state.longitude),
                latitudeDelta: 0.0004,
                longitudeDelta: 0.00046,
              }}
              showsMyLocationButton={false}
              zoomEnabled={false}
              scrollEnabled={false}
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
                marginVertical: SIZES.ten * 3,
                marginHorizontal: SIZES.twenty,
              }}>
              {/* {this.state.orderStatus !== undefined &&
              this.state.orderStatus !== 'accepted' ? (
                <ButtonRadius10
                  label={this.state.buttonlabel}
                  disabled={'sss'}
                  bgColor={Colors.sickGreen}
                  onPress={() => {}}
                />
              ) : !this.state.isLoading &&
                this.state.buttonlabel !== undefined ? (
                <ButtonRadius10
                  label={this.state.buttonlabel}
                  disabled={this.state.buttonlabel === 'PENDING' ? true : false}
                  bgColor={
                    this.state.buttonlabel === 'PENDING'
                      ? Colors.lighNewGreen
                      : Colors.sickGreen
                  }
                  onPress={() => {
                    if (this.state.buttonlabel === 'REQUEST FOR ACCEPTANCE') {
                      this.createJobRequest();
                      return;
                    }
                    if (this.state.buttonlabel === 'START NOW') {
                      this.progressOrder();
                      return;
                    }
                  }}
                />
              ) : null} */}

              {!this.state.isLoading ? (
                <ButtonRadius10
                  label={this.state.buttonlabel}
                  bgColor={Colors.sickGreen}
                  disabled={
                    this.state.buttonlabel === 'WORK STARTED' ? true : false
                  }
                  onPress={() => {
                    // console.log('order id ===== ===', this.state.orderId);
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
