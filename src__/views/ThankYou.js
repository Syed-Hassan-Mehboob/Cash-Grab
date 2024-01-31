import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FONTS, SIZES, STYLES} from '../common/Constants';
import Images from '../common/Images';
import {useNavigation} from '@react-navigation/native';
import Colors from '../common/Colors';
import {Icon} from 'native-base';
import ButtonRadius10 from '../components/ButtonRadius10';

export default function ThankYou() {
  const navigation = useNavigation();

  return (
    <View
      style={[
        STYLES.container,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <TouchableOpacity
        style={{position: 'absolute', left: SIZES.fifteen, top: SIZES.twenty}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={Images.arrowBack} style={[styles.iconBack]} />
      </TouchableOpacity>

      <View
        style={{marginBottom: SIZES.twentyFive * 2.5, alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: Colors.sickGreen,
            padding: SIZES.fifteen * 1.7,
            borderRadius: SIZES.twentyFive * 3.5,
            marginBottom: SIZES.twenty,
          }}>
          <Icon
            type={'MaterialIcons'}
            name={'check'}
            style={{color: Colors.white, fontSize: SIZES.twentyFive * 3.5}}
          />
        </View>
        <Text style={[FONTS.boldFont24]}>Thank You</Text>
        <Text
          style={
            ([FONTS.mediumFont18], {color: Colors.coolGrey, lineHeight: 23})
          }
          numberOfLines={2}>
          Your booking has been successfully done{'\n\t\t'} for Mon 14th Mar,
          2021 (9:30pm)
        </Text>
      </View>

      <View
        style={{
          width: '90%',
          position: 'absolute',
          bottom: SIZES.twentyFive * 1.5,
          alignSelf: 'center',
        }}>
        <ButtonRadius10
          label="Write Review"
          bgColor={Colors.sickGreen}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
  },
});
