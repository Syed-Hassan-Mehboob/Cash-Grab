import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  LogBox,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from '../../common/Colors';
import RegularTextCB from '../../components/RegularTextCB';
import Images from '../../common/Images';
import ButtonRadius10 from '../../components/ButtonRadius10';
import Constants, {SIZES} from '../../common/Constants';
import utils from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../../network/APIKit';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

const {height, width} = Dimensions.get('window');

export default class WithDraw extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    sliderValue: 0,
    min: 0,
    max: 500,
    isLoading: true,
    totalEarning: 0,
    accessToken: '',
  };

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.getUserAccessToken();
    this.props.navigation.addListener('focus', () => {
      this.getUserAccessToken();
    });
  }

  getUserAccessToken = async () => {
    this.setState({isLoading: true});
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token});
    this.getDashboardData();
    this.setState({isLoading: false});
  };

  getDashboardData = () => {
    const onSuccess = ({data}) => {
      console.log('Widraw screen ', data?.data.total_earning);
      this.setState(
        {
          totalEarning: data?.data.total_earning,
        },
        () => {
          this.setState({isLoading: false});
        },
      );
    };

    const onFailure = (error) => {
      // this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    this.setState({isLoading: true});
    Axios.get(Constants.VendorDashboardEarning, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  handleWidrawAmount = () => {
    const onSuccess = ({data}) => {
      console.log('widraw Responce =======>>>>>', data);
      this.setState({isLoading: false});
      utils.showToast(data.message);
      setTimeout(() => {
        this.props.navigation.goBack();
      }, 500);
    };

    const onFailure = (error) => {
      // this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    const params = {
      amount: this.state.sliderValue,
    };

    const option = {
      headers: {
        Authorization: this.state.accessToken,
      },
    };

    this.setState({isLoading: true});
    Axios.post(Constants.WidrawAmount, params, option)
      .then(onSuccess)
      .catch(onFailure);
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: SIZES.fifteen,
            marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: SIZES.ten}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={[styles.iconBack]} />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: 30}}>Confirm Withdraw</RegularTextCB>
        </View>
        <View
          style={[
            styles.card,
            {
              padding: SIZES.fifteen,
              marginHorizontal: SIZES.fifteen,
              marginTop: SIZES.ten,
            },
          ]}>
          <View style={{flexDirection: 'row'}}>
            <RegularTextCB style={{fontSize: 16, color: Colors.coolGrey}}>
              Amount
            </RegularTextCB>
            <RegularTextCB
              style={{
                fontSize: 16,
                color: Colors.black,
                marginStart: SIZES.five,
              }}>
              ${this.state.sliderValue}
            </RegularTextCB>
          </View>
          <Slider
            style={{
              width: '100%',
              height: SIZES.fifteen,
            }}
            minimumValue={this.state.min}
            maximumValue={Number(this.state.totalEarning)}
            step={5}
            minimumTrackTintColor={Colors.silver}
            maximumTrackTintColor={Colors.silver}
            thumbImage={Images.sliderThumb}
            onValueChange={(number) =>
              this.setState({sliderValue: parseInt(number)})
            }
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingHorizontal: SIZES.ten,
              paddingVertical: SIZES.ten,
              justifyContent: 'space-between',
            }}>
            <RegularTextCB>{this.state.min}</RegularTextCB>
            <RegularTextCB>{this.state.totalEarning}</RegularTextCB>
          </View>
        </View>
        <RegularTextCB
          style={{
            fontSize: 14,
            color: Colors.coolGrey,
            marginTop: SIZES.twenty,
            marginHorizontal: SIZES.fifteen,
          }}>
          You are about to withdraw this amount
        </RegularTextCB>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: SIZES.twentyFive,
            marginHorizontal: SIZES.fifteen,
          }}>
          <RegularTextCB
            style={{
              fontSize: 14,
              color: Colors.coolGrey,
            }}>
            Requested Amount
          </RegularTextCB>
          <RegularTextCB
            style={{
              fontSize: 14,
              color: Colors.black,
            }}>
            $ {this.state.sliderValue}
          </RegularTextCB>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: SIZES.ten,
            marginHorizontal: SIZES.fifteen,
          }}>
          <RegularTextCB
            style={{
              fontSize: 14,
              color: Colors.coolGrey,
            }}>
            Requested Date
          </RegularTextCB>
          <RegularTextCB
            style={{
              fontSize: 14,
              color: Colors.black,
            }}>
            {moment().format('dddd, MMMM Do YYYY, h:mm:ss a').split(',')[1]}
          </RegularTextCB>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: SIZES.ten,
            marginHorizontal: SIZES.fifteen,
          }}>
          <RegularTextCB
            style={{
              fontSize: 14,
              color: Colors.coolGrey,
            }}>
            Withdraw Type
          </RegularTextCB>
          <RegularTextCB
            style={{
              fontSize: 14,
              color: Colors.black,
            }}>
            Advance
          </RegularTextCB>
        </View> */}
        <View
          style={{
            marginTop: SIZES.twenty,
            marginHorizontal: SIZES.fifteen,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={Images.visa}
            style={{
              height: SIZES.fif,
              width: SIZES.ten * 8,
              resizeMode: 'contain',
            }}
          />
          <RegularTextCB
            style={{color: Colors.coolGrey, marginStart: SIZES.twenty}}>
            **** **** **** 7989
          </RegularTextCB>
        </View>
        <RegularTextCB
          style={{
            color: Colors.coolGrey,
            marginTop: SIZES.twenty,
            marginHorizontal: SIZES.fifteen,
          }}>
          Advance cash typically take 30 mints but it may take up to 2 hours
          depending on your bank.
        </RegularTextCB>
        <View
          style={{
            padding: SIZES.fifteen,
            position: 'absolute',
            bottom: 0,
            start: 0,
            end: 0,
          }}>
          <ButtonRadius10
            onPress={() => {
              this.handleWidrawAmount();
            }}
            label="CONFIRM WITHDRAW"
            bgColor={Colors.sickGreen}
          />
        </View>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={{color: '#ffff', fontFamily: Constants.fontRegular}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    height: SIZES.ten * 12,
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    padding: SIZES.twenty,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    alignItems: 'center',
  },
  thumb: {
    width: SIZES.ten * 4,
    height: SIZES.ten * 4,
    backgroundColor: 'transparent',
  },
});
