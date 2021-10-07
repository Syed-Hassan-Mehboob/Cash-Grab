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
} from 'react-native';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import Constants, {SIZES, width} from '../common/Constants';
import BoldTextCB from '../components/BoldTextCB';
import RegularTextCB from '../components/RegularTextCB';
import Colors from '../common/Colors';
import Images from '../common/Images';
import {Icon} from 'native-base';
import ButtonRadius10 from '../components/ButtonRadius10';
import utils from '../utils';
import Axios from '../network/APIKit';
import Spinner from 'react-native-loading-spinner-overlay';

export default function ScheduleJobDetails(props) {
  const [cancelJobModal, setCancelJobModal] = useState(false);
  const [scheduleJobdetail, setAllScheduleJobDetail] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [RescheduleJobModal, setRescheduleJobModal] = useState(false);

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
      // console.log('Order Job Data  ====>>>>>>>>>> ', data.data);

      setAllScheduleJobDetail(data.data);
      setIsloading(false);
    };

    const onFailure = (error) => {
      setIsloading(false);

      utils.showResponseError(error);
      console.log('++++==========', error);
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
          {props.route.params.catName}
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
                      scheduleJobdetail.vendor?.user_profiles?.image
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

          <BoldTextCB style={{color: Colors.black, fontSize: 12}}>
            {scheduleJobdetail?.grandTotal !== null &&
            scheduleJobdetail?.grandTotal !== undefined
              ? scheduleJobdetail?.grandTotal
              : ''}
          </BoldTextCB>
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
              -{' '}
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

        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: SIZES.fifteen,
            justifyContent: 'space-between',
          }}> */}

        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Image
              source={Images.emp2}
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
              {'Damian Miller'}
            </BoldTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <RegularTextCB
                style={{
                  color: Colors.coolGrey,
                  fontSize: 13.5,
                }}>
                Car Mechanic applied
              </RegularTextCB>
            </View>
          </View>
        </View> */}

        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}> */}
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: SIZES.ten,
          }}>
          <StarRating
            disabled={true}
            maxStars={5}
            fullStar={Images.starFull}
            emptyStar={Images.starHalf}
            starSize={SIZES.fifteen}
            rating={4}
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
            4.4 Ratings
          </RegularTextCB>
        </View> */}

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
            activeOpacity={0.6}
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
            activeOpacity={0.6}>
            <RegularTextCB style={{color: Colors.white}}>CANCEL</RegularTextCB>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={{marginTop: SIZES.ten * 5}}>
        <ButtonRadius10
          label="SERVICE COMPLETED"
          bgColor={Colors.sickGreen}
          onPress={() => {
            props.navigation.navigate(Constants.confirmPayment);
          }}
        />
      </View>

      <Modal
        isVisible={cancelJobModal}
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
            borderRadius: 10,
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
              activeOpacity={0.6}
              onPress={() => {
                setCancelJobModal(false);
                setTimeout(() => {
                  props.navigation.goBack();
                }, 500);
              }}>
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
              activeOpacity={0.6}>
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
        <View style={{alignItems: 'center', backgroundColor: '#fff'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: SIZES.fifteen,
              marginTop: SIZES.fifteen,
            }}>
            <View
              style={[
                styles.card,
                {borderWidth: 2, borderColor: Colors.sickGreen, flex: 1},
              ]}>
              <View style={{alignItems: 'center'}}>
                <RegularTextCB style={{fontSize: 12, color: Colors.coolGrey}}>
                  From
                </RegularTextCB>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    placeholderTextColor={Colors.black}
                    placeholder={'Hr'}
                    style={styles.textInput}
                    maxLength={2}
                    // value={this.state.hrFrom}
                    keyboardType={'numeric'}
                    // onChangeText={(text) =>
                    //   this.setState({hrFrom: text.replace(/[^0-9]/g, '')})
                    // }
                  />
                  <TextInput
                    placeholderTextColor={Colors.black}
                    placeholder={'Min'}
                    style={styles.textInput}
                    maxLength={2}
                    keyboardType={'numeric'}
                    // value={this.state.minFrom}
                    // onChangeText={(text) =>
                    //   this.setState({minFrom: text.replace(/[^0-9]/g, '')})
                    // }
                  />
                </View>
              </View>
            </View>
            <View
              style={[
                styles.card,
                {borderWidth: 2, borderColor: Colors.sickGreen, flex: 1},
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
                    // value={this.state.hrTo}
                    keyboardType={'numeric'}
                    // onChangeText={(text) =>
                    //   this.setState({hrTo: text.replace(/[^0-9]/g, '')})
                    // }
                  />
                  <TextInput
                    placeholderTextColor={Colors.black}
                    placeholder={'Min'}
                    style={styles.textInput}
                    maxLength={2}
                    // value={this.state.hrMin}
                    keyboardType={'numeric'}
                    // onChangeText={(text) =>
                    //   this.setState({hrMin: text.replace(/[^0-9]/g, '')})
                    // }
                  />
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.sickGreen,
              paddingHorizontal: SIZES.twenty * 5,
              paddingVertical: SIZES.fifteen,
              borderRadius: SIZES.ten,
              marginVertical: SIZES.twenty,
            }}
            onPress={() => setRescheduleJobModal(false)}
            activeOpacity={0.6}>
            <Text>save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
});
