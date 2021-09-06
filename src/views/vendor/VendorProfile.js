import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import StarRating from 'react-native-star-rating';
import Colors from '../../common/Colors';
import Constants, { SIZES } from '../../common/Constants';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import Axios from '../../network/APIKit';
import utils from '../../utils';

const { width, height } = Dimensions.get('window');
const SPACING_FOR_CARD_INSET = width * 0.05 - 10;

export default class VendorProfile extends React.Component {
  services = [
    {
      id: '1',
      image: Images.iconUserCleaning,
      icon: Images.iconCleaning1,
      name: 'Cleaning',
      desc: 'Car indoor & outdoor cleaning',
    },
    {
      id: '2',
      image: Images.iconUserRepairing,
      icon: Images.iconRepairing,
      name: 'Repairing',
      desc: '3 AC split units maintenance',
    },
    {
      id: '3',
      image: Images.iconUserCleaning,
      icon: Images.iconCleaning1,
      name: 'Cleaning',
      desc: 'Car indoor & outdoor cleaning',
    },
    {
      id: '4',
      image: Images.iconUserRepairing,
      icon: Images.iconRepairing,
      name: 'Repairing',
      desc: '3 AC split units maintenance',
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
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...',
      },
    },
    {
      id: '2',
      user: {
        name: 'Jordan',
        image: Images.emp2,
      },
      review: {
        date: '03-10-2019',
        rating: '4.0',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...',
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
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...',
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
        rating: '5.',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...',
      },
    },
  ];

  constructor(props) {
    super(props);
  }
  state = {
    isLoading: false,
    isDescriptionSelected: true,
    isReviewsSelected: false,
    review: '',
    accessToken: '',
    avatar: '',
    name:'',
    email: '',
    countryCode: '',
    phone: '',
    location: '',
    image:'',
    rating:'',
    year:'',
    customer:'',
    services:[],
    review:[]
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getUserAccessToken();
    });
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

  toggleIsLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };

  getUserAccessToken = async () => {
  const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({ accessToken: token }, () => this.getUserProfile());
  };

  getUserProfile = () => {
    const onSuccess = ({ data }) => {
      console.log('Vender Profile =========',data.data.records);
      this.toggleIsLoading();
      this.setState({
        avatar:Constants.imageURL+data.data.records.userProfile.image,
        name: data.data.records.name,
        email: data.data.records.email,
        countryCode: data.data.records.country_code,
        phone: data.data.records.phone,
        location: data.data.records.userProfile.location,
        rating:data.data.records.ratings,
        year:data.data.records.year,
        services:data.data.records.services,
        review:data.data.records.comments,
        customer:data.data.records.customer

      });
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
    };



    this.toggleIsLoading();
    Axios.get(Constants.getProfileURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  renderServicesItem = ({ item }) => {
    console.log('Services=============',item)
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            borderRadius:SIZES.fifteen,
            padding: SIZES.ten,
            margin:SIZES.five,
            flexDirection: 'row',
            width: width / 2,
            height:SIZES.ten*7,
            backgroundColor: Colors.white,
            marginBottom:SIZES.twenty,
          },
        ]} activeOpacity={0.6} >
        <Image
          source={item.image}
          style={{ height:SIZES.ten*9, width:SIZES.ten*9, borderRadius:SIZES.fifteen }}
        />
        <View style={{ marginStart:SIZES.ten }}>
          <Image
            source={item.icon}
            style={{ height:SIZES.twenty, width:SIZES.twenty, justifyContent: 'space-evenly' }}
          />
          <RegularTextCB
            numberOfLines={2}
            style={{
              fontSize: 16,
              color: Colors.black,
            }}>
            {item.name}
          </RegularTextCB>
          <RegularTextCB
            style={{
              fontSize: 14,
              color: Colors.coolGrey,
              width: width / 1.75 - 100,
            }}>
            {item.desc}
          </RegularTextCB>
        </View>
      </TouchableOpacity>
    );
  };

  renderReviewsItem = ({ item }) => {

    console.log('Reviews ====================',item)
    return (
      <View
        style={{
          marginVertical:SIZES.ten,
          borderBottomWidth: 1,
          borderColor: Colors.pinkishGrey,
        }}>
        <View style={{ flexDirection: 'row',paddingHorizontal:SIZES.ten}}>
          <View
            style={{
              height:SIZES.ten*6,
              width:SIZES.ten*9,
              borderRadius:SIZES.ten*3,
              // shadowColor: '#c5c5c5',
              // shadowOffset: { width:10, height:5 },
              // elevation:10,
            }}>
            <Image
              source={item.user.image}
              style={{ height:SIZES.ten*6, width:SIZES.ten*6, borderRadius:SIZES.ten*3 }}
            />
          </View>
          <View style={{ marginStart:SIZES.ten }}>
            <RegularTextCB style={{ fontSize: 16, color: Colors.black }}>
              {item.user.name}
            </RegularTextCB>
            <Image
              source={Images.like}
              style={{
                position: 'absolute',
                right:SIZES.ten*11,
                height: SIZES.twentyFive,
                width: SIZES.twentyFive,
                resizeMode: 'contain',
                
              }}
            />
            <RegularTextCB
              style={{
                fontSize: 14,
                color: Colors.coolGrey,
                marginTop: 5, 
                width: width - 80,
              }}>
              {item.review.text}
            </RegularTextCB>
            <View style={{ alignSelf: 'baseline', marginTop:SIZES.five }}>
              <StarRating
                disabled={true}
                maxStars={5}
                fullStar={Images.starFull}
                halfStar={Images.starHalf}
                emptyStar={Images.starHalf}
                starSize={15}
                rating={parseInt(item.review.rating)}
              />
            </View>
            <RegularTextCB
              style={{
                marginTop:SIZES.five,
                color: Colors.pinkishGrey,
              }}>
              {item.review.date}
            </RegularTextCB>
            <Image
              source={Images.moreDots}
              style={{
                position: 'absolute',
                height:SIZES.twentyFive,
                width:SIZES.twentyFive,
                right:SIZES.ten*11,
                bottom: 0,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      </View>
    );
  };



  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            borderBottomStartRadius:SIZES.ten*3,
            borderBottomEndRadius:SIZES.ten*3,
            height: height / 2.15,
            backgroundColor: Colors.navy,
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            start: 0,
            end: 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding:SIZES.fifteen,
              marginTop: Platform.OS === 'android' ? 0 :SIZES.twenty,
            }}>
            <RegularTextCB style={{ fontSize: 30, color: Colors.white }}>
              Profile
            </RegularTextCB>
            <TouchableOpacity
              style={{ position: 'absolute', right:SIZES.ten }}
              onPress={() => {
                this.props.navigation.navigate(Constants.vendorEditProfile,{
                  avatar: this.state.avatar,
                  name: this.state.name,
                  email: this.state.email,
                  countryCode: this.state.countryCode,
                  phone: this.state.phone,
                  location:this.state.location,
                   });
              }}>
              <Image
                source={Images.iconEdit}
                style={{
                  height:SIZES.twenty,
                  width:SIZES.twenty,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ marginTop:SIZES.ten*8 }}
          showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.circleCard}>
              <Image
                source={{ uri:this.state.avatar}}
                style={styles.iconUser}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop:SIZES.five,
              }}>
              <Image
                source={Images.iconVerified}
                style={{ height:SIZES.fifteen, width:SIZES.fifteen, resizeMode: 'contain' }}
              />
              <RegularTextCB
                style={{
                  color: Colors.turqoiseGreen,
                  fontSize: 14,
                  marginStart:SIZES.five,
                }}>
                Verified
              </RegularTextCB>
            </View>
            <RegularTextCB
              style={{ color: Colors.white, fontSize: 18, marginTop: SIZES.five }}>
              {this.state.name}
            </RegularTextCB>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                textAlign: 'center',
                marginTop:SIZES.five,
              }}>
              Hello there i am a professional car mechanic,{'\n'}I have 8 years
              of experience so feel free{'\n'}to contact me.
            </RegularTextCB>
          </View>
          <View
            style={[
              styles.card,
              { marginHorizontal: SIZES.twenty, marginTop: SIZES.ten*3, padding: SIZES.twenty },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                justifyContent: 'space-around',
                marginTop: -SIZES.ten*4,
              }}>
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    width: '40%',
                    paddingVertical:SIZES.ten,
                    borderWidth: this.state.isDescriptionSelected ? 2 : 0,
                    borderColor: Colors.sickGreen,
                  },
                ]}
                onPress={() => this.selectIsDescriptionSelected()}>
                <RegularTextCB style={{ color: Colors.black, fontSize: 16 }}>
                  Description
                </RegularTextCB>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    width: '40%',
                    paddingVertical:SIZES.ten,
                    borderWidth: this.state.isReviewsSelected ? 2 : 0,
                    borderColor: Colors.sickGreen,
                  },
                ]}
                onPress={() => this.selectIsReviewsSelected()}>
                <RegularTextCB style={{ color: Colors.black, fontSize: 16 }}>
                  Reviews
                </RegularTextCB>
              </TouchableOpacity>
            </View>
            {this.state.isDescriptionSelected && (
              <View style={{ width: '100%' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical:SIZES.ten,
                  }}>
                  <RegularTextCB style={{ color: Colors.coolGrey, fontSize: 16 }}>
                    User Name
                  </RegularTextCB>
                  <RegularTextCB style={{ color: Colors.black, fontSize: 16 }}>
                  {this.state.name}
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical:SIZES.ten,
                  }}>
                  <RegularTextCB style={{ color: Colors.coolGrey, fontSize: 16 }}>
                    Email Address
                  </RegularTextCB>
                  <RegularTextCB style={{ color: Colors.black, fontSize: 16 }}>
                    {this.state.email}
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical:SIZES.ten,
                  }}>
                  <RegularTextCB style={{ color: Colors.coolGrey, fontSize: 16 }}>
                    Phone No.
                  </RegularTextCB>
                  <RegularTextCB style={{ color: Colors.black, fontSize: 16 }}>
                     {this.state.countryCode}  {this.state.phone}
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical:SIZES.ten,
                  }}>
                  <RegularTextCB style={{ color: Colors.coolGrey, fontSize: 16 }}>
                    Location
                  </RegularTextCB>
                  <RegularTextCB style={{ color: Colors.black, fontSize: 16 }}>
                    {this.state.location}
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    marginTop:SIZES.ten,
                    justifyContent: 'space-between',
                  }}>
                  <LinearGradient
                    colors={[Colors.lightGold, Colors.orange]}
                    style={[
                      styles.card,
                      {
                        padding: SIZES.ten,
                        borderRadius:SIZES.twenty,
                        width: '30%',
                        alignItems: 'center',
                      },
                    ]}>
                    <Image
                      source={Images.flag}
                      style={{
                        height:SIZES.ten*3,
                        width:SIZES.ten*3,
                        tintColor: Colors.white,
                        resizeMode: 'contain',
                      }}
                    />
                    <RegularTextCB
                      style={{
                        color: Colors.white,
                        marginTop:SIZES.ten,
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
                        padding:SIZES.ten,
                        borderRadius:SIZES.twenty,
                        width: '30%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Image
                      source={Images.star}
                      style={{
                        height:SIZES.ten*3,
                        width: SIZES.ten*3,
                        tintColor: Colors.white,
                        resizeMode: 'contain',
                      }}
                    />
                    <RegularTextCB
                      style={{
                        color: Colors.white,
                        marginTop:SIZES.ten,
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
                        padding:SIZES.ten,
                        borderRadius:SIZES.twenty,
                        width: '30%',
                        alignItems: 'center',
                      },
                    ]}>
                    <Image
                      source={Images.client}
                      style={{
                        height:SIZES.ten*3,
                        width:SIZES.ten*3,
                        tintColor: Colors.white,
                        resizeMode: 'contain',
                      }}
                    />
                    <RegularTextCB
                      style={{
                        color: Colors.white,
                        marginTop:SIZES.ten,
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
              <View>
              {console.log('this reviews ======',this.state.review)}
                <FlatList
                  style={{ paddingBottom:SIZES.fifty }}
                  showsVerticalScrollIndicator={false}
                  data={this.state.review}
                  renderItem={this.renderReviewsItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
            )}
          </View>
          {this.state.isDescriptionSelected && (
            <View>
              <View style={{ marginTop:SIZES.twentyFive }}>
                <RegularTextCB
                  style={{
                    marginHorizontal:SIZES.twenty,
                    fontSize: 16,
                    color: Colors.black,
                  }}>
                  Services We Offer
                </RegularTextCB>
                <FlatList
                  style={{ paddingBottom:SIZES.ten*10 }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.state.services}
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
            </View>
          )}
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
  iconBack: {
    height:SIZES.twenty,
    width:SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius:SIZES.ten,
    borderColor: Colors.sickGreen,
    shadowColor: '#c5c5c5',
    shadowOffset: { width:SIZES.five, height:SIZES.five },
    shadowOpacity: 0.5,
    elevation:SIZES.ten,
    alignItems: 'center',
  },
  iconUser: {
    height:SIZES.ten*9,
    width:SIZES.ten*9,
    borderRadius: SIZES.ten*9 / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height:SIZES.ten*9,
    width:SIZES.ten*9,
    borderRadius:SIZES.fifty,
    shadowColor: '#c5c5c5',
    shadowOffset: { width:SIZES.five, height:SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius:5,
    elevation:SIZES.five,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    marginHorizontal:SIZES.ten,
    height:SIZES.fifty,
    fontFamily: Constants.fontRegular,
    color: Colors.black,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
