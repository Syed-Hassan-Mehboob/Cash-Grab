import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React from 'react';
import {FlatList, ScrollViewBase, StatusBar, Text, Image} from 'react-native';
import {
  Dimensions,
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
import BoldTextCB from '../components/BoldTextCB';
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
    postedJob: [],
    scheduleJobs: [],
    quickJobs: [],
    currentOrder: '',
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
    this.setState({accessToken: token}, () => {
      this.getUserProfile();
      this.getPostedJob();
      this.getScheduleJob();
      this.getQuickJob();
    });
  };

  getUserProfile = () => {
    const onSuccess = ({data}) => {
      // console.log('Profile data ==== ', data.data.records);
      this.setState({
        avatar: data.data.records.user_profiles.image,
        name: data.data.records.name,
        email: data.data.records.email,
        countryCode: data.data.records.country_code,
        countryFlag: data.data.records.country_flag,
        phone: data.data.records.phone,
        location: data.data.records.user_profiles.location,
        abouteMe: data.data.records.user_profiles.about_me,
      });
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
    };

    // this.toggleIsLoading();
    Axios.get(Constants.getProfileURL, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getPostedJob = () => {
    const onSuccess = ({data}) => {
      // console.log('Posted Job Data  ====>>>>>>>>>> ', data.data.records);
      this.setState({
        postedJob: data.data.records,
      });
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
    };

    let params = {
      offset: 0,
      limit: 4,
    };

    // this.toggleIsLoading();
    Axios.get(Constants.getMyJob, {
      params,
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getQuickJobDetails = (id) => {
    const onSuccess = ({data}) => {
      console.log('ssssssss>>>>>>>>>>', data.data.id);
      this.setState({currentOrder: data.data});
      if (data.data.payment_status === 'paid') {
        this.props.navigation.navigate(Constants.QuickJobDetail, {
          orderItem: this.state.currentOrder,
        });
      } else {
        this.props.navigation.navigate(Constants.confirmPayment, {
          orderId: data.data.id,
          from: 'quick',
        });
      }
    };

    const onFailure = (error) => {
      console.log('ssssssss>>>>>>>>>>', error);
    };
    let params = {
      orderId: id,
    };
    Axios.get(Constants.orderDetail, {
      params,
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getScheduleJob = () => {
    const onSuccess = ({data}) => {
      // console.log('Schedule Job Data  ====>>>>>>>>>> ', data.data.records);
      this.setState({
        scheduleJobs: data.data.records,
      });
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
    };

    let params = {
      offset: 0,
      limit: 1,
    };

    // this.toggleIsLoading();
    Axios.get(Constants.scheduleJob, {
      params,
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getQuickJob = () => {
    const onSuccess = ({data}) => {
      // console.log('Quick Job Data  ====>>>>>>>>>> ', data.data.records);

      this.setState({
        quickJobs: data.data.records,
      });
    };

    const onFailure = (error) => {
      utils.showResponseError(error);
    };

    let params = {
      offset: 0,
      limit: 2,
    };

    // this.toggleIsLoading();
    Axios.get(Constants.quickOrder, {
      params,
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  renderPostedJob = ({item}) => {
    console.log('posted Job Item ====== ======>>>>>>>>', item);
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          {
            maxWidth: width * 0.9,
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
        onPress={() => {
          console.log('posted Job Item ====== ======>>>>>>>>', item);
          this.props.navigation.navigate(Constants.JobAcceptance, {
            jobId: item.id,
          });
        }}>
        <View
          style={{
            marginTop: 5,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <LightTextCB style={[FONTS.mediumFont16, {}]}>
              {item.title !== null && item.title !== undefined
                ? item.title
                : null}
            </LightTextCB>

            <LightTextCB style={[{color: Colors.black, fontSize: 14}]}>
              $
              {item.price !== null && item.price !== undefined
                ? item.price
                : ''}
            </LightTextCB>
          </View>

          <View>
            <RegularTextCB
              style={[{color: Colors.sickGreen, marginVertical: SIZES.five}]}>
              {item.service !== null && item.service !== undefined
                ? item.service
                : 'Service'}
            </RegularTextCB>

            <RegularTextCB style={[{color: Colors.lightGrey}]}>
              {item.description !== null && item.description !== undefined
                ? item.description
                : null}
            </RegularTextCB>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.ten,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={Images.iconLocationPin}
              style={{
                height: 17,
                width: 17,
                resizeMode: 'contain',
                marginRight: SIZES.five,
              }}
            />
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                maxWidth: width * 0.75,
                width: width * 0.48,
              }}
              numberOfLines={1}>
              {item.location !== null && item.location !== undefined
                ? item.location
                : ''}
            </RegularTextCB>
          </View>

          <RegularTextCB
            style={{
              color: Colors.lightGrey,
              // width: width * 0.3,
            }}
            numberOfLines={3}>
            {item.created_at !== null && item.created_at !== undefined
              ? moment(item.created_at).format('MMMM Do YYYY')
              : ''}
          </RegularTextCB>
        </View>

        {/* <RegularTextCB
            style={{
              color: Colors.coolGrey,
              // width: width * 0.75,
            }}
            numberOfLines={3}>
            {item.description !== null && item.description !== undefined
              ? item.description
              : ''}
          </RegularTextCB> */}
      </TouchableOpacity>
    );
  };

  renderScheduleJob = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
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
        onPress={() => {
          console.log('Schedule job ====>>>>>>>>>>', item);

          this.props.navigation.navigate(Constants.SchechuleJobDetail, {
            catName: item.category_name,
            joid: item.id,
          });
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.circleCard}>
            <Image
              source={{
                uri:
                  item.vendor_image !== undefined && item.vendor_image !== null
                    ? Constants.imageURL + item.vendor_image
                    : '',
              }}
              style={styles.iconUser}
              resizeMode="contain"
            />
          </View>
          <View style={{marginStart: 10}}>
            <RegularTextCB style={[FONTS.mediumFont16, {color: Colors.black}]}>
              {item.name !== null && item.name !== undefined ? item.name : ''}
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
          <RegularTextCB style={[{color: Colors.sickGreen}]}>
            {item.category_name !== null && item.category_name !== undefined
              ? item.category_name
              : ''}
          </RegularTextCB>

          <LightTextCB style={[{color: Colors.black, fontSize: 14}]}>
            {item.grand_total !== null && item.grand_total !== undefined
              ? `$${item.grand_total}`
              : ''}
          </LightTextCB>
        </View>

        <View style={{marginBottom: SIZES.ten}}>
          <RegularTextCB style={{color: Colors.coolGrey}}>
            {item.description !== null && item.description !== undefined
              ? item.description
              : ''}
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
            {item.location !== null && item.location !== undefined
              ? item.location
              : ''}
          </RegularTextCB>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: SIZES.ten,
            alignItems: 'center',
          }}>
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
              marginVertical: SIZES.five,
            }}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
              }}>
              {item.from_time !== null && item.from_time !== undefined
                ? item.from_time
                : ''}{' '}
              -{' '}
              {item.to_time !== null && item.to_time !== undefined
                ? item.to_time
                : ''}
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
              {item.date !== null && item.date !== undefined ? item.date : ''}
            </RegularTextCB>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  rendeQuickJob = ({item}) => {
    // console.log('Quick Job Item =====>>>>', item);
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          {
            backgroundColor: '#ffff',
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
          // this.props.navigation.navigate(Constants.QuickJobDetail, {
          //   orderItem: item,
          // })
          {
            this.getQuickJobDetails(item.id);
          }
        }>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
            {item.title}
          </RegularTextCB> */}

          <RegularTextCB
            style={[{color: Colors.sickGreen, marginBottom: SIZES.five}]}>
            {item.category_name !== null && item.category_name !== undefined
              ? item.category_name
              : ''}
          </RegularTextCB>

          <LightTextCB style={[{color: Colors.black, fontSize: 14}]}>
            $
            {item.grand_total !== null && item.grand_total !== undefined
              ? item.grand_total
              : ''}
          </LightTextCB>
        </View>
        <View style={{}}>
          <RegularTextCB style={{color: Colors.coolGrey}}>
            {item.description !== null && item.description !== undefined
              ? item.description
              : ''}
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
            {item.location !== null && item.location !== undefined
              ? item.location
              : ''}
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
              {item.from_time !== null && item.from_time !== undefined
                ? item.from_time
                : ''}
            </RegularTextCB>
            <RegularTextCB
              style={[
                {
                  color: Colors.black,
                  fontSize: 14,
                },
              ]}>
              {'View Job'}
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
        {/* <StatusBar backgroundColor={Colors.navy} barStyle="light-content" /> */}
        <View
          style={{
            borderBottomStartRadius: SIZES.ten * 3,
            borderBottomEndRadius: SIZES.ten * 3,
            height: height / 2.6,
            backgroundColor: Colors.navy,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: SIZES.fifteen,
              // marginTop: Platform.OS === 'android' ? 0 : SIZES.ten,
              marginBottom: Platform.OS === 'android' ? 0 : SIZES.twenty,
              //
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
          <View
            style={{
              height: SIZES.ten * 9,
              width: SIZES.ten * 9,
              borderRadius: SIZES.fifteen * 2.85,
              shadowColor: '#c5c5c5',
              shadowOffset: {width: SIZES.five, height: SIZES.five},
              shadowOpacity: 0.15,
              shadowRadius: SIZES.five,
              elevation: SIZES.five,
              marginBottom: SIZES.five,
            }}>
            <Image
              source={{uri: Constants.imageURL + this.state.avatar}}
              style={{
                height: SIZES.ten * 9,
                width: SIZES.ten * 9,
                borderRadius: SIZES.fifteen * 2.85,
              }}
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
          {/* <RegularTextCB
            style={{
              color: Colors.coolGrey,
              fontSize: 16,
              textAlign: 'center',
              marginTop: SIZES.five,
              marginBottom: SIZES.five,
              maxWidth: width * 0.95,
            }}
            numberOfLines={2}>
            {this.state.abouteMe != null
              ? this.state.abouteMe
              : 'Aboute Me is Not Define '}
          </RegularTextCB> */}
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
              {this.state.countryCode + '' + this.state.phone}
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
            marginTop: SIZES.twenty,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: SIZES.twentyFive,
          }}>
          <Text style={[FONTS.mediumFont18, ,]}>Posted Jobs</Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              this.props.navigation.navigate(Constants.PostedJob);
            }}>
            <Text
              style={[FONTS.mediumFont16, {textDecorationLine: 'underline'}]}>
              See all
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.postedJob}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderPostedJob}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: SIZES.twenty,
          }}
          ListEmptyComponent={
            !this.state.isLoading ? (
              <Text style={[FONTS.boldFont18, {flex: 1, alignSelf: 'center'}]}>
                No Record(s)!
              </Text>
            ) : null
          }
        />

        <View
          style={{
            marginVertical: SIZES.ten,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: SIZES.twentyFive,
          }}>
          <Text style={[FONTS.mediumFont18]}>Schedule Jobs</Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              this.props.navigation.navigate(Constants.ScheduleJobs);
            }}>
            <Text
              style={[FONTS.mediumFont16, {textDecorationLine: 'underline'}]}>
              See all
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.scheduleJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderScheduleJob}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: SIZES.twenty,
            paddingBottom: SIZES.fifteen * 1.3,
          }}
          ListEmptyComponent={
            !this.state.isLoading ? (
              <Text style={[FONTS.boldFont18, {flex: 1, alignSelf: 'center'}]}>
                No Record(s)!
              </Text>
            ) : null
          }
        />

        <View
          style={{
            marginVertical: SIZES.ten,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: SIZES.twentyFive,
          }}>
          <Text style={[FONTS.mediumFont18, ,]}>Quick Jobs</Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              this.props.navigation.navigate(Constants.UserQuickJobs);
            }}>
            <Text
              style={[FONTS.mediumFont16, {textDecorationLine: 'underline'}]}>
              See all
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.quickJobs}
          keyExtractor={(item) => item.id.toString()}
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
    height: SIZES.ten * 4.35,
    width: SIZES.ten * 4.35,
    borderRadius: SIZES.fifteen * 2.85,
  },
  circleCard: {
    height: SIZES.ten * 4.35,
    width: SIZES.ten * 4.35,
    borderRadius: SIZES.fifteen * 2.85,
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
    id: 2,
    name: 'Jack',
    title: 'Car Machanic',
    service: 'autoMobile',
    dec: '11',
  },
  {
    id: 3,
    name: 'Jack',
    title: 'Car Machanic',
    service: 'autoMobile',
    dec: '11',
  },
];
