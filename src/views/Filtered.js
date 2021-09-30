import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  LogBox,
} from 'react-native';
import Colors from '../common/Colors';
import Constants, {FONTS, SIZES, STYLES} from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import LightTextCB from '../components/LightTextCB';
import utils from '../utils';
import Axios from '../network/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import FilterComponant from '../components/FilterComponant';
import Geolocation from '@react-native-community/geolocation';
import {Icon} from 'native-base';

export default class FileredScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      accessToken: '',
      allJobs: [],
      seeAllClicked: false,
      currentLat: '',
      currentLong: '',
    };

    //console.log('==========', this.props.route.params);
  }
  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.getUserAccessToken();
    this.props.navigation.addListener('focus', () => {
      this.getUserAccessToken();
    });
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => {
      this.getLocation();
      this.getUserProfile();
    });
  };

  checkLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        // ////console.log('location permission denied');
        this.setState({permissionModalVisibility: true});
      }
    } catch (err) {
      ////console.log('getLocation catch: ==================> ', err);
    }
  };

  getUserProfile = () => {
    const onSuccess = ({data}) => {
      let type = data.data.records.type;

      //console.log('Type ===== ', type);

      this.getFilterData(type);
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
    };
    Axios.get(Constants.getProfileURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getLocation = async () => {
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

        console.log('Filterd Geo Location === ===', position.coords);

        this.setState({
          currentLat: position.coords.latitude,
          currentLong: position.coords.longitude,
        });
        // this.getUserAccessToken();
        // this.getUserProfile();
      },
      (error) => {
        // //console.log(
        //   'BBBBBBBBBBBAAAAAAAAAAAAABBBBBBBBBBBBAAAAAAAAAAAARRRRRRRRRRRRR: error => ',
        //   error,
        // );
      },
    );

    // watchID = Geolocation.watchPosition((position) => {
    //   const lastPosition = JSON.stringify(position);
    //   ////console.log('humzaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    // });
  };

  getFilterData = (type) => {
    const postData = {
      type: type,

      categoryId:
        this.props.route.params.selectedCategory !== undefined
          ? this.props.route.params.selectedCategory.id
          : '',

      min_price:
        this.props.route.params.minPrice !== null &&
        this.props.route.params.minPrice !== undefined &&
        this.props.route.params.minPrice !== ''
          ? this.props.route.params.minPrice
          : 0,

      max_price:
        this.props.route.params.maxPrice !== null &&
        this.props.route.params.maxPrice !== undefined &&
        this.props.route.params.maxPrice !== ''
          ? this.props.route.params.maxPrice
          : 0,
      distance:
        this.props.route.params.location !== null &&
        this.props.route.params.location !== undefined
          ? this.props.route.params.location.name
          : 0,

      lat: this.state.currentLat,
      lng: this.state.currentLong,
      // lat: 22.90628280557342,
      // lng: 67.07237028142383,
    };

    console.log('Post Data  ===== ', postData);

    this.setState({isLoading: true});

    const onSuccess = ({data}) => {
      console.log(
        '======================== Filtered Data =================',
        data,
      );
      //   utils.showToast(data.message);
      this.setState({isLoading: false, allJobs: data.data});

      if (data.status === 0) {
        utils.showToast(data.message);
        // this.props.navigation.goBack();
        // setTimeout(() => {}, 1000);
      }
    };

    const onFailure = (error) => {
      console.log(
        '=========================== Filtered Error ===================',
        error,
      );
      this.setState({isLoading: false});

      // utils.showResponseError(error.massage);
    };
    const options = {
      headers: {
        Authorization: this.state.accessToken,
      },
    };
    Axios.post(Constants.customerFilter, postData, options)
      .then(onSuccess)
      .catch(onFailure);
  };

  formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }

    return data;
  };
  renderSingleCategoriesItem = ({item}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return <FilterComponant item={item} />;
  };

  openNextScreen = (nextScreen) => {
    this.props.navigation.navigate(nextScreen);
  };

  render() {
    return (
      <View style={[STYLES.container, {paddingHorizontal: SIZES.ten}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 0}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Icon
              type="AntDesign"
              name="left"
              style={{color: Colors.black, fontSize: SIZES.ten * 3}}
            />
          </TouchableOpacity>

          <RegularTextCB style={[{fontSize: 22}]}>Filtered Job</RegularTextCB>
        </View>

        {/* <FlatList
          style={{marginTop: SIZES.ten}}
          data={this.state.allJobs}
          numColumns={2}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderSingleCategoriesItem}
          contentInset={{
            // for ios
            bottom: SIZES.ten,
          }}
          contentContainerStyle={{
            // for android
            // paddingBottom: SIZES.twenty,
            alignItems: 'center',
          }}
        /> */}

        <FlatList
          numColumns={2}
          data={this.formatData(this.state.allJobs, 2)}
          keyExtractor={(index) => index}
          renderItem={this.renderSingleCategoriesItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: SIZES.twenty,
            alignItems: 'center',
            marginTop: SIZES.ten * 3,
            paddingBottom: SIZES.twenty,
          }}
          contentInset={{
            // for ios
            bottom: SIZES.ten,
          }}
        />

        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  iconFilter: {
    height: SIZES.ten * 3,
    width: SIZES.ten * 3,
    resizeMode: 'contain',
  },
  iconForward: {
    height: SIZES.ten,
    width: SIZES.ten,
    resizeMode: 'contain',
  },
  iconUser: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: (SIZES.ten * 6) / 2,
    resizeMode: 'contain',
  },
  iconPassword: {
    fontSize: SIZES.twenty,
    height: SIZES.twenty,
    width: SIZES.twenty,
    alignSelf: 'center',
    color: Colors.orange,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: SIZES.fifteen,
    paddingHorizontal: SIZES.five,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  itemContainer: {
    padding: SIZES.twenty,
    flex: 1,
  },
  formLabel: {
    fontSize: 16,
    color: Colors.grey,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: Constants.fontLight,
    color: Colors.black,
  },
  textInputContainer: {
    borderBottomWidth: 0.3,
    height: 45,
    borderColor: Colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  underlineText: {
    color: Colors.black,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  noUnderlineText: {
    color: Colors.black,
    textDecorationLine: 'none',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  circleCard: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: SIZES.ten * 3,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    // height: Dimensions.get('window').width / 2, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    padding: SIZES.ten,
    marginHorizontal: SIZES.fifteen,
    marginBottom: SIZES.twenty,
    marginTop: SIZES.five,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
