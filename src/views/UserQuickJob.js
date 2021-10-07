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
import Constants, {FONTS, SIZES, STYLES, width} from '../common/Constants';
import COLORS from '../common/Colors';
import IMAGES from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import AllBookings from '../components/AllBookings';
import {Icon} from 'native-base';
import Colors from '../common/Colors';
import NormalHeader from '../components/NormalHeader';
import LightTextCB from './../components/LightTextCB';
import Images from '../common/Images';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from '../network/APIKit';

export default function UserQuickJobs(props) {
  const [isLoading, setIsloading] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [allQuickJob, setAllQuickJob] = useState();

  useEffect(() => {
    const getToken = async () => {
      getQuickJob();
      const unsubscribe = props.navigation.addListener('focus', () => {
        console.log('working ==== ......');
        getQuickJob();
      });
      return unsubscribe;
    };

    getToken();
  }, [props.navigation]);

  const getQuickJob = async () => {
    let token = await AsyncStorage.getItem(Constants.accessToken);
    setIsloading(true);

    const onSuccess = ({data}) => {
      // console.log('Quick Job Data  ====>>>>>>>>>> ', data.data.records);
      setAllQuickJob(data.data.records);
      setIsloading(false);
    };

    const onFailure = (error) => {
      setIsloading(false);

      utils.showResponseError(error);
      console.log('++++==========', error);
    };

    Axios.get(Constants.quickOrder, {
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  const renderQuickJon = ({item}) => {
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
        onPress={() => props.navigation.navigate(Constants.BookingAcceptance)}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <RegularTextCB style={[FONTS.boldFont16, {color: Colors.black}]}>
              {item.category_name !== null && item.category_name !== undefined
                ? item.category_name
                : ''}
            </RegularTextCB>
          </View>
          <LightTextCB style={[FONTS.boldFont14, {color: Colors.black}]}>
            $
            {item.grand_total !== null && item.grand_total !== undefined
              ? item.grand_total
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
            {item.location !== null && item.location !== undefined
              ? item.location
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
              {item.from_time !== null && item.from_time !== undefined
                ? item.from_time
                : ''}
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

  return (
    <View style={STYLES.container}>
      <NormalHeader name="Quick Job" />

      <View style={{}}>
        <FlatList
          data={allQuickJob}
          renderItem={renderQuickJon}
          keyExtractor={(id) => id.id.toString()}
          contentContainerStyle={{alignItems: 'center'}}
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
    backgroundColor: '#fff',
    borderRadius: 20,
    width: width - 20,
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
