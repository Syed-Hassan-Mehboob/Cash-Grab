import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Constants, {FONTS, SIZES, STYLES} from '../../common/Constants';
import COLORS from '../../common/Colors';
import IMAGES from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import AllBookings from '../../components/AllBookings';
import {Icon} from 'native-base';
import Colors from '../../common/Colors';

export default function QuickJobs(props) {
  return (
    <View style={STYLES.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: SIZES.ten * 2,
          //   marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: SIZES.ten}}
          onPress={() => {
            props.navigation.navigate(Constants.vendorHome);
          }}>
          <Icon
            type="AntDesign"
            name="left"
            style={{color: Colors.black, fontSize: SIZES.ten * 3}}
          />
        </TouchableOpacity>
        <RegularTextCB style={[{color: COLORS.black, fontSize: SIZES.ten * 3}]}>
          Quick Jobs
        </RegularTextCB>
      </View>

      <View style={{paddingHorizontal: SIZES.ten * 2}}>
        <FlatList
          data={Data}
          renderItem={({item}) => <AllBookings item={item} />}
          keyExtractor={(id) => id.id}
          contentContainerStyle={{alignItems: 'center'}}
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
});

const Data = [
  {
    id: 1,
    name: 'Ray Hammad',
    tittle: 'Car Machanic Needed',
    price: '300.00',
    service: 'AutoMobile',
    description:
      'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
    address: '111,NYC Street, NY 1121',
    time: '12:00 - 3:00 ',
  },
  {
    id: 2,
    name: 'Ray Hammad',
    tittle: 'Car Machanic Needed',
    price: '300.00',
    service: 'AutoMobile',
    description:
      'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
    address: '111,NYC Street, NY 1121',
    time: '12:00 - 3:00 ',
  },
  {
    id: 3,
    name: 'Ray Hammad',
    tittle: 'Car Machanic Needed',
    price: '300.00',
    service: 'AutoMobile',
    description:
      'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
    address: '111,NYC Street, NY 1121',
    time: '12:00 - 3:00 ',
  },
];
