import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import React, {Component} from 'react';
import {StyleSheet, ImageBackground, Image, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../common/Colors';
import Constants, {SIZES} from '../common/Constants';
import Images from '../common/Images';

const Auth = CommonActions.reset({
  index: 0,
  routes: [{name: Constants.loginOrJoin}],
});

const Home = CommonActions.reset({
  index: 0,
  routes: [{name: Constants.drawerNavigator}],
});

export default class Splash extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getUser();
  }

  async getUser() {
    const value = await AsyncStorage.getItem(Constants.user);
    if (value !== null) {
      setTimeout(() => {
        this.props.navigation.dispatch(Home);
      }, 3000);
    } else {
      setTimeout(() => {
        this.props.navigation.dispatch(Auth);
      }, 3000);
    }
  }

  render() {
    return (
      <LinearGradient
        colors={[Colors.sand, Colors.sickGreen]}
        style={{flex: 1, width: '100%'}}>
        <StatusBar hidden />
        <ImageBackground source={Images.splashBgWeb} style={styles.splashBg}>
          <Image
            source={Images.cashGrabLogoNew}
            style={{height: SIZES.ten * 7, width: '80%', resizeMode: 'contain'}}
          />
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
