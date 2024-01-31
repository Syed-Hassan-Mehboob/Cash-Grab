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
export default class ViewJob extends React.Component {
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
      userData: {},
      userImage: '',
      username: '',
      title: '',
      price: '',
      location: '',
      time: '',
      region: this.initialMapState.region,
      description: '',
      jobService: [],
      buttonlabel: '',
      jobId: '',
      jobStatus: '',
      orderStatus: undefined,
      myRequestAceepted: undefined,
      initialRegion: {
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      latitude: 0.0,
      longitude: 0.0,
    };
  }

  onMapLoad = (latitude, longitude) => {
    console.log({
      latitude: Number(latitude),
      longitude: Number(longitude),
    });
    // console.log(this.mapRef);

    setTimeout(() => {
      this.mapRef.animateToRegion(
        {
          // latitude: Number(latitude),
          // longitude: Number(longitude),
          latitude: 40.7586517327205,
          longitude: -73.98583396826172,
          latitudeDelta: 0.0004,
          longitudeDelta: 0.003,
        },
        1200,
      );
    }, 700);
  };

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
    this.setState({accessToken: token}, () => {
      this.viewJob();
    });
  };

  viewJob = () => {
    this.setState({isLoading: true});
    const onSuccess = ({data}) => {
      this.setState(
        {
          userImage: data.data.records.user.userProfile.image,
          title: data.data.records.title,
          location: data.data.records.location,
          time: data.data.records.time,
          images: data.data.records.images,
          username: data.data.records.user.name,
          price: data.data.records.price,
          description: data.data.records.description,
          jobId: data.data.records.id,
          initialRegion: {
            latitude: Number(data.data.records.latitude),
            longitude: Number(data.data.records.longitude),
            latitudeDelta: 0.0004,
            longitudeDelta: 0.05,
          },
        },
        () => {
          this.setState(
            {
              latitude: data.data.records.latitude,
              longitude: data.data.records.longitude,
            },
            () => {
              console.log(
                '========================================= >>>>>>>>>>>>>>>>>>>>',

                this.state.latitude,
                this.state.longitude,
              );
            },
          );
          setTimeout(() => {
            this.mapRef.animateToRegion(
              {
                latitude: Number(this.state.latitude),
                longitude: Number(this.state.longitude),
                latitudeDelta: 0.0004,
                longitudeDelta: 0.003,
              },
              1200,
            );
          }, 700);
          this.checkJobRequest();
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
      jobId: this.props.route.params.item,
    };
    Axios.get(Constants.VendorviewJobUrl, {
      params,
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  createJobRequest = () => {
    const postData = {
      job_id: this.state.jobId,
    };

    this.setState({isLoading: true});
    const onSuccess = ({data}) => {
      this.viewJob();
      console.log('Request job Data ========', data);
      utils.showToast(data.message);
      this.setState({isLoading: false});
    };
    const onFailure = (error) => {
      // console.log(
      //   'error =====================================================================>',
      //   error,
      // );
      utils.showResponseError(error.massage);
      this.setState({isLoading: false});
    };
    const options = {
      headers: {
        Authorization: this.state.accessToken,
        //    'Content-Type':'application/x-www-form-urlencoded'
      },
    };
    Axios.post(Constants.createJobRequest, postData, options)
      .then(onSuccess)
      .catch(onFailure);
  };

  checkJobRequest = () => {
    const postData = {
      job_id: this.state.jobId,
    };

    this.setState({isLoading: true});
    const onSuccess = ({data}) => {
      // this.viewJob();
      console.log(
        'Request job Data ========',
        data,
        '==========',
        this.state.jobId,
      );
      // utils.showToast(data.message);
      this.setState({
        buttonlabel:
          data.data.status === ''
            ? 'REQUEST FOR ACCEPTANCE'
            : data.data.status === 'pending'
            ? 'PENDING'
            : null,
      });
    };
    const onFailure = (error) => {
      console.log(
        'error =====================================================================>',
        error,
      );
      // utils.showResponseError(error.massage);
    };
    const options = {
      params: {
        job_id: this.state.jobId,
      },
      headers: {
        Authorization: this.state.accessToken,
      },
    };
    Axios.get(Constants.checkPostedJobStatusURL, options)
      .then(onSuccess)
      .catch(onFailure);
  };

  render() {
    // console.log('=============>>>>>>>', this.props.route);
    return (
      <View style={STYLES.container}>
        <NormalHeader name="View Jobb" />

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
                return (
                  <Image
                    source={{uri: Constants.imageURL + item.images}}
                    style={styles.carImage}
                  />
                );
              }}
              showsHorizontalScrollIndicator={false}
            />

            <MapView
              ref={(ref) => (this.mapRef = ref)}
              onMapReady={() => {
                this.onMapLoad(this.state.latitude, this.state.longitude);
              }}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: Number(this.state.latitude),
                longitude: Number(this.state.longitude),
                latitudeDelta: 0.0004,
                longitudeDelta: 0.0005,
              }}
              showsBuildings
              showsUserLocation={false}
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
                  disabled={this.state.buttonlabel === 'PENDING'}
                  bgColor={Colors.sickGreen}
                  onPress={() => {
                    this.createJobRequest();
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
