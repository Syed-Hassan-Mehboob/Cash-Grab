import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../common/Colors';
import Constants, {FONTS, SIZES, STYLES} from '../../common/Constants';
import ButtonRadius10 from '../../components/ButtonRadius10';
import EditText from '../../components/EditText';
import RegularTextCB from '../../components/RegularTextCB';

export default function AddTeamMember(props) {
  return (
    <View style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          //   marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: 0}}
          onPress={() => {
            props.navigation.goBack();
          }}
          activeOpacity={0.6}>
          <Icon
            type="AntDesign"
            name="left"
            style={{color: Colors.black, fontSize: SIZES.ten * 3}}
          />
        </TouchableOpacity>
        <RegularTextCB style={[FONTS.boldFont24, {}]}>
          Add Team Member
        </RegularTextCB>
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <TouchableOpacity
          style={{
            height: SIZES.fifty * 1.5,
            width: SIZES.fifty * 1.5,
            borderRadius: SIZES.fifty,
            backgroundColor: Colors.sickGreen,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            props.navigation.goBack();
          }}
          activeOpacity={0.6}>
          <Icon
            type="AntDesign"
            name="plus"
            style={{color: Colors.black, fontSize: SIZES.fifteen * 2.3}}
          />
        </TouchableOpacity>

        <Text style={[FONTS.mediumFont16]}>Upload Photo</Text>

        <EditText placeholder="Enter Name" style={{marginTop: SIZES.fifteen}} />
      </View>

      <View
        style={[
          STYLES.shadow,
          {
            marginTop: SIZES.ten * 5,
            paddingBottom: SIZES.ten,
            marginHorizontal: SIZES.ten,
            position: 'absolute',
            bottom: SIZES.twenty,
            width: '97%',
            alignSelf: 'center',
          },
        ]}>
        <ButtonRadius10
          bgColor={Colors.sickGreen}
          label="ADD"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
