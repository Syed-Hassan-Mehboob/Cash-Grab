import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Animated,
  Alert,
  TouchableOpacity,
} from 'react-native';

import React, {useEffect, useRef, useState} from 'react';
import Constants, {
  FONTS,
  SIZES,
  STYLES,
  height,
  width,
} from '../common/Constants';
import Colors from '../common/Colors';
import ButtonRadius10 from '../components/ButtonRadius10';
import utils from '../utils';
import Axios from '../network/APIKit';
import NormalHeader from '../components/NormalHeader';
import {getCardDetails} from './getCardDetails';

export default function Payment(props) {
  const {navigation, route} = props;
  const {data, token} = route.params;

  console.log('DATA', data);

  const [cardDetails, setcardDetails] = useState([]);
  const [selectedCard, setSelectedCard] = useState();

  deleteCard = (cardData) => {
    const onSuccess = ({data}) => {
      utils.showToast(data.message);
      getCardDetails(token, setcardDetails); // Pass the token and setCardDetails function as arguments
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
    };

    const params = {
      card_id: cardData?.card_id,
    };

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    Axios.post(Constants.deleteCard, params, options)
      .then(onSuccess)
      .catch(onFailure);
  };

  proceedOrder = (cardData) => {
    const onSuccess = ({data}) => {
      utils.showToast(data.message);
      console.log('D', data);
      console.log('DD', data?.message);

      setTimeout(() => {
        props.navigation.navigate(Constants.bookingConfirmed, {
          orderData: data.data,
        });
      }, 1000);
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
    };

    const params = {
      phone: data?.phone,
      location: data?.location,
      lat: data?.lat,
      lng: data?.lng,
      services: [
        {
          service_id: data?.services[0],
          qty: 1,
        },
      ],
      address: data?.address,
      vendor_id: data?.vendor_id,
      date: data?.date,
      from_time: data?.from_time,
      to_time: data?.to_time,
      description: data?.description,
      country: data?.country,
      card_id: cardData?.card_id,
    };

    console.log(params);

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    Axios.post(Constants.orderProcess, params, options)
      .then(onSuccess)
      .catch(onFailure);
  };

  const createThreeButtonAlert = (card) =>
    Alert.alert(
      'Card Options',
      'Choose an action',

      [
        {
          text: 'Proceed Order',
          onPress: () => proceedOrder({card_id: card?.id}),
        },
        {
          text: 'Delete Card',
          onPress: () => deleteCard({card_id: card?.id}),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  const createTwoButtonAlert = (card) =>
    Alert.alert(
      'Card Options',
      'Choose an action',

      [
        {
          text: 'Delete Card',
          onPress: () => deleteCard({card_id: card?.id}),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );

  useEffect(() => {
    getCardDetails(token, setcardDetails); // Pass the token and setCardDetails function as arguments
  }, []);

  // const getCardDetails = () => {
  //   const onSuccess = ({data}) => {
  //     // this.toggleIsLoading();
  //     console.log(data?.data);
  //     setcardDetails(data?.data);
  //   };

  //   const onFailure = (error) => {
  //     utils.showResponseError(error);
  //     console.log(error);
  //   };

  //   Axios.get(Constants.getCard, {
  //     headers: {
  //       Authorization: token,
  //     },
  //   })
  //     .then(onSuccess)
  //     .catch(onFailure);
  // };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.cards}
        onPress={() =>
          data !== 'none'
            ? createThreeButtonAlert({id: item?.id})
            : createTwoButtonAlert({id: item?.id})
        }>
        <Text>{item?.cardholder_name}</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.ten,
          }}>
          <Text style={{alignItems: 'center'}}>**** **** ****</Text>
          <Text>{item?.card_number}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[STYLES.container, {}]}>
      <NormalHeader name={data === 'none' ? 'My Cards' : 'Select Card'} />

      <View style={styles.container}>
        <View>
          <FlatList
            data={cardDetails}
            renderItem={renderItem}
            keyExtractor={(item, index) => item?.id.toString()}
            contentContainerStyle={{
              marginTop: SIZES.twenty,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: SIZES.twentyFive,
          }}>
          <ButtonRadius10
            bgColor={Colors.sickGreen}
            label="Add Card"
            onPress={() => {
              props.navigation.navigate(Constants.AddCard, {token: token});
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.fifteen,
  },

  cards: {
    padding: SIZES.fifteen,
    backgroundColor: Colors.white,
    marginVertical: SIZES.five,
    borderRadius: SIZES.ten,
    borderColor: Colors.sickGreen,
    borderWidth: 1,
  },
});

const cards = [{id: 1}, {id: 2}];
