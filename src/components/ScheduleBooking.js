import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Colors from '../common/Colors';
import Constants, {SIZES, width} from '../common/Constants';
import Images from '../common/Images';
import LightTextCB from './LightTextCB';
import RegularTextCB from './RegularTextCB';
import {useNavigation} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';

const ScheduleBooking = (props) => {
  const navigation = useNavigation();
  const item = props.item;
  // console.log('List Componant=======', item);
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.card,
        {
          padding: SIZES.fifteen,
          margin: SIZES.five,
        },
      ]}
      onPress={() => navigation.navigate(Constants.SchechuleJobDetail)}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.circleCard}>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,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',
            }}
            style={styles.iconUser}
            resizeMode="cover"
          />
        </View>

        <View style={{marginStart: 10}}>
          <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
            {item.name}
          </RegularTextCB>
          <View
            style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
            <Image
              source={Images.iconVerified}
              style={{
                height: 15,
                width: 15,
                resizeMode: 'contain',
                tintColor: Colors.turqoiseGreen,
                //   item.email_verified_at !== null
                //     ? Colors.turqoiseGreen
                //     : 'red',
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
              {/* {item.email_verified_at !== null ? 'Verified' : 'Unverified'} */}
              Verified
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
            {item.tittle}
          </RegularTextCB>

          <RegularTextCB
            style={{
              color: Colors.sickGreen,
              fontSize: 14,
              //   marginVertical: SIZES.ten,
            }}>
            {item.service}
          </RegularTextCB>
        </View>

        <LightTextCB style={{color: Colors.black, fontSize: 14}}>
          ${item.price}
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
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
        <Image
          source={Images.iconCalendar}
          style={{
            height: 17,
            width: 17,
            resizeMode: 'contain',
            tintColor: Colors.sickGreen,
          }}
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
            {item.date}
          </RegularTextCB>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleBooking;

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
