/* @flow weak */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';

const ButtonRadius10 = ({
  label,
  onPress,
  bgColor = Colors.sickGreen,
  textColor = Colors.black,
}) => (
  <View>
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.loginBtnBg, {backgroundColor: bgColor}]}>
      <Text style={[styles.buttonLoginText, {color: textColor}]}>{label}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  loginBtnBg: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#878787',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonLoginText: {
    fontSize: 18,
    fontFamily: Constants.fontBold,
  },
});

export default ButtonRadius10;
