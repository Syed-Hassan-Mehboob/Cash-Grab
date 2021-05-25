import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import Colors from '../../common/Colors';
import Constants from '../../common/Constants';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';

const {width, height} = Dimensions.get('window');
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

  state = {isDescriptionSelected: true, isReviewsSelected: false, review: ''};

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

  renderServicesItem = ({item}) => {
    return (
      <View
        style={[
          styles.card,
          {
            borderRadius: 15,
            padding: 10,
            margin: 5,
            flexDirection: 'row',
            width: width / 1.75,
            backgroundColor: Colors.white,
            marginBottom: 20,
          },
        ]}>
        <Image
          source={item.image}
          style={{height: 90, width: 90, borderRadius: 15}}
        />
        <View style={{marginStart: 10}}>
          <Image
            source={item.icon}
            style={{height: 20, width: 20, justifyContent: 'space-evenly'}}
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
      </View>
    );
  };

  renderReviewsItem = ({item}) => {
    return (
      <View
        style={{
          marginVertical: 10,
          borderBottomWidth: 1,
          borderColor: Colors.pinkishGrey,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              shadowColor: '#ccc',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.2,
              shadowRadius: 1,
              elevation: 10,
            }}>
            <Image
              source={item.user.image}
              style={{height: 60, width: 60, borderRadius: 30}}
            />
          </View>
          <View style={{marginStart: 10}}>
            <RegularTextCB style={{fontSize: 16, color: Colors.black}}>
              {item.user.name}
            </RegularTextCB>
            <Image
              source={Images.like}
              style={{
                position: 'absolute',
                right: 75,
                height: 25,
                width: 25,
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
            <View style={{alignSelf: 'baseline', marginTop: 5}}>
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
                marginTop: 5,
                color: Colors.pinkishGrey,
              }}>
              {item.review.date}
            </RegularTextCB>
            <Image
              source={Images.moreDots}
              style={{
                position: 'absolute',
                height: 25,
                width: 25,
                right: 75,
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
            borderBottomStartRadius: 30,
            borderBottomEndRadius: 30,
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
              padding: 15,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', left: 10}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={Images.arrowBack}
                style={[styles.iconBack, {tintColor: Colors.white}]}
              />
            </TouchableOpacity>
            <RegularTextCB style={{fontSize: 30, color: Colors.white}}>
              Profile
            </RegularTextCB>
            <TouchableOpacity
              style={{position: 'absolute', right: 10}}
              onPress={() => {
                this.props.navigation.navigate(Constants.vendorEditProfile);
              }}>
              <Image
                source={Images.iconEdit}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={{marginTop: 75}}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.circleCard}>
              <Image source={Images.emp1} style={styles.iconUser} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Image
                source={Images.iconVerified}
                style={{height: 15, width: 15, resizeMode: 'contain'}}
              />
              <RegularTextCB
                style={{
                  color: Colors.turqoiseGreen,
                  fontSize: 14,
                  marginStart: 5,
                }}>
                Verified
              </RegularTextCB>
            </View>
            <RegularTextCB
              style={{color: Colors.white, fontSize: 18, marginTop: 5}}>
              Damian Santosa
            </RegularTextCB>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                textAlign: 'center',
                marginTop: 5,
              }}>
              Hello there i am a professional car mechanic,{'\n'}I have 8 years
              of experience so feel free{'\n'}to contact me.
            </RegularTextCB>
          </View>
          <View
            style={[
              styles.card,
              {marginHorizontal: 20, marginTop: 30, padding: 20},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                justifyContent: 'space-around',
                marginTop: -40,
              }}>
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    width: '40%',
                    paddingVertical: 10,
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
                    paddingVertical: 10,
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
                    paddingVertical: 10,
                  }}>
                  <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
                    User Name
                  </RegularTextCB>
                  <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
                    Damian Santosa
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical: 10,
                  }}>
                  <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
                    Email Address
                  </RegularTextCB>
                  <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
                    damian@gmail.com
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical: 10,
                  }}>
                  <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
                    Email Address
                  </RegularTextCB>
                  <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
                    +1(239) 555-01089
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical: 10,
                  }}>
                  <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
                    Location
                  </RegularTextCB>
                  <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
                    New York, USA
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <LinearGradient
                    colors={[Colors.lightGold, Colors.orange]}
                    style={[
                      styles.card,
                      {
                        padding: 10,
                        borderRadius: 20,
                        width: '30%',
                        alignItems: 'center',
                      },
                    ]}>
                    <Image
                      source={Images.flag}
                      style={{
                        height: 30,
                        width: 30,
                        tintColor: Colors.white,
                        resizeMode: 'contain',
                      }}
                    />
                    <RegularTextCB
                      style={{
                        color: Colors.white,
                        marginTop: 10,
                        textAlign: 'center',
                        fontSize: 12,
                      }}>
                      8 Years
                    </RegularTextCB>
                  </LinearGradient>
                  <LinearGradient
                    colors={[Colors.pinky, Colors.barbiePink]}
                    style={[
                      styles.card,
                      {
                        padding: 10,
                        borderRadius: 20,
                        width: '30%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Image
                      source={Images.star}
                      style={{
                        height: 30,
                        width: 30,
                        tintColor: Colors.white,
                        resizeMode: 'contain',
                      }}
                    />
                    <RegularTextCB
                      style={{
                        color: Colors.white,
                        marginTop: 10,
                        textAlign: 'center',
                        fontSize: 12,
                      }}>
                      4.9 Rating
                    </RegularTextCB>
                  </LinearGradient>
                  <LinearGradient
                    colors={[Colors.darkSkyBlue, Colors.turquoiseBlue]}
                    style={[
                      styles.card,
                      {
                        padding: 10,
                        borderRadius: 20,
                        width: '30%',
                        alignItems: 'center',
                      },
                    ]}>
                    <Image
                      source={Images.client}
                      style={{
                        height: 30,
                        width: 30,
                        tintColor: Colors.white,
                        resizeMode: 'contain',
                      }}
                    />
                    <RegularTextCB
                      style={{
                        color: Colors.white,
                        marginTop: 10,
                        textAlign: 'center',
                        fontSize: 12,
                      }}>
                      350 Client
                    </RegularTextCB>
                  </LinearGradient>
                </View>
              </View>
            )}
            {this.state.isReviewsSelected && (
              <View>
                <FlatList
                  style={{paddingBottom: 50}}
                  showsVerticalScrollIndicator={false}
                  data={this.reviews}
                  renderItem={this.renderReviewsItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
            )}
          </View>
          {this.state.isDescriptionSelected && (
            <View>
              <View style={{marginTop: 25}}>
                <RegularTextCB
                  style={{
                    marginHorizontal: 20,
                    fontSize: 16,
                    color: Colors.black,
                  }}>
                  Services We Offer
                </RegularTextCB>
                <FlatList
                  style={{paddingBottom: 100}}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.services}
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
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.sickGreen,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    alignItems: 'center',
  },
  iconUser: {
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height: 90,
    width: 90,
    borderRadius: 45,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    marginHorizontal: 10,
    height: 50,
    fontFamily: Constants.fontRegular,
    color: Colors.black,
  },
});
