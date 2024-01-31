/* @flow weak */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../common/Colors';
import Constants, {height, SIZES} from '../common/Constants';

const ButtonRadius10 = ({
  label,
  onPress,
  bgColor = Colors.sickGreen,
  textColor = Colors.black,
  disabled,
  loginBtnBg,
}) => (
  <View>
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[styles.loginBtnBg, {backgroundColor: bgColor}]}>
      <Text style={[styles.buttonLoginText, {color: textColor}]}>{label}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  loginBtnBg: {
    height: SIZES.fifty,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.ten,
    shadowColor: '#878787',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonLoginText: {
    fontSize: height * 0.025,
    fontFamily: Constants.fontBold,
  },
});

export default ButtonRadius10;
