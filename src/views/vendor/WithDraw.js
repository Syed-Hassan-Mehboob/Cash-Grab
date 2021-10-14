import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from '../../common/Colors';
import RegularTextCB from '../../components/RegularTextCB';
import Images from '../../common/Images';
import ButtonRadius10 from '../../components/ButtonRadius10';
import {SIZES} from '../../common/Constants';

const {height, width} = Dimensions.get('window');

export default class WithDraw extends Component {
  constructor(props) {
    super(props);
  }

  state = {sliderValue: 0, min: 0, max: 500};

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
              Advance Cash
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
            maximumValue={this.state.max}
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
            <RegularTextCB>{this.state.max}</RegularTextCB>
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
            $200
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
            Feb 10
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
            Withdraw Type
          </RegularTextCB>
          <RegularTextCB
            style={{
              fontSize: 14,
              color: Colors.black,
            }}>
            Advance
          </RegularTextCB>
        </View>
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
              this.props.navigation.goBack();
            }}
            label="CONFIRM WITHDRAW"
            bgColor={Colors.sickGreen}
          />
        </View>
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
