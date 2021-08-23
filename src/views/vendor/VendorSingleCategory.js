import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  LogBox
} from 'react-native';
import Colors from '../../common/Colors';
import Constants from '../../common/Constants';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import LightTextCB from '../../components/LightTextCB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from '../../network/APIKit';
import utils from '../../utils';
import ListComponent from '../../components/ListComponent';

export default class VendorSingleCategory extends Component {
  categories = [
    {
      id: '1',
      image: Images.emp1,
      title: 'Ray Hammond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: '2',
      image: Images.emp2,
      title: 'Jay Almond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: '3',
      image: Images.emp3,
      title: 'Ray Hammond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: '4',
      image: Images.emp4,
      title: 'Jay Almond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: '5',
      image: Images.emp1,
      title: 'Ray Hammond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: '6',
      image: Images.emp3,
      title: 'Ray Hammond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: '7',
      image: Images.emp4,
      title: 'Jay Almond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: '8',
      image: Images.emp1,
      title: 'Ray Hammond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      accessToken: '',
      getJobs: []
    };

  }
  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.getUserAccessToken()
    // this.props.navigation.addListener('focus', () => {
    //   this.getUserAccessToken()
    // });
  }
  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({ accessToken: token }, () => {
      this.getAllJobs();
    });
  };

  getAllJobs = () => {
    const onSuccess = ({ data }) => {
      this.setState({ isLoading: false, getJobs: data.data });
    };

    const onFailure = (error) => {
      this.setState({ isLoading: false });
      utils.showResponseError(error);
    };

    this.setState({ isLoading: true });
    let params = {
      categoryId: 1,
    };

    Axios.get(Constants.getJobsByCategory, {
      params,
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };


  renderSingleCategoriesItem = ({ item }) => {
  console.log('renderSingleCategoriesItem=====',item.image[0])
    // console.log(item.jobs.users.name)
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.card, { padding: 15, marginHorizontal: 15, marginBottom: 20, marginTop: 5},]}
        onPress={() => this.props.navigation.navigate(Constants.viewJob)}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.circleCard}>
            <Image
              source={{ uri: Constants.imageURL + item.image[0] }}
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

        {/* <RegularTextCB
          style={{ color: Colors.sickGreen, fontSize: 12, }}>
          {item.category.name}
        </RegularTextCB> */}
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
            {/* <RegularTextCB
              style={{
                color: Colors.coolGrey,
              }}>
              {item.time}
            </RegularTextCB> */}
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
            justifyContent: 'center',
            width: '100%',
            marginTop: Platform.OS === 'android' ? 0 : 20,
          }}>
          <TouchableOpacity
            style={{ position: 'absolute', left: 10 }}
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
              source={{ uri: Constants.imageURL + this.props.route.params.item.image }}
              style={{ height: 50, width: 50 }}
            />
            <RegularTextCB style={{ fontSize: 30, color: Colors.black }}>
              {this.props.route.params.item.name}
            </RegularTextCB>
          </View>
        </View>
        <FlatList
          style={{ marginTop: 10 }}
          data={this.state.getJobs}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderSingleCategoriesItem}
          contentInset={{
            // for ios
            bottom: 100,
          }}
          contentContainerStyle={{
            // for android
            paddingBottom: 100,
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
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  iconFilter: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  iconForward: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  iconUser: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode: 'contain',
  },
  iconPassword: {
    fontSize: 20,
    height: 20,
    width: 20,
    alignSelf: 'center',
    color: Colors.orange,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 5,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  itemContainer: {
    padding: 20,
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
    height: 45,
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
    borderRadius: 20,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
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
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
