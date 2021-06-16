import {CommonActions} from '@react-navigation/native';
import {Card} from 'native-base';
import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
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
        <View style={[styles.childContainer, {marginTop: 30}]}>
          <Image source={Images.greenTick} style={{height: 100, width: 100}} />
          <BoldTextCB style={{fontSize: 30, marginTop: 30}}>
            Booking Confirmed
          </BoldTextCB>
          <RegularTextCB
            style={{
              fontSize: 18,
              marginTop: 10,
              marginStart: 30,
              marginEnd: 30,
              textAlign: 'center',
              color: Colors.coolGrey,
            }}>
            Your booking has been confirmed for Tue 14th Mar, 2020 (10:30pm)
          </RegularTextCB>
          <View
            style={[
              styles.card,
              {
                marginTop: 20,
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
              <RegularTextCB style={{fontSize: 20, marginTop: 10}}>
                Ray Hammond
              </RegularTextCB>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Image
                  source={Images.iconVerified}
                  style={{height: 25, width: 25, resizeMode: 'contain'}}
                />
                <RegularTextCB
                  style={{
                    color: Colors.turqoiseGreen,
                    fontSize: 16,
                    marginStart: 5,
                  }}>
                  Verified
                </RegularTextCB>
              </View>
              <RegularTextCB
                style={{fontSize: 18, color: Colors.coolGrey, marginTop: 5}}>
                Gardening, NY (2km)
              </RegularTextCB>
              <RegularTextCB
                style={{
                  fontSize: 18,
                  color: Colors.orangeYellow,
                  marginTop: 5,
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
    height: 20,
    width: 20,
    marginTop: 20,
    resizeMode: 'contain',
  },
  iconFilter: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  iconForward: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
  },
  iconUser: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height: 80,
    width: 80,
    borderRadius: 40,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  iconPassword: {
    fontSize: 20,
    height: 20,
    width: 20,
    alignSelf: 'center',
    color: Colors.orange,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 20,
  },
  childContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'flex-end',
  },
  itemContainer: {
    paddingHorizontal: 40,
    paddingVertical: 10,
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
    height: 45,
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
