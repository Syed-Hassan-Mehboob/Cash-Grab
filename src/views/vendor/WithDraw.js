import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from '../../common/Colors';
import RegularTextCB from '../../components/RegularTextCB';
import Images from '../../common/Images';
import ButtonRadius10 from '../../components/ButtonRadius10';

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
            padding: 15,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 10}}
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
            {padding: 15, marginHorizontal: 15, marginTop: 10},
          ]}>
          <View style={{flexDirection: 'row'}}>
            <RegularTextCB style={{fontSize: 16, color: Colors.coolGrey}}>
              Advance Cash
            </RegularTextCB>
            <RegularTextCB
              style={{fontSize: 16, color: Colors.black, marginStart: 5}}>
              ${this.state.sliderValue}
            </RegularTextCB>
          </View>
          <Slider
            style={{
              width: '100%',
              height: 50,
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
              paddingHorizontal: 10,
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
            marginTop: 20,
            marginHorizontal: 15,
          }}>
          You are about to withdraw this amount
        </RegularTextCB>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
            marginHorizontal: 15,
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
            marginTop: 10,
            marginHorizontal: 15,
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
            marginTop: 10,
            marginHorizontal: 15,
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
            marginTop: 20,
            marginHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={Images.visa}
            style={{
              height: 50,
              width: 75,
              resizeMode: 'contain',
            }}
          />
          <RegularTextCB style={{color: Colors.coolGrey, marginStart: 20}}>
            **** **** **** 7989
          </RegularTextCB>
        </View>
        <RegularTextCB
          style={{color: Colors.coolGrey, marginTop: 20, marginHorizontal: 15}}>
          Advance cash typically take 30 mints but it may take up to 2 hours
          depending on your bank.
        </RegularTextCB>
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
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  card: {
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
  thumb: {
    width: 35,
    height: 35,
    backgroundColor: 'transparent',
  },
});
