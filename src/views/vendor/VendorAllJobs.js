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
import Colors from '../../common/Colors';
import Constants, {SIZES} from '../../common/Constants';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import LightTextCB from '../../components/LightTextCB';
import utils from '../../utils';
import Axios from '../../network/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import ListComponent from '../../components/ListComponent';

export default class VendorAllJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      accessToken: '',
      allJobsAround: [],
    };
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
      this.getUserProfile();
    });
  };

  getUserProfile = async () => {
    const onSuccess = ({data}) => {
      // console.log('Data============',data.data.records)
      const latitude = data.data.records.userProfile.latitude;
      const longitude = data.data.records.userProfile.longitude;
      this.getJobAroundYou(latitude, longitude);
    };

    // console.log('lat',this.state.lat)

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    this.setState({isLoading: true});
    Axios.get(Constants.getProfileURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getJobAroundYou = async (latitude, longitude) => {
    let params = {
      lat: latitude,
      lng: longitude,
    };
    this.setState({isLoading: true});

    const onSuccess = ({data}) => {
      // console.log(' Job All Job Around you =====', data);

      // utils.showToast(data.message);
      this.setState({
        isLoading: false,
        allJobsAround: data.data,
      });
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };
    this.setState({isLoading: true});
    Axios.post(Constants.getJobAround, params, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  renderSingleCategoriesItem = ({item}) => {
    return <ListComponent item={item} />;
  };

  openNextScreen = (nextScreen) => {
    this.props.navigation.navigate(nextScreen);
  };

  render() {
    return (
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: Platform.OS === 'android' ? 0 : SIZES.ten,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: SIZES.ten}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={Images.arrowBack}
              style={[styles.iconBack, {tintColor: Colors.black}]}
            />
          </TouchableOpacity>

          <RegularTextCB style={{fontSize: 30, color: Colors.black}}>
            View All Jobs
          </RegularTextCB>
        </View>

        <View>
          <FlatList
            style={{marginTop: SIZES.ten}}
            data={this.state.allJobsAround}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={this.renderSingleCategoriesItem}
            contentInset={{
              // for ios
              bottom: SIZES.ten * 10,
            }}
            contentContainerStyle={{
              // for android
              paddingBottom: SIZES.ten * 10,
              alignItems: 'center',
            }}
          />
        </View>

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
    height: SIZES.ten * 10,
    width: SIZES.ten * 10,
    resizeMode: 'contain',
  },
  iconUser: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: (SIZES.ten * 6) / 2,
    resizeMode: 'contain',
  },
  iconPassword: {
    fontSize: 20,
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
    height: SIZES.fifty - 5,
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
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
