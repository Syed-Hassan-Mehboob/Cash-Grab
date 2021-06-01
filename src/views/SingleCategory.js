import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import LightTextCB from '../components/LightTextCB';

export default class SingleCategory extends Component {
  vendors = [
    {
      id: '1',
      image: Images.emp1,
      title: 'Ray Hammond',
      type: 'Car Mechanic, NY (2km)',
      ratings: '1.0 ratings',
    },
    {
      id: '2',
      image: Images.emp2,
      title: 'Jay Almond',
      type: 'Car Wash, NY (1km)',
      ratings: '1.1 ratings',
    },
    {
      id: '3',
      image: Images.emp3,
      title: 'Ray Hammond',
      type: 'Puncture, NY (1.2km)',
      ratings: '1.2 ratings',
    },
    {
      id: '4',
      image: Images.emp4,
      title: 'Jay Almond',
      type: 'Plumber, NY (0.2km)',
      ratings: '1.3 ratings',
    },
    {
      id: '5',
      image: Images.emp1,
      title: 'Ray Hammond',
      type: 'Bike Electrician, NY (0.5km)',
      ratings: '1.4 ratings',
    },
    {
      id: '6',
      image: Images.emp1,
      title: 'Ray Hammond',
      type: 'Car Mechanic, NY (2km)',
      ratings: '1.0 ratings',
    },
    {
      id: '7',
      image: Images.emp2,
      title: 'Jay Almond',
      type: 'Car Wash, NY (1km)',
      ratings: '1.1 ratings',
    },
    {
      id: '8',
      image: Images.emp3,
      title: 'Ray Hammond',
      type: 'Puncture, NY (1.2km)',
      ratings: '1.2 ratings',
    },
    {
      id: '9',
      image: Images.emp4,
      title: 'Jay Almond',
      type: 'Plumber, NY (0.2km)',
      ratings: '1.3 ratings',
    },
    {
      id: '10',
      image: Images.emp1,
      title: 'Ray Hammond',
      type: 'Bike Electrician, NY (0.5km)',
      ratings: '1.4 ratings',
    },
  ];

  constructor(props) {
    super(props);
  }

  renderSingleCategoriesItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {padding: 10, marginHorizontal: 15, marginBottom: 20, marginTop: 5},
        ]}
        onPress={() =>
          this.props.navigation.navigate(Constants.viewVendorProfile)
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.circleCard}>
            <Image source={item.image} style={styles.iconUser} />
          </View>
          <RegularTextCB
            style={{
              color: Colors.black,
              textDecorationLine: 'underline',
              marginStart: 5,
              fontSize: 14,
            }}>
            View Profile
          </RegularTextCB>
        </View>
        <RegularTextCB
          style={{
            color: Colors.black,
            marginTop: 10,
            fontSize: 14,
          }}>
          {item.title}
        </RegularTextCB>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Image
            source={Images.iconVerified}
            style={{height: 15, width: 15, resizeMode: 'contain'}}
          />
          <RegularTextCB
            style={{
              color: Colors.turqoiseGreen,
              fontSize: 12,
              marginStart: 5,
            }}>
            Verified
          </RegularTextCB>
        </View>
        <RegularTextCB
          style={{
            color: Colors.coolGrey,
            marginTop: 5,
          }}>
          {item.type}
        </RegularTextCB>
        <RegularTextCB
          style={{
            color: Colors.orangeYellow,
            marginTop: 5,
          }}>
          {item.ratings}
        </RegularTextCB>
      </TouchableOpacity>
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
            justifyContent: 'center',
            width: '100%',
            marginTop: Platform.OS === 'android' ? 0 : 20,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 10}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={Images.arrowBack}
              style={[styles.iconBack, {tintColor: Colors.black}]}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={this.props.route.params.item.image}
              style={{height: 50, width: 50}}
            />
            <RegularTextCB style={{fontSize: 30, color: Colors.black}}>
              {this.props.route.params.item.title}
            </RegularTextCB>
          </View>
        </View>
        <FlatList
          style={{marginTop: 10}}
          data={this.vendors}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderSingleCategoriesItem}
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
    height: 100,
    width: 100,
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
    paddingTop: 15,
    paddingHorizontal: 5,
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
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  circleCard: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
});
