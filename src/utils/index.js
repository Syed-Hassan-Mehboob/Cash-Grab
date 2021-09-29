import React from 'react';
import {Toast} from 'native-base';
import {RefreshControl, Alert, StatusBar, Platform} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    console.log('isempty started', obj);
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  validateEmail(str) {
    console.log('this.validateEmail ', str);
    var pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return pattern.test(str);
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
        fontFamily: Constants.fontRegular,
        fontSize: 14,
      },
      type: 'danger',
      duration: 3000,
      style: {
        backgroundColor: '#000',
        minHeight: 50,
        borderRadius: 0,
      },
    });
  }

  showResponseError(error) {
    console.log(error);
    console.log(error.response);
    let errorCode = JSON.stringify(error.response.status);
    console.log(errorCode);
    if (errorCode === '400') {
      let errorData = error.response.data;
      // this.showToast(errorData.message);
      this.showToast(JSON.stringify(errorData.data));
    } else if (errorCode === '405') {
      this.showToast('Wrong Api Method');
    } else {
      let errorResData = JSON.parse(error.response.request._response).data;
      for (const [, value] of Object.entries(errorResData)) {
        this.showToast(value[0]);
        break;
      }
    }
  }
}

export default new utils();
