import {Card} from 'native-base';
import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../common/Colors';
import Constants, { SIZES } from '../common/Constants';
import Images from '../common/Images';
import ButtonRadius10 from '../components/ButtonRadius10';
import LightTextCB from '../components/LightTextCB';

export default class ConfirmBooking extends Component {
  constructor(props) {
    super(props);
  }

  navigateToHome() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Image source={Images.arrowBack} style={styles.iconBack} />
        </TouchableOpacity>
        <View style={styles.itemContainer}>
          <Image source={Images.emp1} style={styles.iconUser} />
          <LightTextCB style={{fontSize:30, marginTop: SIZES.ten*3}}>
            Ray Hammond
          </LightTextCB>
          <View style={{flexDirection: 'row', marginTop: SIZES.twenty}}>
            <LightTextCB style={{fontSize: 18, color: Colors.black1}}>
              Verified
            </LightTextCB>
            <Image
              source={Images.tickVerified}
              style={{height: SIZES.twenty, width: SIZES.twenty, marginStart: SIZES.five}}
            />
          </View>
          <LightTextCB
            style={{fontSize: 18, color: Colors.black1, marginTop: SIZES.twenty}}>
            Gardening, NY (2km)
          </LightTextCB>
          <LightTextCB
            style={{fontSize: 18, color: Colors.orange, marginTop: SIZES.ten}}>
            4.6 ratings
          </LightTextCB>
        </View>
        <View style={styles.card}>
          <Image
            source={Images.employeeHoldingBox}
            style={{height: 120, width: 120, resizeMode: 'stretch'}}
          />
          <View style={{flex: 1, marginStart: SIZES.ten}}>
            <LightTextCB style={{fontSize: 18}}>Hi Send</LightTextCB>
            <LightTextCB
              style={{fontSize: 14, color: Colors.grey, marginTop: SIZES.ten}}>
              {'Having a problem with\nshipping goods?'}
            </LightTextCB>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AdvanceBooking')}>
            <LightTextCB
              style={{
                fontSize: 18,
                textDecorationLine: 'underline',
                textAlign: 'center',
                marginBottom: SIZES.ten*3,
              }}>
              Advance Booking
            </LightTextCB>
          </TouchableOpacity>
          <ButtonRadius10
            onPress={() => this.props.navigation.navigate('BookingConfirmed')}
            label="Urgent Booking (45 mins)"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
    width: '100%',
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
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
    height: SIZES.ten*9,
    width: SIZES.ten*9,
    borderRadius: SIZES.ten*9 / 2,
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
    justifyContent: 'flex-end',
  },
  itemContainer: {
    padding: SIZES.ten*3,
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
