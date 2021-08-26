import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  FlatList
} from 'react-native';
import RegularTextCB from '../components/RegularTextCB';
import Images from '../common/Images';
import Colors from '../common/Colors';
import EditText from '../components/EditText';
import Constants, { SIZES } from '../common/Constants';

export default function Search(props) {

  bestEmployees = [
    {
      id: '1',
      title: 'Home Renovation',
      name: 'Mark Ruffalo',
      image: Images.emp1,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: 'SIZES.five-3',
      title: 'Electrician',
      name: 'Mark Ruffalo',
      image: Images.emp2,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: '3',
      title: 'Home Cleaner',
      name: 'Mark Ruffalo',
      image: Images.emp3,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: '4',
      title: 'Automobile',
      name: 'Mark Ruffalo',
      image: Images.emp4,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: 'SIZES.five',
      title: 'Home Renovation',
      name: 'Mark Ruffalo',
      image: Images.emp1,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: '6',
      title: 'Electrician',
      name: 'Mark Ruffalo',
      image: Images.emp2,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: '7',
      title: 'Home Cleaner',
      name: 'Mark Ruffalo',
      image: Images.emp3,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: '8',
      title: 'Automobile',
      name: 'Mark Ruffalo',
      image: Images.emp4,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: '9',
      title: 'Home Renovation',
      name: 'Mark Ruffalo',
      image: Images.emp1,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: 'SIZES.ten',
      title: 'Home Cleaner',
      name: 'Mark Ruffalo',
      image: Images.emp2,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: '11',
      title: 'Automobile',
      name: 'Mark Ruffalo',
      image: Images.emp3,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: '12',
      title: 'Electrician',
      name: 'Mark Ruffalo',
      image: Images.emp4,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: '13',
      title: 'Home Cleaner',
      name: 'Mark Ruffalo',
      image: Images.emp1,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: '14',
      title: 'Automobile',
      name: 'Mark Ruffalo',
      image: Images.emp2,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: '15',
      title: 'Home Renovation',
      name: 'Mark Ruffalo',
      image: Images.emp3,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
    {
      id: '16',
      title: 'Electrician',
      name: 'Mark Ruffalo',
      image: Images.emp4,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0',
    },
  ];

  const renderBestEmployeesItem = ({ item }) => {
    return (
      <View style={[styles.card, { margin: SIZES.ten }]}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            // this.openNextScreen(Constants.viewVendorProfile);
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={styles.circleCard}>
                  <Image
                    source={item.image}
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
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <RegularTextCB
                        style={{ fontSize: 16, color: Colors.black }}>
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
                            marginStart: SIZES.five-3,
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
                      {item.title}
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
                  style={{ flex: 1, fontSize: 16, color: Colors.coolGrey }}>
                  {item.desc}
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



  const [searchText, setsearchText] = useState("")
  getData = () => {

  }


  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,

        }}>
        <TouchableOpacity
          style={{ position: 'absolute', left: 0 }}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image source={Images.arrowBack} style={styles.iconBack} />
        </TouchableOpacity>
        <RegularTextCB style={{ fontSize: SIZES.ten*3 }}>Search</RegularTextCB>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TextInput
          keyboardType="default"
          returnKeyType="search"
          placeholder={'Search Here'}
          value={searchText}
          onSubmitEditing={() => { getData() }}
          onChangeText={(text) => { setsearchText(text) }}
          style={styles.textInput}
        />
        <TouchableOpacity>
          <Image
            source={Images.iconSearch}
            style={{ height: SIZES.fifty, width: SIZES.fifty, resizeMode: 'stretch' }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginTop: SIZES.ten }}
        data={bestEmployees}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderBestEmployeesItem}
        contentInset={{
          // for ios
          bottom: SIZES.ten*10,
        }}
        contentContainerStyle={{
          // for android
          paddingBottom: SIZES.ten*10,
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: SIZES.twenty,
    paddingTop: SIZES.twenty,
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  iconFilter: {
    height: SIZES.ten*3,
    width: SIZES.ten*3,
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
    shadowOffset: { width: SIZES.five, height: SIZES.five },
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  circleCard: {
    height: SIZES.ten*6,
    width: SIZES.ten*6,
    borderRadius: SIZES.ten*3,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: SIZES.five, height: SIZES.five },
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  iconUser: {
    height: SIZES.ten*6,
    width: SIZES.ten*6,
    borderRadius: SIZES.ten*6 / SIZES.five-3,
    resizeMode: 'contain',
  },
  iconForward: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    resizeMode: 'contain',
  },
});
