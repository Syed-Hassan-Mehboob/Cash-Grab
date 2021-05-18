import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';

export default class ConfirmPayment extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: 15,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 10}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={[styles.iconBack]} />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: 30}}>Confirm Payment</RegularTextCB>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 15,
          }}>
          <View style={styles.circleCard}>
            <Image source={Images.emp1} style={styles.iconUser} />
          </View>
          <RegularTextCB
            style={{
              fontSize: 16,
              color: Colors.sickGreen,
              flex: 1,
              marginHorizontal: 10,
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
            paddingHorizontal: 15,
            marginTop: 15,
          }}>
          <Image
            source={Images.iconRepairing}
            style={{height: 30, width: 30, resizeMode: 'contain'}}
          />
          <View style={{marginStart: 10}}>
            <RegularTextCB style={{fontSize: 16}}>Repairing</RegularTextCB>
            <RegularTextCB style={{fontSize: 14, color: Colors.coolGrey}}>
              3 AC split units maintenace
            </RegularTextCB>
          </View>
        </View>
        <View style={{padding: 15}}>
          <RegularTextCB
            style={{color: Colors.black, fontSize: 18, marginTop: 20}}>
            Payment Details
          </RegularTextCB>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
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
              marginTop: 15,
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
              marginTop: 15,
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
              marginTop: 15,
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
            padding: 15,
            position: 'absolute',
            bottom: 0,
            start: 0,
            end: 0,
          }}>
          <ButtonRadius10
            onPress={() => {
              this.props.navigation.navigate(Constants.bookingConfirmed);
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
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: Constants.fontRegular,
    color: Colors.black,
  },
  circleCard: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
  card: {
    flexDirection: 'row',
    height: 120,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    alignItems: 'center',
  },
  iconUser: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode: 'contain',
  },
  dashBorder: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.sickGreen,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
