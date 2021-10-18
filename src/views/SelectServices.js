import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SegmentedControlIOS,
} from 'react-native';
import Colors from '../common/Colors';
import Constants, {SIZES, STYLES, FONTS} from '../common/Constants';
import BoldTextCB from '../components/BoldTextCB';
import ButtonRadius10 from '../components/ButtonRadius10';
import NormalHeader from '../components/NormalHeader';
import RegularTextCB from '../components/RegularTextCB';
import utils from '../utils';
import Axios from '../network/APIKit';
import Spinner from 'react-native-loading-spinner-overlay';

export default function SelectServices(props) {
  const [isLoading, setIsloading] = useState(true);
  const [serviceData, setServiceData] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  // console.log('this.props.route.params.item', props.route.params.item);

  useEffect(() => {
    getUserAccessToken();
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('working ==== ......');
      getUserAccessToken();
    });
    return unsubscribe;
  }, [props.navigation]);

  // console.log('shaohabbb=====', serviceData);

  const getUserAccessToken = async () => {
    setIsloading(true);
    const value = await AsyncStorage.getItem('user');
    const accessToken = JSON.parse(value);

    vendorAllServices();
    // postJobRequest(accessToken.token);
  };

  const vendorAllServices = async () => {
    const value = await AsyncStorage.getItem(Constants.accessToken);
    let config = {
      params: {
        categoryId: props.route.params.item.id.toString(),
        // categoryId: '16',
      },
      headers: {
        Authorization: value,
      },
    };

    // console.log('tokennnnn', token);

    const onSuccess = ({data}) => {
      console.log('All Servicessssssss ======================>', data);
      // setAllServices(data.data[0].services);
      let temp = [];
      let temp1 = data.data[0].services;
      temp1.map((element) => {
        // element["isSelected"] = false;
        temp.push({...element, isSelected: false});
      });
      setServiceData(temp);
      setIsloading(false);
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
      setIsloading(false);
      console.log('=======Servicessssss========>', error);
    };
    Axios.get(Constants.customerViewCategoriesURL, config)
      .then(onSuccess)
      .catch(onFailure);
  };

  const handleServiceIdOnClick = () => {
    setSelectedServices([]);
    serviceData.map((val) => {
      if (val.isSelected) {
        selectedServices.push(val.id);
        console.log('Services Id ==== ', val.id);
      }
    });

    if (selectedServices.length === 0) {
      utils.showToast('Specify atleast 1 interest');
    } else {
      props.navigation.navigate(Constants.dateTimeSlots, {
        serviceIds: selectedServices,
        item: props.route.params.item,
        vendorId: props.route.params.vendorid,
      });
    }
  };

  const onPress = (id, type) => {
    let newArray = serviceData.map((val, i) => {
      if (id === val.id) {
        return {...val, isSelected: type};
      } else {
        return val;
      }
    });
    setServiceData(newArray);
  };

  const renderServices = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.white,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: SIZES.fifteen,
          borderRadius: SIZES.ten,
          marginTop: SIZES.ten,
          paddingHorizontal: SIZES.twenty,
          shadowColor: '#c5c5c5',
          shadowOffset: {width: SIZES.five, height: SIZES.five},
          shadowOpacity: 1.0,
          shadowRadius: SIZES.ten,
          elevation: SIZES.ten,
          borderWidth: 1,
          borderColor: item.isSelected ? Colors.sickGreen : Colors.white,
        }}
        onPress={() => onPress(item.id, !item.isSelected)}
        activeOpacity={0.6}>
        <RegularTextCB>{item.name}</RegularTextCB>
        <RegularTextCB>$ {item.price}</RegularTextCB>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        STYLES.container,
        {
          flex: 1,
          backgroundColor: Colors.white,
        },
      ]}>
      <NormalHeader name="Select Services" />
      <BoldTextCB style={{marginLeft: SIZES.twenty, fontSize: 16}}>
        {/* Cleaning */}
      </BoldTextCB>

      <FlatList
        data={serviceData}
        renderItem={renderServices}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: SIZES.twenty,
        }}
        ListEmptyComponent={() => {
          return (
            <Text style={[FONTS.boldFont18, {flex: 1, alignSelf: 'center'}]}>
              No Service(s)!
            </Text>
          );
        }}
      />

      <TouchableOpacity
        style={{
          flex: 1,
          position: 'absolute',
          bottom: SIZES.twenty,
          width: '100%',
          paddingHorizontal: SIZES.ten,
        }}
        activeOpacity={0.6}>
        <ButtonRadius10
          bgColor={Colors.sickGreen}
          label="Next"
          onPress={() => {
            handleServiceIdOnClick();
          }}
        />
      </TouchableOpacity>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});

const Data = [
  {
    id: 1,
    name: 'Home Cleaning',
    price: '$240.00',
    isSelected: false,
  },
  {
    id: 2,
    name: 'Garage Cleaning',
    price: '$240.00',
    isSelected: false,
  },
  {
    id: 3,
    name: 'Garden Cleaning',
    price: '$240.00',
    isSelected: false,
  },
];
