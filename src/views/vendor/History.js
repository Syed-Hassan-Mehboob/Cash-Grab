import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../../common/Colors';
import Constants, {FONTS, height, SIZES, STYLES} from '../../common/Constants';
import Images from '../../common/Images';
import BoldTextCB from '../../components/BoldTextCB';
import NormalHeader from '../../components/NormalHeader';
import Axios from '../../network/APIKit';
import utils from '../../utils';
import RegularTextCB from './../../components/RegularTextCB';

export default function History(props) {
  const [accessToken, setAcessToken] = useState();
  const [completeJobs, setCompletedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCompletedJobs, setTotalCompletedJobs] = useState(true);

  useEffect(() => {
    getUserAccessToken();
  }, []);

  const getUserAccessToken = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem(Constants.accessToken);
    setAcessToken(token);
    getCompleteJob(token);
    setIsLoading(false);
  };

  const getCompleteJob = (token) => {
    const onSuccess = ({data}) => {
      setCompletedJobs(data.data.records);
      setTotalCompletedJobs(data.data.records.length);
      console.log(data.data.records);

      // setIsLoading(false);
    };

    const onFailure = (error) => {
      // setIsLoading(false);
      utils.showResponseError(error);
    };
    // let params = {
    //   offset: 0,
    //   limit: 1,
    // };

    // setIsLoading(true);
    Axios.get(Constants.orderCompleted, {
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  const rendercompletedJobsItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            padding: SIZES.fifteen,
            marginHorizontal: SIZES.five,
            marginBottom: SIZES.twenty,
            marginTop: SIZES.five,
          },
        ]}
        onPress={() => {
          props.navigation.navigate(Constants.SingleJobHistory, {
            singleHistoryData: item,
          });
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.circleCard}>
            <Image
              source={{uri: Constants.imageURL + item.userProfile.image}}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>

          <View style={{marginStart: SIZES.ten}}>
            <BoldTextCB
              style={{
                color: Colors.black,
                fontSize: 16,
              }}>
              {item.user.name}
            </BoldTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.five,
                alignItems: 'center',
              }}>
              <Image
                source={Images.iconVerified}
                style={{
                  height: SIZES.fifteen * 1.5,
                  width: SIZES.fifteen * 1.5,
                }}
                resizeMode="contain"
              />
              <RegularTextCB
                style={{
                  color: Colors.turqoiseGreen,
                  fontSize: 12,
                  marginStart: SIZES.five,
                }}>
                {item.user.email_verified_at !== null
                  ? 'Verified'
                  : 'Unverified'}
              </RegularTextCB>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.five,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <RegularTextCB
            style={{
              color: Colors.black,
              fontSize: 16,
            }}>
            {item.description !== null ? item.description : 'N/A'}
          </RegularTextCB>
          <RegularTextCB
            style={{
              color: Colors.black,
              fontSize: 14,
            }}>
            ${item.grandTotal}
          </RegularTextCB>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[FONTS.mediumFont12, {color: Colors.sickGreen}]}>
            {item.category !== '' ? item.category.name : 'N/A'}
          </Text>

          <Text
            style={[
              FONTS.mediumFont12,
              {
                color: Colors.black,
                textDecorationLine: 'underline',
                fontSize: 16,
              },
            ]}>
            {'View Job'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[STYLES.container]}>
      <NormalHeader name="Completed Orders" />
      <Text
        style={[
          FONTS.mediumFont16,
          {marginVertical: SIZES.twenty, paddingLeft: SIZES.twenty},
        ]}>
        {totalCompletedJobs > 0
          ? `${totalCompletedJobs} Commpleted jobs`
          : null}
      </Text>
      <FlatList
        data={completeJobs}
        keyExtractor={(item) => item.id}
        renderItem={rendercompletedJobsItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !isLoading && completeJobs.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: height / 1.5,
              }}>
              <Text style={[FONTS.boldFont18, {alignSelf: 'center'}]}>
                No Record(s)!
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={{
          paddingHorizontal: SIZES.twenty,
          paddingBottom: SIZES.fifty,
          marginTop: SIZES.twenty,
        }}
      />

      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{color: '#FFFf', fontFamily: Constants.fontRegular}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  circleCard: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: SIZES.ten * 3,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.5,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  iconUser: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: (SIZES.ten * 6) / 2,
    resizeMode: 'contain',
  },
});

const DummyData = [
  {
    id: 1,
    name: 'Ray Hammond',
    title: 'Car Mechanic Needed',
    service: 'Automobile',
    price: '$300.00',
    image:
      'https://media.istockphoto.com/photos/portrait-concept-picture-id1016761216?k=20&m=1016761216&s=612x612&w=0&h=jEC8voGLjSyhdOO7EMQyrLtZ9m--TEUmd4X56sqyZk0=',
  },
  {
    id: 2,
    name: 'Ray Hammond',
    title: 'Car Mechanic Needed',
    service: 'Automobile',
    price: '$300.00',
    image:
      'https://media.istockphoto.com/photos/portrait-concept-picture-id1016761216?k=20&m=1016761216&s=612x612&w=0&h=jEC8voGLjSyhdOO7EMQyrLtZ9m--TEUmd4X56sqyZk0=',
  },
  {
    id: 3,
    name: 'Ray Hammond',
    title: 'Car Mechanic Needed',
    service: 'Automobile',
    price: '$300.00',
    image:
      'https://media.istockphoto.com/photos/portrait-concept-picture-id1016761216?k=20&m=1016761216&s=612x612&w=0&h=jEC8voGLjSyhdOO7EMQyrLtZ9m--TEUmd4X56sqyZk0=',
  },
  {
    id: 4,
    name: 'Ray Hammond',
    title: 'Car Mechanic Needed',
    service: 'Automobile',
    price: '$300.00',
    image:
      'https://media.istockphoto.com/photos/portrait-concept-picture-id1016761216?k=20&m=1016761216&s=612x612&w=0&h=jEC8voGLjSyhdOO7EMQyrLtZ9m--TEUmd4X56sqyZk0=',
  },
  {
    id: 5,
    name: 'Ray Hammond',
    title: 'Car Mechanic Needed',
    service: 'Automobile',
    price: '$300.00',
    image:
      'https://media.istockphoto.com/photos/portrait-concept-picture-id1016761216?k=20&m=1016761216&s=612x612&w=0&h=jEC8voGLjSyhdOO7EMQyrLtZ9m--TEUmd4X56sqyZk0=',
  },
];
