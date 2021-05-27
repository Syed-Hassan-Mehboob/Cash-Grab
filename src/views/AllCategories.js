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
