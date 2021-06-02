import React, {Component} from 'react';
import {StyleSheet, ImageBackground, Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import BoldTextCB from '../components/BoldTextCB';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';

export default class LoginOrJoin extends Component {
  constructor(props) {
    super(props);
  }

  openNewScreen(newScreen) {
    this.props.navigation.replace(newScreen);
  }

  render() {
    return (
      <LinearGradient
        colors={[Colors.sand, Colors.sickGreen]}
        style={{flex: 1, width: '100%'}}>
        <ImageBackground
          source={Images.loginOrJoinBgWeb}
          style={styles.splashBg}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Image
              source={Images.cashGrabLogoNew}
              style={{height: 70, width: '60%', resizeMode: 'contain'}}
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
                  this.openNewScreen(Constants.login);
                }}
                label="LOG IN"
                bgColor={Colors.white}
                textColor={Colors.black}
              />
            </View>
            <View style={{width: '90%', marginTop: 20}}>
              <ButtonRadius10
                onPress={() => {
                  this.openNewScreen(Constants.createAccount);
                }}
                label="SIGN UP"
                bgColor={Colors.lightYellowGreen}
                textColor={Colors.black}
              />
            </View>
          </View>
        </ImageBackground>
      </LinearGradient>
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
