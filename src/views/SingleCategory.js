import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../common/Colors';
import Constants, {SIZES, STYLES} from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import LightTextCB from '../components/LightTextCB';
import utils from '../utils';
import Axios from '../network/APIKit';
import {Text} from 'native-base';
SIZES;
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
  }

  openNextScreen = (nextScreen) => {
    this.props.navigation.navigate(nextScreen);
  };

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => this.getCategoryData());
    this.getCategoryData();
  };

  getCategoryData = () => {
    const onSuccess = ({data}) => {
      console.log('==== catagory data ====', data);
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
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  renderSingleCategoriesItem = ({item}) => {
    // console.log('Single Category Item======',item.userProfile)
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            marginHorizontal: SIZES.fifteen,
            marginTop: SIZES.twenty,
            alignItems: 'center',
          },
        ]}
        onPress={() =>
          this.props.navigation.navigate(Constants.singleCategory, {
            item: item,
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            source={{uri: Constants.imageURL + item.image}}
            // source={item.image}
            style={{
              height: SIZES.ten * 10,
              width: SIZES.ten * 10,
              borderRadius: SIZES.ten * 10,
            }}
            resizeMode="cover"
          />
          <Text>View Profile</Text>
        </View>
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
      <View style={[STYLES.container]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: SIZES.ten}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={Images.arrowBack}
              style={[styles.iconBack, {tintColor: Colors.black}]}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 0.42,
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: Constants.imageURL + this.props.route.params.item.image,
              }}
              style={{height: SIZES.ten * 7, width: SIZES.ten * 7}}
            />
            <RegularTextCB
              style={{fontSize: SIZES.ten * 3, color: Colors.black}}>
              {this.props.route.params.item.name}
            </RegularTextCB>
          </View>
        </View>

        <FlatList
          numColumns={2}
          // horizontal
          data={this.formatData(this.state.vendors, 2)}
          keyExtractor={(index) => index}
          renderItem={this.renderSingleCategoriesItem}
          showsHorizontalScrollIndicator={false}
        />

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
