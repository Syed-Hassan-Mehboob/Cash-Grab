import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../common/Colors';
import {SIZES} from '../common/Constants';
import RegularTextCB from './RegularTextCB';
import {useNavigation} from '@react-navigation/native';
export default function NormalHeader(props) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.ten * 2,
        marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
      }}>
      <TouchableOpacity
        style={{position: 'absolute', left: SIZES.ten}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon
          type="AntDesign"
          name="left"
          style={{color: Colors.black, fontSize: SIZES.ten * 2}}
        />
      </TouchableOpacity>
      <RegularTextCB style={[{color: Colors.black, fontSize: SIZES.ten * 3}]}>
        {props.name}
      </RegularTextCB>
    </View>
  );
}

const styles = StyleSheet.create({});
