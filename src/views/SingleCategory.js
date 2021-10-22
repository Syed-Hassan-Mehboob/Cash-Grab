import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  Text,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../common/Colors';
import Constants, {FONTS, SIZES, STYLES, width} from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import LightTextCB from '../components/LightTextCB';
import utils from '../utils';
import Axios from '../network/APIKit';
import {Icon} from 'native-base';

export default class SingleCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      vendors: [],
    };
  }

  componentDidMount() {
    this.getUserAccessToken();
    this.props.navigation.addListener('focus', () => {
      this.getUserAccessToken();
      // console.log(
      //   'Parent Category id ====== ',
      //   this.props.route.params.item.id,
      // );
    });
  }

  openNextScreen = (nextScreen) => {
    this.props.navigation.navigate(nextScreen);
  };

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => this.getCategoryData(token));
    // this.getCategoryData(token);
  };

  getCategoryData = (token) => {
    const onSuccess = ({data}) => {
      // console.log('==== catagory data ====', JSON.stringify(data.data));
      this.toggleIsLoading();
      this.setState({vendors: data.data});
      // utils.showToast(data.message)
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error.massage);
    };

    let params = {
      categoryId: this.props.route.params.item.id,
    };

    this.toggleIsLoading();

    Axios.get(Constants.customerViewCategoriesURL, {
      params,
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  renderSingleCategoriesItem = ({item}) => {
    if (item.empty === true) {
      return (
        <View
          style={[
            {
              flex: 1,
              backgroundColor: 'transparent',
              marginHorizontal: SIZES.fifteen + 2,
              marginTop: SIZES.ten * 4,
              alignItems: 'center',
              paddingVertical: SIZES.five,
            },
          ]}
        />
      );
    }

    return (
      <TouchableOpacity
        disabled={true}
        style={[
          styles.card,
          {
            marginHorizontal: SIZES.fifteen + 2,
            marginTop: SIZES.ten * 5,
            alignItems: 'center',
            paddingVertical: SIZES.fifteen,
          },
        ]}
        //   onPress={
        //     () =>
        //     this.props.navigation.navigate(Constants.viewVendorProfile, {
        //       item: item.id,
        //     })
        //   }
        //   activeOpacity={0.6}
      >
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(Constants.viewVendorProfile, {
              vendorid: item.id,
              item: this.props.route.params.item,
            })
          }
          activeOpacity={0.6}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            source={{uri: Constants.imageURL + item.image}}
            // source={item.image}
            style={{
              height: SIZES.ten * 5.5,
              width: SIZES.ten * 5.5,
              borderRadius: SIZES.ten * 5.5,
              marginRight: SIZES.ten,
            }}
            resizeMode="cover"
          />
          <Text
            style={[
              FONTS.mediumFont14,
              {
                textDecorationLine: 'underline',
                color: Colors.black1,
              },
            ]}>
            View Profile
          </Text>
        </TouchableOpacity>

        <View
          style={{
            paddingHorizontal: SIZES.ten,
            paddingVertical: SIZES.ten,
          }}>
          <RegularTextCB
            style={[
              {
                color: Colors.black,
                fontSize: 16,
              },
            ]}>
            {item.name}
          </RegularTextCB>
          <RegularTextCB
            style={{
              fontSize: 16,
              color: Colors.coolGrey,
            }}>
            {item.description}
          </RegularTextCB>
        </View>

        <TouchableOpacity
          style={[
            styles.card,
            {
              backgroundColor: Colors.sickGreen,
              padding: SIZES.ten * 2,
              borderRadius: SIZES.ten * 4,
              position: 'absolute',
              bottom: -SIZES.ten * 3,
            },
          ]}
          onPress={() =>
            this.props.navigation.navigate(Constants.SelectServices, {
              item: this.props.route.params.item,
              vendorid: item.id,
            })
          }
          activeOpacity={0.6}>
          <Icon
            type="AntDesign"
            name="right"
            style={{color: Colors.white, fontSize: 18}}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
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

  render() {
    return (
      <View style={[STYLES.container, {paddingHorizontal: SIZES.ten}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // paddingHorizontal: SIZES.ten,
          }}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Icon
              type="AntDesign"
              name="left"
              style={{color: Colors.black, fontSize: SIZES.ten * 3}}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              flex: 0.42,
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: Constants.imageURL + this.props.route.params.item.image,
              }}
              style={{
                height: SIZES.ten * 6,
                width: SIZES.ten * 6,
                borderRadius: SIZES.ten * 6,
              }}
            />
            <RegularTextCB
              style={[
                {
                  color: Colors.black,
                  fontSize: 22,
                  marginStart: SIZES.five * 1,
                },
              ]}>
              {this.props.route.params.item.name}
            </RegularTextCB>
          </View>
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

        <View style={{flex: 1}}>
          <FlatList
            numColumns={2}
            // horizontal
            data={this.formatData(this.state.vendors, 2)}
            keyExtractor={(item) => item.id}
            renderItem={this.renderSingleCategoriesItem}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => {
              return (
                <Text
                  style={[FONTS.boldFont18, {flex: 1, alignSelf: 'center'}]}>
                  No Record(s)!
                </Text>
              );
            }}
            contentContainerStyle={{
              paddingBottom: SIZES.ten * 5,
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
    height: SIZES.ten * 10,
    width: SIZES.ten * 10,
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
    paddingTop: SIZES.fifteen,
    paddingHorizontal: SIZES.five,
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
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
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
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
    overflow: 'hidden',
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
