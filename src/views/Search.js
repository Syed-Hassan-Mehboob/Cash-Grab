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
import Constants from '../common/Constants';

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
      id: '2',
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
      id: '5',
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
      id: '10',
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
      <View style={[styles.card, { margin: 10 }]}>
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
                    marginStart: 10,
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
                            height: 15,
                            width: 15,
                            resizeMode: 'contain',
                            tintColor: Colors.orangeYellow,
                          }}
                        />
                        <RegularTextCB
                          style={{
                            fontSize: 14,
                            color: Colors.orangeYellow,
                            marginStart: 2,
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
                  marginTop: 5,
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
    console.log(searchText)
  }


  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: Platform.OS === 'android' ? 0 : 20,

        }}>
        <TouchableOpacity
          style={{ position: 'absolute', left: 0 }}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image source={Images.arrowBack} style={styles.iconBack} />
        </TouchableOpacity>
        <RegularTextCB style={{ fontSize: 30 }}>Search</RegularTextCB>
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
            style={{ height: 50, width: 50, resizeMode: 'stretch' }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginTop: 10 }}
        data={bestEmployees}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderBestEmployeesItem}
        contentInset={{
          // for ios
          bottom: 100,
        }}
        contentContainerStyle={{
          // for android
          paddingBottom: 100,
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  iconBack: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  iconFilter: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: Constants.fontRegular,
    color: Colors.black1,
  },
  itemContainer: {
    padding: 20,
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  circleCard: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  iconUser: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode: 'contain',
  },
  iconForward: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
});
