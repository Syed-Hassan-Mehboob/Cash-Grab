import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../common/Colors';
import Constants, {FONTS, SIZES, STYLES} from '../../common/Constants';
import Images from '../../common/Images';
import BoldTextCB from '../../components/BoldTextCB';
import NormalHeader from '../../components/NormalHeader';
import RegularTextCB from './../../components/RegularTextCB';

export default function History(props) {
  const renderHistoryCard = ({item}) => {
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
        activeOpacity={0.6}
        onPress={() => {
          props.navigation.navigate(Constants.SingleJobHistory);
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.circleCard}>
              <Image
                source={{uri: item.image}}
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
                {item.name}
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
                  Verified
                </RegularTextCB>
              </View>
            </View>
          </View>

          <RegularTextCB style={[FONTS.boldFont14, {color: Colors.black}]}>
            {item.price}
          </RegularTextCB>
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
            {item.title}
          </RegularTextCB>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={[FONTS.mediumFont12, {color: Colors.sickGreen}]}>
            {item.service}
          </Text>
          <Text
            style={[
              FONTS.mediumFont14,
              {color: Colors.black, textDecorationLine: 'underline'},
            ]}>
            View Job
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[STYLES.container]}>
      <NormalHeader name="History" />
      <Text
        style={[
          FONTS.mediumFont16,
          {marginVertical: SIZES.twenty, paddingLeft: SIZES.twenty},
        ]}>
        25 Jobs Commpleted
      </Text>
      <FlatList
        data={DummyData}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIZES.twenty,
          paddingBottom: SIZES.ten,
          marginTop: SIZES.twenty,
        }}
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
