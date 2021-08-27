import React, { Component } from 'react';
import RegularTextCB from '../components/RegularTextCB';
import Images from '../common/Images';
import Colors from '../common/Colors';
import {
  FlatList,
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import ButtonRadius10 from '../components/ButtonRadius10';
import EditText from '../components/EditText';
import Constants, { SIZES } from '../common/Constants';
import Axios from '../network/APIKit';
import utils from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {
  vendors = [
    {
      id: '1',
      image: Images.emp1,
      title: 'Ray Hammond',
      type: 'Car Mechanic, NY (2km)',
      ratings: '1.0',
    },
    {
      id: '2',
      image: Images.emp2,
      title: 'Jay Almond',
      type: 'Car Wash, NY (1km)',
      ratings: '1.1',
    },
    {
      id: '3',
      image: Images.emp3,
      title: 'Ray Hammond',
      type: 'Puncture, NY (1.2km)',
      ratings: '1.2',
    },
    {
      id: '4',
      image: Images.emp4,
      title: 'Jay Almond',
      type: 'Plumber, NY (0.2km)',
      ratings: '1.3',
    },
    {
      id: 'SIZES.five',
      image: Images.emp1,
      title: 'Ray Hammond',
      type: 'Bike Electrician, NY (0.5km)',
      ratings: '1.4',
    },
  ];

  urgentServices = [
    {
      id: '1',
      image: Images.emp1,
      name: 'Ray Hammond',
      title: 'Home Renovation',
      type: 'Lorem ipsum',
      ratings: '1.0',
    },
    {
      id: '2',
      image: Images.emp2,
      name: 'Ray Hammond',
      title: 'Car Mechanic',
      type: 'Lorem ipsum',
      ratings: '1.0',
    },
    {
      id: '3',
      image: Images.emp3,
      name: 'Ray Hammond',
      title: 'Home Renovation',
      type: 'Lorem ipsum',
      ratings: '1.0',
    },
    {
      id: '4',
      image: Images.emp1,
      name: 'Ray Hammond',
      title: 'Car Mechanic',
      type: 'Lorem ipsum',
      ratings: '1.0',
    },
    {
      id: 'SIZES.five',
      image: Images.emp2,
      name: 'Ray Hammond',
      title: 'Home Renovation',
      type: 'Lorem ipsum',
      ratings: '1.0',
    },
    {
      id: '6',
      image: Images.emp1,
      name: 'Ray Hammond',
      title: 'Car Mechanic',
      type: 'Lorem ipsum',
      ratings: '1.0',
    },
  ];

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isQuickServiceModalVisible: false,
      isSelectionModalVisible: false,
      accessToken: '',
      service: 'Select',
      avatar: '',
      name: '',
      rateRequested: '',
      location: '',
      address: '',
      exactTime: '',
      vendorAround: [],
      topServices: [],
      selections: [
        {
          id: '0',
          text: 'Service 1',
          isSelected: false,
        },
        {
          id: '1',
          text: 'Service 2',
          isSelected: false,
        },
        {
          id: '2',
          text: 'Service 3',
          isSelected: false,
        },
        {
          id: '3',
          text: 'Service 4',
          isSelected: false,
        },
        {
          id: '4',
          text: 'Service SIZES.five',
          isSelected: false,
        },
        {
          id: 'SIZES.five',
          text: 'Service 6',
          isSelected: false,
        },
      ],
      categories: [],
    };
  }

  componentDidMount() {
    this.getUserAccessToken()
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    this.props.navigation.addListener('focus', () => this.getUserAccessToken());
  }
  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({ accessToken: token }, () => {
      this.getUserProfile();
      this.getCategories();
      this.getVendorAroundYou();
      this.getTopServices();
    });
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
    Axios.get(Constants.getProfileURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getCategories = () => {
    const onSuccess = ({ data }) => {
      this.setState({ isLoading: false, categories: data.data.records });
    };

    const onFailure = (error) => {
      this.setState({ isLoading: false });
      utils.showResponseError(error);
    };

    this.setState({ isLoading: true });
    Axios.get(Constants.customerCategoriesURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getVendorAroundYou = () => {
    const onSuccess = ({ data }) => {
      this.setState({
        isLoading: false,
        vendorAround: data.data
      }, () => {

      });
    };

    const onFailure = (error) => {
      this.setState({ isLoading: false });
      utils.showResponseError(error);
    };

    this.setState({ isLoading: true });

    let params = {
      latitude: "24.90628280557342",
      longitude: "67.07237028142383",
      limit: 2,

    };
    Axios.get(Constants.getvendorAround, {
      params,
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);


  };


  getTopServices = () => {
    const onSuccess = ({ data }) => {
 
      this.setState({
        isLoading: false,
        topServices: data.data.records
      }, () => {
        

      });
    };

    const onFailure = (error) => {
      this.setState({ isLoading: false });
      utils.showResponseError(error);
    };

    this.setState({ isLoading: true });

    let params = {
      limit: SIZES.ten,
    };
    Axios.get(Constants.getTopSerVices, {
      params,
      headers: { Authorization: this.state.accessToken },
    })
      .then(onSuccess)
      .catch(onFailure);


  };

  toggleIsLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };

  toggleIsQuickServiceModalVisible = () => {
    this.setState({
      isQuickServiceModalVisible: !this.state.isQuickServiceModalVisible,
    });
  };

  toggleIsSelectionModalVisible = () => {
    this.setState({
      isSelectionModalVisible: !this.state.isSelectionModalVisible,
    });
  };

  renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <RegularTextCB style={{ fontSize: 16, color: Colors.sickGreen }}>
            Quick Service
          </RegularTextCB>
          <TouchableOpacity
            onPress={() => {
              this.toggleIsQuickServiceModalVisible();
            }}>
            <Image
              source={Images.iconClose}
              style={{
                height: SIZES.fifteen,
                width: SIZES.fifteen,
                tintColor: Colors.coolGrey,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.textInputContainer, { marginTop: SIZES.ten }]}>
          <RegularTextCB style={{ fontSize: 14, color: Colors.black }}>
            Select Service
          </RegularTextCB>
          <TouchableOpacity
            style={[
              styles.card,
              {
                height: SIZES.ten*6,
                borderRadius: SIZES.ten,
                justifyContent: 'center',
                paddingHorizontal: SIZES.twenty,
                paddingVertical: SIZES.five,
              },
            ]}
            onPress={() => this.toggleIsSelectionModalVisible()}>
            <RegularTextCB style={{ color: Colors.black }}>
              {this.state.service}
            </RegularTextCB>
          </TouchableOpacity>
        </View>
        <View style={[styles.textInputContainer, { marginTop: SIZES.twenty }]}>
          <RegularTextCB style={{ fontSize: 14, color: Colors.black }}>
            Rate Requested
          </RegularTextCB>
          <EditText
            ref={'rate'}
            placeholder={'Enter Rate'}
            value={this.state.rateRequested}
            onChangeText={(text) => {
              this.setState({
                rateRequested: text,
              });
            }}
            style={[styles.textInput]}
          />
        </View>
        <View style={[styles.textInputContainer, { marginTop: SIZES.twenty }]}>
          <RegularTextCB style={{ fontSize: 14, color: Colors.black }}>
            Location
          </RegularTextCB>
          <EditText
            ref={'location'}
            placeholder={'Enter Location'}
            value={this.state.location}
            onChangeText={(text) => {
              this.setState({
                location: text,
              });
            }}
            style={[styles.textInput]}
          />
        </View>
        <View style={[styles.textInputContainer, { marginTop: SIZES.twenty }]}>
          <RegularTextCB style={{ fontSize: 14, color: Colors.black }}>
            Address
          </RegularTextCB>
          <EditText
            ref={'address'}
            placeholder={'Enter Address'}
            value={this.state.address}
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
            style={[styles.textInput]}
          />
        </View>
        <View style={[styles.textInputContainer, { marginTop: SIZES.twenty }]}>
          <RegularTextCB style={{ fontSize: 14, color: Colors.black }}>
            Exact Time
          </RegularTextCB>
          <EditText
            ref={'exact_time'}
            placeholder={'Enter Exact Time'}
            value={this.state.exactTime}
            onChangeText={(text) => {
              this.setState({
                exactTime: text,
              });
            }}
            style={[styles.textInput]}
          />
        </View>
        <View style={{ marginTop: SIZES.ten*3, paddingBottom: SIZES.ten, marginHorizontal: SIZES.ten }}>
          <ButtonRadius10
            bgColor={Colors.sickGreen}
            label="QUICK NOTIFY"
            onPress={() => {
              this.toggleIsQuickServiceModalVisible();
            }}
          />
        </View>
      </View>
    );
  };

  renderSelectionBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <RegularTextCB style={{ fontSize: 16, color: Colors.sickGreen }}>
            Select
          </RegularTextCB>
          <TouchableOpacity
            onPress={() => {
              this.clearSelection();
              this.toggleIsSelectionModalVisible();
            }}>
            <Image
              source={Images.iconClose}
              style={{
                height: SIZES.fifteen,
                width: SIZES.fifteen,
                tintColor: Colors.coolGrey,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ marginTop: SIZES.five }}
          data={this.state.selections}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={this.renderSelectionItem}
          extraData={this.state.selections}
          contentContainerStyle={{
            paddingBottom: SIZES.fifty,
          }}
        />
      </View>
    );
  };

  renderSelectionItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={
          item.isSelected === false
            ? styles.unselectedFilter
            : styles.selectedFilter
        }
        onPress={() => {
          this.handleOnSelectionItemClick(index);
        }}>
        <RegularTextCB
          style={{
            fontSize: 14,
            color: Colors.black,
          }}>
          {item.text}
        </RegularTextCB>
      </TouchableOpacity>
    );
  };

  handleOnSelectionItemClick = (index) => {
    let mSelection = this.state.selections;
    mSelection.forEach((item) => {
      item.isSelected = false;
    });
    mSelection[index].isSelected = true;
    this.setState({ selections: mSelection, service: mSelection[index].text });
    this.toggleIsSelectionModalVisible();
  };

  clearSelection() {
    this.state.selections.forEach((item) => {
      item.isSelected = false;
    });
    this.state.service = 'Select';
  }

  renderCategoryItem = ({ item }) => {

    // console.log('Catagory Item ====',item)
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate(Constants.singleCategory, {
            item: item,
          })
        }
        style={{ alignItems: 'center' }}>
        <Image
          style={styles.circle}
          source={{ uri: Constants.imageURL + item.image }}
        />
        <RegularTextCB
          style={{ fontSize: 14, marginTop: -SIZES.twenty, color: Colors.coolGrey }}>
          {item.name}
        </RegularTextCB>
      </TouchableOpacity>
    );
  };

  renderVendorsAroundYouItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          { padding: SIZES.ten, marginHorizontal: SIZES.fifteen, marginBottom: SIZES.twenty, marginTop: SIZES.five },
        ]}
        onPress={() =>
          this.props.navigation.navigate(Constants.viewVendorProfile,{
                username:item.name,
                  email:item.email,
                  phoneNumber:item.phone,
                  countrycode:item.country_code,
                  location:item.location,
                  avator:item.image
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.circleCard}>
            <Image
              source={{ uri: Constants.imageURL + item.image }}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <RegularTextCB
            style={{
              color: Colors.black,
              textDecorationLine: 'underline',
              marginStart: SIZES.five,
              fontSize: 14,
            }}>
            View Profile
          </RegularTextCB>
        </View>
        <RegularTextCB
          style={{
            color: Colors.black,
            marginTop: SIZES.ten,
            fontSize: 14,
          }}>
          {item.name}
        </RegularTextCB>

        <View style={{ flexDirection: 'row', marginTop: SIZES.five }}>
          <Image
            source={Images.iconVerified}
            style={{ height: SIZES.fifteen, width: SIZES.fifteen, resizeMode: 'contain', tintColor: item.email_verified_at !== null ? Colors.turqoiseGreen : 'red' }}
          />
          <RegularTextCB
            style={{
              color: Colors.turqoiseGreen,
              fontSize: 12,
              marginStart: SIZES.five,
            }}>
            {item.email_verified_at !== null ? "Verified" : "Unverified"}
          </RegularTextCB>
        </View>
        <RegularTextCB
          style={{
            color: Colors.coolGrey,
            marginTop: SIZES.five,
          }}>
          Car Wash
        </RegularTextCB>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={Images.star}
            style={{
              height: SIZES.fifteen,
              width: SIZES.fifteen,
              resizeMode: 'contain',
              tintColor: Colors.orangeYellow,
            }}
          />
          <RegularTextCB
            style={{
              fontSize: 14,
              color: Colors.orangeYellow,
              marginStart: 2,
            }}>
            1.0
          </RegularTextCB>
        </View>
      </TouchableOpacity>
    );
  };

  renderUrgentServicesItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          {
            padding: SIZES.ten,
            paddingBottom: 20,
            marginHorizontal: SIZES.fifteen,
            marginTop: SIZES.five,
            marginBottom: 40,
          },
        ]}
        onPress={() =>
          this.props.navigation.navigate(Constants.viewVendorProfile,{
            username:item.name,
            email:item.email,
            phoneNumber:item.phone,
            countrycode:item.country_code,
            location:item.location,
            avator:item.image
          })}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.circleCard}>
            {/* <Image
              source={{ uri: Constants.imageURL + item.userProfile.imag }}
              style={styles.iconUser}
              resizeMode="cover"
            /> */}
          </View>
          <RegularTextCB
            style={{
              color: Colors.black,
              textDecorationLine: 'underline',
              marginStart: SIZES.five,
              fontSize: 14,
            }}>
            View Profile
          </RegularTextCB>
        </View>
        <RegularTextCB
          style={{
            color: Colors.black,
            marginTop: SIZES.ten,
            fontSize: 14,
          }}>
          {item.name}
        </RegularTextCB>
        <RegularTextCB
          style={{
            color: Colors.coolGrey,
          }}>
          {item.name}
        </RegularTextCB>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={Images.star}
            style={{
              height: SIZES.fifteen,
              width: SIZES.fifteen,
              resizeMode: 'contain',
              tintColor: Colors.orangeYellow,
            }}
          />
          <RegularTextCB
            style={{
              fontSize: 14,
              color: Colors.orangeYellow,
              marginStart: 2,
            }}>
            1.0
          </RegularTextCB>
        </View>
        <Image
          source={Images.circularArrowForward}
          style={{
            height: SIZES.fifty,
            width: SIZES.fifty,
            position: 'absolute',
            bottom: -SIZES.twentyFive,
            alignSelf: 'center',
          }}
        />
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
                paddingHorizontal: SIZES.twenty,
                marginTop: Platform.OS === 'android' ? SIZES.twenty : SIZES.ten*6,
              }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() =>
                  this.props.navigation.navigate(Constants.profile)
                }>
                <View style={styles.circleCard}>
                  <Image
                    source={{ uri: Constants.imageURL + this.state.avatar }}
                    style={styles.iconUser}
                    resizeMode="cover"
                  />
                </View>
                <RegularTextCB style={{ fontSize: 16, marginStart: SIZES.ten }}>
                  Welcome,
                </RegularTextCB>
                <RegularTextCB
                  style={{
                    fontSize: 16,
                    marginStart: 3,
                    color: Colors.sickGreen,
                  }}>
                  {this.state.name}
                </RegularTextCB>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(Constants.filter);
                }}
                style={{
                  position: 'absolute',
                  right: SIZES.twenty,
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
            <TouchableOpacity
              style={{
                marginVertical: SIZES.ten,
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
                style={{ height: SIZES.fifty, width: SIZES.fifty }}
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
                  fontSize: SIZES.twenty,
                  color: Colors.black,
                }}>
                Browse categories
              </RegularTextCB>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(Constants.allCategories)
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
              <RegularTextCB
                style={{
                  fontSize: SIZES.twenty,
                  color: Colors.black,
                }}>
                Vendors Around You
              </RegularTextCB>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(Constants.nearby)
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
              data={this.state.vendorAround}
              keyExtractor={(item) => item.id}
              renderItem={this.renderVendorsAroundYouItem}
              showsHorizontalScrollIndicator={false}
            />
            <RegularTextCB
              style={{ fontSize: SIZES.twenty, marginTop: SIZES.ten, paddingHorizontal: SIZES.twenty }}>
              Top Services
            </RegularTextCB>
            <FlatList
              style={{ paddingBottom:SIZES.ten*10 }}
              numColumns={2}
              data={this.state.topServices}
              keyExtractor={(item) => item.id}
              renderItem={this.renderUrgentServicesItem}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            padding: SIZES.ten,
            backgroundColor: Colors.navy,
            borderRadius: SIZES.ten,
            position: 'absolute',
            bottom: SIZES.fifteen,
            right: SIZES.fifteen,
          }}
          onPress={() => {
            this.toggleIsQuickServiceModalVisible();
          }}>
          <RegularTextCB style={{ color: Colors.white }}>
            Quick Service
          </RegularTextCB>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isQuickServiceModalVisible}
          coverScreen={false}
          style={styles.modal}>
          {this.renderBottomSheetContent()}
        </Modal>
        <Modal
          isVisible={this.state.isSelectionModalVisible}
          coverScreen={false}
          style={styles.modal}>
          {this.renderSelectionBottomSheetContent()}
        </Modal>
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
    marginHorizontal: SIZES.ten,
    height: SIZES.ten*7,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    color: Colors.black1,
  },
  iconUser: {
    height: SIZES.ten*6,
    width: SIZES.ten*6,
    borderRadius: SIZES.ten*6 / 2,
    resizeMode: 'contain',
  },
  circle: {
    height: SIZES.ten*12,
    width: SIZES.ten*12,
    resizeMode: 'stretch',
  },
  circleCard: {
    height: SIZES.ten*6,
    width: SIZES.ten*6,
    borderRadius: SIZES.ten*3,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: SIZES.five, height: SIZES.five },
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
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
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: SIZES.twenty,
    borderTopLeftRadius: SIZES.twenty,
    borderTopRightRadius: SIZES.twenty,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  selectedFilter: {
    alignItems: 'center',
    paddingVertical: SIZES.ten,
    margin: SIZES.five-3,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.sickGreen,
    borderRadius: SIZES.fifteen-3,
  },
  unselectedFilter: {
    alignItems: 'center',
    paddingVertical: SIZES.ten,
    margin: SIZES.five-3,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: SIZES.fifteen-3,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
