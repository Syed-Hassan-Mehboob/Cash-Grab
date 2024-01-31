import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Constants, {
  FONTFAMILY,
  FONTS,
  SIZES,
  STYLES,
  height,
} from '../../common/Constants';
import NormalHeader from '../../components/NormalHeader';
import Colors from '../../common/Colors';

import Axios from '../../network/APIKit';
import utils from '../../utils';
import ButtonRadius10 from '../../components/ButtonRadius10';

export default function Redeem(props) {
  const {navigation, route} = props;
  const {token} = route.params;
  const [availableToken, setavailableToken] = useState('');

  const [email, setemail] = React.useState('');
  const [phone, setphone] = React.useState('');
  const [bankname, setbankname] = React.useState('');
  const [accountTitle, setaccountTitle] = React.useState('');
  const [accountNum, setaccountNum] = React.useState('');
  const [amount, setamount] = React.useState('');

  useEffect(() => {
    getWallet();
  }, []);

  withdrawRequest = () => {
    if (amount > availableToken) {
      utils.showToast('Withdraw Amount cannot exceed the Balance');
      return;
    }

    const onSuccess = ({data}) => {
      utils.showToast(data.message);
      console.log('D', data);
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
    };

    const params = {
      amount: amount,
      phone: phone,
      email: email,
      bank_name: bankname,
      account_title: accountTitle,
      account_number: accountNum,
      iban: accountNum,
    };

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    Axios.post(Constants.withdrawRequest, params, options)
      .then(onSuccess)
      .catch(onFailure);
  };

  getWallet = () => {
    const onSuccess = ({data}) => {
      setavailableToken(data?.data?.available_tokens);
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
      console.log(error);
    };

    Axios.get(Constants.getWallet, {
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View style={[STYLES.container, {}]}>
      <NormalHeader name={'Withdraw'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: SIZES.fifteen}}>
        <View style={styles.redeemCard}>
          <Text style={[FONTS.mediumFont14, {color: Colors.white}]}>
            Balance
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Text style={[FONTS.boldFont24, {color: Colors.white}]}>
              {availableToken}
            </Text>
            <Text style={[FONTS.mediumFont14, {color: Colors.white}]}>
              {' '}
              USD
            </Text>
          </View>
        </View>

        <Text style={[FONTS.mediumFont14, {marginVertical: SIZES.ten}]}>
          Email Address
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setemail}
          value={email}
          placeholder="Enter Email Address"
        />
        <Text style={[FONTS.mediumFont14, {marginVertical: SIZES.ten}]}>
          Phone Number
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setphone}
          value={phone}
          placeholder="Enter Phone Number"
        />

        <Text style={[FONTS.mediumFont14, {marginVertical: SIZES.ten}]}>
          Bank Name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setbankname}
          value={bankname}
          placeholder="Enter Bank Name"
        />

        <Text style={[FONTS.mediumFont14, {marginVertical: SIZES.ten}]}>
          Account Title
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setaccountTitle}
          value={accountTitle}
          placeholder="Enter Account Title"
        />

        <Text style={[FONTS.mediumFont14, {marginVertical: SIZES.ten}]}>
          Account Number / IBAN
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setaccountNum}
          value={accountNum}
          placeholder="Enter Account Number / IBAN"
        />

        <Text style={[FONTS.mediumFont14, {marginVertical: SIZES.ten}]}>
          Withdraw Amount
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setamount}
          value={amount}
          placeholder="Enter Withdraw Amount"
        />

        <View
          style={{
            marginTop: SIZES.twentyFive,
            marginBottom: SIZES.twentyFive * 2,
          }}>
          <ButtonRadius10 label="Withdraw" onPress={() => withdrawRequest()} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  redeemCard: {
    flexDirection: 'row',
    marginTop: SIZES.fifteen,
    backgroundColor: Colors.sickGreen,
    padding: SIZES.ten,
    borderRadius: SIZES.fifteen,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input: {
    height: height * 0.05,
    padding: SIZES.ten,
    backgroundColor: Colors.barBg,
    borderRadius: SIZES.fifteen,
    fontFamily: FONTFAMILY.Medium,
    color: Colors.black,
  },
});
