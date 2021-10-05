import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../common/Colors';
import Constants, {FONTS, SIZES, STYLES} from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import Axios from '../network/APIKit';
import utils from '../utils';
import NormalHeader from '../components/NormalHeader';
import {Icon} from 'native-base';
import BoldTextCB from '../components/BoldTextCB';
import LightTextCB from '../components/LightTextCB';
import {Text} from 'react-native';
const {height, width} = Dimensions.get('window');
const CARD_HEIGHT = SIZES.ten * 20;
const CARD_WIDTH = width * 0.4;
const SPACING_FOR_CARD_INSET = width * 0.08 - SIZES.ten;

const GOOGLE_MAPS_APIKEY = 'AIzaSyAQcUYPmKrEdyuRFKfl9c1m-F784wcir9g';

const ServiceProviderOnTheWay = (props) => {
  const _map = useRef();

  const [isLoading, setisLoading] = React.useState();
  const [vendorAround, setvendorAround] = React.useState([]);
  const [Region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
  });

  var watchID = null;
  var token = '';

  useEffect(() => {
    const getTokenAndlocation = async () => {
      token = await AsyncStorage.getItem(Constants.accessToken);
      // watchID != null && Geolocation.clearWatch(watchID);
      getLocation();

      props.navigation.addListener('focus', () => {
        getLocation();
      });
    };

    getTokenAndlocation();
  }, [props.navigation]);

  const getLocation = async () => {
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

        getVendorAroundYou(position.coords.latitude, position.coords.longitude);

        setRegion({
          latitude: Number(position.coords.latitude),
          longitude: Number(position.coords.longitude),
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034,
          // latitudeDelta: 0.0041,
          // longitudeDelta: 0.0041,
        });

        console.log('humzaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      },
      (error) => {
        console.log(
          'BBBBBBBBBBBAAAAAAAAAAAAABBBBBBBBBBBBAAAAAAAAAAAARRRRRRRRRRRRR: error => ',
          error,
        );
      },
    );

    // watchID = Geolocation.watchPosition((position) => {
    //   const lastPosition = JSON.stringify(position);
    //   console.log('humzaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    // });
  };

  // console.log("response =============>", vendorAround)
  const getVendorAroundYou = (latatide, longitude) => {
    setisLoading(true);
    const onSuccess = ({data}) => {
      console.log('Around Data ============== > ', data);
      setvendorAround(data.data);
      setisLoading(false);
    };

    const onFailure = (error) => {
      setisLoading(false);
      utils.showResponseError(error);
    };

    setisLoading(true);

    let params = {
      latitude: Number(latatide),
      longitude: Number(longitude),
    };

    Axios.get(Constants.getvendorAround, {
      params,
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  const mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ];

  return (
    <View style={[STYLES.container]}>
      {Region.latitude !== 0 && Region.longitude !== 0 ? (
        <MapView
          ref={_map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: Region.latitude,
            longitude: Region.longitude,
            latitudeDelta: 0.0044,
            longitudeDelta: 0.0054,
            // latitudeDelta: 0.0041,
            // longitudeDelta: 0.0041,
          }}
          // zoomEnabled
          // showsUserLocation
          // maxZoomLevel={15}
          // minZoomLevel={2}
          scrollEnabled={false}
          zoomEnabled={false}
          // zoomControlEnabled={false}
          customMapStyle={mapStyle}
          style={[styles.container]}>
          <Marker
            coordinate={{
              latitude: Region.latitude,
              longitude: Region.longitude,
            }}>
            <View
              style={{
                height: SIZES.ten * 4.3,
                width: SIZES.ten * 4.3,
                borderRadius: SIZES.ten * 4,
                borderColor: Colors.sand,
                borderWidth: 2.5,
              }}>
              <Image
                source={Images.emp3}
                // source={{uri: Constants.imageURL + userImage}}
                style={{
                  height: SIZES.ten * 3.8,
                  width: SIZES.ten * 3.8,
                  borderRadius: SIZES.ten * 3.5,
                }}
              />
            </View>
          </Marker>
          <MapView.Marker
            // key={index}
            // 37.78798240427305, -122.40754292791394
            coordinate={{
              latitude: Number(37.78798240427305),
              longitude: Number(-122.40754292791394),
            }}
            onPress={() => {
              props.navigation.navigate(Constants.viewVendorProfile, {
                // item: marker.id,
              });
            }}>
            <View style={styles.markerWrap}>
              <Image
                // source={{uri: Constants.imageURL + marker.image}}
                source={Images.markerMechanic}
                style={[styles.marker]}
              />
            </View>
          </MapView.Marker>
          {/* <MapViewDirections
            mode="WALKING"
            strokeWidth={3.5}
            strokeColor={Colors.sickGreen}
            origin={Region}
            destination={{
              latitude: Number(37.78798240427305),
              longitude: Number(-122.40754292791394),
            }}
            apikey={GOOGLE_MAPS_APIKEY}
          /> */}
          {/* {vendorAround && vendorAround.length
            ? vendorAround.map((marker, index) => {
                return (
                  <MapView.Marker
                    key={index}
                    coordinate={{
                      latitude: Number(marker.latitude),
                      longitude: Number(marker.longitude),
                    }}
                    onPress={() => {
                      props.navigation.navigate(Constants.viewVendorProfile, {
                        item: marker.id,
                      });
                    }}>
                    <View style={styles.markerWrap}>
                      <Image
                        source={{uri: Constants.imageURL + marker.image}}
                        style={[styles.marker]}
                      />
                    </View>
                  </MapView.Marker>
                );
              })
            : null} */}
        </MapView>
      ) : null}
      <NormalHeader name="Service Provider On the Way" />

      <TouchableOpacity
        style={[
          styles.bottomCard,
          {
            paddingVertical: SIZES.ten,
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: SIZES.twentyFive * 1.5,
            alignSelf: 'center',
            // padding: SIZES.ten * 7,
          },
        ]}
        activeOpacity={0.6}
        onPress={() => {}}>
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'space-between',
            // padding: SIZES.ten,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.sickGreen,
              height: SIZES.ten * 3.5,
              width: SIZES.ten * 3.5,
              borderRadius: SIZES.ten * 5,
            }}>
            <Icon
              type={'Feather'}
              name={'phone-call'}
              style={{color: Colors.white, fontSize: SIZES.fifteen + 2}}
            />
          </View>

          <Image
            source={Images.emp3}
            style={{
              height: SIZES.ten * 7,
              width: SIZES.ten * 7,
              borderRadius: SIZES.ten * 7,
              marginHorizontal: SIZES.twenty,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.sickGreen,
              height: SIZES.ten * 3.5,
              width: SIZES.ten * 3.5,
              borderRadius: SIZES.ten * 5,
            }}>
            <Icon
              type={'MaterialCommunityIcons'}
              name={'chat-processing-outline'}
              style={{color: Colors.white, fontSize: SIZES.fifteen + 2}}
            />
          </View>
        </View>

        <Text style={[FONTS.mediumFont16]}>Freddie Johnson</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
          }}>
          <Image
            source={Images.iconVerified}
            style={{
              height: SIZES.twenty,
              width: SIZES.twenty,
              resizeMode: 'contain',
              tintColor: Colors.turqoiseGreen,
            }}
          />
          <RegularTextCB
            style={[
              FONTS.mediumFont14,
              {color: Colors.turqoiseGreen, marginStart: SIZES.five},
            ]}>
            Verified
          </RegularTextCB>
        </View>
        <RegularTextCB style={{fontSize: 16}}>
          Car Mechanic Needed
        </RegularTextCB>
        <RegularTextCB style={{color: Colors.sickGreen}}>
          Automobile
        </RegularTextCB>
      </TouchableOpacity>

      {/* <Animated.ScrollView
        // ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + SIZES.twenty}
        snapToAlignment="center"
        contentInset={{
          // for ios
          top: 0,
          bottom: SPACING_FOR_CARD_INSET,
          left: SPACING_FOR_CARD_INSET,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          // for android
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          paddingBottom: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}></Animated.ScrollView> */}

      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{color: '#fff'}}
      />
    </View>
  );
};

export default ServiceProviderOnTheWay;

const styles = StyleSheet.create({
  iconBack: {
    height: SIZES.fifteen,
    width: SIZES.fifteen,
    tintColor: Colors.coolGrey,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    ...StyleSheet.absoluteFill,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? SIZES.ten * 9 : SIZES.ten * 8,
    paddingHorizontal: SIZES.ten,
  },
  chipsIcon: {
    marginRight: SIZES.five,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
    padding: SIZES.ten - 2,
    paddingHorizontal: SIZES.twenty,
    marginHorizontal: SIZES.ten,
    height: SIZES.ten * 3,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: SIZES.ten,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: SIZES.five,
    elevation: 2,
    backgroundColor: '#FFF',
    borderRadius: SIZES.twenty,
    marginHorizontal: SIZES.five,
    shadowColor: '#000',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    alignItems: 'center',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    paddingVertical: SIZES.five - 3,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  iconUser: {
    height: '100%',
    width: '100%',
  },
  circleCard: {
    height: SIZES.ten * 8,
    width: SIZES.ten * 8,
    borderRadius: SIZES.ten * 4,
    overflow: 'hidden',
  },
  textContent: {
    alignItems: 'center',
  },
  cardtitle: {
    color: Colors.black,
    fontSize: 18,
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    width: SIZES.ten * 6,
    height: SIZES.ten * 6,
    overflow: 'hidden',
  },
  marker: {
    width: '100%',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    marginTop: SIZES.five,
  },
  signIn: {
    width: '100%',
    padding: SIZES.five,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderColor: Colors.orange,
    borderWidth: 1,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconBack: {
    height: SIZES.fifteen,
    width: SIZES.fifteen,
    resizeMode: 'contain',
  },
  bottomCard: {
    backgroundColor: '#fff',
    borderRadius: SIZES.ten,
    width: width - SIZES.twentyFive,
    shadowColor: Colors.lightGrey,
    // shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 22,
    shadowRadius: 10,
    elevation: 15,
  },
});
