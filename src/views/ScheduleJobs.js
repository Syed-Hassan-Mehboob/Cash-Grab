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
import Constants, {STYLES, SIZES, width, FONTS} from '../common/Constants';
import ScheduleBooking from '../components/ScheduleBooking';
import NormalHeader from '../components/NormalHeader';
import Axios from '../network/APIKit';
import RegularTextCB from './../components/RegularTextCB';
import LightTextCB from './../components/LightTextCB';
import Colors from '../common/Colors';
import Images from '../common/Images';
import Spinner from 'react-native-loading-spinner-overlay';

export default function ScheduleJobs(props) {
  const [isLoading, setIsloading] = useState(false);
  const [allScheduleJob, setAllScheduleJob] = useState();
  useEffect(() => {
    const getToken = async () => {
      getScheduleJob();
      const unsubscribe = props.navigation.addListener('focus', () => {
        console.log('working ==== ......');
        getScheduleJob();
      });
      return unsubscribe;
    };

    getToken();
  }, [props.navigation]);

  const getScheduleJob = async () => {
    let token = await AsyncStorage.getItem(Constants.accessToken);
    setIsloading(true);

    const onSuccess = ({data}) => {
      // console.log('Schedule Job Data  ====>>>>>>>>>> ', data.data.records);
      setAllScheduleJob(data.data.records);
      setIsloading(false);
    };

    const onFailure = (error) => {
      setIsloading(false);

      utils.showResponseError(error);
      console.log('++++==========', error);
    };

    Axios.get(Constants.scheduleJob, {
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  const renderScheduleJob = ({item}) => {
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
          props.navigation.navigate(Constants.SchechuleJobDetail, {
            catName: item.category.name,
            joid: item.id,
          })
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.circleCard}>
            <Image
              source={{
                uri: Constants.imageURL + item.vendorProfile.image,
              }}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>

          <View style={{marginStart: 10}}>
            <RegularTextCB style={[FONTS.boldFont16, {color: Colors.black}]}>
              {item.name !== null && item.name !== undefined ? item.name : ''}
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
                  tintColor: Colors.turqoiseGreen,
                  // item.email_verified_at !== null
                  //   ? Colors.turqoiseGreen
                  //   : 'red',
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
            <RegularTextCB
              style={{
                color: Colors.sickGreen,
                fontSize: 14,
                //   marginVertical: SIZES.ten,
              }}>
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
            {item.description !== null && item.description !== undefined
              ? item.description
              : ''}
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
            {item.address !== null && item.address !== undefined
              ? item.address
              : ''}
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
              {item.start_time !== null && start_time !== undefined
                ? start_time
                : ''}{' '}
              -{' '}
              {item.end_time !== null && item.end_time !== undefined
                ? item.end_time
                : ''}
            </RegularTextCB>
          </View>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
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
              {item.date !== null && item.date !== undefined ? item.date : ''}
            </RegularTextCB>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={STYLES.container}>
      <NormalHeader name="Schedule Jobs" />
      <View style={{flex: 1}}>
        <FlatList
          data={allScheduleJob}
          renderItem={renderScheduleJob}
          keyExtractor={(id) => id.id}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 150,
          }}
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
    width: width - 20,
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
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});

const Data = [
  {
    id: 1,
    name: 'Ray Hammad',
    tittle: 'Home Cleaner Needed',
    price: '300.00',
    service: 'Cleaning',
    description:
      'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
    address: '111,NYC Street, NY 1121',
    time: '12:00 - 3:00 ',
    date: 'September 17, 2021',
  },
  {
    id: 2,
    name: 'Ray Hammad',
    tittle: 'Home Cleaner Needed',
    price: '300.00',
    service: 'Cleaning',
    description:
      'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
    address: '111,NYC Street, NY 1121',
    time: '12:00 - 3:00 ',
    date: 'September 17, 2021',
  },
  {
    id: 3,
    name: 'Ray Hammad',
    tittle: 'Home Cleaner Needed',
    price: '300.00',
    service: 'Cleaning',
    description:
      'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
    address: '111,NYC Street, NY 1121',
    time: '12:00 - 3:00 ',
    date: 'September 17, 2021',
  },
];
