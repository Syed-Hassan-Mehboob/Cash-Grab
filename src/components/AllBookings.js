import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Colors from '../common/Colors';
import Constants, {SIZES, width} from '../common/Constants';
import Images from '../common/Images';
import LightTextCB from './LightTextCB';
import RegularTextCB from './RegularTextCB';
import {useNavigation} from '@react-navigation/native';

const AllBookings = (props) => {
  const navigation = useNavigation();
  const item = props.item;
  console.log('List Componant=======', item);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.card,
        {
          padding: SIZES.fifteen,
          margin: SIZES.five,
        },
      ]}
      onPress={() => navigation.navigate(Constants.BookingAcceptance)}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.circleCard}>
          <Image
            source={{
              uri:
                item.userProfile.image !== null &&
                item.userProfile.image !== undefined
                  ? Constants.imageURL + item.userProfile.image
                  : '',
            }}
            style={styles.iconUser}
            resizeMode="cover"
          />
        </View>

        <View style={{marginStart: 10}}>
          <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
            {item.user.name !== null && item.user.name !== undefined
              ? item.user.name
              : ''}
          </RegularTextCB>
          <View
            style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
            <Image
              source={Images.iconVerified}
              style={{
                height: 15,
                width: 15,
                resizeMode: 'contain',
                tintColor:
                  item.user.email_verified_at !== null
                    ? Colors.turqoiseGreen
                    : 'red',
              }}
            />
            <RegularTextCB
              style={{
                color: Colors.turqoiseGreen,
                //   item.email_verified_at !== null
                //     ? Colors.turqoiseGreen
                //     : 'red',
                fontSize: 12,
                marginStart: 5,
              }}>
              {item.user.email_verified_at !== null ? 'Verified' : 'Unverified'}
            </RegularTextCB>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
            {item.category.name !== null && item.category.name !== undefined
              ? item.category.name
              : ''}
          </RegularTextCB>
        </View>

        <LightTextCB style={{color: Colors.black, fontSize: 14}}>
          $
          {item.grandTotal !== null && item.grandTotal !== undefined
            ? item.grandTotal
            : ''}
        </LightTextCB>
      </View>
      <View style={{}}>
        <RegularTextCB style={{color: Colors.coolGrey, fontSize: 15}}>
          {item.description}
        </RegularTextCB>
      </View>
      <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
        <Image
          source={Images.iconLocationPin}
          style={{height: 17, width: 17, resizeMode: 'contain'}}
        />
        <RegularTextCB
          style={{
            color: Colors.coolGrey,
            // marginVertical: SIZES.ten,
          }}>
          {item.address}
        </RegularTextCB>
      </View>
      <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
        <Image
          source={Images.iconStopWatch}
          style={{height: 17, width: 17, resizeMode: 'contain'}}
        />
        <View
          style={{
            flexDirection: 'row',
            marginStart: 5,
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
            }}>
            {item.time}
          </RegularTextCB>
          <View>
            <RegularTextCB
              style={{
                color: Colors.black,
                textDecorationLine: 'underline',
                fontSize: 16,
              }}>
              View Job
            </RegularTextCB>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AllBookings;

const styles = StyleSheet.create({
  conatiner: {},
  circleCard: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: SIZES.ten * 6,
    overflow: 'hidden',
    // shadowColor: '#c5c5c5',
    // shadowOffset: {width: 5, height: 5},
    // shadowOpacity: 0.15,
    // shadowRadius: 5,
    // elevation: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    // width: width - SIZES.fifteen,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  iconUser: {
    height: '100%',
    width: '100%',
  },
});
