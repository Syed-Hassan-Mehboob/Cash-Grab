import {Card} from 'native-base';
import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
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
          <LightTextCB style={{fontSize: 30, marginTop: 30}}>
            Ray Hammond
          </LightTextCB>
          <View style={{flexDirection: 'row', marginTop: 20}}>
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
        <View style={styles.card}>
          <Image
            source={Images.employeeHoldingBox}
            style={{height: 120, width: 120, resizeMode: 'stretch'}}
          />
          <View style={{flex: 1, marginStart: 10}}>
            <LightTextCB style={{fontSize: 18}}>Hi Send</LightTextCB>
            <LightTextCB
              style={{fontSize: 14, color: Colors.grey, marginTop: 10}}>
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
                marginBottom: 30,
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
    borderRadius: 20,
    width: '100%',
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
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
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
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
