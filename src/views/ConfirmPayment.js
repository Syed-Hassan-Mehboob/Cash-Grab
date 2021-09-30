import {CommonActions} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../common/Colors';
import Constants, {SIZES} from '../common/Constants';
import Images from '../common/Images';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{name: Constants.home}],
});

export default class ConfirmPayment extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  navigateToHome() {
    this.props.navigation.dispatch(resetAction);
  }

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
          <RegularTextCB style={{fontSize: SIZES.ten * 3}}>
            Confirm Payment
          </RegularTextCB>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.fifteen,
            marginTop: SIZES.fifteen,
          }}>
          <View style={styles.circleCard}>
            <Image source={Images.emp1} style={styles.iconUser} />
          </View>
          <RegularTextCB
            style={{
              fontSize: 16,
              color: Colors.sickGreen,
              flex: 1,
              marginHorizontal: SIZES.ten,
            }}>
            Damian Santosa
          </RegularTextCB>
          <TouchableOpacity>
            <Image
              source={Images.moreDots}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.fifteen,
            marginTop: SIZES.fifteen,
          }}>
          <Image
            source={Images.iconRepairing}
            style={{
              height: SIZES.ten * 3,
              width: SIZES.ten * 3,
              resizeMode: 'contain',
            }}
          />
          <View style={{marginStart: SIZES.ten}}>
            <RegularTextCB style={{fontSize: 16}}>Repairing</RegularTextCB>
            <RegularTextCB style={{fontSize: 14, color: Colors.coolGrey}}>
              3 AC split units maintenace
            </RegularTextCB>
          </View>
        </View>
        <View style={{padding: SIZES.fifteen}}>
          <RegularTextCB
            style={{
              color: Colors.black,
              fontSize: 18,
              marginTop: SIZES.twenty,
            }}>
            Payment Details
          </RegularTextCB>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.twenty,
            }}>
            <RegularTextCB style={{color: Colors.coolGrey, fontSize: 14}}>
              Credit Card Number
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.black, fontSize: 14}}>
              **** **** **** 0123
            </RegularTextCB>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.fifteen,
            }}>
            <RegularTextCB style={{color: Colors.coolGrey, fontSize: 14}}>
              Amount
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.black, fontSize: 14}}>
              $ 1,770.00
            </RegularTextCB>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.fifteen,
            }}>
            <RegularTextCB style={{color: Colors.coolGrey, fontSize: 14}}>
              Phone No.
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.black, fontSize: 14}}>
              +1(239) 555-01089
            </RegularTextCB>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.fifteen,
            }}>
            <RegularTextCB style={{color: Colors.coolGrey, fontSize: 14}}>
              Address
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.black, fontSize: 14}}>
              New York, USA
            </RegularTextCB>
          </View>
        </View>
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
              this.navigateToHome();
            }}
            label="PROCEED"
            bgColor={Colors.sickGreen}
          />
        </View>
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
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: Constants.fontRegular,
    color: Colors.black,
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
  card: {
    flexDirection: 'row',
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
  iconUser: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: (SIZES.ten * 6) / 2,
    resizeMode: 'contain',
  },
  dashBorder: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.sickGreen,
    borderRadius: SIZES.ten,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
