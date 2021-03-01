import React, {Component, useEffect} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Colors from '../common/Colors';
import Images from '../common/Images';
import LightTextCB from '../components/LightTextCB';

const {height, width} = Dimensions.get('window');
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.5;
const SPACING_FOR_CARD_INSET = width * 0.08 - 10;

const Nearby = (props) => {
  /*componentDidMount() {
    console.log('position');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(
          'position: ' +
            position.coords.latitude +
            ' ' +
            position.coords.longitude,
        );
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        console.log('error: ' + error.message);
        this.setState({
          error: error.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      },
    );
  }*/

  const markers = [
    {
      coordinate: {
        latitude: 24.9181723,
        longitude: 67.0881384,
      },
      title: 'Ray Hammond',
      location: 'Gardening, NY (2km)',
      image: Images.emp1,
      rating: '4.6 ratings',
    },
    {
      coordinate: {
        latitude: 24.918221,
        longitude: 67.0807891,
      },
      title: 'Gene Mitchell',
      location: 'Gardening, NY (2km)',
      image: Images.emp2,
      rating: '4.0 ratings',
    },
    {
      coordinate: {
        latitude: 24.9232178,
        longitude: 67.0882784,
      },
      title: 'Sophia Patton',
      location: 'Gardening, NY (2km)',
      image: Images.emp3,
      rating: '4.9 ratings',
    },
    {
      coordinate: {
        latitude: 24.9234902,
        longitude: 67.0875381,
      },
      title: 'Jeanette Zimmerman',
      location: 'Gardening, NY (2km)',
      image: Images.emp4,
      rating: '3.6 ratings',
    },
    {
      coordinate: {
        latitude: 24.9248217,
        longitude: 67.0965359,
      },
      title: 'Ray Hammond',
      location: 'Gardening, NY (2km)',
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
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const onMarkerPress = (mapEventData) => {
    const markerId = mapEventData._targetInst.return.key;
    let x = markerId * CARD_WIDTH + markerId * 20;
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
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}>
        <Image source={Images.arrowBack} style={styles.iconBack} />
      </TouchableOpacity>
      <LightTextCB style={{fontSize: 30, marginHorizontal: 20, marginTop: 20}}>
        102 Electricians
      </LightTextCB>
      <LightTextCB
        style={{fontSize: 20, marginHorizontal: 20, color: Colors.black1}}>
        Near by..
      </LightTextCB>
      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        initialRegion={state.region}
        customMapStyle={mapStyle}
        style={[styles.container, {marginTop: 10}]}>
        {state.markers.map((marker, index) => {
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
              coordinate={marker.coordinate}
              onPress={(e) => {
                onMarkerPress(e);
              }}>
              <Animated.View style={[styles.markerWrap, scaleStyle]}>
                <Animated.Image
                  source={Images.mapMarker}
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
          {useNativeDriver: true},
        )}>
        {state.markers.map((marker, index) => {
          return (
            <TouchableOpacity
              style={styles.card}
              key={index}
              onPress={() => props.navigation.navigate('ConfirmBooking')}>
              <Image source={marker.image} style={styles.iconUser} />
              <View style={styles.textContent}>
                <LightTextCB style={[styles.cardtitle]}>
                  {marker.title}
                </LightTextCB>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: 5,
                  }}>
                  <LightTextCB style={{fontSize: 16, color: Colors.black1}}>
                    Verified
                  </LightTextCB>
                  <Image
                    source={Images.tickVerified}
                    style={{height: 20, width: 20, marginStart: 5}}
                  />
                </View>
                <LightTextCB
                  style={{fontSize: 16, color: Colors.grey, marginTop: 5}}>
                  {marker.location}
                </LightTextCB>
                <LightTextCB
                  style={{fontSize: 16, color: Colors.orange, marginTop: 5}}>
                  {marker.rating}
                </LightTextCB>
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
    height: 20,
    width: 20,
    marginStart: 20,
    marginTop: 40,
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
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
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
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    alignItems: 'center',
    height: CARD_HEIGHT,
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
    borderRadius: 60 / 2,
    resizeMode: 'contain',
  },
  textContent: {
    padding: 10,
    alignItems: 'center',
  },
  cardtitle: {
    color: Colors.black1,
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
