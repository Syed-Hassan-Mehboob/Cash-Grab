import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import RegularTextCB from '../components/RegularTextCB';
import Images from '../common/Images';
import Colors from '../common/Colors';
import EditText from '../components/EditText';
import Constants, {SIZES, STYLES} from '../common/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../network/APIKit';
import utils from '../utils';
import Spinner from 'react-native-loading-spinner-overlay';
import NormalHeader from '../components/NormalHeader';

export default function Search(props) {
  const [allVender, setAllVender] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const renderBestEmployeesItem = ({item}) => {
    // console.log("sdsadsadsadsa==============",item)

    return (
      <View style={[styles.card, {margin: SIZES.ten}]}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            props.navigation.navigate(Constants.viewVendorProfile, {
              vendorid: item.id,
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={styles.circleCard}>
                  <Image
                    source={{
                      uri: Constants.imageURL + item.user_profiles.image,
                    }}
                    style={styles.iconUser}
                    resizeMode="cover"
                  />
                </View>
                <View
                  style={{
                    marginStart: SIZES.ten,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexShrink: 1,
                  }}>
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <RegularTextCB
                        style={{fontSize: 16, color: Colors.black}}>
                        {item.name}
                      </RegularTextCB>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={Images.star}
                          style={{
                            height: SIZES.fifteen,
                            width: SIZES.fifteen,
                            resizeMode: 'contain',
                            tintColor: Colors.orangeYellow,
                          }}
                        />
                        <RegularTextCB
                          style={{
                            fontSize: 14,
                            color: Colors.orangeYellow,
                            marginStart: SIZES.five - 3,
                          }}>
                          {item.ratings}
                        </RegularTextCB>
                      </View>
                    </View>
                    <RegularTextCB
                      style={{
                        fontSize: 14,
                        color: Colors.coolGrey,
                      }}>
                      {item.services.length > 0
                        ? item.services[0]['name']
                        : 'no service registered'}
                    </RegularTextCB>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  flexShrink: 1,
                  marginTop: SIZES.five,
                }}>
                <RegularTextCB
                  style={{flex: 1, fontSize: 16, color: Colors.coolGrey}}>
                  {item.user_profiles.bio}
                </RegularTextCB>
                <Image
                  source={Images.circularArrowForward}
                  style={[styles.iconForward]}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // console.log('All Venders======',allVender.data.records.name);

  const [searchText, setSearchText] = useState('');

  const getData = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    // console.log('=======',token);
    setIsloading(true);
    const onSuccess = ({data}) => {
      setIsloading(false);
      let data1 = data.data;
      setAllVender(data1);
      // console.log('data========', data);
    };
    const onFailure = (error) => {
      // console.log('data========', error);

      utils.showResponseError(error);
      setIsloading(false);
    };

    Axios.post(
      Constants.search,
      {name: searchText},
      {
        headers: {Authorization: token},
      },
    )
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View style={STYLES.container}>
      <NormalHeader name="Search" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.twenty,
        }}>
        <TextInput
          keyboardType="default"
          returnKeyType="search"
          placeholder={'Search Here'}
          value={searchText}
          onChange={(txt) => {
            setSearchText(txt);
          }}
          onChangeText={(txt) => {
            setSearchText(txt);
          }}
          style={styles.textInput}
        />
        <TouchableOpacity onPress={() => getData(searchText)}>
          <Image
            source={Images.iconSearch}
            style={{
              height: SIZES.fifty,
              width: SIZES.fifty,
              resizeMode: 'stretch',
            }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{marginTop: SIZES.ten}}
        data={allVender}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderBestEmployeesItem}
        contentInset={{
          // for ios
          bottom: SIZES.ten * 10,
        }}
        contentContainerStyle={{
          // for android
          paddingBottom: SIZES.ten * 10,
        }}
      />
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  iconFilter: {
    height: SIZES.ten * 3,
    width: SIZES.ten * 3,
    resizeMode: 'contain',
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: Constants.fontRegular,
    color: Colors.black1,
  },
  itemContainer: {
    padding: SIZES.twenty,
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  circleCard: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: SIZES.ten * 3,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  iconUser: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: (SIZES.ten * 6) / SIZES.five - 3,
    resizeMode: 'contain',
  },
  iconForward: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    resizeMode: 'contain',
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});

const bestEmployees = [
  {
    id: '1',
    title: 'Home Renovation',
    name: 'Mark Ruffalo',
    image: Images.emp1,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: 'SIZES.five-3',
    title: 'Electrician',
    name: 'Mark Ruffalo',
    image: Images.emp2,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: '3',
    title: 'Home Cleaner',
    name: 'Mark Ruffalo',
    image: Images.emp3,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: '4',
    title: 'Automobile',
    name: 'Mark Ruffalo',
    image: Images.emp4,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: 'SIZES.five',
    title: 'Home Renovation',
    name: 'Mark Ruffalo',
    image: Images.emp1,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: '6',
    title: 'Electrician',
    name: 'Mark Ruffalo',
    image: Images.emp2,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: '7',
    title: 'Home Cleaner',
    name: 'Mark Ruffalo',
    image: Images.emp3,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: '8',
    title: 'Automobile',
    name: 'Mark Ruffalo',
    image: Images.emp4,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: '9',
    title: 'Home Renovation',
    name: 'Mark Ruffalo',
    image: Images.emp1,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: 'SIZES.ten',
    title: 'Home Cleaner',
    name: 'Mark Ruffalo',
    image: Images.emp2,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: '11',
    title: 'Automobile',
    name: 'Mark Ruffalo',
    image: Images.emp3,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: '12',
    title: 'Electrician',
    name: 'Mark Ruffalo',
    image: Images.emp4,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: '13',
    title: 'Home Cleaner',
    name: 'Mark Ruffalo',
    image: Images.emp1,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: '14',
    title: 'Automobile',
    name: 'Mark Ruffalo',
    image: Images.emp2,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: '15',
    title: 'Home Renovation',
    name: 'Mark Ruffalo',
    image: Images.emp3,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
  {
    id: '16',
    title: 'Electrician',
    name: 'Mark Ruffalo',
    image: Images.emp4,
    desc: 'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
    ratings: '1.0',
  },
];
