import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Constants, {SIZES, STYLES, width} from '../common/Constants';
import BoldTextCB from '../components/BoldTextCB';
import RegularTextCB from '../components/RegularTextCB';
import Colors from '../common/Colors';
import Images from '../common/Images';
import {Icon} from 'native-base';
import NormalHeader from '../components/NormalHeader';
import utils from '../utils';
import Axios from '../network/APIKit';
import Spinner from 'react-native-loading-spinner-overlay';

export default function JobAcceptance(props) {
  const [isLoading, setIsloading] = useState(true);
  const [jobAccept, setJobAccept] = useState();
  const [jobAcceptList, setJobAcceptList] = useState([]);
  const [jobRequest, setJobRequest] = useState([]);

  useEffect(async () => {
    getUserAccessToken();
  }, []);

  const getUserAccessToken = async () => {
    setIsloading(true);
    const value = await AsyncStorage.getItem('user');
    const accessToken = JSON.parse(value);
    if (accessToken !== undefined) {
      getJobAcceptance(accessToken.token);
      // postJobRequest(accessToken.token);
    }
  };

  const getJobAcceptance = async () => {
    const value = await AsyncStorage.getItem(Constants.accessToken);
    let config = {
      params: {
        jobId: '1',
      },
      headers: {
        Authorization: value,
      },
    };

    // console.log('tokennnnn', token);

    const onSuccess = ({data}) => {
      console.log('Job Acceptanceeeeeeeee ======================>', data.data);
      setJobAccept(data.data.records);
      setJobAcceptList(data.data.records.requests);
      setIsloading(false);
    };
    const onFailure = (error) => {
      utils.showResponseError(error);
      setIsloading(false);
      console.log('===============>', error);
    };
    // const onSuccess = ({data}) => {
    //   console.log('asdsdasdsadasd ======================>', data.data);
    //   setJobAccept(data.data);
    //   setIsloading(false);
    // };
    // const onFailure = (error) => {
    //   utils.showResponseError(error);
    //   setIsloading(false);
    //   console.log('===============>', error);
    // };
    Axios.get(Constants.jobAcceptance, config).then(onSuccess).catch(onFailure);
  };

  const postJobRequest = async () => {
    const value2 = await AsyncStorage.getItem(Constants.accessToken);
    let config2 = {
      params: {
        request_id: '1',
        status: 'accepted',
      },
      headers: {
        Authorization: value2,
      },
    };

    // console.log('tokennnnn', token);

    const onSuccess = ({data}) => {
      console.log('Job Requesttttt ======================>', data.data);
      setJobRequest(data);
      setIsloading(false);
    };
    const onFailure = (error) => {
      utils.showResponseError(error);
      setIsloading(false);
      console.log('==============222222222222222=>', error);
    };
    // const onSuccess = ({data}) => {
    //   console.log('asdsdasdsadasd ======================>', data.data);
    //   setJobAccept(data.data);
    //   setIsloading(false);
    // };
    // const onFailure = (error) => {
    //   utils.showResponseError(error);
    //   setIsloading(false);
    //   console.log('===============>', error);
    // };
    Axios.post(
      Constants.jobRequest,
      {
        request_id: '1',
        status: 'accepted',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: value2,
        },
      },
    )
      .then(onSuccess)
      .catch(onFailure);
  };

  const renderJobRequest = ({item}) => {
    console.log('==================>>>>>>> ', item);
    return (
      <View
        style={[styles.card, {marginTop: SIZES.twenty, padding: SIZES.ten}]}>
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
                {/* {item.name} */}
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
                  {/* {item.tittle} */}
                </RegularTextCB>
              </View>
            </View>
          </View>
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
              props.navigation.navigate(Constants.confirmPayment);
            }}>
            <BoldTextCB>Accept</BoldTextCB>
          </TouchableOpacity>
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
              props.navigation.replace(Constants.PostedJob);
            }}
            activeOpacity={0.6}>
            <BoldTextCB style={{color: Colors.white}}>Decline</BoldTextCB>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      {isLoading ? (
        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      ) : (
        <View style={STYLES.container}>
          {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          // paddingHorizontal: SIZES.fifteen,
          // marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: }}
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
          Booking Acceptance
        </RegularTextCB>
      </View> */}

          <NormalHeader name="Job Acceptance" />
          <View style={{paddingHorizontal: SIZES.fifteen}}>
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles.card,
                {padding: SIZES.fifteen, marginTop: SIZES.twentyFive},
              ]}
              onPress={() => {
                //   props.navigation.navigate(Constants.JobAcceptance)
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: SIZES.ten,
                }}>
                <View style={styles.circleCard}>
                  <Image
                    source={{uri: Constants.imageURL + jobAccept.user.image}}
                    style={styles.iconUser}
                    resizeMode="cover"
                  />
                </View>
                <View style={{marginStart: 10}}>
                  <BoldTextCB style={{color: Colors.black, fontSize: 16}}>
                    {jobAccept.user.name}
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
                  <RegularTextCB
                    style={{color: Colors.sickGreen, fontSize: 14.5}}>
                    Automobile
                  </RegularTextCB>
                </View>

                <BoldTextCB style={{color: Colors.black, fontSize: 12}}>
                  $270.00
                </BoldTextCB>
              </View>
              <View style={{marginVertical: SIZES.ten}}>
                <RegularTextCB style={{color: Colors.coolGrey}}>
                  Looking for a car mechanic that can look into the battery
                  setup. The car is in a still position & would require some man
                  power
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
                  alignItems: 'center',
                  marginTop: SIZES.ten,
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
            </TouchableOpacity>
          </View>
          <FlatList
            data={jobAcceptList}
            renderItem={renderJobRequest}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
              paddingHorizontal: SIZES.fifteen,
            }}
          />
        </View>
      )}
    </>
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
    borderRadius: 30,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
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
    tittle: 'Car Macanic Applyed',
  },
  {
    id: 2,
    name: 'Domian Miller',
    tittle: 'Car Macanic Applyed',
  },
  {
    id: 3,
    name: 'Ray Hammad',
    tittle: 'Car Macanic Applyed',
  },
];
