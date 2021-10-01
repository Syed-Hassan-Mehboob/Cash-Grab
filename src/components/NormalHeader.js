import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import Colors from '../common/Colors';
import {SIZES} from '../common/Constants';
import RegularTextCB from './RegularTextCB';
import {useNavigation} from '@react-navigation/native';
import Images from '../common/Images';

export default function NormalHeader(props) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal: SIZES.ten * 2,
      }}>
      <TouchableOpacity
        style={{position: 'absolute', left: 0}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={Images.arrowBack} style={[styles.iconBack]} />
      </TouchableOpacity>
      <RegularTextCB style={[{color: Colors.black, fontSize: SIZES.ten * 3}]}>
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
