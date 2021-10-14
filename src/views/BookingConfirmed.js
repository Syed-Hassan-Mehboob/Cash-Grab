import {CommonActions} from '@react-navigation/native';
import {Card} from 'native-base';
import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../common/Colors';
import Constants, {SIZES, STYLES} from '../common/Constants';
import Images from '../common/Images';
import ButtonRadius10 from '../components/ButtonRadius10';
import LightTextCB from '../components/LightTextCB';
import RegularTextCB from '../components/RegularTextCB';
import BoldTextCB from '../components/BoldTextCB';
import moment from 'moment';

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{name: 'Tab'}],
});

export default class BookingConfirmed extends Component {
  constructor(props) {
    super(props);
  }

  navigateToHome() {
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    // console.log(
    //   'order data >>>>>>>>>',
    //   this.props.route.params.orderData.order_date,
    // );
    var date = moment(this.props.route.params.orderData.order_date)
      .format('LLLLL')
      .split(',')[0]
      .concat(
        moment(this.props.route.params.orderData.order_date)
          .format('LLLLL')
          .split(',')[1],
      )
      .concat(
        ' ' +
          moment(this.props.route.params.orderData.order_date)
            .format('LLLLL')
            .split(',')[2]
            .split(' ')[1],
      );
    // let date = moment(this.props.route.params.orderData.order_date).format(
    //   'MMMM Do YYYY',
    // );
    // console.log('ffffff', date);
    return (
      <View style={STYLES.container}>
        <View style={[styles.childContainer, {marginTop: SIZES.five}]}>
          <Image
            source={Images.greenTick}
            resizeMode="contain"
            style={{height: SIZES.fifteen * 7.5, width: SIZES.fifteen * 7.5}}
          />
          <BoldTextCB
            style={{fontSize: SIZES.ten * 3, marginTop: SIZES.ten * 2.5}}>
            Booking Confirmed
          </BoldTextCB>
          <RegularTextCB
            style={{
              fontSize: 18,
              marginTop: SIZES.five * 4.5,
              marginStart: SIZES.ten * 3,
              marginEnd: SIZES.ten * 3,
              textAlign: 'center',
              color: Colors.coolGrey,
            }}>
            Your booking has been confirmed for {date !== null ? date : ''} (
            {this.props.route.params.orderData.order_time !== null
              ? this.props.route.params.orderData.order_time
              : ''}
            )
          </RegularTextCB>
          <View
            style={[
              styles.card,
              {
                marginTop: SIZES.twenty,
              },
            ]}>
            <View style={styles.itemContainer}>
              <View style={styles.circleCard}>
                <Image
                  source={{
                    uri:
                      this.props.route.params.orderData.vendor.user_profiles
                        .image !== null
                        ? Constants.imageURL +
                          this.props.route.params.orderData.vendor.user_profiles
                            .image
                        : '',
                  }}
                  style={styles.iconUser}
                  resizeMode="cover"
                />
              </View>
              <RegularTextCB
                style={{fontSize: SIZES.twenty, marginTop: SIZES.five * 4}}>
                {this.props.route.params.orderData.vendor.name !== null
                  ? this.props.route.params.orderData.vendor.name
                  : ''}
              </RegularTextCB>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: SIZES.five / 2,
                }}>
                <Image
                  source={Images.iconVerified}
                  style={{
                    height: SIZES.twentyFive,
                    width: SIZES.twentyFive,
                    resizeMode: 'contain',
                  }}
                />
                <RegularTextCB
                  style={{
                    color: Colors.turqoiseGreen,
                    fontSize: 16,
                    marginStart: SIZES.five,
                  }}>
                  {this.props.route.params.orderData.vendor.user_profiles
                    .created_at !== null
                    ? 'Verified'
                    : 'unVerified'}
                </RegularTextCB>
              </View>
              <RegularTextCB
                style={{
                  fontSize: 18,
                  color: Colors.coolGrey,
                  marginTop: SIZES.five,
                }}>
                {this.props.route.params.orderData.vendor.user_profiles
                  .location !== null
                  ? this.props.route.params.orderData.vendor.user_profiles
                      .location
                  : ''}
              </RegularTextCB>
              <RegularTextCB
                style={{
                  fontSize: 18,
                  color: Colors.orangeYellow,
                  marginTop: SIZES.five,
                }}>
                {this.props.route.params.orderData.vendor.ratings !== null
                  ? this.props.route.params.orderData.vendor.ratings
                  : ''}{' '}
                ratings
              </RegularTextCB>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: SIZES.fifteen,
          }}>
          <ButtonRadius10
            onPress={() => this.navigateToHome()}
            label="CONTINUE"
            bgColor={Colors.sickGreen}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    marginTop: SIZES.twenty,
    resizeMode: 'contain',
  },
  iconFilter: {
    height: SIZES.ten * 3,
    width: SIZES.ten * 3,
    resizeMode: 'contain',
  },
  iconForward: {
    height: SIZES.fifteen - 3,
    width: SIZES.fifteen - 3,
    resizeMode: 'contain',
  },
  iconUser: {
    height: SIZES.ten * 8,
    width: SIZES.ten * 8,
    borderRadius: (SIZES.ten * 8) / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height: SIZES.ten * 8,
    width: SIZES.ten * 8,
    borderRadius: SIZES.ten * 4,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten * 10,
    elevation: SIZES.ten * 10,
    paddingHorizontal: SIZES.twenty,
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
    padding: SIZES.twenty,
  },
  childContainer: {
    alignItems: 'center',
    paddingVertical: SIZES.twenty,
    justifyContent: 'flex-end',
  },
  itemContainer: {
    paddingHorizontal: SIZES.ten * 5.5,
    paddingVertical: SIZES.ten * 3.5,
    alignItems: 'center',
  },
  formLabel: {
    fontSize: 16,
    color: Colors.grey,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: Constants.fontLight,
    color: Colors.black1,
  },
  textInputContainer: {
    borderBottomWidth: 0.3,
    height: SIZES.fifty - 5,
    borderColor: Colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  underlineText: {
    color: Colors.black1,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  noUnderlineText: {
    color: Colors.black1,
    textDecorationLine: 'none',
    fontSize: 16,
  },
});
