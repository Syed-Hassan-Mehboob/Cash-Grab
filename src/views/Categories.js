import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet, Image} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../common/Colors';
import Constants, { SIZES } from '../common/Constants';
import Images from '../common/Images';
import LightTextCB from '../components/LightTextCB';

export default class Categories extends Component {
  
  constructor(props) {
    super(props);
  }

  renderCategoriesItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => this.props.navigation.goBack()}>
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
        <LightTextCB style={{fontSize: 30, marginTop: SIZES.ten*3}}>
          Filter Categories
        </LightTextCB>
        <LightTextCB style={{fontSize: 18, marginTop: SIZES.ten*3}}>
          Categories
        </LightTextCB>
        <FlatList
          style={{marginTop: SIZES.ten}}
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
    height: SIZES.twenty,
    width: SIZES.twenty,
    marginTop: SIZES.twenty,
    resizeMode: 'contain',
  },
  iconForward: {
    height: 12,
    width: 12,
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
    padding: SIZES.twenty,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  itemContainer: {
    paddingTop: SIZES.twenty,
    paddingBottom: SIZES.twenty,
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
