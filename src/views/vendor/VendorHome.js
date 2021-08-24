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
import Constants from '../../common/Constants';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import Colors from '../../common/Colors';
import LightTextCB from '../../components/LightTextCB';
import utils from '../../utils';
import Axios from '../../network/APIKit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';


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
      this.setState({
        isLoading: false,
        avatar: data.data.records.userProfile.image,
        name: data.data.records.name,
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
        console.log("state data", this.state.categories)
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
    // console.log("renderCategoryItem=====================================",item.image)
    return (
      <TouchableOpacity
        onPress={() => { this.props.navigation.navigate(Constants.vendorSingleCategory, { item: item, }); }}
        style={{ alignItems: 'center' }}>
        <Image style={styles.circle} source={{ uri: Constants.imageURL + "/uploads/category/e237696c743f4e524697907f27019c341623746681.png" }} />
        <RegularTextCB
          style={{ fontSize: 14, marginTop: -20, color: Colors.coolGrey }}>
          {item.name}
        </RegularTextCB>
      </TouchableOpacity>
    );
  };

  renderJobsForYouItem = ({ item }) => {

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.card, { padding: 15, marginHorizontal: 15, marginBottom: 20, marginTop: 5 },]}
        onPress={() => this.props.navigation.navigate(Constants.viewJob)}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.circleCard}>
            <Image
              source={{ uri: Constants.imageURL + item.user.userProfile.image }}
              // source={item.image}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View style={{ marginStart: 10 }}>
            <RegularTextCB
              style={{ color: Colors.black, fontSize: 16, }}>
              {item.user.name}
            </RegularTextCB>
            <View
              style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', }}>
              <Image source={Images.iconVerified} style={{ height: 15, width: 15, resizeMode: 'contain', tintColor: item.user.email_verified_at !== null ? Colors.turqoiseGreen : 'red' }} />
              <RegularTextCB style={{ color: item.user.email_verified_at !== null ? Colors.turqoiseGreen : 'red', fontSize: 12, marginStart: 5, }}>
                {item.user.email_verified_at !== null ? "Verified" : "Unverified"}
              </RegularTextCB>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'space-between' }}>
          <RegularTextCB style={{ color: Colors.black, fontSize: 16, }}>
            {item.title}
          </RegularTextCB>

          <LightTextCB
            style={{ color: Colors.black, fontSize: 12, }}>
            ${item.price}
          </LightTextCB>

        </View>

        <RegularTextCB
          style={{ color: Colors.sickGreen, fontSize: 12, }}>
          {item.name}
        </RegularTextCB>
        <RegularTextCB
          style={{ color: Colors.coolGrey, }}>
          {item.description}
        </RegularTextCB>
        <View
          style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
          <Image
            source={Images.iconLocationPin}
            style={{ height: 17, width: 17, resizeMode: 'contain' }}
          />
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
              marginStart: 5,
            }}>
            {item.address}
          </RegularTextCB>
        </View>
        <View
          style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
          <Image
            source={Images.iconStopWatch}
            style={{ height: 17, width: 17, resizeMode: 'contain' }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginStart: 5,
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
                paddingHorizontal: 20,
                marginTop: Platform.OS === 'android' ? 20 : 60,
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
                <RegularTextCB style={{ fontSize: 16, marginStart: 10 }}>
                  Welcome,
                </RegularTextCB>
                <RegularTextCB style={{ fontSize: 16, marginStart: 3, color: Colors.sickGreen, }}>
                  {this.state.name}
                </RegularTextCB>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(Constants.filter);
                }}
                style={{ position: 'absolute', right: 20, }}>
                <Image
                  source={Images.iconHamburger}
                  style={{ height: 20, width: 20, resizeMode: 'contain', }} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                marginVertical: 10,
                paddingHorizontal: 20,
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
                style={{ height: 50, width: 50 }}
              />
            </TouchableOpacity>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RegularTextCB
                style={{
                  fontSize: 20,
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
                left: 10,
                right: 10,
              }}
              contentContainerStyle={{
                // for android
                paddingHorizontal: Platform.OS === 'android' ? 10 : 0,
              }}
            />
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>

              <RegularTextCB style={{ fontSize: 20, color: Colors.black, }}>Jobs For You</RegularTextCB>

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
    marginHorizontal: 10,
    height: 70,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    color: Colors.black1,
  },
  iconUser: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode: 'contain',
  },
  circle: {
    height: 120,
    width: 120,
    resizeMode: 'stretch',
  },
  circleCard: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
