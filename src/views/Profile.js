import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {FlatList, ScrollViewBase, StatusBar, Text} from 'react-native';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../common/Colors';
import Constants, {FONTS, SIZES} from '../common/Constants';
import Images from '../common/Images';
import ListComponent from '../components/ListComponent';
import RegularTextCB from '../components/RegularTextCB';
import Axios from '../network/APIKit';
import utils from '../utils';
import LightTextCB from './../components/LightTextCB';

const {width, height} = Dimensions.get('window');

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isLoading: false,
    accessToken: '',
    avatar: '',
    name: '',
    email: '',
    countryCode: '',
    countryFlag: '',
    phone: '',
    location: '',
    abouteMe: '',
  };

  componentDidMount() {
    this.getUserAccessToken();
    this.props.navigation.addListener('focus', () => {
      this.getUserAccessToken();
    });
  }

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => this.getUserProfile());
  };

  getUserProfile = () => {
    const onSuccess = ({data}) => {
      console.log('Profile data ==== ', data.data.records);
      this.toggleIsLoading();
      this.setState({
        avatar: data.data.records.userProfile.image,
        name: data.data.records.name,
        email: data.data.records.email,
        countryCode: data.data.records.country_code,
        countryFlag: data.data.records.country_flag,
        phone: data.data.records.phone,
        location: data.data.records.userProfile.location,
        abouteMe: data.data.records.userProfile.about_me,
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

  renderPostedJob = ({item}) => {
    // //console.log('Job Around data ======',item)
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          {
            backgroundColor: '#fff',
            padding: SIZES.twenty,
            marginHorizontal: SIZES.ten,
            borderRadius: SIZES.ten * 2,
            shadowColor: '#c5c5c5',
            shadowOffset: {width: 5, height: 5},
            shadowOpacity: 1.0,
            shadowRadius: 10,
            elevation: 10,
          },
        ]}
        onPress={() => {}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.circleCard}>
            <Image
              source={{
                uri: 'https://media.istockphoto.com/photos/portrait-concept-picture-id1016761216?k=20&m=1016761216&s=612x612&w=0&h=jEC8voGLjSyhdOO7EMQyrLtZ9m--TEUmd4X56sqyZk0=',
              }}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View style={{marginStart: 10}}>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {/* {item.user.name} */} Ray Hammond
            </RegularTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <Image
                source={Images.iconVerified}
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  tintColor: Colors.turqoiseGreen,
                }}
              />
              <RegularTextCB
                style={{
                  color: Colors.turqoiseGreen,

                  fontSize: 12,
                  marginStart: 5,
                }}>
                {/* {item.email_verified_at !== null ? 'Verified' : 'Unverified'} */}
                Verified
              </RegularTextCB>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
            {/* {item.title} */}
            Car Mechanic Needed
          </RegularTextCB>

          <LightTextCB style={{color: Colors.black, fontSize: 12}}>
            {/* ${item.price} */}
            $280.00
          </LightTextCB>
        </View>
        <LightTextCB style={{color: Colors.sickGreen, fontSize: 12}}>
          Automobile
        </LightTextCB>

        <RegularTextCB
          style={{color: Colors.coolGrey, flex: 1}}
          numberOfLines={3}>
          Looking for a car mechanic that can look into{'\n'}
          the battery setup. The car is in a still position {'\n'}& would
          require some man power
        </RegularTextCB>
      </TouchableOpacity>
    );
  };
  renderScheduleJob = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          {
            padding: SIZES.twenty,
            backgroundColor: '#fff',
            borderRadius: SIZES.ten * 2,
            shadowColor: '#c5c5c5',
            shadowOffset: {width: 5, height: 5},
            shadowOpacity: 1.0,
            shadowRadius: 10,
            elevation: 10,
            marginTop: SIZES.ten,
          },
        ]}
        onPress={() =>
          this.props.navigation.navigate(Constants.SchechuleJobDetail)
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.circleCard}>
            <Image
              source={{
                uri: 'https://media.istockphoto.com/photos/portrait-concept-picture-id1016761216?k=20&m=1016761216&s=612x612&w=0&h=jEC8voGLjSyhdOO7EMQyrLtZ9m--TEUmd4X56sqyZk0=',
              }}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View style={{marginStart: 10}}>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {/* {item.user.name} */} $250.00
            </RegularTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <Image
                source={Images.iconVerified}
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  tintColor: Colors.turqoiseGreen,
                }}
              />
              <RegularTextCB
                style={{
                  color: Colors.turqoiseGreen,
                  fontSize: 12,
                  marginStart: 5,
                }}>
                Verified
              </RegularTextCB>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
            {/* {item.title} */} Electrician Needed
          </RegularTextCB>

          <LightTextCB style={{color: Colors.black, fontSize: 12}}>
            {/* ${item.price} */}$250.00
          </LightTextCB>
        </View>
        <LightTextCB style={{color: Colors.sickGreen, fontSize: 12}}>
          {/* ${item.price} */}Electrician
        </LightTextCB>

        <View style={{}}>
          <RegularTextCB style={{color: Colors.coolGrey}}>
            Looking for a car mechanic that can look into the battery setup. The
            car is in a still position & would require some man power
          </RegularTextCB>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Image
            source={Images.iconLocationPin}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
          />
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
              marginStart: 5,
            }}>
            {/* {item.address} */}111,NYC Street, NY 1121
          </RegularTextCB>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Image
            source={Images.iconStopWatch}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
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
              {/* {item.time} */} 12:00 - 3:00
            </RegularTextCB>
          </View>
        </View>

        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Image
            source={Images.calender}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
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
              {/* {item.time} */} September 17, 2021
            </RegularTextCB>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  rendeQuickJob = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          {
            backgroundColor: '#fff',
            borderRadius: SIZES.ten * 2,
            shadowColor: '#c5c5c5',
            shadowOffset: {width: 5, height: 5},
            shadowOpacity: 1.0,
            shadowRadius: 10,
            elevation: 10,
            padding: SIZES.fifteen,
            marginHorizontal: SIZES.five / 1.3,
            marginVertical: SIZES.five * 1.5,
          },
        ]}
        onPress={() =>
          this.props.navigation.navigate(Constants.ServiceProviderOnTheWay)
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.circleCard}>
            <Image
              source={{
                uri: 'https://media.istockphoto.com/photos/portrait-concept-picture-id1016761216?k=20&m=1016761216&s=612x612&w=0&h=jEC8voGLjSyhdOO7EMQyrLtZ9m--TEUmd4X56sqyZk0=',
              }}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View style={{marginStart: 10}}>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {/* {item.user.name} */}Ray Hammond
            </RegularTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <Image
                source={Images.iconVerified}
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  tintColor: Colors.turqoiseGreen,
                }}
              />
              <RegularTextCB
                style={{
                  color: Colors.turqoiseGreen,

                  fontSize: 12,
                  marginStart: 5,
                }}>
                Verified
              </RegularTextCB>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
            {/* {item.title} */}Car Mechanic Needed
          </RegularTextCB>

          <LightTextCB style={{color: Colors.black, fontSize: 12}}>
            {/* ${item.price} */}$240.00
          </LightTextCB>
        </View>
        <LightTextCB style={{color: Colors.sickGreen, fontSize: 12}}>
          {/* ${item.price} */}Electrician
        </LightTextCB>
        <View style={{}}>
          <RegularTextCB style={{color: Colors.coolGrey}}>
            Looking for a car mechanic that can look into the battery setup. The
            car is in a still position & would require some man power
          </RegularTextCB>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Image
            source={Images.iconLocationPin}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
          />
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
              marginStart: 5,
            }}>
            {/* {item.address} */}111,NYC Street, NY 1121
          </RegularTextCB>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <Image
            source={Images.iconStopWatch}
            style={{height: 17, width: 17, resizeMode: 'contain'}}
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
              {/* {item.time} */}12:00 - 3:00
            </RegularTextCB>
            <RegularTextCB style={[FONTS.boldFont18, {color: Colors.black}]}>
              {'View Job >'}
            </RegularTextCB>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: SIZES.twenty}}>
        <StatusBar backgroundColor={Colors.navy} barStyle="light-content" />

        <View
          style={{
            borderBottomStartRadius: SIZES.ten * 3,
            borderBottomEndRadius: SIZES.ten * 3,
            height: height / 2.15,
            backgroundColor: Colors.navy,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: 15,
              marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
              marginBottom: Platform.OS === 'android' ? 0 : SIZES.twenty,
              // backgroundColor: 'red',
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
            <RegularTextCB style={{fontSize: 30, color: Colors.white}}>
              Profile
            </RegularTextCB>
            <TouchableOpacity
              style={{position: 'absolute', right: SIZES.ten}}
              onPress={() => {
                this.props.navigation.navigate(Constants.editProfile);
              }}>
              <Image
                source={Images.iconEdit}
                style={{
                  height: SIZES.twenty,
                  width: SIZES.twenty,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.circleCard}>
            <Image
              source={{uri: Constants.imageURL + this.state.avatar}}
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
            style={{color: Colors.white, fontSize: 18, marginTop: SIZES.five}}>
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
              marginTop: -SIZES.twenty,
              padding: SIZES.twenty,
            },
          ]}>
          <View
            style={[
              styles.card,
              {
                marginTop: -SIZES.ten * 4,
                paddingVertical: SIZES.ten,
                paddingHorizontal: SIZES.twenty,
                borderWidth: 1,
                borderColor: Colors.sickGreen,
              },
            ]}>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              Description
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
              Phone No.
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              {this.state.countryCode.concat('', this.state.phone)}
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
        </View>
        <View
          style={{
            paddingVertical: SIZES.ten,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.twenty,
          }}>
          <Text style={[FONTS.boldFont20, ,]}>Posted Jobs</Text>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              this.props.navigation.navigate(Constants.PostedJob);
            }}>
            <Text
              style={[FONTS.mediumFont16, {textDecorationLine: 'underline'}]}>
              see all
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={Data}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={this.renderPostedJob}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: SIZES.twenty,
          }}
        />

        <View
          style={{
            paddingVertical: SIZES.ten,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.twenty,
          }}>
          <Text style={[FONTS.boldFont20, ,]}>Schedule Jobs</Text>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              this.props.navigation.navigate(Constants.ScheduleJobs);
            }}>
            <Text
              style={[FONTS.mediumFont16, {textDecorationLine: 'underline'}]}>
              see all
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={Data}
          keyExtractor={(item) => item.id}
          renderItem={this.renderScheduleJob}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: SIZES.twenty,
            paddingBottom: SIZES.ten,
          }}
        />

        <View
          style={{
            paddingVertical: SIZES.ten,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.twenty,
          }}>
          <Text style={[FONTS.boldFont20, ,]}>Quick Jobs</Text>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              this.props.navigation.navigate(Constants.UserQuickJobs);
            }}>
            <Text
              style={[FONTS.mediumFont16, {textDecorationLine: 'underline'}]}>
              see all
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={Data}
          keyExtractor={(item) => item.id}
          renderItem={this.rendeQuickJob}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: SIZES.twenty,
            paddingBottom: SIZES.ten,
          }}
        />

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
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    padding: SIZES.twenty,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.5,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    alignItems: 'center',
  },
  iconUser: {
    height: SIZES.ten * 9,
    width: SIZES.ten * 9,
    borderRadius: 45,
    resizeMode: 'contain',
  },
  circleCard: {
    height: SIZES.ten * 9,
    width: SIZES.ten * 9,
    borderRadius: 45,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});

const Data = [
  {
    id: 1,
    name: 'Jack',
    title: 'Car Machanic',
    service: 'autoMobile',
    dec: '11',
  },
  {
    id: 1,
    name: 'Jack',
    title: 'Car Machanic',
    service: 'autoMobile',
    dec: '11',
  },
  {
    id: 1,
    name: 'Jack',
    title: 'Car Machanic',
    service: 'autoMobile',
    dec: '11',
  },
];
