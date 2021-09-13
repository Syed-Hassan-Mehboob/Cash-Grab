import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import Colors from '../common/Colors';
import Constants, { SIZES } from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../network/APIKit';
import utils from '../utils';
import Spinner from 'react-native-loading-spinner-overlay';
const {width, height} = Dimensions.get('window');
const SPACING_FOR_CARD_INSET = width * 0.05 - SIZES.ten;

export default class ViewVendorProfile extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      isDescriptionSelected: true, 
      isReviewsSelected: false,
       review: [],
      isLoading: false,
      accessToken: '',
      services:[],
      name:'',
      email:'',
      phone:'',
      ratings:'',
      countryCode:'',
      image:'',
      location:'',
      customer:''

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
    this.setState({ accessToken: token }, () => {
      this.getVenderProfile();
    });

  };

  getVenderProfile = () => {
    // console.log('======', this.props.route.params.item)


    const onSuccess = ({ data }) => {
      console.log('Vender By catagory =======',data);
      this.setState({  
     name:data.data.records.name,email:data.data.records.email,
      phone:data.data.records.phone,
     ratings:data.data.records.ratings,
     year:data.data.records.year,
     image:data.data.records.userProfile.image ,
     location:data.data.records.userProfile.location,
     customer:data.data.records.customer,
     services:data.data.records.services,
     review:data.data.records.comments,
     isLoading: false,
  });
  this.setState({
    isLoading:false
  })
    };

    const onFailure = (error) => {
      this.setState({ isLoading: false });
      utils.showResponseError(error);
    };

    this.setState({ isLoading: true });

    let params = {
      id: this.props.route.params.item,
    };

    Axios.post(Constants.getVenderByCatagory, params,{
     
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };


  renderServicesItem = ({item}) => {
    console.log('Services =========',item)
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            borderRadius: SIZES.fifteen,
            margin: SIZES.five,
            flexDirection: 'row',
            width: width / 2,
            backgroundColor: Colors.white,
            marginBottom: SIZES.twenty,
          },
        ]}
        onPress={() => this.props.navigation.navigate(Constants.dateTimeSlots)}>
        <Image
          source={{uri:Constants.imageURL+item.categories.image}}
          style={{height: SIZES.ten*9, width: SIZES.ten*9, borderRadius: SIZES.fifteen}}
        />
        <View
          style={{
            marginStart: 10,
            flex: 1,
          }}>
          <Image
            source={{uri:Constants.imageURL+item.categories.icon}}
            style={{height: SIZES.twenty, width: 20, justifyContent: 'space-evenly'}}
          />
          <RegularTextCB
            numberOfLines={2}
            style={{
              fontSize: 16,
              color: Colors.black,
            }}>
            {item.categories.name}
          </RegularTextCB>
          <View
            style={{
              flexDirection: 'row',
              flexShrink: 1,
            }}>
            <RegularTextCB
              style={{
                fontSize: 14,
                color: Colors.coolGrey,
                flex:1
              }}>
              {item.price}
            </RegularTextCB>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderReviewsItem = ({item}) => {
    console.log('Item==========',item);
    return (
      <View
        style={{
          marginVertical: SIZES.ten,
          borderBottomWidth: 1,
          borderColor: Colors.pinkishGrey,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: SIZES.ten*6,
              width: SIZES.ten*6,
              borderRadius: SIZES.ten*3,
              shadowColor: '#c5c5c5',
              shadowOffset: {width: SIZES.five, height: SIZES.five},
              shadowOpacity: 1.0,
              shadowRadius: SIZES.ten,
              elevation: SIZES.ten,
            }}>
            <Image
              source={{uri:item.image}}
              style={{height: SIZES.ten*6, width: SIZES.ten*6, borderRadius: SIZES.ten*3}}
            />
          </View>
          <View style={{marginStart: SIZES.ten}}>
            <RegularTextCB style={{fontSize: 16, color: Colors.black}}>
            Name
              {/* {item.user.name} */}
            </RegularTextCB>
            <Image
              source={Images.like}
              style={{
                position: 'absolute',
                right: SIZES.ten*7,
                height: SIZES.twentyFive,
                width: SIZES.twentyFive,
                resizeMode: 'contain',
              }}
            />
            <RegularTextCB
              style={{
                fontSize: 14,
                color: Colors.coolGrey,
                marginTop: SIZES.five,
                width: width - 80,
              }}>
              {item.comments}
            </RegularTextCB>
            <View style={{alignSelf: 'baseline', marginTop: SIZES.five}}>
              <StarRating
                disabled={true}
                maxStars={5}
                fullStar={Images.starFull}
                halfStar={Images.starHalf}
                emptyStar={Images.starHalf}
                starSize={SIZES.fifteen}
                rating={parseInt(item.ratings)}
              />
            </View>
            <RegularTextCB
              style={{
                marginTop: SIZES.five,
                color: Colors.pinkishGrey,
              }}>
              {item.created_at}
            </RegularTextCB>
            <Image
              source={Images.moreDots}
              style={{
                position: 'absolute',
                height: SIZES.twentyFive,
                width: SIZES.twentyFive,
                right: SIZES.ten*7,
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

    // console.log('User Data=============',this.state.userData);

    return (
      <View style={styles.container}>
        <View
          style={{
            borderBottomStartRadius: SIZES.ten*3,
            borderBottomEndRadius: SIZES.ten*3,
            height: height / 2.15,
            backgroundColor: Colors.navy,
            alignItems: 'center',
            position: 'absolute',
            start: 0,
            end: 0,
            top: 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: SIZES.fifteen,
              marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', left: SIZES.ten}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={Images.arrowBack}
                style={[styles.iconBack, {tintColor: Colors.white}]}
              />
            </TouchableOpacity>

            <RegularTextCB style={{fontSize: SIZES.ten*3, color: Colors.white}}>
              Profile
            </RegularTextCB>
            <TouchableOpacity
              style={{position: 'absolute', right: SIZES.ten}}
              onPress={() => {
                this.props.navigation.navigate(Constants.chat);
              }}>
              
              <Image
                source={{uri:Constants.imageURL+this.state.image}}
                style={[styles.iconBack, {tintColor: Colors.white}]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
          style={{marginTop: SIZES.ten*7}}
          showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.circleCard}>
              <Image
                source={{uri:Constants.imageURL+this.state.image}}
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
                style={{height: SIZES.fifteen, width: SIZES.fifteen, resizeMode: 'contain'}}
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
              style={{color: Colors.white, fontSize: 18, marginTop: SIZES.five}}>
              {this.state.name}
            </RegularTextCB>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                textAlign: 'center',
                marginTop: SIZES.five,
              }}>
              Hello there i am a professional car mechanic,{'\n'}I have 8 years
              of experience so feel free{'\n'}to contact me.
            </RegularTextCB>
          </View>
          <View
            style={[
              styles.card,
              {marginHorizontal: SIZES.twenty, marginTop: SIZES.ten*3, padding: SIZES.twenty},
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
                  {this.state.phone}
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
                        height: SIZES.ten*3,
                        width: SIZES.ten*3,
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
                        height: SIZES.ten*3,
                        width: SIZES.ten*3,
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
                       {this.state.ratings} Rating
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
                        height: SIZES.ten*3,
                        width: SIZES.ten*3,
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
                      {console.log('=====',this.state.customer)}
                    </RegularTextCB>
                  </LinearGradient>
                </View>
              </View>
            )}
            {this.state.isReviewsSelected && (
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.review}
                  renderItem={this.renderReviewsItem}
                  keyExtractor={(item) => item.id}
                />
                <View
                  style={[
                    styles.card,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: -SIZES.twenty,
                      paddingHorizontal: SIZES.ten,
                      paddingVertical: SIZES.five,
                    },
                  ]}>
                  <Image
                    source={Images.iconpencil}
                    style={{height: SIZES.twentyFive, width: SIZES.twentyFive}}
                  />
                  <TextInput
                    placeholder={'Write Review'}
                    value={this.state.review}
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({review: text})}
                  />
                  <TouchableOpacity onPress={() => {}}>
                    <Image
                      source={Images.iconSend}
                      style={{height: SIZES.ten*4, width: SIZES.ten*4, resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          {this.state.isDescriptionSelected && (
            <View>
              <View style={{marginTop: SIZES.twentyFive}}>
                <RegularTextCB
                  style={{
                    marginHorizontal: SIZES.twenty,
                    fontSize: 16,
                    color: Colors.black,
                  }}>
                  Services We Offer
                </RegularTextCB>
                <FlatList
                  style={{paddingBottom:SIZES.ten*10}}
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
            
          )
          }
     
        </ScrollView>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFFf',
          fontFamily: Constants.fontRegular,}}
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
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    borderColor: Colors.sickGreen,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    alignItems: 'center',
  },
  iconUser: {
    height: SIZES.ten*9,
    width: SIZES.ten*9,
    borderRadius: SIZES.ten*9 / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height: SIZES.ten*9,
    width: SIZES.ten*9,
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
      date: '03-SIZES.ten-2019',
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
      rating: 'SIZES.five.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...',
    },
  },
];