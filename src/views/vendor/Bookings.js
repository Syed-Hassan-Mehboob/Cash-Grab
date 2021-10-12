import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Constants, {FONTS, SIZES, STYLES, width} from '../../common/Constants';
import COLORS from '../../common/Colors';
import IMAGES from '../../common/Images';
import {Icon} from 'native-base';
import Colors from '../../common/Colors';
import NormalHeader from '../../components/NormalHeader';
import Axios from '../../network/APIKit';
import Images from '../../common/Images';
import RegularTextCB from './../../components/RegularTextCB';
import LightTextCB from './../../components/LightTextCB';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Bookings(props) {
  const [scheduleBookings, setscheduleBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      getBookings();
      const unsubscribe = props.navigation.addListener('focus', () => {
        console.log('working ==== ......');
        getBookings();
      });
      return unsubscribe;
    };

    getToken();
  }, [props.navigation]);

  const getBookings = async () => {
    let token = await AsyncStorage.getItem(Constants.accessToken);
    setIsLoading(true);
    const onSuccess = ({data}) => {
      // console.log(' Schedule Bookings  =====', data.data.records);
      setscheduleBookings(data.data.records);
      setIsLoading(false);
    };

    const onFailure = (error) => {
      setIsLoading(false);
      utils.showResponseError(error);
      console.log('==================Error', error);
    };

    Axios.get(Constants.getScheduleBookings, {
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };
  const renderBookings = ({item}) => {
    // console.log('item==================', item);
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
        onPress={() =>
          props.navigation.navigate(Constants.BookingAcceptance, {
            orderId: item.id,
          })
        }>
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
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
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
                {item.user.email_verified_at !== null
                  ? 'Verified'
                  : 'Unverified'}
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

          <LightTextCB style={[FONTS.boldFont14, {color: Colors.black}]}>
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
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
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
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
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
              <RegularTextCB style={[FONTS.boldFont18, {color: Colors.black}]}>
                View Job
              </RegularTextCB>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={STYLES.container}>
      <NormalHeader name="Bookings" />
      <View>
        <FlatList
          data={scheduleBookings}
          renderItem={renderBookings}
          keyExtractor={(id) => id.id}
          contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    width: width - 30,
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
  circleCard: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: SIZES.ten * 6,
    overflow: 'hidden',
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
