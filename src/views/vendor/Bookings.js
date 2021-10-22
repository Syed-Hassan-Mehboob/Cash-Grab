import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'native-base';
import Constants, {FONTS, SIZES, STYLES} from '../../common/Constants';
import COLORS from '../../common/Colors';
import IMAGES from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import AllBookings from '../../components/AllBookings';
import Colors from '../../common/Colors';
import NormalHeader from '../../components/NormalHeader';
import Axios from '../../network/APIKit';
import utils from '../../utils';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Bookings(props) {
  const [scheduleBookings, setScheduleBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBookings = async () => {
      getUserAccessToken();
      const unsubscribe = props.navigation.addListener('focus', () => {
        // console.log('working ==== ......');
        getUserAccessToken();
      });
      return unsubscribe;
    };

    getBookings();
  }, [props.navigation]);

  const getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    // console.log('access token ============>>> ', token);
    getScheduleBookings(token);
  };

  const getScheduleBookings = async (accessToken) => {
    setIsLoading(true);
    const onSuccess = ({data}) => {
      setScheduleBookings(data.data.records);
      setIsLoading(false);
    };

    const onFailure = (error) => {
      setIsLoading(false);
      utils.showResponseError(error);
    };

    Axios.get(Constants.scheduleBookingsVendor, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View style={STYLES.container}>
      <NormalHeader name="Bookings" />
      <View style={{}}>
        <FlatList
          data={scheduleBookings}
          renderItem={({item}) => <AllBookings item={item} />}
          keyExtractor={(id) => id.id}
          contentContainerStyle={{
            paddingHorizontal: SIZES.ten * 2,
            paddingTop: SIZES.ten * 2,
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
  card: {
    width: '100%',
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
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
