import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import Colors from '../../common/Colors';
import Constants, { SIZES } from '../../common/Constants';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import LightTextCB from '../../components/LightTextCB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from '../../network/APIKit';
import utils from '../../utils';

export default class VendorSingleCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      accessToken: '',
      getAllCategories: []
    };
  }

  componentDidMount() {
    this.getUserAccessToken()
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({ accessToken: token }, () => {
      this.getAllCategories();
    });

  };

  getAllCategories = () => {

    const onSuccess = ({ data }) => {
      console.log('All Catagor==========',data.data.records)
      this.setState({ isLoading: false, getAllCategories: data.data.records });
    };

    const onFailure = (error) => {
      this.setState({ isLoading: false });
      utils.showResponseError(error);
    };

    this.setState({ isLoading: true });

    Axios.get(Constants.getVenderAllCategory, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
  
    return data;
  };

  renderAllCategoriesItem = ({ item }) => {

    return (
      <TouchableOpacity
        style={[
          styles.card,
          { padding:SIZES.fifteen, marginHorizontal:SIZES.five, marginBottom:SIZES.twenty, marginTop: SIZES.five, alignItems: 'center' },
        ]}   
        onPress={() =>{
          this.props.navigation.navigate(Constants.vendorSingleCategory,{
               item:item.id
          }
          )
        }}
        >

        <Image
          source={{ uri: Constants.imageURL + item.image }}
          // source={item.image}
          style={{ height:SIZES.ten*12, width:SIZES.ten*12 }}
          resizeMode="stretch"
        />

        <RegularTextCB
          style={{ fontSize: 16, marginTop: -SIZES.twenty, color: Colors.coolGrey }}>
          {item.name}
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
            justifyContent: 'space-between',
            marginTop: Platform.OS === 'android' ? 0 :SIZES.twenty,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={styles.iconBack} />
          </TouchableOpacity>
          <RegularTextCB style={{ fontSize: 30, alignSelf: 'center' }}>
            All Categories
          </RegularTextCB>
          <TouchableOpacity
            onPress={() => {
              this.openNextScreen(Constants.filter);
            }}>
            <Image
              source={Images.iconHamburger}
              style={{
                height: SIZES.twenty,
                width:SIZES.twenty,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, paddingTop:SIZES.ten }} >
          <FlatList
           data={this.formatData(this.state.getAllCategories,2)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={this.renderAllCategoriesItem}
            contentInset={{
              // for ios
              bottom: SIZES.ten*10,
            }}
            contentContainerStyle={{
              // for android
              paddingBottom:SIZES.ten*10,
            }}
          />
        </View>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconBack: {
    height: SIZES.twenty,
    width:SIZES.twenty,
    resizeMode: 'contain',
  },
  iconFilter: {
    height:SIZES.ten*3,
    width:SIZES.ten*3,
    resizeMode: 'contain',
  },
  iconForward: {
    height: SIZES.ten*10,
    width: SIZES.ten*10,
    resizeMode: 'contain',
  },
  iconUser: {
    height:SIZES.ten*8,
    width: SIZES.ten*8,
    borderRadius: SIZES.ten*8 / 2,
    resizeMode: 'contain',
  },
  iconPassword: {
    fontSize: 20,
    height: SIZES.twenty,
    width:SIZES.twenty,
    alignSelf: 'center',
    color: Colors.orange,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop:SIZES.fifteen,
    paddingHorizontal:SIZES.fifteen,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  itemContainer: {
    padding:SIZES.twenty,
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
    height:SIZES.fifty-5,
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
    borderRadius:SIZES.twenty,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: SIZES.five, height:SIZES.five },
    shadowOpacity: 1.0,
    shadowRadius:SIZES.ten,
    elevation: SIZES.ten,
  },
  circleCard: {
    height: SIZES.ten*10,
    width: SIZES.ten*10,
    // borderRadius: 75 / 2,
    // shadowColor: '#c5c5c5',
    // shadowOffset: { width: 5, height: 5 },
    // shadowOpacity: 0.15,
    // shadowRadius: 5,
    // elevation: 5,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
