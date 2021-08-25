import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import LightTextCB from '../components/LightTextCB';
import RegularTextCB from '../components/RegularTextCB';
import Axios from '../network/APIKit';
import utils from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height, width } = Dimensions.get('window');
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.5;
const SPACING_FOR_CARD_INSET = width * 0.08 - 10;

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
  const [accessToken, setaccessToken] = React.useState("");
  const [isLoading, setisLoading] = React.useState();
  const [vendorAround, setvendorAround] = React.useState([])

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {

    mapAnimation.addListener(({ value }) => {
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
          const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  });

  useEffect(() => {
    getUserAccessToken();
  }, [])

  const getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    setaccessToken(token);
    getVendorAroundYou()
  };

  console.log("response =============>", vendorAround)
  getVendorAroundYou = () => {
    
    console.log("getVendorAroundYou===============>");
    const onSuccess = ({ data }) => {
      setvendorAround(data.data);
      // setisLoading(false);


    };

    const onFailure = (error) => {
      setisLoading(false);
      utils.showResponseError(error);
    };

    setisLoading(true);

    let params = {
      latitude: "24.90628280557342",
      longitude: "67.07237028142383",
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

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerId = mapEventData._targetInst.return.key;
    let x = markerId * CARD_WIDTH + markerId * 20;
    if (Platform.OS === 'ios') x = x - SPACING_FOR_CARD_INSET;

    _scrollView.current.scrollTo({ x: x, y: 0, animate: true });
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
          elevation: 10,
          backgroundColor: Colors.white,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          padding: 15,
          shadowColor: '#000',
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 1.0,
          shadowRadius: 10,
          alignItems: 'center',
        }}>
        <View style={{ flex: 1 }}>
          <RegularTextCB style={{ fontSize: 20 }}>102 Electricians</RegularTextCB>
          <LightTextCB style={{ fontSize: 16, color: Colors.black }}>
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
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={{ latitude :parseFloat(marker.latitude),longitude :parseFloat(marker.longitude)}}
              onPress={(e) => {
                onMarkerPress(e);
              }}>
              <Animated.View style={[styles.markerWrap, scaleStyle]}>
                <Animated.Image
                  source={
                    marker.type === 'customer'
                      ? Images.markerMechanic
                      : marker.type === 'fire'
                        ? Images.markerFireman
                        : marker.type === 'repair'
                          ? Images.markerRepairer
                          : Images.markerWash
                  }
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
        snapToInterval={CARD_WIDTH + 20}
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
          { useNativeDriver: true },
        )}>
        {vendorAround.map((marker, index) => {
          return (
            <TouchableOpacity
              style={styles.card}
              key={index}
              onPress={() =>
                props.navigation.navigate(Constants.viewVendorProfile,{
                  username:marker.name,
                  email:marker.email,
                  phoneNumber:marker.phone,
                  countrycode:marker.country_code,
                  location:marker.location,
                  avator:marker.image
                })
              }>
              <View style={styles.circleCard}>
                <Image
                  source={{uri:Constants.imageURL+marker.image}}
                  style={styles.iconUser}
                  resizeMode="cover"
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
                    marginTop: 5,
                  }}>
                  <Image
                    source={Images.iconVerified}
                    style={{ height: 15, width: 15, resizeMode: 'contain' }}
                  />
                  <RegularTextCB
                    style={{
                      fontSize: 14,
                      color: Colors.turqoiseGreen,
                      marginStart: 5,
                    }}>
                    Verified
                  </RegularTextCB>
                </View>
                <RegularTextCB
                  style={{ fontSize: 16, color: Colors.grey, marginTop: 5 }}>
                  {marker.location}
                </RegularTextCB>
                <RegularTextCB
                  style={{
                    fontSize: 16,
                    color: Colors.orangeYellow,
                    marginTop: 5,
                  }}>
                  {marker.rating}
                </RegularTextCB>
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default Nearby;

const styles = StyleSheet.create({
  iconBack: {
    height: 15,
    width: 15,
    tintColor: Colors.coolGrey,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 10,
    alignItems: 'center',
    width: CARD_WIDTH,
    paddingVertical: 20,
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
    height: 60,
    width: 60,
    borderRadius: 30,
    resizeMode: 'contain',
  },
  circleCard: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  textContent: {
    padding: 10,
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
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
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
