import React, { Component } from 'react';
import {
  FlatList,
  Image,
  LogBox,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonRadius10 from '../../components/ButtonRadius10';
import EditText from '../../components/EditText';
import Constants, { SIZES } from '../../common/Constants';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import Colors from '../../common/Colors';
import LightTextCB from '../../components/LightTextCB';
import utils from '../../utils';
import Axios from '../../network/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import ListComponent from '../../components/ListComponent';
export default class VendorHome extends Component {

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      categories: [],
      accessToken: '',
      avatar: '',
      name: '',
      service: '',
      rateRequested: '',
      location: '',
      countryCode: '',
      phone: '',
      address: '',
      exactTime: '',
      allJobs: []
    };
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.getUserAccessToken()
    this.props.navigation.addListener('focus', () => {
      this.getUserAccessToken()
    });
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({ accessToken: token }, () => {
      this.getUserProfile();
      this.getCategories();
      this.getAllJobs();
    });
  };

  getAllJobs = () => {
    const onSuccess = ({ data }) => {
      this.setState({ isLoading: false, allJobs: data.data.records });
    };

    const onFailure = (error) => {
      this.setState({ isLoading: false });
      utils.showResponseError(error);
    };

    this.setState({ isLoading: true });

    let params = {
      limit: 2,
    };

    Axios.get(Constants.getAllJobs, {
      params: params,
      headers: { Authorization: this.state.accessToken },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getUserProfile = () => {
    const onSuccess = ({ data }) => {
    //  console.log(' Profile=====',data.data.records.userProfile)
      this.setState({
        isLoading: false,
        avatar: data.data.records.userProfile.image,
        name: data.data.records.name,
        email: data.data.records.email,
        countryCode: data.data.records.country_code,
        phone: data.data.records.phone,
        location: data.data.records.userProfile.location,
      });
    };

    const onFailure = (error) => {
      this.setState({ isLoading: false });
      utils.showResponseError(error);
    };


    this.setState({ isLoading: true });
    Axios.get(Constants.getProfileURL,{
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };


  getCategories = () => {
    const onSuccess = ({ data }) => {

      this.setState({ isLoading: false, categories: data.data.records }, () => {
      }, () => {
        // console.log("state data", this.state.categories)
      });
    };

    const onFailure = (error) => {
      this.setState({ isLoading: false });
      utils.showResponseError(error);
    };

    this.setState({ isLoading: true });
    Axios.get(Constants.getAllVendorCategories, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  toggleIsLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };

  renderCategoryItem = ({ item }) => {

    return (
      <TouchableOpacity
        onPress={() => { this.props.navigation.navigate(Constants.vendorSingleCategory, { item: item, }); }}
        style={{ alignItems: 'center' }}>
        <Image style={styles.circle} source={{ uri: Constants.imageURL + "/uploads/category/e237696c743f4e524697907f27019c341623746681.png" }} />
        <RegularTextCB
          style={{ fontSize: 14, marginTop: -SIZES.twenty, color: Colors.coolGrey }}>
          {item.name}
        </RegularTextCB>
      </TouchableOpacity>
    );
  };

  renderJobsForYouItem = ({ item }) => {
    return (

      <ListComponent item={item} />
 
    );
  };



  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                paddingHorizontal: SIZES.twenty,
                marginTop: Platform.OS === 'android' ? SIZES.twenty :SIZES.fifty+SIZES.ten,
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() =>
                  this.props.navigation.navigate(Constants.vendorProfile)
                }>
                <View style={styles.circleCard}>
                  <Image
                    source={{ uri: Constants.imageURL + this.state.avatar }}
                    style={styles.iconUser}
                    resizeMode="cover"
                  />
                </View>
                <RegularTextCB style={{ fontSize: 16, marginStart:SIZES.ten }}>
                  Welcome,
                </RegularTextCB>
                <RegularTextCB style={{ fontSize: 16, marginStart:SIZES.five-2, color: Colors.sickGreen, }}>
                  {this.state.name}
                </RegularTextCB>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(Constants.filter);
                }}
                style={{ position: 'absolute', right: SIZES.twenty, }}>
                <Image
                  source={Images.iconHamburger}
                  style={{ height:SIZES.twenty, width:SIZES.twenty, resizeMode: 'contain', }} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                marginVertical:SIZES.ten,
                paddingHorizontal: SIZES.twenty,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate(Constants.search)}>
              <RegularTextCB style={{ fontSize: 16, color: Colors.coolGrey }}>
                Search Service...
              </RegularTextCB>
              <Image
                source={Images.iconSearch}
                style={{ height:SIZES.twenty, width:SIZES.twentyFive }}
              />
            </TouchableOpacity>
            <View
              style={{
                paddingHorizontal: SIZES.twenty,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RegularTextCB
                style={{
                  fontSize:SIZES.twenty,
                  color: Colors.black,
                }}>
                Browse categories
              </RegularTextCB>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(Constants.vendorAllCategories)
                }>
                <RegularTextCB
                  style={{
                    color: Colors.black,
                    textDecorationLine: 'underline',
                  }}>
                  See All
                </RegularTextCB>
              </TouchableOpacity>
            </View>
             <FlatList
              horizontal
              data={this.state.categories}
              keyExtractor={(item) => item.id}
              renderItem={this.renderCategoryItem}
              showsHorizontalScrollIndicator={false}
              contentInset={{
                // for ios
                top: 0,
                bottom: 0,
                left: SIZES.ten,
                right: SIZES.ten,
              }}
              contentContainerStyle={{
                // for android
                paddingHorizontal: Platform.OS === 'android' ? SIZES.ten : 0,
              }}
            />
            <View
              style={{
                paddingHorizontal: SIZES.twenty,
                paddingTop: SIZES.twenty,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>

              <RegularTextCB style={{ fontSize:SIZES.twenty, color: Colors.black, }}>Jobs For You</RegularTextCB>

              <TouchableOpacity onPress={() => { this.props.navigation.navigate(Constants.vendorAllJobs, { accessToken: this.state.accessToken }) }}>
                <RegularTextCB style={{ color: Colors.black, textDecorationLine: 'underline' }}>See All</RegularTextCB>
              </TouchableOpacity>

            </View>
            <FlatList
              data={this.state.allJobs}
              keyExtractor={(item) => item.id}
              renderItem={this.renderJobsForYouItem}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
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
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  textInputContainer: {
    marginHorizontal:SIZES.ten,
    height:SIZES.fifty+SIZES.twenty,
  },
  textInput: {
    fontSize:SIZES.fifteen+1,
    flex: 1,
    color: Colors.black1,
  },
  iconUser: {
    height: SIZES.fifty+SIZES.ten,
    width:SIZES.fifty+SIZES.ten,
    borderRadius: SIZES.fifty+SIZES.ten / 2,
    resizeMode: 'contain',
  },
  circle: {
    height:SIZES.ten*12,
    width:SIZES.ten*12,
    resizeMode: 'stretch',
  },
  circleCard: {
    height:SIZES.fifty+SIZES.ten,
    width:SIZES.fifty+SIZES.ten,
    borderRadius:SIZES.twenty+SIZES.ten,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: SIZES.five, height: SIZES.five },
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius:SIZES.twenty,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: SIZES.five, height: SIZES.five },
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation:SIZES.ten,
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding:SIZES.twenty,
    borderTopLeftRadius:SIZES.twenty,
    borderTopRightRadius:SIZES.twenty,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
