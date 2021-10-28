import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../common/Colors';
import Constants, {SIZES} from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import Axios from '../network/APIKit';
import utils from '../utils';
const {height, width} = Dimensions.get('window');
const CARD_HEIGHT = SIZES.ten * 20;
const CARD_WIDTH = width * 0.4;
const SPACING_FOR_CARD_INSET = width * 0.08 - SIZES.ten;

const Nearby = (props) => {
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
        //     latitudeDelta: 0.0004,
        //     longitudeDelta: 0.0005,
        //   },
        //   500,
        // );

        getVendorAroundYou(position.coords.latitude, position.coords.longitude);

        setRegion({
          latitude: Number(position.coords.latitude),
          longitude: Number(position.coords.longitude),
          latitudeDelta: 0.0304,
          longitudeDelta: 0.0305,
        });
      },
      (error) => {
        // console.log(
        //   'BBBBBBBBBBBAAAAAAAAAAAAABBBBBBBBBBBBAAAAAAAAAAAARRRRRRRRRRRRR: error => ',
        //   error,
        // );
      },
    );
  };

  const getVendorAroundYou = (latatide, longitude) => {
    setisLoading(true);
    const onSuccess = ({data}) => {
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
    <View style={styles.container}>
      {Region.latitude !== 0 && Region.longitude !== 0 ? (
        <MapView
          ref={_map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: Region.latitude,
            longitude: Region.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
          customMapStyle={mapStyle}
          style={[styles.container]}>
          {/* <Marker
          coordinate={{
            latitude: Region.latitude,
            longitude: Region.longitude,
          }}>
          <Image
            source={{uri: Constants.imageURL + userImage}}
            style={{
              height: SIZES.ten * 5,
              width: SIZES.ten * 5,
              borderRadius: SIZES.ten * 5,
            }}
          />
        </Marker> */}
          {vendorAround && vendorAround.length
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
            : null}
        </MapView>
      ) : null}

      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          flexDirection: 'row',
          backgroundColor: Colors.white,
          borderBottomLeftRadius: SIZES.twenty,
          borderBottomRightRadius: SIZES.twenty,
          alignItems: 'center',
          height: Platform.OS === 'android' ? SIZES.fifty : SIZES.fifty * 1.5,
          elevation: SIZES.ten,
          shadowColor: '#000',
          shadowOffset: {width: SIZES.five, height: SIZES.five},
          shadowOpacity: 1.0,
          shadowRadius: SIZES.ten,
        }}>
        <TouchableOpacity
          style={{
            height: SIZES.ten * 6,
            width: SIZES.ten * 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            props.navigation.goBack();
          }}
          activeOpacity={0.6}>
          <Image
            source={Images.arrowBack}
            style={[styles.iconBack, {tintColor: Colors.black}]}
          />
        </TouchableOpacity>
        <RegularTextCB style={[{fontSize: SIZES.twenty, fontWeight: '600'}]}>
          Vendors Around You
        </RegularTextCB>
      </View>

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
    borderRadius: SIZES.ten * 6,
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
});
