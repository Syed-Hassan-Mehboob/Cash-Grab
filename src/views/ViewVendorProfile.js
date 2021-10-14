import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import Colors from '../common/Colors';
import Constants, {FONTS, SIZES, STYLES} from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../network/APIKit';
import utils from '../utils';
import Spinner from 'react-native-loading-spinner-overlay';
import {Icon, Text} from 'native-base';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
const SPACING_FOR_CARD_INSET = width * 0.05 - SIZES.ten;

export default class ViewVendorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isDescriptionSelected: true,
      isReviewsSelected: false,
      review: '',
      accessToken: '',
      userId: '',
      avatar: '',
      name: '',
      email: '',
      countryCode: '',
      countryFlag: '',
      phone: '',
      location: '',
      image: '',
      rating: '',
      year: '',
      customer: '',
      interests: [],
      categories: [],
      services: [],
      review: [],
      abouteMe: '',
    };
  }

  componentDidMount() {
    this.getUserAccessToken();
  }

  selectIsDescriptionSelected = () => {
    this.setState({
      isDescriptionSelected: true,
      isReviewsSelected: false,
    });
  };

  selectIsReviewsSelected = () => {
    this.setState({
      isDescriptionSelected: false,
      isReviewsSelected: true,
    });
  };

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => {
      this.getVenderProfile();
    });
  };

  toggleIsLoading = () => {
    this.setState({isLoading: false});
  };

  getVenderProfile = () => {
    // //console.log('======', this.props.route.params.item)

    const onSuccess = ({data}) => {
      //console.log('Vender By catagory =======', data.data.records);

      this.toggleIsLoading();
      let tempCats = [];
      if (data.data.records && data.data.records.category)
        data.data.records.category.map((item, index) => {
          if (index === 0) {
            tempCats.push({...item, isSelected: true});
          } else {
            tempCats.push({...item, isSelected: false});
          }
        });
      this.setState({
        avatar: Constants.imageURL + data.data.records.user_profiles.image,
        name: data.data.records.name,
        email: data.data.records.email,
        countryCode: data.data.records.country_code,
        countryFlag: data.data.records.country_flag,
        phone: data.data.records.phone,
        location: data.data.records.user_profiles.location,
        rating: data.data.records.ratings,
        year: data.data.records.year,
        interests: data.data.records.interest,
        review: data.data.records.reviews,
        customer: data.data.records.customers,
        abuteMe: data.data.records.user_profiles.about_me,
        categories: tempCats,
      });
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    // this.setState({isLoading: true});

    let params = {
      id: this.props.route.params.item,
    };

    Axios.post(Constants.getVenderByCatagory, params, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getServicesOfCategory = (id, isFirstTime) => {
    const onSuccess = ({data}) => {
      if (!isFirstTime) {
        this.toggleIsLoading();
      }
      this.setState({services: data.data});
    };

    const onFailure = (error) => {
      if (!isFirstTime) {
        this.toggleIsLoading();
      }
      utils.showResponseError(error);
    };

    if (!isFirstTime) {
      this.toggleIsLoading();
    }
    Axios.get(Constants.getServicesOfVendorURL, {
      params: {
        category_id: id,
        vendor_id: this.state.userId,
      },
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  renderServicePrice = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: SIZES.twenty,
        }}>
        <Text style={[FONTS.mediumFont16]}>{item.name}</Text>
        <Text style={[FONTS.boldFont14]}>$ {item.price}</Text>
      </View>
    );
  };

  renderServicesItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          let temp = this.state.categories;
          temp.map((tItem) => {
            if (tItem.id !== item.id) tItem.isSelected = false;
            else tItem.isSelected = true;
          });
          this.setState({categories: temp});
          this.getServicesOfCategory(item.id, false);
        }}>
        <LinearGradient
          style={[
            styles.card,
            {
              paddingVertical: SIZES.ten,
              paddingHorizontal: SIZES.fifteen,
              alignItems: 'center',
              marginVertical: SIZES.ten,
              marginLeft: SIZES.ten,
            },
          ]}
          colors={
            item.isSelected
              ? [Colors.sand, Colors.sickGreen]
              : [Colors.lightGold, Colors.orange]
          }>
          <RegularTextCB
            style={{
              fontSize: 16,
              color: Colors.white,
            }}>
            {item.name}
          </RegularTextCB>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  onInterestPress = (id, type) => {
    let newArray = this.state.interests.map((val, i) => {
      if (id === val.id) {
        return {...val, isSlected: type};
      } else {
        return val;
      }
    });
    this.setState({interests: newArray});
  };

  rendorInterest = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          {
            paddingVertical: SIZES.ten * 1,
            paddingHorizontal: SIZES.ten * 3,
            backgroundColor: Colors.white,
            borderRadius: SIZES.ten,
            margin: SIZES.ten,
            borderWidth: 1,
            borderColor: item.isSlected ? Colors.sickGreen : Colors.white,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 16.0,

            elevation: 5,
          },
        ]}
        activeOpacity={0.6}
        onPress={() => {
          // this.onInterestPress(item.id, !item.isSlected)
        }}>
        <Text
          style={[
            FONTS.mediumFont16,
            {
              color: Colors.black,
            },
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  renderReviewsItem = ({item}) => {
    let date = moment(item.created_at).format('MMMM Do YYYY');
    return (
      <View
        style={{
          marginVertical: SIZES.ten,
          borderBottomWidth: 1,
          borderColor: Colors.pinkishGrey,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.ten,
          }}>
          <View
            style={{
              height: SIZES.ten * 6,
              width: SIZES.ten * 9,
              borderRadius: SIZES.ten * 3,
            }}>
            <Image
              source={{
                uri: Constants.imageURL + item.customer.user_profiles.image,
              }}
              style={{
                height: SIZES.ten * 6,
                width: SIZES.ten * 6,
                borderRadius: SIZES.ten * 3,
              }}
            />
          </View>
          <View style={{marginStart: SIZES.ten}}>
            <RegularTextCB style={{fontSize: 16, color: Colors.black}}>
              {item.customer.name === null ? 'Undefined' : item.customer.name}
            </RegularTextCB>
            {/* <Image
              source={Images.like}
              style={{
                position: 'absolute',
                right: SIZES.ten * 11,
                height: SIZES.twentyFive,
                width: SIZES.twentyFive,
                resizeMode: 'contain',
              }}
            /> */}
            <RegularTextCB
              style={{
                fontSize: 14,
                color: Colors.coolGrey,
                marginTop: 5,
                width: width - 80,
              }}>
              {item.comments === null ? 'Undefine' : item.comments}
            </RegularTextCB>
            <View style={{alignSelf: 'baseline', marginTop: SIZES.five}}>
              <StarRating
                disabled={true}
                maxStars={5}
                fullStar={Images.starFull}
                halfStar={Images.starHalf}
                emptyStar={Images.starHalf}
                starSize={15}
                rating={parseInt(item.rating)}
              />
            </View>
            <RegularTextCB
              style={{
                marginTop: SIZES.five,
                color: Colors.pinkishGrey,
              }}>
              {date === null ? 'Undefined' : date}
            </RegularTextCB>
            {/* <Image
              source={Images.moreDots}
              style={{
                position: 'absolute',
                height: SIZES.twentyFive,
                width: SIZES.twentyFive,
                right: SIZES.ten * 11,
                bottom: 0,
                resizeMode: 'contain',
              }}
            /> */}
          </View>
        </View>
      </View>
    );
  };

  render() {
    // //console.log('User Data=============',this.state.userData);

    return (
      <ScrollView style={STYLES.container} showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={Colors.navy} barStyle="light-content" />
        <View
          style={{
            borderBottomStartRadius: SIZES.ten * 3,
            borderBottomEndRadius: SIZES.ten * 3,
            height: height / 2.12,
            backgroundColor: Colors.navy,
            alignItems: 'center',
            position: 'absolute',
            start: 0,
            end: 0,
            top: Platform.OS === 'android' ? 0 : -SIZES.twenty * 3.5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: SIZES.fifteen,
              marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty * 3,
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: SIZES.ten,
                width: SIZES.fifteen,
                height: SIZES.fifteen,
              }}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={Images.arrowBack}
                style={[styles.iconBack, {tintColor: Colors.white}]}
              />
            </TouchableOpacity>

            <RegularTextCB
              style={{fontSize: SIZES.ten * 3, color: Colors.white}}>
              Profile
            </RegularTextCB>

            {/* <TouchableOpacity
              style={{
                position: 'absolute',
                right: SIZES.ten,
                height: SIZES.twentyFive * 1.3,
                width: SIZES.twentyFive * 1.3,
                borderRadius: SIZES.twentyFive,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: Colors.grey,
                backgroundColor: Colors.sickGreen,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                this.props.navigation.navigate(Constants.chat);
              }}>
              <Icon
                type="MaterialIcons"
                name="chat"
                style={{color: Colors.white, fontSize: SIZES.fifteen * 1.5}}
              />
              <Image
                source={{uri: Constants.imageURL + this.state.image}}
                style={[styles.iconBack]}
                resizeMode={'cover'}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        <View
          contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
          style={{marginTop: SIZES.ten * 7}}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.circleCard}>
              <Image
                source={{uri: this.state.avatar}}
                style={styles.iconUser}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: SIZES.five,
              }}>
              <Image
                source={Images.iconVerified}
                style={{
                  height: SIZES.fifteen,
                  width: SIZES.fifteen,
                  resizeMode: 'contain',
                }}
              />
              <RegularTextCB
                style={{
                  color: Colors.turqoiseGreen,
                  fontSize: 14,
                  marginStart: SIZES.five,
                }}>
                Verified
              </RegularTextCB>
            </View>
            <RegularTextCB
              style={{
                color: Colors.white,
                fontSize: 18,
                marginTop: SIZES.five,
              }}>
              {this.state.name}
            </RegularTextCB>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                textAlign: 'center',
                marginTop: SIZES.five,
              }}
              numberOfLines={2}>
              {this.state.abouteMe != null
                ? this.state.abouteMe
                : 'Aboute Me is Not Define '}
            </RegularTextCB>
          </View>
          <View
            style={[
              styles.card,
              {
                marginHorizontal: SIZES.twenty,
                marginTop: SIZES.ten * 5,
                padding: SIZES.twenty,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                justifyContent: 'space-around',
                marginTop: -SIZES.ten * 3,
              }}>
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    width: '40%',
                    paddingVertical: SIZES.ten,
                    borderWidth: this.state.isDescriptionSelected ? 2 : 0,
                    borderColor: Colors.sickGreen,
                  },
                ]}
                onPress={() => this.selectIsDescriptionSelected()}>
                <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
                  Description
                </RegularTextCB>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    width: '40%',
                    paddingVertical: SIZES.ten,
                    borderWidth: this.state.isReviewsSelected ? 2 : 0,
                    borderColor: Colors.sickGreen,
                  },
                ]}
                onPress={() => this.selectIsReviewsSelected()}>
                <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
                  Reviews
                </RegularTextCB>
              </TouchableOpacity>
            </View>
            {this.state.isDescriptionSelected && (
              <View style={{width: '100%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical: SIZES.ten,
                  }}>
                  <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
                    User Name
                  </RegularTextCB>
                  <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
                    {this.state.name}
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical: SIZES.ten,
                  }}>
                  <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
                    Email Address
                  </RegularTextCB>
                  <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
                    {this.state.email}
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical: SIZES.ten,
                  }}>
                  <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
                    Phone Number
                  </RegularTextCB>
                  <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
                    {this.state.countryCode} {this.state.phone}
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical: SIZES.ten,
                  }}>
                  <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
                    Location
                  </RegularTextCB>
                  <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
                    {this.state.location}
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: SIZES.ten,
                    justifyContent: 'space-between',
                  }}>
                  <LinearGradient
                    colors={[Colors.lightGold, Colors.orange]}
                    style={[
                      styles.card,
                      {
                        padding: SIZES.ten,
                        borderRadius: SIZES.twenty,
                        width: '30%',
                        alignItems: 'center',
                      },
                    ]}>
                    <Image
                      source={Images.flag}
                      style={{
                        height: SIZES.ten * 3,
                        width: SIZES.ten * 3,
                        tintColor: Colors.white,
                        resizeMode: 'contain',
                      }}
                    />
                    <RegularTextCB
                      style={{
                        color: Colors.white,
                        marginTop: SIZES.ten,
                        textAlign: 'center',
                        fontSize: 12,
                      }}>
                      {this.state.year} Years
                    </RegularTextCB>
                  </LinearGradient>
                  <LinearGradient
                    colors={[Colors.pinky, Colors.barbiePink]}
                    style={[
                      styles.card,
                      {
                        padding: SIZES.ten,
                        borderRadius: SIZES.twenty,
                        width: '30%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Image
                      source={Images.star}
                      style={{
                        height: SIZES.ten * 3,
                        width: SIZES.ten * 3,
                        tintColor: Colors.white,
                        resizeMode: 'contain',
                      }}
                    />
                    <RegularTextCB
                      style={{
                        color: Colors.white,
                        marginTop: SIZES.ten,
                        textAlign: 'center',
                        fontSize: 12,
                      }}>
                      {this.state.rating} Rating
                    </RegularTextCB>
                  </LinearGradient>
                  <LinearGradient
                    colors={[Colors.darkSkyBlue, Colors.turquoiseBlue]}
                    style={[
                      styles.card,
                      {
                        padding: SIZES.ten,
                        borderRadius: SIZES.twenty,
                        width: '30%',
                        alignItems: 'center',
                      },
                    ]}>
                    <Image
                      source={Images.client}
                      style={{
                        height: SIZES.ten * 3,
                        width: SIZES.ten * 3,
                        tintColor: Colors.white,
                        resizeMode: 'contain',
                      }}
                    />
                    <RegularTextCB
                      style={{
                        color: Colors.white,
                        marginTop: SIZES.ten,
                        textAlign: 'center',
                        fontSize: 12,
                      }}>
                      {this.state.customer} Client
                    </RegularTextCB>
                  </LinearGradient>
                </View>
              </View>
            )}
            {this.state.isReviewsSelected && (
              <View style={{marginTop: SIZES.ten}}>
                <FlatList
                  style={{paddingBottom: SIZES.fifty}}
                  showsVerticalScrollIndicator={false}
                  data={this.state.review}
                  renderItem={this.renderReviewsItem}
                  // contentContainerStyle={{backgroundColor: 'red'}}
                  keyExtractor={(item) => item.id}
                  ListEmptyComponent={() => (
                    <Text
                      style={[
                        FONTS.boldFont18,
                        {
                          flex: 1,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          marginTop: SIZES.twenty,
                        },
                      ]}>
                      No Review(s)!
                    </Text>
                  )}
                />
              </View>
            )}
          </View>
          {this.state.isDescriptionSelected && (
            <View>
              <View style={{marginTop: SIZES.twentyFive}}>
                <Text
                  style={[
                    FONTS.mediumFont16,
                    {
                      marginHorizontal: SIZES.twenty,
                      color: Colors.black,
                      marginVertical: SIZES.twenty,
                    },
                  ]}>
                  Interest
                </Text>

                <FlatList
                  horizontal
                  data={this.state.interests}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={this.rendorInterest}
                  showsHorizontalScrollIndicator={false}
                  contentInset={{
                    // for ios
                    top: 0,
                    bottom: SPACING_FOR_CARD_INSET,
                    left: SPACING_FOR_CARD_INSET,
                    right: SPACING_FOR_CARD_INSET,
                  }}
                  contentContainerStyle={{
                    // for android
                    paddingHorizontal:
                      Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
                    paddingBottom:
                      Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
                  }}
                />
              </View>
              <View style={{marginTop: SIZES.twentyFive}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: SIZES.twenty,
                  }}>
                  <RegularTextCB
                    style={{
                      fontSize: 16,
                      color: Colors.black,
                    }}>
                    Services We Offer
                  </RegularTextCB>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() =>
                      this.props.navigation.navigate(Constants.SelectServices)
                    }>
                    <Text
                      style={[
                        FONTS.boldFont16,
                        {textDecorationLine: 'underline'},
                      ]}>
                      Book Now ?
                    </Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  // style={{paddingBottom: SIZES.ten * 10}}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  overScrollMode="never"
                  data={this.state.categories}
                  renderItem={this.renderServicesItem}
                  keyExtractor={(item) => item.id}
                  contentInset={{
                    // for ios
                    top: 0,
                    bottom: SPACING_FOR_CARD_INSET,
                    left: SPACING_FOR_CARD_INSET,
                    right: SPACING_FOR_CARD_INSET,
                  }}
                  contentContainerStyle={{
                    // for android
                    paddingHorizontal:
                      Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
                    paddingBottom:
                      Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
                  }}
                />
              </View>

              <FlatList
                style={{paddingBottom: SIZES.ten * 10}}
                showsVerticalScrollIndicator={false}
                data={services}
                renderItem={this.renderServicePrice}
                keyExtractor={(item) => item.id}
                contentInset={{
                  // for ios
                  top: 0,
                  bottom: SPACING_FOR_CARD_INSET,
                  left: SPACING_FOR_CARD_INSET,
                  right: SPACING_FOR_CARD_INSET,
                }}
                contentContainerStyle={{
                  // backgroundColor: 'red',
                  paddingHorizontal: SIZES.twenty,
                }}
              />
            </View>
          )}
        </View>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={{color: '#FFFf', fontFamily: Constants.fontRegular}}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  iconBack: {
    height: '100%',
    width: '100%',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    borderColor: Colors.sickGreen,
    // width:'100%',
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    alignItems: 'center',
  },
  iconUser: {
    height: SIZES.ten * 9,
    width: SIZES.ten * 9,
    borderRadius: (SIZES.ten * 9) / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height: SIZES.ten * 9,
    width: SIZES.ten * 9,
    borderRadius: SIZES.fifty,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    marginHorizontal: SIZES.ten,
    height: SIZES.fifty,
    fontFamily: Constants.fontRegular,
    color: Colors.black,
  },
});

const services = [
  {
    id: '1',
    name: 'House Cleaning',
    price: '$240.00',
  },
  {
    id: '2',
    name: 'Garage Cleaning',
    price: '$550.00',
  },
  {
    id: '3',
    name: 'Gardern Cleaning',
    price: '$240.00',
  },
];
reviews = [
  {
    id: '1',
    user: {
      name: 'Peachey',
      image: Images.emp1,
    },
    review: {
      date: '05-12-2020',
      rating: '4.4',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...',
    },
  },
  {
    id: '2',
    user: {
      name: 'Jordan',
      image: Images.emp2,
    },
    review: {
      date: '03-SIZES.ten-2019',
      rating: '4.0',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...',
    },
  },
  {
    id: '3',
    user: {
      name: 'Smith',
      image: Images.emp3,
    },
    review: {
      date: '15-11-2020',
      rating: '3.4',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...',
    },
  },
  {
    id: '4',
    user: {
      name: 'Sean',
      image: Images.emp4,
    },
    review: {
      date: '18-01-2021',
      rating: 'SIZES.five.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...',
    },
  },
];

const DummyData = [
  {
    id: 1,
    name: 'Gaming',
    isSlected: false,
  },
  {
    id: 2,
    name: 'Planting',
    isSlected: false,
  },
  {
    id: 3,
    name: 'Bike Riding',
    isSlected: false,
  },
  {
    id: 4,
    name: 'Photography',
    isSlected: false,
  },
  {
    id: 5,
    name: 'Peotry',
    isSlected: false,
  },
];
