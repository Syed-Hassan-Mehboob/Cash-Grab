import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Constants, {FONTS, SIZES, STYLES, width} from '../../common/Constants';
import BoldTextCB from '../../components/BoldTextCB';
import RegularTextCB from '../../components/RegularTextCB';
import Colors from '../../common/Colors';
import Images from '../../common/Images';
import {Icon} from 'native-base';
import NormalHeader from '../../components/NormalHeader';
import Axios from '../../network/APIKit';
import Spinner from 'react-native-loading-spinner-overlay';
import utils from '../../utils';
import LightTextCB from './../../components/LightTextCB';

export default function BookingAcceptance(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingDetail, setBookingDetail] = useState();
  const [orderId, setOrderId] = useState();
  useEffect(() => {
    const getToken = async () => {
      getBookingDetail();
      const unsubscribe = props.navigation.addListener('focus', () => {
        // console.log('working ==== ......');
        getBookingDetail();
      });
      return unsubscribe;
    };

    getToken();
  }, [props.navigation]);

  const getBookingDetail = async () => {
    let token = await AsyncStorage.getItem(Constants.accessToken);
    setIsLoading(true);
    const onSuccess = ({data}) => {
      // console.log(' Schedule Bookings Detail  =====', data.data.id);
      setOrderId(data.data.id);
      setBookingDetail(data.data);
      // setscheduleBookings(data.data.records);
      setIsLoading(false);
    };

    const onFailure = (error) => {
      setIsLoading(false);
      utils.showResponseError(error);
      console.log('==================Error', error);
    };
    let params = {
      orderId: props.route.params.orderId,
    };
    Axios.get(Constants.orderDetail, {
      params: params,
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  const acceptOrder = async () => {
    let token = await AsyncStorage.getItem(Constants.accessToken);
    setIsLoading(true);
    const onSuccess = ({data}) => {
      // console.log('>>>>>>>> ', data);
      setIsLoading(false);
      utils.showToast('Booking Has Been Accepted');
      setTimeout(() => {
        props.navigation.navigate(Constants.JobInProgress, {
          orderId: orderId,
        });
      }, 800);
    };

    const onFailure = (error) => {
      setIsLoading(false);

      utils.showResponseError(error);
      console.log('++++==========', error);
    };
    // console.log('==== Job id >>>>>>>', props.route.params.joid);
    const options = {
      headers: {
        Authorization: token,
      },
    };
    const params = {
      order_id: bookingDetail?.id,
      status: 'accepted',
    };
    Axios.post(Constants.orderStatus, params, options)
      .then(onSuccess)
      .catch(onFailure);
  };

  const cancelOrder = async () => {
    let token = await AsyncStorage.getItem(Constants.accessToken);
    setIsLoading(true);
    const onSuccess = ({data}) => {
      console.log('>>>>>>>> ', data);
      setIsLoading(false);
      utils.showToast('Your order has been canceled');
    };

    const onFailure = (error) => {
      setIsLoading(false);

      utils.showResponseError(error);
      console.log('++++==========', error);
    };
    // console.log('==== Job id >>>>>>>', props.route.params.joid);
    const options = {
      headers: {
        Authorization: token,
      },
    };
    const params = {
      order_id: bookingDetail?.id,
      status: 'cancelled',
    };
    Axios.post(Constants.orderStatus, params, options)
      .then(onSuccess)
      .catch(onFailure);
    setTimeout(() => {
      props.navigation.goBack();
    }, 500);
  };

  return (
    <View style={STYLES.container}>
      <NormalHeader name="Booking Acceptance" />
      <View style={{paddingHorizontal: SIZES.fifteen}}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.card,
            {padding: SIZES.fifteen, marginTop: SIZES.twentyFive},
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: SIZES.fifteen,
            }}>
            <View style={styles.circleCard}>
              <Image
                source={{
                  uri:
                    bookingDetail?.user?.user_profiles?.image !== null &&
                    bookingDetail?.user?.user_profiles?.image !== undefined
                      ? Constants.imageURL +
                        bookingDetail?.user.user_profiles.image
                      : '',
                }}
                style={styles.iconUser}
                resizeMode="cover"
              />
            </View>
            <View style={{marginStart: 10}}>
              <BoldTextCB style={{color: Colors.black, fontSize: 16}}>
                {bookingDetail?.user.name}
              </BoldTextCB>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.iconVerified}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    tintColor:
                      bookingDetail?.user.email_verified_at !== null
                        ? Colors.turqoiseGreen
                        : 'red',
                  }}
                />
                <RegularTextCB
                  style={{
                    color: Colors.turqoiseGreen,
                    fontSize: 16,
                    marginStart: 5,
                  }}>
                  {bookingDetail?.email_verified_at !== null
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
              <RegularTextCB style={[{color: Colors.black, fontSize: 16}]}>
                {bookingDetail?.category.name !== null &&
                bookingDetail?.category.name !== undefined
                  ? bookingDetail?.category.name
                  : ''}
              </RegularTextCB>
            </View>

            <LightTextCB style={{color: Colors.black, fontSize: 14}}>
              $
              {bookingDetail?.grandTotal !== null &&
              bookingDetail?.grandTotal !== undefined
                ? bookingDetail?.grandTotal
                : ''}
            </LightTextCB>
          </View>
          <View style={{marginVertical: SIZES.ten}}>
            <RegularTextCB style={{color: Colors.coolGrey}}>
              {bookingDetail?.description !== null &&
              bookingDetail?.description !== undefined
                ? bookingDetail?.description
                : ''}
            </RegularTextCB>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              alignItems: 'center',
              marginVertical: SIZES.fifteen,
            }}>
            <Image
              source={Images.iconLocationPin}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                marginStart: 5,
              }}>
              {bookingDetail?.address !== null &&
              bookingDetail?.address !== undefined
                ? bookingDetail?.address
                : ''}
            </RegularTextCB>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              alignItems: 'center',
              marginVertical: SIZES.fifteen,
            }}>
            <Image
              source={Images.iconStopWatch}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
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
                {bookingDetail?.start_time !== null &&
                bookingDetail?.start_time !== undefined
                  ? bookingDetail?.start_time
                  : ''}{' '}
                -{' '}
                {bookingDetail?.end_time !== null &&
                bookingDetail?.end_time !== undefined
                  ? bookingDetail?.end_time
                  : ''}
              </RegularTextCB>
            </View>
          </View>

          <View
            style={{
              height: 0.9,
              backgroundColor: Colors.grey,
              marginVertical: SIZES.twenty,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: SIZES.fifteen,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Image
                  source={{
                    uri:
                      Constants.imageURL +
                      bookingDetail?.vendor.user_profiles.image,
                  }}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 60 / 2,
                    resizeMode: 'contain',
                  }}
                  resizeMode="cover"
                />
              </View>
              <View style={{marginStart: 10}}>
                <BoldTextCB style={{color: Colors.black, fontSize: 16}}>
                  {bookingDetail?.vendor.name !== null &&
                  bookingDetail?.vendor.name !== undefined
                    ? bookingDetail?.vendor.name
                    : ''}
                </BoldTextCB>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    alignItems: 'center',
                  }}></View>
              </View>
            </View>
            {bookingDetail?.orderStatus === 'pending' ? (
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.sickGreen,
                  marginRight: SIZES.ten,
                  padding: SIZES.fifteen,
                  borderRadius: SIZES.ten,
                  width: SIZES.fifty * 1.7,
                  alignItems: 'center',
                }}
                activeOpacity={0.6}
                onPress={() => {
                  acceptOrder();
                }}>
                <BoldTextCB>Accept</BoldTextCB>
              </TouchableOpacity>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingHorizontal: SIZES.ten,
                paddingBottom: SIZES.twenty,
              }}>
              <StarRating
                disabled={true}
                maxStars={5}
                fullStar={Images.starFull}
                emptyStar={Images.starHalf}
                starSize={SIZES.fifteen}
                rating={
                  bookingDetail?.vendor.ratings !== null &&
                  bookingDetail?.vendor.ratings !== undefined
                    ? bookingDetail?.vendor.ratings
                    : ''
                }
                starStyle={{
                  width: SIZES.twenty,
                  height: SIZES.twenty,
                  marginRight: SIZES.five,
                }}
                containerStyle={{width: SIZES.fifty * 1.5}}
              />

              <RegularTextCB
                style={{
                  color: Colors.sunflowerYellow,
                  fontSize: 13.5,
                  marginStart: SIZES.twenty * 1.8,
                  marginTop: SIZES.five / 2,
                }}>
                {bookingDetail?.vendor.ratings !== null &&
                bookingDetail?.vendor.ratings !== undefined
                  ? bookingDetail?.vendor.ratings
                  : ''}{' '}
                Ratings
              </RegularTextCB>
            </View>

            {bookingDetail?.orderStatus === 'pending' ? (
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.coolGrey,
                  marginRight: SIZES.ten,
                  padding: SIZES.fifteen,
                  borderRadius: SIZES.ten,
                  width: SIZES.fifty * 1.7,
                  alignItems: 'center',
                }}
                onPress={() => {
                  cancelOrder();
                }}
                activeOpacity={0.6}>
                <BoldTextCB style={{color: Colors.white}}>Decline</BoldTextCB>
              </TouchableOpacity>
            ) : null}
          </View>
        </TouchableOpacity>

        {bookingDetail?.orderStatus === 'cancelled' && (
          <LightTextCB
            style={{
              marginTop: SIZES.twenty,
              alignSelf: 'center',
              color: Colors.coolGrey,
            }}>
            * you Have canceled this order{' '}
          </LightTextCB>
        )}
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
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: SIZES.twenty,
    paddingTop: SIZES.twenty,
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  iconUser: {
    height: 65,
    width: 65,
    borderRadius: 60 / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height: 64,
    width: 64,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
