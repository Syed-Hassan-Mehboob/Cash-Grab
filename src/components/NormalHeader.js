import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import Colors from '../common/Colors';
import Constants, {SIZES} from '../common/Constants';
import RegularTextCB from './RegularTextCB';
import {useNavigation} from '@react-navigation/native';
import Images from '../common/Images';
import {Platform} from 'react-native';

export default function NormalHeader(props) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{position: 'absolute', left: SIZES.ten, padding: SIZES.ten}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={Images.arrowBack} style={[styles.iconBack]} />
      </TouchableOpacity>
      <RegularTextCB
        style={[
          {
            color: Colors.black,
            fontSize:
              props.name === 'Service Provider On the Way' &&
              Platform.OS === 'ios'
                ? SIZES.ten * 2.5
                : SIZES.ten * 2.5,
          },
        ]}>
        {props.name}
      </RegularTextCB>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
});
