/* @flow weak */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
const {width, height} = Dimensions.get('window');

const ButtonRadius10 = ({
  label,
  onPress,
  bgColor = Colors.orange,
  textColor = '#FFF',
}) => (
  <View>
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
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
  },
  buttonLoginText: {
    fontSize: 18,
    padding: 25,
    fontFamily: Constants.fontLight,
  },
});

export default ButtonRadius10;
