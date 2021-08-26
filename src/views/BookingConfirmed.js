import {CommonActions} from '@react-navigation/native';
import {Card} from 'native-base';
import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../common/Colors';
import Constants, { SIZES } from '../common/Constants';
import Images from '../common/Images';
import ButtonRadius10 from '../components/ButtonRadius10';
import LightTextCB from '../components/LightTextCB';
import RegularTextCB from '../components/RegularTextCB';
import BoldTextCB from '../components/BoldTextCB';

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{name: Constants.home}],
});

export default class BookingConfirmed extends Component {
  constructor(props) {
    super(props);
  }

  navigateToHome() {
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.childContainer, {marginTop: SIZES.ten*3}]}>
          <Image source={Images.greenTick} style={{height: SIZES.ten*SIZES.ten*10, width: SIZES.ten*10}} />
          <BoldTextCB style={{fontSize: SIZES.ten*3, marginTop: SIZES.ten*3}}>
            Booking Confirmed
          </BoldTextCB>
          <RegularTextCB
            style={{
              fontSize: 18,
              marginTop: SIZES.ten*10,
              marginStart: SIZES.ten*3,
              marginEnd: SIZES.ten*3,
              textAlign: 'center',
              color: Colors.coolGrey,
            }}>
            Your booking has been confirmed for Tue 14th Mar, 2020 (10:30pm)
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
                  source={Images.emp1}
                  style={styles.iconUser}
                  resizeMode="cover"
                />
              </View>
              <RegularTextCB style={{fontSize: SIZES.twenty, marginTop: SIZES.ten*10}}>
                Ray Hammond
              </RegularTextCB>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: SIZES.five,
                }}>
                <Image
                  source={Images.iconVerified}
                  style={{height: SIZES.twentyFive, width: SIZES.twentyFive, resizeMode: 'contain'}}
                />
                <RegularTextCB
                  style={{
                    color: Colors.turqoiseGreen,
                    fontSize: 16,
                    marginStart: SIZES.five,
                  }}>
                  Verified
                </RegularTextCB>
              </View>
              <RegularTextCB
                style={{fontSize: 18, color: Colors.coolGrey, marginTop: SIZES.five}}>
                Gardening, NY (2km)
              </RegularTextCB>
              <RegularTextCB
                style={{
                  fontSize: 18,
                  color: Colors.orangeYellow,
                  marginTop: SIZES.five,
                }}>
                4.6 ratings
              </RegularTextCB>
            </View>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <ButtonRadius10
            onPress={() => this.navigateToHome()}
            label="BACK TO HOME"
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
    height: SIZES.ten*3,
    width: SIZES.ten*3,
    resizeMode: 'contain',
  },
  iconForward: {
    height: SIZES.fifteen-3,
    width: SIZES.fifteen-3,
    resizeMode: 'contain',
  },
  iconUser: {
    height: SIZES.ten*8,
    width: SIZES.ten*8,
    borderRadius: SIZES.ten*8 / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height: SIZES.ten*8,
    width: SIZES.ten*8,
    borderRadius: SIZES.ten*4,
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
    shadowRadius: SIZES.ten*10,
    elevation: SIZES.ten*10,
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
    paddingHorizontal: SIZES.ten*4,
    paddingVertical: SIZES.ten*10,
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
    height: SIZES.fifty-5,
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
