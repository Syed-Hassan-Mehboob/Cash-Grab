import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
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

export default function ScheduleJobDetails(props) {
  const [cancelJobModal, setCancelJobModal] = useState(false);

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
          Home Cleaner
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
              source={Images.emp3}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View style={{marginStart: 10}}>
            <BoldTextCB style={{color: Colors.black, fontSize: 16}}>
              {'Ray Hammond'}
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
            justifyContent: 'space-between',
          }}>
          <View>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              Car Mechanic Needed
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.sickGreen, fontSize: 14.5}}>
              Automobile
            </RegularTextCB>
          </View>

          <BoldTextCB style={{color: Colors.black, fontSize: 12}}>
            $270.00
          </BoldTextCB>
        </View>
        <View style={{marginVertical: SIZES.ten}}>
          <RegularTextCB style={{color: Colors.coolGrey}}>
            Looking for a car mechanic that can look into the battery setup. The
            car is in a still position & would require some man power
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
            111,NYC Street, NY 1121
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
              12:00 - 3:00
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
        <View
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
          {/* </View> */}
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}> */}
        <View
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
        </View>
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
            onPress={() => {}}>
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
            type={'Ionicons'}
            name={'information-circle-outline'}
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
});
