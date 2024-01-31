import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import Constants, {FONTS, SIZES, width} from '../common/Constants';
import BoldTextCB from '../components/BoldTextCB';
import RegularTextCB from '../components/RegularTextCB';
import Colors from '../common/Colors';
import Images from '../common/Images';
import {Icon, Radio, ListItem} from 'native-base';
import ButtonRadius10 from '../components/ButtonRadius10';
import utils from '../utils';
import Axios from '../network/APIKit';
import Spinner from 'react-native-loading-spinner-overlay';
import {Calendar} from 'react-native-calendars';
import {Toast} from 'native-base';
import LightTextCB from '../components/LightTextCB';

export default function ScheduleJobDetails(props) {
  const [cancelJobModal, setCancelJobModal] = useState(false);
  const [scheduleJobdetail, setAllScheduleJobDetail] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [RescheduleJobModal, setRescheduleJobModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [hrfrom, sethrfrom] = useState();
  const [minfrom, setminfrom] = useState();
  const [hrto, sethrto] = useState();
  const [minto, setminto] = useState();
  const [orderStatus, setOrderStatus] = useState('one');
  const [orderId, setOrderId] = useState();
  const [errorMassage, setErrormsg] = useState('');

  useEffect(() => {
    const getToken = async () => {
      getScheduleJob();
      const unsubscribe = props.navigation.addListener('focus', () => {
        // console.log('working ==== ......');
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
      console.log(
        'customer Order Job Data  ====>>>>>>>>>> ',
        data.data.orderStatus,
      );
      setOrderStatus(data.data.orderStatus);
      setOrderId(data.data.id);
      setAllScheduleJobDetail(data.data);
      setIsloading(false);
    };

    const onFailure = (error) => {
      setIsloading(false);

      utils.showResponseError(error);
      // console.log('++++==========', error);
    };
    // console.log('==== Job id >>>>>>>', props.route.params.joid);

    const params = {
      orderId: props.route.params.joid,
    };
    Axios.get(Constants.orderDetail, {
      params,
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  const cancelOrder = async () => {
    let token = await AsyncStorage.getItem(Constants.accessToken);
    setIsloading(true);

    const onSuccess = ({data}) => {
      // console.log('>>>>>>>> ', data);
      this.getScheduleJob();
      setIsloading(false);
    };

    const onFailure = (error) => {
      setIsloading(false);

      utils.showResponseError(error);
      // console.log('++++==========', error);
    };
    // console.log('==== Job id >>>>>>>', props.route.params.joid);
    const options = {
      headers: {
        Authorization: token,
      },
    };
    const params = {
      orderId: orderId,
    };
    Axios.post(Constants.orderCancel, params, options)
      .then(onSuccess)
      .catch(onFailure);

    setCancelJobModal(false);
    setTimeout(() => {
      props.navigation.goBack();
    }, 500);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    // console.log('day press===============>>>>', day);
  };

  const handelReschedule = async () => {
    let token = await AsyncStorage.getItem(Constants.accessToken);
    let from_time;
    let to_time;
    let orderid = orderId;
    let date = selectedDate;
    // console.log('=====>>>', hrfrom);

    if (date === undefined) {
      setErrormsg('Please select a date to reschedule');
      setTimeout(() => {
        setErrormsg('');
      }, 5000);
      return;
    }

    if (hrfrom === undefined) {
      setErrormsg('From Hour should not be empty');
      setTimeout(() => {
        setErrormsg('');
      }, 5000);
      return;
    }

    if (Number(hrfrom) < 1 || Number(hrfrom) > 23) {
      setErrormsg('From Hour should be in between 1 and 23');
      setTimeout(() => {
        setErrormsg('');
      }, 5000);
      return;
    }

    if (minfrom === undefined) {
      setErrormsg('From Minutes should not be empty');
      setTimeout(() => {
        setErrormsg('');
      }, 5000);
      return;
    }

    if (Number(minfrom) < 1 || Number(minfrom) > 59) {
      setErrormsg('From Minutes should be in between 1 and 59');
      setTimeout(() => {
        setErrormsg('');
      }, 5000);
      return;
    }

    if (hrto === undefined) {
      setErrormsg('To Hour should not be empty');
      setTimeout(() => {
        setErrormsg('');
      }, 5000);
      return;
    }

    if (Number(hrto) < 1 || Number(hrto) > 23) {
      setErrormsg('To Hour should be in between 1 and 23');
      setTimeout(() => {
        setErrormsg('');
      }, 5000);
      return;
    }

    if (minto === undefined) {
      setErrormsg('To Minutes should not be empty');
      setTimeout(() => {
        setErrormsg('');
      }, 5000);
      return;
    }

    if (Number(minto) < 1 || Number(minto) > 59) {
      setErrormsg('To Minutes should be in between 1 and 59');
      setTimeout(() => {
        setErrormsg('');
      }, 5000);
      return;
    }

    const params = {
      orderId: orderid,
      date: date,
      from_time: hrfrom + ':' + minfrom,
      to_time: hrto + ':' + minto,
    };
    // console.log(params);

    const options = {
      headers: {
        Authorization: token,
      },
    };

    const onSuccess = ({data}) => {
      console.log('reschedule  Data  ====>>>>>>>>>> ', data);

      setTimeout(() => {
        getScheduleJob();
        setIsloading(false);
        utils.showToast(data.message);
      }, 1000);
    };

    const onFailure = (error) => {
      setIsloading(false);

      utils.showResponseError(error);
      console.log('++++==========', error);
    };
    // console.log('==== Job id >>>>>>>', props.route.params.joid);

    setIsloading(true);
    Axios.post(Constants.rescheduleBooking, params, options)
      .then(onSuccess)
      .catch(onFailure);
  };
  // console.log('.....', props.route.params);

  const handleServiceCompleteClick = async () => {
    let token = await AsyncStorage.getItem(Constants.accessToken);
    setIsloading(true);
    const formData = new FormData();
    formData.append('order_id', orderId);
    formData.append('status', 'completed');

    const onSuccess = ({data}) => {
      console.log('data service completed=====>>>>', data);
      this.getScheduleJob();
      setIsloading(false);
    };
    const onFailure = (error) => {
      console.log('error service completed=====>>>>', `Bearer ${token}`);
      setIsloading(false);
    };
    Axios.post(Constants.orderStatus, formData, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: SIZES.ten * 3,
        paddingHorizontal: SIZES.fifteen,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: 0}}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon
            type="AntDesign"
            name="left"
            style={{color: Colors.black, fontSize: SIZES.ten * 3}}
          />
        </TouchableOpacity>
        <RegularTextCB style={{fontSize: SIZES.ten * 3}}>
          {/* {props.route.params.catName} */}
          Scheduled Job Detail
        </RegularTextCB>
      </View>

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
                  scheduleJobdetail?.vendor?.user_profiles?.image !== null &&
                  scheduleJobdetail?.vendor?.user_profiles?.image !== undefined
                    ? Constants?.imageURL +
                      scheduleJobdetail?.vendor.user_profiles?.image
                    : '',
              }}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View style={{marginStart: 10}}>
            <BoldTextCB style={{color: Colors.black, fontSize: 16}}>
              {scheduleJobdetail?.name !== null &&
              scheduleJobdetail?.name !== undefined
                ? scheduleJobdetail?.name
                : ''}
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
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                  tintColor: Colors.turqoiseGreen,
                }}
              />
              <RegularTextCB
                style={{
                  color: Colors.turqoiseGreen,
                  fontSize: 16,
                  marginStart: 5,
                }}>
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
            justifyContent: 'flex-start',
            paddingHorizontal: SIZES.ten,
          }}>
          {/* {console.log('=====........>>>>>', scheduleJobdetail)} */}
          <StarRating
            disabled={true}
            maxStars={5}
            fullStar={Images.starFull}
            emptyStar={Images.starHalf}
            starSize={SIZES.fifteen}
            rating={scheduleJobdetail?.vendor?.ratings}
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
            {scheduleJobdetail?.vendor?.ratings_count !== null &&
            scheduleJobdetail?.vendor?.ratings_count !== undefined
              ? scheduleJobdetail?.vendor?.ratings_count
              : ''}{' '}
            Ratings
          </RegularTextCB>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <RegularTextCB style={{color: Colors.sickGreen, fontSize: 14.5}}>
              {scheduleJobdetail?.category?.name !== null &&
              scheduleJobdetail?.category?.name !== undefined
                ? scheduleJobdetail?.category?.name
                : ''}
            </RegularTextCB>
          </View>

          <LightTextCB style={{color: Colors.black, fontSize: 12}}>
            {'$ '}
            {scheduleJobdetail?.grandTotal !== null &&
            scheduleJobdetail?.grandTotal !== undefined
              ? scheduleJobdetail?.grandTotal
              : ''}
          </LightTextCB>
        </View>

        <View style={{marginVertical: SIZES.ten}}>
          <RegularTextCB style={{color: Colors.coolGrey}}>
            {scheduleJobdetail?.description !== null &&
            scheduleJobdetail?.description !== undefined
              ? scheduleJobdetail?.description
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
            {scheduleJobdetail?.address !== null &&
            scheduleJobdetail?.address !== undefined
              ? scheduleJobdetail?.address
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
              {scheduleJobdetail?.start_time !== null &&
              scheduleJobdetail?.start_time !== undefined
                ? scheduleJobdetail?.start_time
                : ''}
              {' - '}
              {scheduleJobdetail?.end_time !== null &&
              scheduleJobdetail?.end_time !== undefined
                ? scheduleJobdetail?.end_time
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
            justifyContent: 'space-between',
            marginTop: SIZES.five,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: Colors.sickGreen,
              marginRight: SIZES.ten,
              padding: SIZES.fifteen,
              borderRadius: SIZES.ten,
              width: SIZES.fifty * 2.5,
              alignItems: 'center',
            }}
            activeOpacity={0.85}
            onPress={() => {
              setRescheduleJobModal(true);
            }}>
            <RegularTextCB>RESCHEDULE</RegularTextCB>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: Colors.coolGrey,
              marginLeft: SIZES.ten,
              padding: SIZES.fifteen,
              borderRadius: SIZES.ten,
              width: SIZES.fifty * 2.5,
              alignItems: 'center',
            }}
            onPress={() => {
              setCancelJobModal(true);
            }}
            activeOpacity={0.85}>
            <RegularTextCB style={{color: Colors.white}}>CANCEL</RegularTextCB>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {!isLoading && orderStatus === 'progress' ? (
        <View style={{marginTop: SIZES.ten * 5}}>
          <ButtonRadius10
            label="SERVICE COMPLETED"
            bgColor={Colors.sickGreen}
            onPress={() => {
              handleServiceCompleteClick();
            }}
          />
        </View>
      ) : null}

      {orderStatus === 'completed' ? (
        <LightTextCB
          style={{
            marginVertical: SIZES.fifty,
            alignSelf: 'center',
            color: Colors.coolGrey,
          }}>
          *This job has been completed{' '}
        </LightTextCB>
      ) : null}

      <Modal
        isVisible={cancelJobModal}
        visible={cancelJobModal}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View
          style={{
            backgroundColor: Colors.white,
            padding: SIZES.fifteen,
            alignItems: 'center',
            borderRadius: SIZES.ten,
          }}>
          <Icon
            type={'MaterialCommunityIcons'}
            name={'information-outline'}
            style={{
              fontSize: SIZES.twenty * 3.5,
              color: Colors.sickGreen,
            }}
          />
          <BoldTextCB style={[{color: Colors.black, fontSize: 22}]}>
            Are you sure?!
          </BoldTextCB>
          <RegularTextCB
            style={{
              marginVertical: SIZES.ten,
              fontSize: 16,
              color: Colors.coolGrey,
            }}>
            You want to cancel this booking?
          </RegularTextCB>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: SIZES.twentyFive,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: Colors.sickGreen,
                marginRight: SIZES.ten,
                padding: SIZES.fifteen,
                borderRadius: SIZES.ten,
                width: SIZES.fifty * 2.5,
                alignItems: 'center',
              }}
              activeOpacity={0.85}
              onPress={cancelOrder}>
              <RegularTextCB style={{fontSize: 16}}>YES</RegularTextCB>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: Colors.coolGrey,
                marginLeft: SIZES.ten,
                padding: SIZES.fifteen,
                borderRadius: SIZES.ten,
                width: SIZES.fifty * 2.5,
                alignItems: 'center',
              }}
              onPress={() => {
                setCancelJobModal(false);
              }}
              activeOpacity={0.85}>
              <RegularTextCB style={{color: Colors.white, fontSize: 16}}>
                NO
              </RegularTextCB>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={RescheduleJobModal}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View
          style={{
            paddingHorizontal: SIZES.fifteen,
            paddingBottom: SIZES.ten,
            backgroundColor: 'white',
            borderRadius: SIZES.five,
            borderWidth: 1,
            borderColor: Colors.sickGreen,
          }}>
          <Text style={{color: 'red'}}>{errorMassage}</Text>
          <Icon
            type="AntDesign"
            name="closecircleo"
            style={{color: Colors.sickGreen, alignSelf: 'flex-end'}}
            onPress={() => setRescheduleJobModal(false)}
          />
          <Calendar
            firstDay={1}
            minDate={new Date()}
            monthFormat={'MMM yyyy'}
            disabledByDefault={true}
            hideExtraDays
            onDayPress={onDayPress}
            markingType={'custom'}
            markedDates={{
              [moment(selectedDate).format('YYYY-MM-DD')]: {
                customStyles: {
                  container: styles.selectedDateBG,
                  text: {
                    color: Colors.white,
                    fontFamily: Constants.fontRegular,
                    fontSize: 14,
                  },
                },
              },
            }}
            theme={{
              textDayFontFamily: Constants.fontRegular,
              textMonthFontFamily: Constants.fontRegular,
              textDayHeaderFontFamily: Constants.fontRegular,
              color: Colors.black,
              dayTextColor: Colors.navy,
              todayTextColor: 'yellow',
              monthTextColor: Colors.navy,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: SIZES.twenty,
              justifyContent: 'space-between',

              width: '100%',
              paddingHorizontal: SIZES.fifteen,
            }}>
            <View
              style={[
                styles.card,
                {
                  borderWidth: 2,
                  borderColor: Colors.sickGreen,
                  width: '45%',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <RegularTextCB
                  style={{
                    fontSize: 12,
                    color: Colors.coolGrey,
                    marginTop: SIZES.five,
                  }}>
                  From
                </RegularTextCB>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    placeholderTextColor={Colors.black}
                    placeholder={'Hr'}
                    style={[styles.textInput, {alignItems: 'center'}]}
                    maxLength={2}
                    value={hrfrom}
                    keyboardType={'numeric'}
                    onChangeText={(text) => sethrfrom(text)}
                  />

                  <TextInput
                    placeholderTextColor={Colors.black}
                    placeholder={'Min'}
                    style={styles.textInput}
                    maxLength={2}
                    keyboardType={'numeric'}
                    value={minfrom}
                    onChangeText={(text) => setminfrom(text)}
                  />
                </View>
              </View>
            </View>

            <View
              style={[
                styles.card,
                {
                  borderWidth: 2,
                  borderColor: Colors.sickGreen,
                  width: '45%',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <View style={{alignItems: 'center'}}>
                <RegularTextCB style={{fontSize: 12, color: Colors.coolGrey}}>
                  To
                </RegularTextCB>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    placeholderTextColor={Colors.black}
                    placeholder={'Hr'}
                    placeholderTextColor={Colors.black}
                    style={styles.textInput}
                    maxLength={2}
                    value={hrto}
                    keyboardType={'numeric'}
                    onChangeText={(text) => sethrto(text)}
                  />
                  <TextInput
                    placeholderTextColor={Colors.black}
                    placeholder={'Min'}
                    style={styles.textInput}
                    maxLength={2}
                    value={minto}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setminto(text)}
                  />
                </View>
              </View>
            </View>
          </View>

          <ButtonRadius10
            label="RESCHEDULE"
            onPress={() => {
              setRescheduleJobModal(false);

              handelReschedule();
            }}
          />
          {/* <TouchableOpacity
          style={{
            backgroundColor: Colors.sickGreen,
            paddingHorizontal: SIZES.twenty * 5,
            paddingVertical: SIZES.fifteen,
            borderRadius: SIZES.ten,
            marginTop: SIZES.twenty * 2,
          }}
          onPress={handelReschedule}
          activeOpacity={0.85}>
          <Text style={[FONTS.boldFont16, {}]}>RESCHEDULE</Text>
        </TouchableOpacity> */}
        </View>
      </Modal>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: SIZES.twenty,
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.ten,
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
    borderRadius: 30,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  textInput: {
    fontSize: 16,
    fontFamily: Constants.fontBold,
    color: Colors.black,
    borderColor: Colors.sickGreen,
    borderBottomWidth: SIZES.five,
    margin: SIZES.five,
    flex: 1,
    textAlign: 'center',
  },
  selectedTimeBG: {
    paddingHorizontal: SIZES.fifteen,
    paddingVertical: SIZES.fifteen,
    marginHorizontal: SIZES.five,
    marginVertical: SIZES.five,
    backgroundColor: Colors.sickGreen,
    borderRadius: SIZES.fifteen,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    alignItems: 'center',
    elevation: SIZES.ten,
    marginBottom: SIZES.fifteen,
  },
  unSelectedTimeBG: {
    paddingHorizontal: SIZES.fifteen,
    paddingVertical: SIZES.fifteen,
    borderRadius: SIZES.fifteen,
    marginHorizontal: SIZES.five,
    marginVertical: SIZES.five,
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginBottom: SIZES.fifteen,
  },
  selectedDateBG: {
    height: SIZES.ten * 3,
    width: SIZES.ten * 3,
    padding: 2,
    backgroundColor: Colors.sickGreen,
    borderRadius: SIZES.fifteen,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
