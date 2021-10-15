import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Colors from '../../common/Colors';
import Constants, {SIZES, STYLES} from '../../common/Constants';
import Images from '../../common/Images';
import LightTextCB from '../../components/LightTextCB';
import NormalHeader from '../../components/NormalHeader';
import RegularTextCB from '../../components/RegularTextCB';
import Axios from '../../network/APIKit';
import utils from '../../utils';

export default function MyAcceptedJobs(props) {
  const [myAcceptedJob, setMyAcceptedJob] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserAccessToken();
  }, []);

  const getUserAccessToken = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem(Constants.accessToken);
    if (token !== undefined) {
      getMyAcceptedJob(token);
      // updateJobs(accessToken.token);
    }
  };

  const getMyAcceptedJob = (token) => {
    const onSuccess = ({data}) => {
      console.log('My Accepted Jobs ==== ', data.data.records);
      setMyAcceptedJob(data.data.records);
    };

    const onFailure = (error) => {
      setIsLoading(false);
      console.log('=================', error);
      utils.showResponseError(error);
    };

    Axios.get(Constants.orderAccepted, {
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  const renderMyAcceptedJob = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.card,
          {
            padding: SIZES.fifteen,
            // marginHorizontal: SIZES.five * 10,
            // marginTop: SIZES.twenty,
          },
        ]}
        onPress={() =>
          props.navigation.navigate(Constants.MyAcceptedJobDetails, {
            orderId: item.id,
          })
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.circleCard}>
            <Image
              source={{
                uri: Constants.imageURL + item.user_image,
              }}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>

          <View style={{marginStart: 10}}>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {item.user_name}
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
                  //   item.email_verified_at !== null
                  //     ? Colors.turqoiseGreen
                  //     : 'red',
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
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {item.category_name}
            </RegularTextCB>

            {/* <RegularTextCB
              style={{
                color: Colors.sickGreen,
                fontSize: 14,
                //   marginVertical: SIZES.ten,
                opacity: 0,
              }}>
              {item.service}
            </RegularTextCB> */}
          </View>

          <LightTextCB style={{color: Colors.black, fontSize: 14}}>
            $ {item.grand_total}
          </LightTextCB>
        </View>
        <View style={{}}>
          {item.description ? (
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 15,
              }}>
              {item.description}
            </RegularTextCB>
          ) : null}
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
            {item.location}
          </RegularTextCB>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexShrink: 1,
              marginRight: SIZES.fifteen,
              opacity: item.from_time !== '' ? 1 : 0,
            }}>
            <Image
              source={Images.iconStopWatch}
              style={{height: 17, width: 17, resizeMode: 'contain'}}
            />
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
              }}
              numberOfLines={1}>
              {item.from_time}{' '}
            </RegularTextCB>
          </View>
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
      </TouchableOpacity>
    );
  };
  return (
    <View style={STYLES.container}>
      <NormalHeader name="My Jobs" />
      <View style={{}}>
        <FlatList
          data={myAcceptedJob}
          renderItem={renderMyAcceptedJob}
          keyExtractor={(id) => id.id}
          contentContainerStyle={{
            paddingHorizontal: SIZES.fifteen,
            paddingTop: SIZES.ten * 2,
            paddingBottom: 150,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
    backgroundColor: '#fff',
    borderRadius: 20,
    // width: width - SIZES.fifteen,
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
    // shadowColor: '#c5c5c5',
    // shadowOffset: {width: 5, height: 5},
    // shadowOpacity: 0.15,
    // shadowRadius: 5,
    // elevation: 5,
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
