import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Colors from '../common/Colors';
import Constants, {SIZES} from '../common/Constants';
import Images from '../common/Images';
import LightTextCB from '../components/LightTextCB';
import RegularTextCB from '../components/RegularTextCB';
import Axios from '../network/APIKit';
import utils from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
const {height, width} = Dimensions.get('window');
const CARD_HEIGHT = SIZES.ten * 20;
const CARD_WIDTH = width * 0.4;
const SPACING_FOR_CARD_INSET = width * 0.08 - SIZES.ten;

const Nearby = (props) => {
  const markers = [
    {
      coordinate: {
        latitude: 24.9048005,
        longitude: 67.0782334,
      },
      title: 'Ray Hammond',
      location: 'Gardening, NY (2km)',
      image: Images.emp1,
      type: 'mechanic',
      rating: '4.6 ratings',
    },
    {
      coordinate: {
        latitude: 24.9112095,
        longitude: 67.0893753,
      },
      title: 'Gene Mitchell',
      location: 'Gardening, NY (2km)',
      image: Images.emp2,
      type: 'fire',
      rating: '4.0 ratings',
    },
    {
      coordinate: {
        latitude: 24.917755,
        longitude: 67.0949881,
      },
      title: 'Sophia Patton',
      location: 'Gardening, NY (2km)',
      image: Images.emp3,
      type: 'repair',
      rating: '4.9 ratings',
    },
    {
      coordinate: {
        latitude: 24.9241723,
        longitude: 67.0892863,
      },
      title: 'Jeanette Zimmerman',
      location: 'Gardening, NY (2km)',
      type: 'wash',
      image: Images.emp4,
      rating: '3.6 ratings',
    },
    {
      coordinate: {
        latitude: 24.9215856,
        longitude: 67.0853476,
      },
      title: 'Ray Hammond',
      location: 'Gardening, NY (2km)',
      type: 'mechanic',
      image: Images.emp1,
      rating: '3.8 ratings',
    },
  ];

  const initialMapState = {
    markers,
    region: {
      latitude: 24.9050562,
      longitude: 67.0785654,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const [state, setState] = React.useState(initialMapState);
  const [accessToken, setaccessToken] = React.useState('');
  const [isLoading, setisLoading] = React.useState();
  const [vendorAround, setvendorAround] = React.useState([]);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }

      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeOut);

      const regionTimeOut = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {coordinate} = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350,
          );
        }
      }, SIZES.ten);
    });
  });

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getUserAccessToken();
    });

    return unsubscribe;
  }, [props.navigation]);

  const getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    setaccessToken(token);
    getUserProfile();
  };

  getUserProfile = () => {
    setisLoading(true);
    const onSuccess = ({data}) => {
      let latitude = data.data.records.userProfile.latitude;
      let longitude = data.data.records.userProfile.longitude;

      getVendorAroundYou(latitude, longitude);
      setisLoading(false);
    };

    const onFailure = (error) => {
      setisLoading(false);
      utils.showResponseError(error);
    };

    setisLoading(false);
    Axios.get(Constants.getProfileURL, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  // console.log("response =============>", vendorAround)
  getVendorAroundYou = (latatide, longitude) => {
    setisLoading(true);
    const onSuccess = ({data}) => {
      console.log('Around Data ==============', data.data);
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
        Authorization: accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 2, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const onMarkerPress = (mapEventData) => {
    const markerId = mapEventData._targetInst.return.key;
    let x = markerId * CARD_WIDTH + markerId * SIZES.twenty;
    if (Platform.OS === 'ios') x = x - SPACING_FOR_CARD_INSET;

    _scrollView.current.scrollTo({x: x, y: 0, animate: true});
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

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
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          elevation: SIZES.ten,
          backgroundColor: Colors.white,
          borderBottomLeftRadius: SIZES.twenty,
          borderBottomRightRadius: SIZES.twenty,
          padding: SIZES.twenty,
          shadowColor: '#000',
          shadowOffset: {width: SIZES.five, height: SIZES.five},
          shadowOpacity: 1.0,
          shadowRadius: SIZES.ten,
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <RegularTextCB style={[{fontSize: SIZES.twenty, fontWeight: 'bold'}]}>
            102 Electricians
          </RegularTextCB>
          <LightTextCB style={{fontSize: 14, color: Colors.black}}>
            Near by..
          </LightTextCB>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image source={Images.iconClose} style={styles.iconBack} />
        </TouchableOpacity>
      </View>
      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        initialRegion={state.region}
        customMapStyle={mapStyle}
        style={[styles.container]}>
        {vendorAround.map((marker, index) => {
          {
            /* const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          }; */
          }

          console.log('marker data ==-= ', marker.latitude);

          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: Number(marker.latitude),
                longitude: Number(marker.longitude),
              }}
              onPress={(e) => {
                onMarkerPress(e);
              }}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={{uri: Constants.imageURL + marker.image}}
                  style={styles.marker}
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>

      <Animated.ScrollView
        ref={_scrollView}
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
        )}>
        {vendorAround.map((marker, index) => {
          {
            /* console.log('marker data ==== ', marker) */
          }
          return (
            <TouchableOpacity
              style={styles.card}
              key={index}
              onPress={() => {
                props.navigation.navigate(Constants.viewVendorProfile, {
                  item: marker.id,
                });
              }}>
              <View style={[styles.circleCard]}>
                <Image
                  source={{uri: Constants.imageURL + marker.image}}
                  style={styles.iconUser}
                />
              </View>
              <View style={styles.textContent}>
                <RegularTextCB style={[styles.cardtitle]}>
                  {marker.name}
                </RegularTextCB>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: SIZES.five,
                  }}>
                  <Image
                    source={Images.iconVerified}
                    style={{
                      height: SIZES.fifteen,
                      width: SIZES.fifteen,
                      resizeMode: 'contain',
                    }}
                  />
                  <RegularTextCB
                    style={{
                      fontSize: 14,
                      color: Colors.turqoiseGreen,
                      marginStart: SIZES.five,
                    }}>
                    Verified
                  </RegularTextCB>
                </View>
                <RegularTextCB
                  style={{
                    fontSize: 16,
                    color: Colors.grey,
                    marginTop: SIZES.five,
                  }}>
                  {marker.location}
                </RegularTextCB>
                <RegularTextCB
                  style={{
                    fontSize: 16,
                    color: Colors.orangeYellow,
                    marginTop: SIZES.five,
                  }}>
                  {marker.rating}
                </RegularTextCB>
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{color: '#fff'}}
      />
    </View>
  );
};

export default Nearby;

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
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.fifty,
    height: SIZES.fifty,
    borderRadius: SIZES.fifty,
    overflow: 'hidden',
  },
  marker: {
    width: SIZES.ten * 3,
    height: SIZES.ten * 3,
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
});
