import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants, {FONTS, SIZES, STYLES} from '../../common/Constants';
import ButtonRadius10 from '../../components/ButtonRadius10';
import EditText from '../../components/EditText';
import RegularTextCB from '../../components/RegularTextCB';
import Axios from '../../network/APIKit';
import utils from '../../utils';
import Colors from './../../common/Colors';
import NormalHeader from './../../components/NormalHeader';

export default function AddProfileServices(props) {
  console.log(props.route.params.categoryName);

  const [service, setService] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserAccessToken();
  }, []);

  const getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    setAccessToken(token);
    setIsLoading(false);
  };

  _addServicesAgainstCategory = () => {
    const body = {
      name: service,
      price: servicePrice,
      cat_id: props.route.params.categoryName.id,
    };

    if (utils.isEmpty(body.name)) {
      utils.showToast('Service Name is required.!');
      return;
    }
    if (utils.isEmpty(body.price)) {
      utils.showToast('Service Price is required.!');
      return;
    }
    const onSuccess = ({data}) => {
      console.log('========>>>>>> ', data);
      setIsLoading(false);
      props.navigation.replace(Constants.vendorProfile);
    };
    const onFailure = (error) => {
      console.log('========>>>>>> ', error);
      setIsLoading(false);
    };

    let config = {
      headers: {
        Authorization: accessToken,
      },
    };

    console.log('configgggggggggg====>>>> ', config);

    setIsLoading(true);
    Axios.post(Constants.AddPrifileServiceURL, body, config)
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}>
      <NormalHeader name={props.route.params.categoryName.name} />
      <ScrollView
        contentContainerStyle={{paddingBottom: 110}}
        overScrollMode="never"
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <Text style={[FONTS.boldFont18, {paddingVertical: SIZES.twenty}]}>
          Add Service
        </Text>
        <View
          style={[
            {
              paddingHorizontal: SIZES.fifteen,
            },
          ]}>
          <View>
            <Text style={[FONTS.mediumFont16, {marginTop: SIZES.ten}]}>
              Name
            </Text>
            <EditText
              placeholder="Enter Service Name"
              value={service}
              onChangeText={(text) => {
                setService(text);
              }}
            />
          </View>

          <View style={{marginTop: SIZES.five, marginBottom: SIZES.fifteen}}>
            <Text style={[FONTS.mediumFont16, {marginTop: SIZES.ten}]}>
              Price
            </Text>
            <EditText
              placeholder="Enter Service Price"
              keyboardType="number-pad"
              value={servicePrice}
              onChangeText={(text) => {
                var numbers = /^[0-9]+$/;
                if (!text.match(numbers)) {
                  utils.showToast('Price can only be Number');
                  return;
                }
                setServicePrice(text);
              }}
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          STYLES.shadow,
          {
            marginTop: SIZES.ten * 5,
            paddingBottom: SIZES.ten,
            marginHorizontal: SIZES.ten,
            position: 'absolute',
            bottom: SIZES.twenty,
            width: '97%',
            alignSelf: 'center',
          },
        ]}>
        <ButtonRadius10
          bgColor={Colors.sickGreen}
          label=" ADD"
          onPress={() => {
            _addServicesAgainstCategory();
          }}
        />
      </View>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: SIZES.ten,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: SIZES.ten,
    // width: width - SIZES.fifteen,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
