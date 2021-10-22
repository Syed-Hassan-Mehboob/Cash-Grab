import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import StarRating from 'react-native-star-rating';
import Constants, {FONTS, SIZES, width} from '../../common/Constants';
import BoldTextCB from '../../components/BoldTextCB';
import RegularTextCB from '../../components/RegularTextCB';
import Colors from '../../common/Colors';
import Images from '../../common/Images';
import {Icon} from 'native-base';

export default function SingleJobHistory(props) {
  // console.log(
  //   'single job history ======>>>>>>   ',
  //   props.route.params.singleHistoryData,
  // );

  return (
    <View style={styles.container}>
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
          {props.route.params.singleHistoryData.category.name} Job
        </RegularTextCB>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.card,
          {padding: SIZES.fifteen, marginTop: SIZES.twentyFive * 1.4},
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
                  Constants.imageURL +
                  props.route.params.singleHistoryData.userProfile.image,
              }}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View style={{marginStart: 10}}>
            <BoldTextCB style={{color: Colors.black, fontSize: 16}}>
              {props.route.params.singleHistoryData.user.name}
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
                {props.route.params.singleHistoryData.user.email_verified_at !==
                null
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
              {props.route.params.singleHistoryData.description !== ''
                ? props.route.params.singleHistoryData.description
                : 'N/A'}
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.sickGreen, fontSize: 14.5}}>
              {props.route.params.singleHistoryData.category.name}
            </RegularTextCB>
          </View>

          <RegularTextCB style={{color: Colors.black, fontSize: 12}}>
            ${props.route.params.singleHistoryData.grandTotal}
          </RegularTextCB>
        </View>
        <View style={{marginVertical: SIZES.ten}}>
          <RegularTextCB style={{color: Colors.coolGrey}}>
            {props.route.params.singleHistoryData.description !== ''
              ? props.route.params.singleHistoryData.description
              : 'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power'}
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
            {props.route.params.singleHistoryData.address}
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
              {props.route.params.singleHistoryData.start_time !== null
                ? props.route.params.singleHistoryData.start_time
                : ''}
              {'N/A'}
              {' - '}
              {' N/A'}
              {props.route.params.singleHistoryData.end_time !== null
                ? props.route.params.singleHistoryData.end_time
                : ''}
            </RegularTextCB>
          </View>
        </View>

        <View
          style={{
            height: 0.9,
            backgroundColor: Colors.grey,
            // marginVertical: SIZES.twenty,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.ten,
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
                    props.route.params.singleHistoryData.vendorProfile.image,
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
                {props.route.params.singleHistoryData.vendor.name}
              </BoldTextCB>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 3,
                  alignItems: 'center',
                }}>
                <RegularTextCB
                  style={{
                    color: Colors.coolGrey,
                    fontSize: 13.5,
                  }}>
                  {props.route.params.singleHistoryData.vendorProfile.about_me}
                </RegularTextCB>
              </View>
            </View>
          </View>
          {/* <TouchableOpacity
              style={{
                backgroundColor: Colors.sickGreen,
                marginRight: SIZES.ten,
                padding: SIZES.fifteen,
                paddingHorizontal: SIZES.twentyFive,
                borderRadius: SIZES.ten,
              }}>
              <BoldTextCB>Accept</BoldTextCB>
            </TouchableOpacity> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: SIZES.ten,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              //   marginTop: 5,
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingHorizontal: SIZES.ten,
            }}>
            <StarRating
              disabled={true}
              maxStars={5}
              fullStar={Images.starFull}
              // halfStar={Images.starHalf}
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
                marginVertical: SIZES.five / 2,
              }}>
              4.4 Ratings
            </RegularTextCB>
          </View>
          {/* <TouchableOpacity
              style={{
                backgroundColor: Colors.coolGrey,
                marginRight: SIZES.ten,
                padding: SIZES.fifteen,
                paddingHorizontal: SIZES.twentyFive,
                borderRadius: SIZES.ten,
              }}>
              <BoldTextCB style={{color: Colors.white}}>Decline</BoldTextCB>
            </TouchableOpacity> */}
        </View>

        <Text
          style={[
            FONTS.lightFont10,
            {
              color: Colors.coolGrey,
              marginTop: SIZES.five,
              paddingLeft: SIZES.ten,
            },
          ]}>
          Completed Job for{' '}
          {props.route.params.singleHistoryData.date !== null
            ? props.route.params.singleHistoryData.date
            : 'N/A'}
        </Text>
      </TouchableOpacity>
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
});
