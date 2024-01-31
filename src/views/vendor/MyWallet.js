import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Constants, {
  FONTFAMILY,
  FONTS,
  SIZES,
  STYLES,
} from '../../common/Constants';
import NormalHeader from '../../components/NormalHeader';
import Colors from '../../common/Colors';
import Axios from '../../network/APIKit';
import utils from '../../utils';
import {Icon} from 'native-base';

export default function Payment(props) {
  const {navigation, route} = props;
  const {token} = route.params;

  const [availableToken, setavailableToken] = useState('');
  const [history, sethistory] = useState('');

  console.log(history, 'TOKENS');

  useEffect(() => {
    getWallet();
  }, []);

  getWallet = () => {
    const onSuccess = ({data}) => {
      setavailableToken(data?.data?.available_tokens);
      sethistory(data?.data?.records);
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

  const renderList = ({item, index}) => (
    <View style={styles.item}>
      <View style={{flexDirection: 'row'}}>
        <Icon
          type="MaterialCommunityIcons"
          name="bank"
          style={{color: Colors.black, fontSize: SIZES.ten * 3}}
        />
        <View style={{marginLeft: SIZES.ten}}>
          <Text style={[FONTS.mediumFont12]}>Bank Transfer</Text>
          <Text style={[FONTS.mediumFont10]}>
            Withdrawn on {item?.created_at}
          </Text>
        </View>
      </View>

      <Text
        style={[
          FONTS.mediumFont14,
          {
            backgroundColor: Colors.white,
            paddingVertical: SIZES.five,
            paddingHorizontal: SIZES.ten,
            borderRadius: SIZES.ten,
            overflow: 'hidden',
            color: Colors.sickGreen,
          },
        ]}>
        {/* {item?.status} */}$ {item?.amount}.00
      </Text>

      {/* <Text style={styles.title}>$ {item?.amount}.00</Text> */}
    </View>
  );

  return (
    <View style={[STYLES.container, {}]}>
      <NormalHeader name={'My Wallet'} />

      <View style={styles.container}>
        {/* <View style={styles.redeem}>
          <View>
            <Text style={[FONTS.boldFont26, {}]}>${availableToken}</Text>
            <Text style={[FONTS.mediumFont16, {color: Colors.lightGrey}]}>
              Receivable
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate(Constants.Redeem)}
            style={styles.btn}>
            <Text style={[FONTS.mediumFont16, {color: Colors.white}]}>
              Redeem
            </Text>
          </TouchableOpacity>
        </View> */}

        <View>
          <View style={styles.redeemCard}>
            <View>
              <Text style={[FONTS.mediumFont18, {color: Colors.white}]}>
                Receivable
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Text style={[FONTS.boldFont26, {color: Colors.white}]}>
                  {availableToken}
                </Text>
                <Text
                  style={[
                    FONTS.mediumFont18,
                    {color: Colors.white, marginLeft: SIZES.five},
                  ]}>
                  USD
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(Constants.Redeem, {token: token})
              }
              style={{
                backgroundColor: Colors.white,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: SIZES.twenty,
                paddingHorizontal: SIZES.ten,
                paddingVertical: SIZES.five,
              }}>
              <Icon
                type="Feather"
                name="arrow-down-left"
                style={{color: Colors.black, fontSize: SIZES.ten * 3}}
              />

              <Text>Withdraw </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: SIZES.ten}}>
          <Text style={[FONTS.mediumFont20, {marginVertical: SIZES.five}]}>
            Last Activity
          </Text>
          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            renderItem={renderList}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.twenty,
    marginHorizontal: SIZES.fifteen,
  },
  redeem: {
    flexDirection: 'row',
    padding: SIZES.ten,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.sickGreen,
    borderRadius: SIZES.ten,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: Colors.sickGreen,
    paddingVertical: SIZES.fifteen,
    paddingHorizontal: SIZES.twentyFive + 10,
    borderRadius: SIZES.ten,
  },
  title: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.body16,
  },
  item: {
    backgroundColor: Colors.barBg,
    padding: SIZES.fifteen,
    borderRadius: SIZES.ten,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SIZES.five,
  },
  redeemCard: {
    flexDirection: 'row',
    backgroundColor: Colors.sickGreen,
    padding: SIZES.ten,
    borderRadius: SIZES.twenty,
    justifyContent: 'space-between',
  },
});
