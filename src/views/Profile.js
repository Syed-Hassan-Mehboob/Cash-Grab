import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {StatusBar} from 'react-native';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../common/Colors';
import Constants, {SIZES} from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import Axios from '../network/APIKit';
import utils from '../utils';

const {width, height} = Dimensions.get('window');

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isLoading: false,
    accessToken: '',
    avatar: '',
    name: '',
    email: '',
    countryCode: '',
    countryFlag: '',
    phone: '',
    location: '',
    abouteMe: '',
  };

  componentDidMount() {
    this.getUserAccessToken();
    this.props.navigation.addListener('focus', () => {
      this.getUserAccessToken();
    });
  }

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => this.getUserProfile());
  };

  getUserProfile = () => {
    const onSuccess = ({data}) => {
      console.log('Profile data ==== ', data.data.records);
      this.toggleIsLoading();
      this.setState({
        avatar: data.data.records.userProfile.image,
        name: data.data.records.name,
        email: data.data.records.email,
        countryCode: data.data.records.country_code,
        countryFlag: data.data.records.country_flag,
        phone: data.data.records.phone,
        location: data.data.records.userProfile.location,
        abouteMe: data.data.records.userProfile.about_me,
      });
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
    };

    this.toggleIsLoading();
    Axios.get(Constants.getProfileURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.navy} barStyle="light-content" />

        <View
          style={{
            borderBottomStartRadius: SIZES.ten * 3,
            borderBottomEndRadius: SIZES.ten * 3,
            height: height / 2.15,
            backgroundColor: Colors.navy,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: 15,
              marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
              marginBottom: Platform.OS === 'android' ? 0 : SIZES.twenty,
              // backgroundColor: 'red',
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: SIZES.ten,
                width: SIZES.fifteen,
                height: SIZES.fifteen,
              }}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={Images.arrowBack}
                style={[styles.iconBack, {tintColor: Colors.white}]}
              />
            </TouchableOpacity>
            <RegularTextCB style={{fontSize: 30, color: Colors.white}}>
              Profile
            </RegularTextCB>
            <TouchableOpacity
              style={{position: 'absolute', right: SIZES.ten}}
              onPress={() => {
                this.props.navigation.navigate(Constants.editProfile);
              }}>
              <Image
                source={Images.iconEdit}
                style={{
                  height: SIZES.twenty,
                  width: SIZES.twenty,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.circleCard}>
            <Image
              source={{uri: Constants.imageURL + this.state.avatar}}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
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
                color: Colors.turqoiseGreen,
                fontSize: 14,
                marginStart: SIZES.five,
              }}>
              Verified
            </RegularTextCB>
          </View>
          <RegularTextCB
            style={{color: Colors.white, fontSize: 18, marginTop: SIZES.five}}>
            {this.state.name}
          </RegularTextCB>
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
              fontSize: 16,
              textAlign: 'center',
              marginTop: SIZES.five,
            }}
            numberOfLines={2}>
            {this.state.abouteMe != null
              ? this.state.abouteMe
              : 'Aboute Me is Not Define '}
          </RegularTextCB>
        </View>
        <View
          style={[
            styles.card,
            {
              marginHorizontal: SIZES.twenty,
              marginTop: -SIZES.twenty,
              padding: SIZES.twenty,
            },
          ]}>
          <View
            style={[
              styles.card,
              {
                marginTop: -SIZES.ten * 4,
                paddingVertical: SIZES.ten,
                paddingHorizontal: SIZES.twenty,
                borderWidth: 1,
                borderColor: Colors.sickGreen,
              },
            ]}>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              Description
            </RegularTextCB>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: SIZES.ten,
            }}>
            <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
              User Name
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {this.state.name}
            </RegularTextCB>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: SIZES.ten,
            }}>
            <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
              Email Address
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {this.state.email}
            </RegularTextCB>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: SIZES.ten,
            }}>
            <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
              Phone No.
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {this.state.countryCode.concat('', this.state.phone)}
            </RegularTextCB>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: SIZES.ten,
            }}>
            <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
              Location
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {this.state.location}
            </RegularTextCB>
          </View>
        </View>
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
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    padding: SIZES.twenty,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.5,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    alignItems: 'center',
  },
  iconUser: {
    height: SIZES.ten * 9,
    width: SIZES.ten * 9,
    borderRadius: (SIZES.ten * 9) / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height: SIZES.ten * 9,
    width: SIZES.ten * 9,
    borderRadius: 45,
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
