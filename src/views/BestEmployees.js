import {Card} from 'native-base';
import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet, Image} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../common/Colors';
import Constants, { SIZES } from '../common/Constants';
import Images from '../common/Images';
import LightTextCB from '../components/LightTextCB';

export default class BestEmployees extends Component {
  bestEmployees = [
    {
      id: '1',
      name: 'Ray Hammond',
      location: 'Gardening, NY (2km)',
      image: Images.emp1,
      rating: '4.6 ratings',
    },
    {
      id: '2',
      name: 'Duane Ramos',
      location: 'Gardening, NY (2km)',
      image: Images.emp2,
      rating: '4.0 ratings',
    },
    {
      id: '3',
      name: 'Sophia Patton',
      location: 'Gardening, NY (2km)',
      image: Images.emp3,
      rating: '4.9 ratings',
    },
    {
      id: '4',
      name: 'Jeanette Zimmerman',
      location: 'Gardening, NY (2km)',
      image: Images.emp4,
      rating: '3.6 ratings',
    },
    {
      id: '5',
      name: 'Ray Hammond',
      location: 'Gardening, NY (2km)',
      image: Images.emp1,
      rating: '4.6 ratings',
    },
    {
      id: '6',
      name: 'Duane Ramos',
      location: 'Gardening, NY (2km)',
      image: Images.emp2,
      rating: '4.0 ratings',
    },
    {
      id: '7',
      name: 'Sophia Patton',
      location: 'Gardening, NY (2km)',
      image: Images.emp3,
      rating: '4.9 ratings',
    },
    {
      id: '8',
      name: 'Duane Ramos',
      location: 'Gardening, NY (2km)',
      image: Images.emp2,
      rating: '4.0 ratings',
    },
    {
      id: '9',
      name: 'Ray Hammond',
      location: 'Gardening, NY (2km)',
      image: Images.emp1,
      rating: '4.6 ratings',
    },
    {
      id: '10',
      name: 'Sophia Patton',
      location: 'Gardening, NY (2km)',
      image: Images.emp3,
      rating: '4.9 ratings',
    },
    {
      id: '11',
      name: 'Ray Hammond',
      location: 'Gardening, NY (2km)',
      image: Images.emp1,
      rating: '4.6 ratings',
    },
    {
      id: '12',
      name: 'Duane Ramos',
      location: 'Gardening, NY (2km)',
      image: Images.emp2,
      rating: '4.0 ratings',
    },
    {
      id: '13',
      name: 'Sophia Patton',
      location: 'Gardening, NY (2km)',
      image: Images.emp3,
      rating: '4.9 ratings',
    },
    {
      id: '14',
      name: 'Jeanette Zimmerman',
      location: 'Gardening, NY (2km)',
      image: Images.emp4,
      rating: '3.6 ratings',
    },
    {
      id: '15',
      name: 'Ray Hammond',
      location: 'Gardening, NY (2km)',
      image: Images.emp1,
      rating: '4.6 ratings',
    },
    {
      id: '16',
      name: 'Duane Ramos',
      location: 'Gardening, NY (2km)',
      image: Images.emp2,
      rating: '4.0 ratings',
    },
    {
      id: '17',
      name: 'Sophia Patton',
      location: 'Gardening, NY (2km)',
      image: Images.emp3,
      rating: '4.9 ratings',
    },
    {
      id: '18',
      name: 'Duane Ramos',
      location: 'Gardening, NY (2km)',
      image: Images.emp2,
      rating: '4.0 ratings',
    },
    {
      id: '19',
      name: 'Ray Hammond',
      location: 'Gardening, NY (2km)',
      image: Images.emp1,
      rating: '4.6 ratings',
    },
    {
      id: '20',
      name: 'Duane Ramos',
      location: 'Gardening, NY (2km)',
      image: Images.emp2,
      rating: '4.0 ratings',
    },
  ];

  constructor(props) {
    super(props);
  }

  renderBestEmployeesItem = ({item, index}) => {
    return (
      <Card
        style={{
          borderRadius: SIZES.twenty,
          shadowRadius: SIZES.twenty,
          shadowOffset: SIZES.twenty,
          shadowOpacity: SIZES.twenty,
        }}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => this.props.navigation.navigate('ConfirmBooking')}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
              }}>
              <Image
                source={item.image}
                style={styles.iconUser}
                resizeMode="cover"
              />
              <View style={{marginStart: SIZES.twenty, marginEnd: SIZES.twenty}}>
                <LightTextCB style={{fontSize: 18, color: Colors.black1}}>
                  {item.name}
                </LightTextCB>
                <View style={{flexDirection: 'row', marginTop: SIZES.five}}>
                  <LightTextCB style={{fontSize: 18, color: Colors.black1}}>
                    Verified
                  </LightTextCB>
                  <Image
                    source={Images.tickVerified}
                    style={{height: SIZES.twenty, width: SIZES.twenty, marginStart: SIZES.five}}
                  />
                </View>
              </View>
            </View>
            <Image source={Images.arrowForward} style={[styles.iconForward]} />
          </View>
          <LightTextCB
            style={{fontSize: 18, color: Colors.black1, marginTop: SIZES.twenty}}>
            {item.location}
          </LightTextCB>
          <LightTextCB
            style={{fontSize: 18, color: Colors.orange, marginTop: 10}}>
            {item.rating}
          </LightTextCB>
        </TouchableOpacity>
      </Card>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            marginTop: SIZES.twenty,
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
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Categories');
            }}>
            <Image source={Images.iconFilter} style={styles.iconFilter} />
          </TouchableOpacity>
        </View>
        <LightTextCB style={{fontSize: 30, marginTop: SIZES.ten*3}}>
          Best Employees
        </LightTextCB>
        <LightTextCB style={{fontSize: 18, marginTop: SIZES.ten*3}}>
          201 people available around you
        </LightTextCB>
        <FlatList
          style={{marginTop: 10}}
          data={this.bestEmployees}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderBestEmployeesItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  iconForward: {
    height: SIZES.fifteen-3,
    width: SIZES.fifteen-3,
    resizeMode: 'contain',
  },
  iconUser: {
    height: SIZES.ten*6,
    width: SIZES.ten*6,
    borderRadius: SIZES.ten*6 / 2,
    resizeMode: 'contain',
  },
  iconPassword: {
    fontSize: SIZES.twenty,
    height: SIZES.twenty,
    width: SIZES.twenty,
    alignSelf: 'center',
    color: Colors.orange,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: SIZES.twenty,
    paddingHorizontal: SIZES.twenty,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  itemContainer: {
    padding: SIZES.twenty,
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
    color: Colors.black1,
  },
  textInputContainer: {
    borderBottomWidth: 0.3,
    height: SIZES.fifty-5,
    borderColor: Colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  underlineText: {
    color: Colors.black1,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  noUnderlineText: {
    color: Colors.black1,
    textDecorationLine: 'none',
    fontSize: 16,
  },
});
