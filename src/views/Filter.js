import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Images from '../common/Images';
import Colors from '../common/Colors';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from '../network/APIKit';
import utils from '../utils';
import Constants, { SIZES } from '../common/Constants';

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{ name: 'BookingConfirmed' },],
});

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      prices: [],
      locations: [],
      selectedCategory: undefined,
      selectedPrice: undefined,
      selectedLocation: undefined,
      isLoading: false,
      accessToken: '',
    };
  }

  componentDidMount() {
    this.getUserAccessToken();
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({ accessToken: token }, () => {
      this.getfilters();
    });

  };

  getfilters = () => {
    const onSuccess = ({ data }) => {
      this.setState({
        isLoading: false, categories: data.data.categories.map((category) => ({
          ...category,
          isSelected: false,
        })),
        prices: data.data.prices.map((price) => ({
          ...price,
          isSelected: false,
        })),
        locations: data.data.locations.map((location) => ({
          ...location,
          isSelected: false,
        }))
      })
        ;
    };

    const onFailure = (error) => {
      this.setState({ isLoading: false });
      utils.showResponseError(error);
    };

    this.setState({ isLoading: true });

    Axios.get(Constants.getFilter, { headers: { Authorization: this.state.accessToken, } })
      .then(onSuccess)
      .catch(onFailure);
  };

  setfilters = () => {
    postData = {
      query: this.state.selectedCategory,


    },
      console.log("post data", postData)

    const onSuccess = ({ data }) => {

      this.setState({ isLoading: false });
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
      this.setState({ isLoading: false });
    };

    this.setState({ isLoading: true });
    const options = {
      headers: { 'Content-Type': 'application/json', Authorization: this.state.accessToken, },
    };

    Axios.post(Constants.postJob, postData, options).then(onSuccess).catch(onFailure);
  }

  renderCategoriesItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={item.isSelected === false ? styles.unselectedDate : styles.selectedDate}
        onPress={() => { this.handleCategoriesItemClick(index); }}>
        <View>
          <RegularTextCB style={{ fontSize: 14 }}>{item.name}</RegularTextCB>
        </View>
      </TouchableOpacity>
    );
  };

  handleCategoriesItemClick = (index) => {
    let mDates = this.state.categories;
    mDates.forEach((item) => {
      item.isSelected = false;
    });
    mDates[index].isSelected = true;
    this.setState({ categories: mDates, selectedCategory: mDates[index] }, () => {

    });
  };

  renderPriceItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={
          item.isSelected === false ? styles.unselectedDate : styles.selectedDate}
        onPress={() => {
          this.handleOnPriceItemClick(index);
        }}>
        <View>
          <RegularTextCB style={{ fontSize: 14 }}>{item.name}</RegularTextCB>
        </View>
      </TouchableOpacity>
    );
  };

  handleOnPriceItemClick = (index) => {
    let mPrices = this.state.prices;
    mPrices.forEach((item) => {
      item.isSelected = false;
    });
    mPrices[index].isSelected = true;
    let name = mPrices[index].name;
    let price = name.split('$').join('');
    this.setState({ prices: mPrices, selectedPrice: price });
  };



  renderLocationItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={item.isSelected === false ? styles.unselectedDate : styles.selectedDate}
        onPress={() => {
          this.handleLocationItemClick(index);
        }}>
        <View>
          <RegularTextCB style={{ fontSize: 14 }}>{item.name}</RegularTextCB>
        </View>
      </TouchableOpacity>
    );
  };

  handleLocationItemClick = (index) => {
    let mLocation = this.state.locations;
    mLocation.forEach((item) => { item.isSelected = false; });
    mLocation[index].isSelected = true;
    this.setState({ slots: mLocation, selectedLocation: mLocation[index] }, () => {

    });
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
            }}>
            <TouchableOpacity
              style={{ position: 'absolute', left: 0 }}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image source={Images.arrowBack} style={styles.iconBack} />
            </TouchableOpacity>
            <RegularTextCB style={{ fontSize: 30 }}>
              Furniture service
            </RegularTextCB>
            <TouchableOpacity
              style={{ position: 'absolute', right: 0, }}
              onPress={() => { this.props.navigation.goBack(); }}>
              <RegularTextCB
                style={{ fontSize: 14, textDecorationLine: 'underline', }}>
                RESET
              </RegularTextCB>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: SIZES.twenty }}>
            <RegularTextCB style={{ fontSize: 18 }}>Categories</RegularTextCB>
            <FlatList
              style={{ marginTop: SIZES.ten }}
              data={this.state.categories}
              numColumns={3}
              keyExtractor={(date) => date.id}
              renderItem={this.renderCategoriesItem}
              extraData={this.state}
              contentInset={{
                // for ios
                bottom: SIZES.ten,
              }}
              contentContainerStyle={{
                // for android
                paddingBottom: SIZES.ten,
              }}
            />
          </View>
          <View style={{ marginTop: SIZES.twenty }}>
            <RegularTextCB style={{ fontSize: 18 }}>Price</RegularTextCB>
            <FlatList
              style={{ marginTop: SIZES.ten }}
              data={this.state.prices}
              numColumns={3}
              keyExtractor={(date) => date.id}
              renderItem={this.renderPriceItem}
              extraData={this.state}
              contentInset={{
                // for ios
                bottom: SIZES.ten,
              }}
              contentContainerStyle={{
                // for android
                paddingBottom: SIZES.ten,
              }}
            />
          </View>
          <View style={{ marginTop: SIZES.twenty }}>
            <RegularTextCB style={{ fontSize: 18 }}>
              Location (within)
            </RegularTextCB>
            <FlatList
              style={{ marginTop: SIZES.ten }}
              data={this.state.locations}
              numColumns={3}
              keyExtractor={(slot) => slot.id}
              showsVerticalScrollIndicator={false}
              renderItem={this.renderLocationItem}
              extraData={this.state}
              contentInset={{
                // for ios
                bottom: SIZES.ten,
              }}
              contentContainerStyle={{
                // for android
                paddingBottom: SIZES.ten,
              }}
            />
          </View>
          <View style={styles.childContainer}>
            <ButtonRadius10
              label="APPLY"
              bgColor={Colors.sickGreen}
              onPress={() => {
                // this.props.navigation.navigate(Constants.Filtered)
              }}
            />
          </View>
        </View>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingTop: SIZES.twenty,
  },
  childContainer: {
    marginTop: SIZES.ten*4,
    paddingBottom: 100,
  },
  selectedDate: {
    alignItems: 'center',
    paddingVertical: SIZES.ten,
    margin: SIZES.ten,
    flex: 1 / 3,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: Colors.sickGreen,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  unselectedDate: {
    alignItems: 'center',
    paddingVertical: SIZES.ten,
    margin: SIZES.ten,
    flex: 1 / 3,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderRadius: SIZES.fifteen-3,
    borderColor: Colors.white,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
});
