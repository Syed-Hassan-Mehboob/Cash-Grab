import {Card} from 'native-base';
import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet, Image} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
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
          borderRadius: 20,
          shadowRadius: 20,
          shadowOffset: 20,
          shadowOpacity: 20,
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
              <Image source={item.image} style={styles.iconUser} />
              <View style={{marginStart: 20, marginEnd: 20}}>
                <LightTextCB style={{fontSize: 18, color: Colors.black1}}>
                  {item.name}
                </LightTextCB>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <LightTextCB style={{fontSize: 18, color: Colors.black1}}>
                    Verified
                  </LightTextCB>
                  <Image
                    source={Images.tickVerified}
                    style={{height: 20, width: 20, marginStart: 5}}
                  />
                </View>
              </View>
            </View>
            <Image source={Images.arrowForward} style={[styles.iconForward]} />
          </View>
          <LightTextCB
            style={{fontSize: 18, color: Colors.black1, marginTop: 20}}>
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
            marginTop: 20,
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
        <LightTextCB style={{fontSize: 30, marginTop: 30}}>
          Best Employees
        </LightTextCB>
        <LightTextCB style={{fontSize: 18, marginTop: 30}}>
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
    height: 12,
    width: 12,
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
    paddingTop: 20,
    paddingHorizontal: 20,
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
    color: Colors.black1,
  },
  textInputContainer: {
    borderBottomWidth: 0.3,
    height: 45,
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
