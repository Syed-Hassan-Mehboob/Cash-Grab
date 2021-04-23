/* @flow weak */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';

const ButtonRadius10 = ({
  label,
  onPress,
  bgColor = Colors.orange,
  textColor = Colors.black,
}) => (
  <View>
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.loginBtnBg, {backgroundColor: bgColor}]}>
        <Text style={[styles.buttonLoginText, {color: textColor}]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  loginBtnBg: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    overflow: 'hidden',
  },
  buttonLoginText: {
    fontSize: 18,
    padding: 25,
    fontFamily: Constants.fontBold,
  },
});

export default ButtonRadius10;
