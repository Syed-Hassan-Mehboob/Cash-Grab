import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Colors from '../common/Colors';
import Constants, {SIZES, width} from '../common/Constants';
import Images from '../common/Images';
import LightTextCB from './LightTextCB';
import RegularTextCB from './RegularTextCB';
import {useNavigation} from '@react-navigation/native';

const FilterComponent = (props) => {
  const navigation = useNavigation();
  const item = props.item;
  console.log('List Componant=======', item);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.card,
        {
          padding: SIZES.ten * 3,
          marginHorizontal: SIZES.five,
          marginBottom: SIZES.twenty,
          marginTop: SIZES.five,
        },
      ]}
      onPress={() => {
        navigation.navigate(Constants.viewVendorProfile, {
          vendorid: item.id,
        });
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: Constants.imageURL + item.image}}
          style={{
            height: width * 0.12,
            width: width * 0.12,
            borderRadius: width * 0.12,
          }}
          resizeMode="cover"
        />
        {/* <View style={styles.circleCard}>
   
          </View> */}
        <RegularTextCB
          style={{
            color: Colors.black,
            textDecorationLine: 'underline',
            marginStart: SIZES.five,
            fontSize: 14,
          }}>
          View Profile
        </RegularTextCB>
      </View>
      <RegularTextCB
        style={{
          color: Colors.black,
          marginTop: SIZES.ten,
          fontSize: 14,
        }}>
        {item.name}
      </RegularTextCB>

      <View style={{flexDirection: 'row', marginTop: SIZES.five}}>
        <Image
          source={Images.iconVerified}
          style={{
            height: SIZES.fifteen,
            width: SIZES.fifteen,
            resizeMode: 'contain',
            tintColor:
              item.email_verified_at !== null ? Colors.turqoiseGreen : 'red',
          }}
        />
        <RegularTextCB
          style={{
            color: Colors.turqoiseGreen,
            fontSize: 12,
            marginStart: SIZES.five,
          }}>
          {item.email_verified_at !== null ? 'Verified' : 'Unverified'}
        </RegularTextCB>
      </View>
      <RegularTextCB
        style={{
          color: Colors.coolGrey,
          marginTop: SIZES.five,
        }}>
        {item.categroy}
      </RegularTextCB>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={Images.star}
          style={{
            height: SIZES.fifteen,
            width: SIZES.fifteen,
            resizeMode: 'contain',
            tintColor: Colors.orangeYellow,
          }}
        />
        <RegularTextCB
          style={{
            fontSize: 14,
            color: Colors.orangeYellow,
            marginStart: 2,
          }}>
          1.0
        </RegularTextCB>
      </View>
    </TouchableOpacity>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({
  conatiner: {},
  circleCard: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: SIZES.ten,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  iconUser: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode: 'contain',
  },
});
