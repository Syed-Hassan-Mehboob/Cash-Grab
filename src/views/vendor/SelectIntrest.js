import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  FlatList,
} from 'react-native';
import Constants, {SIZES, STYLES, FONTS} from '../../common/Constants';
import BoldTextCB from '../../components/BoldTextCB';
import RegularTextCB from '../../components/RegularTextCB';
import Colors from '../../common/Colors';
import Images from '../../common/Images';
import {Icon} from 'native-base';
import ButtonRadius10 from '../../components/ButtonRadius10';

export default function SelectIntrest(props) {
  const [isSelected, setIsSlected] = useState(null);

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }

    return data;
  };

  const renderInterest = ({item}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        style={[
          styles.shadow,
          {
            paddingVertical: SIZES.ten * 1,
            paddingHorizontal: SIZES.ten * 3,
            backgroundColor: Colors.white,
            borderRadius: SIZES.ten,
            margin: SIZES.ten,
            borderWidth: 2,
            borderColor:
              isSelected === item.id ? Colors.sickGreen : 'transparent',
          },
        ]}
        activeOpacity={0.6}
        onPress={() => setIsSlected(item.id)}>
        <Text
          style={[
            FONTS.mediumFont16,
            {
              color: Colors.black,
            },
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  //   console.log('========', isSelected);
  return (
    <View style={[STYLES.container, {paddingHorizontal: SIZES.ten}]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          //   marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: 0}}
          onPress={() => {
            // props.navigation.navigate(Constants.VenderBookings);
          }}
          activeOpacity={0.6}>
          <Icon
            type="AntDesign"
            name="left"
            style={{color: Colors.black, fontSize: SIZES.ten * 3}}
          />
        </TouchableOpacity>
        <RegularTextCB style={[FONTS.boldFont24, {}]}>
          Select Interest
        </RegularTextCB>
      </View>

      <FlatList
        numColumns={3}
        data={formatData(Data, 3)}
        keyExtractor={(index) => index}
        renderItem={renderInterest}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // backgroundColor: 'red',
          marginTop: SIZES.twenty,
        }}
      />
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.sickGreen,
          padding: SIZES.twenty,
          borderRadius: SIZES.ten,
          position: 'absolute',
          bottom: SIZES.twenty,
          right: SIZES.twenty,
          left: SIZES.twenty,
        }}
        activeOpacity={0.6}
        onPress={() => props.navigation.navigate(Constants.SelectIndustry)}>
        <Text style={[FONTS.boldFont24, {}]}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    // height: Dimensions.get('window').width / 2, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    padding: SIZES.ten,
    marginHorizontal: SIZES.fifteen,
    marginBottom: SIZES.twenty,
    marginTop: SIZES.five,
  },

  shadow: {
    shadowColor: Colors.coolGrey,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10.0,

    elevation: 15,
  },
});

const Data = [
  {
    id: 1,
    name: 'Gaming',
  },
  {
    id: 2,
    name: 'Planting',
  },
  {
    id: 3,
    name: 'Bike Riding',
  },
  {
    id: 4,
    name: 'Photography',
  },
  {
    id: 5,
    name: 'Peotry',
  },
];
