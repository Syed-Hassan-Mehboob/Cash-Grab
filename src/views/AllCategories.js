import {Card} from 'native-base';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';

export default class AllCategories extends Component {
  bestEmployees = [
    {
      id: '1',
      name: 'Home Renovation',
      image: Images.emp1,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '2',
      name: 'Electrician',
      image: Images.emp2,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '3',
      name: 'Home Cleaner',
      image: Images.emp3,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '4',
      name: 'Automobile',
      image: Images.emp4,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '5',
      name: 'Home Renovation',
      image: Images.emp1,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '6',
      name: 'Electrician',
      image: Images.emp2,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '7',
      name: 'Home Cleaner',
      image: Images.emp3,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '8',
      name: 'Automobile',
      image: Images.emp4,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '9',
      name: 'Home Renovation',
      image: Images.emp1,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '10',
      name: 'Home Cleaner',
      image: Images.emp2,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '11',
      name: 'Automobile',
      image: Images.emp3,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '12',
      name: 'Electrician',
      image: Images.emp4,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '13',
      name: 'Home Cleaner',
      image: Images.emp1,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '14',
      name: 'Automobile',
      image: Images.emp2,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '15',
      name: 'Home Renovation',
      image: Images.emp3,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
    {
      id: '16',
      name: 'Electrician',
      image: Images.emp4,
      desc:
        'Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod temp or incididunt ut labore et dolore...',
      ratings: '1.0 ratings',
    },
  ];

  constructor(props) {
    super(props);
  }

  renderBestEmployeesItem = ({item}) => {
    return (
      <View style={[styles.card, {margin: 10}]}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            this.openNextScreen(Constants.viewVendorProfile);
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
                  <Image source={item.image} style={styles.iconUser} />
                </View>
                <View
                  style={{
                    marginStart: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexShrink: 1,
                  }}>
                  <View style={{flex: 1}}>
                    <RegularTextCB style={{fontSize: 18, color: Colors.black}}>
                      {item.name}
                    </RegularTextCB>
                    <RegularTextCB
                      style={{
                        fontSize: 16,
                        color: Colors.black,
                        textDecorationLine: 'underline',
                      }}>
                      View Profile
                    </RegularTextCB>
                  </View>
                  <RegularTextCB
                    style={{
                      fontSize: 16,
                      color: Colors.orangeYellow,
                    }}>
                    {item.ratings}
                  </RegularTextCB>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexShrink: 1,
                  marginTop: 5,
                }}>
                <RegularTextCB
                  style={{flex: 1, fontSize: 16, color: Colors.coolGrey}}>
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

  openNextScreen = (nextScreen) => {
    this.props.navigation.navigate(nextScreen);
  };

  render() {
    return (
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={styles.iconBack} />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: 30, alignSelf: 'center'}}>
            All Categories
          </RegularTextCB>
          <TouchableOpacity
            onPress={() => {
              this.openNextScreen(Constants.filter);
            }}>
            <Image
              source={Images.iconHamburger}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{marginTop: 10}}
          data={this.bestEmployees}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderBestEmployeesItem}
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
}

const styles = StyleSheet.create({
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
  iconForward: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  iconUser: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode: 'contain',
  },
  iconPassword: {
    fontSize: 20,
    height: 20,
    width: 20,
    alignSelf: 'center',
    color: Colors.orange,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  itemContainer: {
    padding: 20,
    flex: 1,
  },
  formLabel: {
    fontSize: 16,
    color: Colors.grey,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: Constants.fontLight,
    color: Colors.black,
  },
  textInputContainer: {
    borderBottomWidth: 0.3,
    height: 45,
    borderColor: Colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  underlineText: {
    color: Colors.black,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  noUnderlineText: {
    color: Colors.black,
    textDecorationLine: 'none',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  circleCard: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
});
