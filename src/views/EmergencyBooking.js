import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet, Image} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import LightTextCB from '../components/LightTextCB';
import SearchBox from '../components/SearchBox';

export default class EmergencyBooking extends Component {
  categories = [
    {
      id: '1',
      name: 'Furniture service',
    },
    {
      id: '2',
      name: 'AC',
    },
    {
      id: '3',
      name: 'Automobile',
    },
    {
      id: '4',
      name: 'Television',
    },
    {
      id: '5',
      name: 'Laptop',
    },
    {
      id: '6',
      name: 'Electricians',
    },
    {
      id: '7',
      name: 'Plumbing',
    },
    {
      id: '8',
      name: 'House Cleaning',
    },
    {
      id: '9',
      name: 'Furniture service',
    },
    {
      id: '10',
      name: 'Plumbing',
    },
    {
      id: '11',
      name: 'Furniture service',
    },
    {
      id: '12',
      name: 'AC',
    },
    {
      id: '13',
      name: 'Automobile',
    },
    {
      id: '14',
      name: 'Television',
    },
    {
      id: '15',
      name: 'Laptop',
    },
    {
      id: '16',
      name: 'Electricians',
    },
    {
      id: '17',
      name: 'Plumbing',
    },
    {
      id: '18',
      name: 'House Cleaning',
    },
    {
      id: '19',
      name: 'Furniture service',
    },
    {
      id: '20',
      name: 'Plumbing',
    },
  ];

  constructor(props) {
    super(props);
  }

  renderCategoriesItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => this.props.navigation.navigate('Nearby')}>
        <LightTextCB style={{fontSize: 18, color: Colors.grey}}>
          {item.name}
        </LightTextCB>
        <Image source={Images.arrowForward} style={styles.iconForward} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Image source={Images.arrowBack} style={styles.iconBack} />
        </TouchableOpacity>
        <LightTextCB style={{fontSize: 30, marginTop: 30}}>
          Emergency booking
        </LightTextCB>
        <LightTextCB style={{fontSize: 18, marginTop: 10}}>
          Need help?
        </LightTextCB>
        <View style={{marginVertical: 10}}>
          <SearchBox disabled={false} />
        </View>
        <LightTextCB style={{fontSize: 18}}>Categories</LightTextCB>
        <FlatList
          style={{marginTop: 10}}
          data={this.categories}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderCategoriesItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconBack: {
    height: 20,
    width: 20,
    marginTop: 20,
    resizeMode: 'contain',
  },
  iconForward: {
    height: 12,
    width: 12,
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  itemContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderColor: Colors.black1,
    borderBottomWidth: 0.3,
    justifyContent: 'space-between',
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
