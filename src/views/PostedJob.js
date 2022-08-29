import React, {useState, useEffect} from 'react';
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
import RegularTextCB from '../components/RegularTextCB';
import Colors from '../common/Colors';
import Images from '../common/Images';
import LightTextCB from '../components/LightTextCB';
import utils from '../utils';
import Axios from '../network/APIKit';
import Spinner from 'react-native-loading-spinner-overlay';

export default function PostedJob(props) {
  const [isLoading, setIsloading] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [allPostedJob, setAllPostedJob] = useState();

  useEffect(() => {
    const getToken = async () => {
      getPostedJob();
      const unsubscribe = props.navigation.addListener('focus', () => {
        console.log('working ==== ......');
        getPostedJob();
      });
      return unsubscribe;
    };

    getToken();
  }, [props.navigation]);

  const getPostedJob = async () => {
    let token = await AsyncStorage.getItem(Constants.accessToken);
    setIsloading(true);

    const onSuccess = ({data}) => {
      // console.log('Posted Job Data  ====>>>>>>>>>> ', data.data.records);
      setAllPostedJob(data.data.records);
      setIsloading(false);
    };

    const onFailure = (error) => {
      setIsloading(false);

      utils.showResponseError(error);
      console.log('++++==========', error);
    };

    Axios.get(Constants.getMyJob, {
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  const renderPostedJob = ({item}) => {
    // console.log('Job Around data ======', item.user.user_profiles.image);
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
        onPress={() => {
          props.navigation.navigate(Constants.JobAcceptance, {
            jobId: item.id,
          });
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <RegularTextCB style={[FONTS.boldFont16, {color: Colors.black}]}>
              {item.title !== null && item.title !== undefined
                ? item.title
                : ''}
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

          <LightTextCB style={[FONTS.boldFont14, {color: Colors.black}]}>
            ${item.price !== null && item.price !== undefined ? item.price : ''}
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
              {item.time !== null && item.time !== undefined ? item.time : ''}
            </RegularTextCB>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={STYLES.container}>
      <NormalHeader name="All Posted Jobs" />
      <View style={{}}>
        <FlatList
          data={allPostedJob}
          renderItem={renderPostedJob}
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
    height: SIZES.ten * 9,
    width: SIZES.ten * 9,
    borderRadius: SIZES.fifteen * 2.85,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  iconUser: {
    height: SIZES.ten * 9,
    width: SIZES.ten * 9,
    borderRadius: SIZES.fifteen * 2.85,
    resizeMode: 'contain',
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
