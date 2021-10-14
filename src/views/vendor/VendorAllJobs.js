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
import Constants, {FONTS, SIZES, STYLES, width} from '../../common/Constants';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import LightTextCB from '../../components/LightTextCB';
import utils from '../../utils';
import Axios from '../../network/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import ListComponent from '../../components/ListComponent';
import NormalHeader from '../../components/NormalHeader';

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
      this.getJobAroundYou();
    });
  };

  // getUserProfile = async () => {
  //   const onSuccess = ({data}) => {
  //     // console.log('Data============',data.data.records)
  //     const latitude = data.data.records.user_profiles.latitude;
  //     const longitude = data.data.records.user_profiles.longitude;
  //   };
  //   // console.log('lat',this.state.lat)
  //   const onFailure = (error) => {
  //     this.setState({isLoading: false});
  //     utils.showResponseError(error);
  //   };

  //   this.setState({isLoading: true});
  //   Axios.get(Constants.getProfileURL, {
  //     headers: {
  //       Authorization: this.state.accessToken,
  //     },
  //   })
  //     .then(onSuccess)
  //     .catch(onFailure);
  // };

  getJobAroundYou = async () => {
    // let params = {
    //   lat: latitude,
    //   lng: longitude,
    // };
    this.setState({isLoading: true});

    const onSuccess = ({data}) => {
      console.log(' Job All Job Around you =====', data.data);

      // utils.showToast(data.message);
      this.setState({
        isLoading: false,
        allJobsAround: data.data.records,
      });
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };
    this.setState({isLoading: true});

    Axios.get(Constants.getAllJobs, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  renderSingleCategoriesItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.card,
          {
            padding: SIZES.fifteen,
            marginHorizontal: SIZES.five / 1.3,
            marginVertical: SIZES.five * 1.5,
          },
        ]}
        onPress={() =>
          this.props.navigation.navigate(Constants.viewJob, {
            item: item.id,
          })
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.circleCard}>
            <Image
              source={{
                uri:
                  item.user.userProfile.image !== null &&
                  item.user.userProfile.image !== undefined
                    ? Constants.imageURL + item.user.userProfile.image
                    : '',
              }}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View style={{marginStart: 10}}>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {item.user.name !== null && item.user.name !== undefined
                ? item.user.name
                : ''}
            </RegularTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <Image
                source={Images.iconVerified}
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  tintColor:
                    item.email_verified_at !== null
                      ? Colors.turqoiseGreen
                      : 'red',
                }}
              />
              <RegularTextCB
                style={{
                  color:
                    item.email_verified_at !== null
                      ? Colors.turqoiseGreen
                      : 'red',
                  fontSize: 12,
                  marginStart: 5,
                }}>
                {item.email_verified_at !== null ? 'Verified' : 'Unverified'}
              </RegularTextCB>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
            {item.title !== null && item.title !== undefined ? item.title : ''}
          </RegularTextCB>

          <LightTextCB style={[{color: Colors.black, fontSize: 14}]}>
            {'$ '}
            {item.price !== null && item.price !== undefined ? item.price : ''}
          </LightTextCB>
        </View>
        <View style={{}}>
          <RegularTextCB style={{color: Colors.coolGrey}}>
            {item.description !== null && item.description !== undefined
              ? item.description
              : ''}{' '}
          </RegularTextCB>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Image
            source={Images.iconLocationPin}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
          />
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
              marginStart: 5,
            }}>
            {item.address !== null && item.address !== undefined
              ? item.address
              : ''}
          </RegularTextCB>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Image
            source={Images.iconStopWatch}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
          />
          <View
            style={{
              flexDirection: 'row',
              marginStart: 5,
              alignItems: 'center',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
              }}>
              {item.time !== null && item.time !== undefined ? item.time : ''}
            </RegularTextCB>
            <RegularTextCB
              style={[
                {
                  color: Colors.black,
                  fontSize: 18,
                  textDecorationLine: 'underline',
                },
              ]}>
              {'View Job '}
            </RegularTextCB>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  openNextScreen = (nextScreen) => {
    this.props.navigation.navigate(nextScreen);
  };

  render() {
    return (
      <View style={STYLES.container}>
        <NormalHeader name="All Jobs" />
        <View style={{}}>
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
    width: width - 30,
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
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
