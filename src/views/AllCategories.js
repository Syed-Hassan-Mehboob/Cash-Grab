import {Card} from 'native-base';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  Dimensions,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Colors from '../common/Colors';
import Constants, {SIZES} from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from '../network/APIKit';
import utils from '../utils';

export default class AllCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      accessToken: '',
      getAllCategories: [],
    };
  }

  componentDidMount() {
    this.getUserAccessToken();
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => {
      this.getAllCategories();
    });
  };

  getAllCategories = () => {
    const onSuccess = ({data}) => {
      console.log('All Category ==== ', data.data);
      this.setState({isLoading: false, getAllCategories: data.data.records});
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      console.log('=================', error);
      utils.showResponseError(error);
    };

    this.setState({isLoading: true});

    Axios.get(Constants.getAllCustomerCategories, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }

    return data;
  };

  renderAllCategoriesItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            padding: 15,
            marginHorizontal: SIZES.five,
            marginBottom: SIZES.twenty,
            marginTop: SIZES.five,
            alignItems: 'center',
          },
        ]}
        onPress={() =>
          this.props.navigation.navigate(Constants.singleCategory, {
            item: item,
          })
        }>
        <Image
          source={{uri: Constants.imageURL + item.image}}
          // source={item.image}
          style={{height: SIZES.ten * 10, width: SIZES.ten * 10}}
          resizeMode="cover"
        />

        <RegularTextCB
          style={{
            fontSize: 16,
            marginTop: SIZES.ten,
            color: Colors.coolGrey,
          }}>
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
            marginTop: Platform.OS === 'android' ? 0 : SIZES.ten * 3,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={styles.iconBack} />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: SIZES.ten * 3, alignSelf: 'center'}}>
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
                width: SIZES.twenty,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, paddingTop: SIZES.ten}}>
          <FlatList
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            data={this.formatData(this.state.getAllCategories, 2)}
            numColumns={2}
            renderItem={this.renderAllCategoriesItem}
            contentInset={{
              // for ios
              bottom: SIZES.ten * 10,
            }}
            contentContainerStyle={{
              // for android
              paddingBottom: SIZES.ten * 10,
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
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  iconFilter: {
    height: SIZES.ten * 3,
    width: SIZES.ten * 3,
    resizeMode: 'contain',
  },
  iconForward: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    resizeMode: 'contain',
  },
  iconUser: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: (SIZES.ten * 6) / 2,
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
    paddingTop: SIZES.ten,
    paddingHorizontal: SIZES.ten,
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
    color: Colors.black,
  },
  textInputContainer: {
    borderBottomWidth: 0.3,
    height: SIZES.fifty - 5,
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
    height: SIZES.ten * 20,
    width: SIZES.ten * 10,
    borderRadius: SIZES.ten * 2,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  circleCard: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: SIZES.ten * 3,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / 2, // approximate a square
  },
});
