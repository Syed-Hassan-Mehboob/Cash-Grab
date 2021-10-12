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
      onPress={() => {
        item.order_status === 'pending' || item.order_status === 'cancelled'
          ? navigation.navigate(Constants.BookingAcceptance, {
              orderId: item.id,
            })
          : navigation.navigate(Constants.JobInProgress, {
              orderId: item.id,
            });
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.circleCard}>
          <Image
            source={{
              uri: Constants.imageURL + item.user_image,
            }}
            style={styles.iconUser}
            resizeMode="cover"
          />
        </View>

        <View style={{marginStart: 10}}>
          <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
            {item.user_name}
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
                  item.user_email_verified_at !== null
                    ? Colors.turqoiseGreen
                    : 'red',
              }}
            />
            <RegularTextCB
              style={{
                color:
                  item.user_email_verified_at !== null
                    ? Colors.turqoiseGreen
                    : 'red',
                fontSize: 12,
                marginStart: 5,
              }}>
              {item.user_email_verified_at !== null ? 'Verified' : 'Unverified'}
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
            {item.category_name}
          </RegularTextCB>

          {/* <RegularTextCB
            style={{
              color: Colors.sickGreen,
              fontSize: 14,
              //   marginVertical: SIZES.ten,
            }}>
            {item.service}
          </RegularTextCB> */}
        </View>

        <LightTextCB style={{color: Colors.black, fontSize: 14}}>
          $ {item.grand_total}
        </LightTextCB>
      </View>
      <View style={{}}>
        {item.description ? (
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
              fontSize: 15,
            }}>
            {item.description}
          </RegularTextCB>
        ) : null}
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
          {item.location}
        </RegularTextCB>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexShrink: 1,
            marginRight: SIZES.fifteen,
          }}>
          <Image
            source={Images.iconStopWatch}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
          />
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
            }}
            numberOfLines={1}>
            {item.from_time} - {item.to_time}
          </RegularTextCB>
        </View>
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
    </TouchableOpacity>
  );
};

export default AllBookings;

const styles = StyleSheet.create({
  conatiner: {},
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  circleCard: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: SIZES.ten * 6,
    overflow: 'hidden',
  },
  iconUser: {
    height: '100%',
    width: '100%',
  },
});
