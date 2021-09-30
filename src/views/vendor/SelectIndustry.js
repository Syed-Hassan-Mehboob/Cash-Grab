import {Icon} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../common/Colors';
import Constants, {FONTS, SIZES, STYLES} from '../../common/Constants';
import ButtonRadius10 from '../../components/ButtonRadius10';
import RegularTextCB from '../../components/RegularTextCB';

export default function SelectIndustry(props) {
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

  const renderIntustry = ({item}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: SIZES.ten * 2.5,
          marginTop: SIZES.twenty,
        }}>
        <TouchableOpacity
          style={[
            styles.card,
            {
              flex: 1,
              padding: Platform.OS === 'ios' ? SIZES.ten * 2.9 : SIZES.ten * 4,
              alignItems: 'center',
              backgroundColor: Colors.white,
            },
          ]}
          onPress={() => {
            props.navigation.navigate(Constants.AddServices);
          }}
          activeOpacity={0.6}>
          <Image
            source={{
              uri:
                Constants.imageURL +
                '/uploads/category/0ec6a0caaecfa6f3585d71123c4ee44a1630420292.png',
            }}
            // source={item.image}
            style={{height: SIZES.ten * 4.5, width: SIZES.ten * 4.5}}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <RegularTextCB
          style={{
            fontSize: 16,
            marginTop: SIZES.ten,
            color: Colors.black,
          }}>
          {/* {item.name} */}
          Electrition
        </RegularTextCB>
      </View>
    );
  };

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
            onPress={() => props.navigation.goBack()}
          />
        </TouchableOpacity>
        <RegularTextCB style={[FONTS.boldFont24, {}]}>
          Select Industry
        </RegularTextCB>
      </View>
      <FlatList
        numColumns={3}
        data={formatData(Data, 3)}
        keyExtractor={(index) => index}
        renderItem={renderIntustry}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.twenty,
        }}
      />

      <View style={{marginVertical: SIZES.ten * 3}}>
        <ButtonRadius10
          label="CONTINUE"
          bgColor={Colors.sickGreen}
          onPress={() => {
            props.navigation.navigate(Constants.otp);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  card: {
    flex: 1,
    borderRadius: SIZES.ten * 2,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five - 2, height: SIZES.five - 2},
    shadowOpacity: 1.0,
    shadowRadius: 10,
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
