import {Card, Icon} from 'native-base';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  Dimensions,
  Text,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Colors from '../common/Colors';
import Constants, {FONTS, SIZES, STYLES} from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from '../network/APIKit';
import utils from '../utils';
import LightTextCB from '../components/LightTextCB';

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
        activeOpacity={0.5}
        style={[
          styles.card,
          {
            marginTop: SIZES.twenty,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.ten,
            paddingHorizontal: SIZES.twenty,
            paddingVertical: SIZES.ten * 2,
            borderRadius: SIZES.ten,
          },
        ]}
        onPress={() =>
          this.props.navigation.navigate(Constants.singleCategory, {
            item: item,
          })
        }>
        <View style={{flex: 0.95}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={styles.circleCard}>
              <Image
                source={{uri: Constants.imageURL + item.image}}
                // source={item.image}
                style={{height: '100%', width: '100%'}}
                resizeMode="stretch"
              />
            </View>

            <View style={{marginStart: SIZES.ten}}>
              <RegularTextCB
                style={[
                  FONTS.boldFont16,
                  {
                    color: Colors.black,
                  },
                ]}>
                {item.name}
              </RegularTextCB>
              <RegularTextCB
                style={{
                  color: Colors.black,
                  fontSize: 14,
                  textDecorationLine: 'underline',
                  paddingVertical: SIZES.five + 2,
                }}>
                View Profile
              </RegularTextCB>
            </View>
          </View>

          <Text
            style={{
              marginTop: SIZES.ten,
              color: Colors.coolGrey,
              fontSize: 14,
              fontFamily: Constants.fontRegular,
              lineHeight: 20,
            }}
            numberOfLines={3}>
            Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod
            temp or incididunt ut labore et dolore...
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={() => this.props.navigation.navigate(Constants.home)}
          style={[
            styles.card,
            {
              backgroundColor: Colors.sickGreen,
              padding: SIZES.ten * 2,
              borderRadius: SIZES.ten * 4,
            },
          ]}>
          <Icon
            type="AntDesign"
            name="right"
            style={{color: Colors.white, fontSize: 18}}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  openNextScreen = (nextScreen) => {
    this.props.navigation.navigate(nextScreen);
  };

  render() {
    return (
      <View style={[STYLES.container, {paddingHorizontal: SIZES.ten}]}>
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
            <Icon
              type="AntDesign"
              name="left"
              style={{color: Colors.black, fontSize: SIZES.ten * 3}}
            />
          </TouchableOpacity>
          <RegularTextCB style={[, {fontSize: 22}]}>
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
              }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, paddingTop: SIZES.ten}}>
          <FlatList
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            data={this.state.getAllCategories}
            renderItem={this.renderAllCategoriesItem}
            contentInset={{
              // for ios
              bottom: SIZES.ten * 10,
            }}
            contentContainerStyle={{
              // for android
              paddingBottom: SIZES.ten * 10,
              marginTop: SIZES.twenty,
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
    backgroundColor: '#ffff',
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  circleCard: {
    height: SIZES.ten * 8,
    width: SIZES.ten * 8,
    borderRadius: SIZES.ten * 8,
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
    padding: 15,
    marginHorizontal: SIZES.five,
    marginBottom: SIZES.twenty,
    marginTop: SIZES.five,
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
  },
});
