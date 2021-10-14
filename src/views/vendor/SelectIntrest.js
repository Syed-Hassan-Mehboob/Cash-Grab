import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  FlatList,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants, {SIZES, STYLES, FONTS} from '../../common/Constants';
import BoldTextCB from '../../components/BoldTextCB';
import RegularTextCB from '../../components/RegularTextCB';
import Colors from '../../common/Colors';
import Images from '../../common/Images';
import {Icon} from 'native-base';
import ButtonRadius10 from '../../components/ButtonRadius10';
import NormalHeader from '../../components/NormalHeader';
import Axios from '../../network/APIKit';
import utils from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SelectIntrest(props) {
  const [Data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [interestId, setInterestId] = useState([]);

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

  useEffect(() => {
    const onSuccess = ({data}) => {
      console.log('get intrests success=============>>>', data.data);
      let temp = [];
      data.data.interests.map((e) => {
        temp.push({...e, isSlected: false});
      });
      setData(temp);
      setIsLoading(false);
    };
    const onFaliure = (error) => {
      console.log('get intrests error=============>>>', error);
      setIsLoading(false);
    };
    Axios.get(Constants.getInterests).then(onSuccess).catch(onFaliure);
  }, []);

  const setInterestIdOnClick = () => {
    // let temp = [];
    setInterestId([]);
    Data.map((val) => {
      if (val.isSlected) {
        interestId.push(val.id);
        console.log(val.id);
      }
    });

    if (interestId.length === 0) {
      utils.showToast('Specify atleast 1 interest');
    } else {
      // let;
      AsyncStorage.setItem('SignUpInterestID', interestId).then(() => {
        props.navigation.navigate(Constants.SelectIndustry);
      });
    }
  };

  const onPress = (id, type) => {
    let newArray = [];
    Data.map((val, i) => {
      if (id === val.id) {
        val.isSlected = !val.isSlected;
        newArray.push(val);
      } else {
        newArray.push(val);
      }
    });
    setData(newArray);
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
            flex: 1,
            paddingVertical: SIZES.ten * 1,
            alignItems: 'center',
            backgroundColor: Colors.white,
            borderRadius: SIZES.ten,
            margin: SIZES.ten,
            borderWidth: 1,
            borderColor: item.isSlected ? Colors.sickGreen : Colors.white,
          },
        ]}
        activeOpacity={0.6}
        onPress={() => onPress(item.id, !item.isSlected)}>
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
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          //   marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: 0}}
          onPress={() => {
            props.navigation.goBack();
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
      </View> */}

      <NormalHeader name="Select Interest" />

      <View style={{flex: 1}}>
        {isLoading ? (
          <Spinner
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <FlatList
            numColumns={3}
            data={formatData(Data, 3)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderInterest}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: SIZES.twenty,
            }}
          />
        )}
      </View>
      <View style={{marginVertical: SIZES.ten * 3}}>
        <ButtonRadius10
          label="CONTINUE"
          bgColor={Colors.sickGreen}
          onPress={() => {
            setInterestIdOnClick();
            // props.navigation.navigate(Constants.SelectIndustry)}
          }}
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
    shadowOpacity: 0.5,
    shadowRadius: 10.0,

    elevation: 15,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});

const DummyData = [
  {
    id: 1,
    name: 'Gaming',
    isSlected: false,
  },
  {
    id: 2,
    name: 'Planting',
    isSlected: false,
  },
  {
    id: 3,
    name: 'Bike Riding',
    isSlected: false,
  },
  {
    id: 4,
    name: 'Photography',
    isSlected: false,
  },
  {
    id: 5,
    name: 'Peotry',
    isSlected: false,
  },
];
