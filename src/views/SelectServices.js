import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import Colors from '../common/Colors';
import Constants, {SIZES, STYLES} from '../common/Constants';
import BoldTextCB from '../components/BoldTextCB';
import ButtonRadius10 from '../components/ButtonRadius10';
import NormalHeader from '../components/NormalHeader';
import RegularTextCB from '../components/RegularTextCB';

export default function SelectServices(props) {
  const [serviceData, setServiceData] = useState(Data);

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
        <RegularTextCB>{item.price}</RegularTextCB>
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
        Cleaning
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
            props.navigation.navigate(Constants.dateTimeSlots);
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

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
