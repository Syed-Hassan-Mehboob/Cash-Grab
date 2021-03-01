import React from 'react';
import {Toast} from 'native-base';
import {RefreshControl, Alert, StatusBar, Platform} from 'react-native';
import Colors from '../common/Colors';

let userData = {};
class utils {
  confirmAlert(title, msg, callback) {
    Alert.alert(
      title,
      msg,
      [
        {text: 'NO', onPress: () => callback('error')},
        {text: 'YES', onPress: () => callback('success')},
      ],
      {cancelable: false},
    );
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  validateEmail(str) {
    var newPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return newPattern.test(str);
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  _refreshControl(refhresList, isRef = false) {
    return (
      <RefreshControl
        refreshing={isRef}
        onRefresh={refhresList}
        title={'Pull to Refresh'}
        tintColor={Colors.orange}
        colors={['white']}
        progressBackgroundColor={Colors.black1}
      />
    );
  }

  serializeObj(obj) {
    var str = [];
    for (var p in obj)
      if (obj[p] != '') {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  }

  _renderStatusBar(barStyle = 'light-content', barColor = 'transparent') {
    if (Platform.OS === 'ios') {
      return (
        <StatusBar
          animated
          translucent
          barStyle={barStyle}
          StatusBarAnimation="fade"
          backgroundColor={'transparent'}
        />
      );
    } else {
      return (
        <StatusBar
          animated
          StatusBarAnimation="fade"
          backgroundColor={barColor}
          barStyle={barStyle}
        />
      );
    }
  }

  showToast(msg = '') {
    Toast.show({
      text: msg,
      position: 'bottom',
      textStyle: {
        color: Colors.white,
        fontFamily: Fonts.type.RalewayRegular,
        fontSize: 18,
      },
      type: 'danger',
      duration: 2000,
      style: {
        backgroundColor: '#000',
        minHeight: 50,
        borderRadius: 5,
      },
    });
  }
}
export default new utils();
