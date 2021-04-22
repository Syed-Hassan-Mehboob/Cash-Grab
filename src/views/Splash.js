import React, {Component} from 'react';
import {StyleSheet, ImageBackground, Image, View} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import BoldTextCB from '../components/BoldTextCB';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';
export default class Splash extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground source={Images.bgSplash} style={styles.splashBg}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Image
            source={Images.logoCashGrab}
            style={{height: 250, width: 250}}
          />
          <BoldTextCB style={{fontSize: 28, color: Colors.white}}>
            Welcome to Cash Grab
          </BoldTextCB>
          <RegularTextCB style={{fontSize: 18, color: Colors.white}}>
            Lorem Ipsum Dicolora Amit Sed, Eluit
          </RegularTextCB>
          <View style={{width: '90%', marginTop: 60}}>
            <ButtonRadius10
              onPress={() => {
                this.props.navigation.replace(Constants.login);
              }}
              label="LOG IN"
              bgColor={Colors.white}
              textColor={Colors.black}
            />
          </View>
          <View style={{width: '90%', marginTop: 20}}>
            <ButtonRadius10
              onPress={() => {
                this.props.navigation.replace(Constants.createAccount);
              }}
              label="SIGN UP"
              bgColor={Colors.newGreen}
              textColor={Colors.black}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  splashBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
