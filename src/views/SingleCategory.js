import React, { Component } from 'react';
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
import Constants, { SIZES } from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import LightTextCB from '../components/LightTextCB';
import utils from '../utils';
import Axios from '../network/APIKit';
SIZES
export default class SingleCategory extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isLoading: false,
    vendors: [],
  };

  componentDidMount() {
    this.getUserAccessToken();
  }

  renderSingleCategoriesItem = ({ item }) => {

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.card,
          { padding: SIZES.fifteen, marginHorizontal: SIZES.fifteen, marginBottom: SIZES.twenty, marginTop: SIZES.five },
        ]}
        onPress={() => this.props.navigation.navigate(Constants.chat)}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.circleCard}>
            <Image
              source={{ uri: Constants.imageURL + item.user.image }}
              // source={item.image}
              style={{ height: '100%', width: '100%' }}
              resizeMode="stretch"
            />
          </View>
          <View style={{ marginStart: SIZES.ten }}>
            <RegularTextCB
              style={{
                color: Colors.black,
                fontSize: 16,
              }}>
              {item.user.name}
            </RegularTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.five,
                alignItems: 'center',
              }}>
              <Image
                source={Images.iconVerified}
                style={{ height: SIZES.fifteen, width: SIZES.fifteen, resizeMode: 'contain' }}
              />
              <RegularTextCB
                style={{
                  color: Colors.turqoiseGreen,
                  fontSize: 12,
                  marginStart: SIZES.five,
                }}>
                Verified
              </RegularTextCB>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.five,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <RegularTextCB
            style={{
              color: Colors.black,
              fontSize: 16,
            }}>
            {item.title}
          </RegularTextCB>
          <LightTextCB
            style={{
              color: Colors.black,
              fontSize: 12,
            }}>
            ${item.price}
          </LightTextCB>
        </View>
        <RegularTextCB
          style={{
            color: Colors.sickGreen,
            fontSize: 12,
          }}>
          {item.category.name}
        </RegularTextCB>
        <RegularTextCB
          style={{
            color: Colors.coolGrey,
          }}>
          {item.description}
        </RegularTextCB>
        <View
          style={{ flexDirection: 'row', marginTop: SIZES.five, alignItems: 'center' }}>
          <Image
            source={Images.iconLocationPin}
            style={{ height: SIZES.twenty-3, width: SIZES.twenty-3, resizeMode: 'contain' }}
          />
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
              marginStart: SIZES.five,
            }}>
            {item.address}
          </RegularTextCB>
        </View>
        <View
          style={{ flexDirection: 'row', marginTop: SIZES.five, alignItems: 'center' }}>
          <Image
            source={Images.iconStopWatch}
            style={{ height: SIZES.twenty-3, width: SIZES.twenty-3, resizeMode: 'contain' }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginStart: SIZES.five,
              alignItems: 'center',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
              }}>
              {item.time}
            </RegularTextCB>
            <RegularTextCB
              style={{
                color: Colors.black,
              }}>
              {'Contact >'}
            </RegularTextCB>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  openNextScreen = (nextScreen) => {
    this.props.navigation.navigate(nextScreen);
  };

  toggleIsLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({ accessToken: token }, () => this.getCategoryData());
  };

  getCategoryData = () => {
    const onSuccess = ({ data }) => {
      console.log('====',data)
      this.toggleIsLoading();
      this.setState({ vendors: data.data.jobs });
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
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

  render() {
    return (
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
          }}>
          <TouchableOpacity
            style={{ position: 'absolute', left: SIZES.ten }}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={Images.arrowBack}
              style={[styles.iconBack, { tintColor: Colors.black }]}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{
                uri: Constants.imageURL + this.props.route.params.item.image,
              }}
              style={{ height: 50, width: 50 }}
            />
            <RegularTextCB style={{ fontSize: SIZES.ten*3, color: Colors.black }}>
              {this.props.route.params.item.name}
            </RegularTextCB>
          </View>
        </View>
        <FlatList
          style={{ marginTop: SIZES.ten }}
          data={this.state.vendors}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderSingleCategoriesItem}
          contentInset={{
            // for ios
            bottom: SIZES.ten*10,
          }}
          contentContainerStyle={{
            // for android
            paddingBottom: SIZES.ten*10,
          }}
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
    height: SIZES.ten*3,
    width: SIZES.ten*3,
    resizeMode: 'contain',
  },
  iconForward: {
    height: SIZES.ten*10,
    width: SIZES.ten*10,
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
    height: SIZES.fifty-5,
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
    borderRadius: SIZES.twenty,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: SIZES.five, height: SIZES.five },
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  circleCard: {
    height: SIZES.ten*6,
    width: SIZES.ten*6,
    borderRadius: SIZES.ten*3,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
