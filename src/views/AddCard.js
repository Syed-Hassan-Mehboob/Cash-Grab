import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Constants, {
  FONTS,
  SIZES,
  STYLES,
  height,
  width,
} from '../common/Constants';
import Colors from '../common/Colors';
import Axios from '../network/APIKit';

import {CreditCardInput} from '../views/StripCardComponent/src';

// import CustomHeader from '../../components/CustomHeader';
import axios from 'axios';
import utils from '../utils';

import {STRIPE_PUBLISHABLE_KEY} from '../../keys';

import {getCardDetails} from './getCardDetails';

import NormalHeader from '../components/NormalHeader';
import Loader from '../components/Loader';

function getCreditCardToken(creditCardData) {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[name]': creditCardData.values.name,
    'card[cvc]': creditCardData.values.cvc,
  };

  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },

    // Use a proper HTTP method
    method: 'post',

    // Format the credit card data to a string of key-value pairs
    // divided by &

    body: Object.keys(card)
      .map((key) => key + '=' + card[key])
      .join('&'),
  })
    .then((response) => response.json())
    .then((res) => {
      return {res, mcard: card};
    });
}

export default function AddCard(props) {
  const {navigation, route} = props;
  const {data, token} = route.params;

  const [CardInput, setCardInput] = React.useState({});
  const [isLoading, setisLoading] = React.useState(false);

  const onSubmit = async () => {
    if (CardInput.valid == false || typeof CardInput.valid == 'undefined') {
      alert('Invalid Credit Card');
      return false;
    }

    setisLoading(true);

    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(CardInput);

      if (creditCardToken.error) {
        alert('creditCardToken error');
        setisLoading(false);
        return;
      }
    } catch (e) {
      console.log('e', e);
      setisLoading(false);
      return;
    }
    setisLoading(false);
    saveCardOnServer(creditCardToken);
  };

  const saveCardOnServer = (card) => {
    const onSuccess = ({data}) => {
      utils.showToast(data.message);
      getCardDetails(token); // Pass the token and setCardDetails function as arguments
      navigation.navigate(Constants.UserHome);
      setisLoading(false);
    };

    const onFailure = (error) => {
      setisLoading(false);

      utils.showResponseError(error);
    };

    let body = {
      cardholder_name: card.mcard['card[name]'],
      card_number: card.mcard['card[number]'],
      cvv: card.mcard['card[cvc]'],
      stripe_token: card.res.id,
      expiry_date:
        card.mcard['card[exp_month]'] + '/' + card.mcard['card[exp_year]'],
    };

    console.log(body, 'CARD DATA');

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    Axios.post(Constants.addCard, body, options)
      .then(onSuccess)
      .catch(onFailure);

    AddCard(body);

    navigation.goBack();
  };

  const _onChange = (data) => {
    setCardInput(data);
  };

  return (
    <>
      <ScrollView style={STYLES.container} showsVerticalScrollIndicator={false}>
        <NormalHeader name="Add New Card" />

        <View style={{marginTop: SIZES.twenty}} />
        <CreditCardInput
          invalidColor={Colors.barbiePink}
          placeholderColor="#000000"
          requiresName={true}
          onChange={_onChange}
          inputStyle={styles.inputStyle}
          validColor={Colors.green}
        />

        <TouchableOpacity
          style={{
            backgroundColor: Colors.sickGreen,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: SIZES.twenty,
            borderRadius: SIZES.ten,
            marginTop: SIZES.twenty,
            marginHorizontal: SIZES.twenty,
          }}
          onPress={() => {
            onSubmit();
          }}>
          <Text style={[FONTS.boldFont24, {color: Colors.black}]}>Save </Text>
        </TouchableOpacity>
      </ScrollView>
      {isLoading ? <Loader /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    borderRadius: SIZES.ten,
    backgroundColor: Colors.white,
    color: Colors.black,
  },
});
