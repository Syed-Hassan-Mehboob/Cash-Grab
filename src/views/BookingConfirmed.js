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

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{name: 'Home'}],
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
        <TouchableOpacity
          style={{height: 0, width: 0}}
          onPress={() => {
            this.navigateToHome;
          }}>
          <Image source={Images.arrowBack} style={styles.iconBack} />
        </TouchableOpacity>
        <View style={styles.childContainer}>
          <View style={styles.greenCircle}>
            <Image
              source={Images.tickYellow}
              style={{tintColor: Colors.white, height: 30, width: 30}}
            />
          </View>
          <LightTextCB style={{fontSize: 30, marginTop: 30}}>
            Booking Confirmed
          </LightTextCB>
          <LightTextCB
            style={{
              fontSize: 18,
              marginTop: 20,
              marginStart: 30,
              marginEnd: 30,
              textAlign: 'center',
            }}>
            Your booking has been confirmed for Tue 14th Mar, 2020 (10:30pm)
          </LightTextCB>
          <Card
            style={{
              borderRadius: 20,
              shadowRadius: 20,
              shadowOffset: 20,
              shadowOpacity: 20,
              width: '100%',
              marginTop: 20,
            }}>
            <View style={styles.itemContainer}>
              <LightTextCB style={{fontSize: 30}}>Ray Hammond</LightTextCB>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <LightTextCB style={{fontSize: 18, color: Colors.black1}}>
                  Verified
                </LightTextCB>
                <Image
                  source={Images.tickVerified}
                  style={{height: 20, width: 20, marginStart: 5}}
                />
              </View>
              <LightTextCB
                style={{fontSize: 18, color: Colors.black1, marginTop: 20}}>
                Gardening, NY (2km)
              </LightTextCB>
              <LightTextCB
                style={{fontSize: 18, color: Colors.orange, marginTop: 10}}>
                4.6 ratings
              </LightTextCB>
            </View>
          </Card>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <ButtonRadius10
            onPress={() => this.navigateToHome()}
            label="Back to Home"
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
  greenCircle: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    borderRadius: 90 / 2,
    backgroundColor: Colors.green,
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
    padding: 30,
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
