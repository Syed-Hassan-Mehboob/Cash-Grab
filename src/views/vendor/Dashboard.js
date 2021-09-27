import React, {Component} from 'react';
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
import Colors from '../../common/Colors';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import LightTextCB from '../../components/LightTextCB';
import ButtonRadius10 from '../../components/ButtonRadius10';
import BoldTextCB from '../../components/BoldTextCB';
import Constants, {SIZES, FONTS, STYLES} from '../../common/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from '../../network/APIKit';
import utils from '../../utils';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      accessToken: '',
      completeJob: [],
      withDraw: {},
      progress: [],
      name: '',
      title: '',
      price: '',
      description: '',
      location: '',
      time: '',
      image: '',
      verfiyAt: '',
    };
  }
  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.getUserAccessToken();
    this.props.navigation.addListener('focus', () => {
      this.getUserAccessToken();
    });
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token});
    this.getCompleteJob();
  };

  getCompleteJob = () => {
    this.setState({isLoading: true});

    const onSuccess = ({data}) => {
      console.log('Complete job vvv======= ', data.data.withdraw);

      this.setState({
        completeJob: data?.data.completed,
        progress: data.data.progress,
        withDraw: data?.data.withdraw,
        // name:data?.data.progress.user.name,
        // title:data?.data.progress.title,
        // price:data?.data.progress.price,
        // description:data?.data.progress.description,
        // time:data?.data.progress.time,
        // image:data?.data.progress.user.userProfile.image,
        // location:data?.data.progress.location,
        // verfiyAt:data?.data.progress.user.email_verified_at
      });

      this.setState({isLoading: false});
    };

    const onFailure = (error) => {
      this.setState({isLoading: false});
      utils.showResponseError(error);
    };

    this.setState({isLoading: true});
    Axios.get(Constants.getCompleteJob, {
      headers: {
        Authorization: this.state.accessToken,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  rendercompletedJobsItem = ({item}) => {
    console.log('COmplete job item   =========', item);

    return (
      <View
        style={[
          styles.card,
          {
            padding: SIZES.fifteen,
            marginHorizontal: SIZES.five,
            marginBottom: SIZES.twenty,
            marginTop: SIZES.five,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.circleCard}>
            <Image
              source={{uri: Constants.imageURL + item.user.userProfile.image}}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View style={{marginStart: SIZES.ten}}>
            <RegularTextCB
              style={{
                color: Colors.black,
                fontSize: 16,
              }}>
              {item.user.name}
            </RegularTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.five,
                alignItems: 'center',
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
                  fontSize: 12,
                  marginStart: SIZES.five,
                }}>
                {item.user.email_verified_at !== null
                  ? 'Verified'
                  : 'Unverified'}
              </RegularTextCB>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.five,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <RegularTextCB
            style={{
              color: Colors.black,
              fontSize: 16,
            }}>
            {item.title}
          </RegularTextCB>
          <LightTextCB
            style={{
              color: Colors.black,
              fontSize: 12,
            }}>
            ${item.price}
          </LightTextCB>
        </View>
        {/* <RegularTextCB
          style={{
            color: Colors.sickGreen,
            fontSize: 12,
          }}>
          {item.type}
        </RegularTextCB> */}
        <RegularTextCB
          style={{
            color: Colors.coolGrey,
          }}>
          {item.description}
        </RegularTextCB>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.five,
            alignItems: 'center',
          }}>
          <Image
            source={Images.iconLocationPin}
            style={{
              height: SIZES.fifteen + 2,
              width: SIZES.fifteen + 2,
              resizeMode: 'contain',
            }}
          />
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
              marginStart: SIZES.five,
            }}>
            {item.location}
          </RegularTextCB>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.five,
            alignItems: 'center',
          }}>
          <Image
            source={Images.iconStopWatch}
            style={{
              height: SIZES.fifteen + 2,
              width: SIZES.fifteen + 2,
              resizeMode: 'contain',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginStart: SIZES.five,
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
      </View>
    );
  };

  renderProgressJob = ({item}) => {
    console.log('Progress Job ======= ,', item);

    return (
      <View
        style={[
          styles.card,
          {
            padding: SIZES.fifteen,
            marginHorizontal: SIZES.five,
            marginBottom: SIZES.five,
            marginTop: SIZES.five,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.circleCard}>
            <Image
              source={{uri: Constants.imageURL + item.user.userProfile.image}}
              style={styles.iconUser}
              resizeMode="cover"
            />
          </View>
          <View style={{marginStart: SIZES.ten}}>
            <RegularTextCB
              style={{
                color: Colors.black,
                fontSize: 16,
              }}>
              {item.user.name}
            </RegularTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.five,
                alignItems: 'center',
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
                  fontSize: 12,
                  marginStart: SIZES.five,
                }}>
                {item.user.email_verified_at !== null
                  ? 'Verified'
                  : 'Unverified'}
              </RegularTextCB>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.five,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <RegularTextCB
            style={{
              color: Colors.black,
              fontSize: 16,
            }}>
            {item.title}
          </RegularTextCB>
          <LightTextCB
            style={{
              color: Colors.black,
              fontSize: 12,
            }}>
            ${item.price}
          </LightTextCB>
        </View>
        {/* <RegularTextCB
          style={{
            color: Colors.sickGreen,
            fontSize: 12,
          }}>
          {this.completedJobs[0].type}
        </RegularTextCB> */}
        <RegularTextCB
          style={{
            color: Colors.coolGrey,
          }}>
          {item.description}
        </RegularTextCB>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.five,
            alignItems: 'center',
          }}>
          <Image
            source={Images.iconLocationPin}
            style={{
              height: SIZES.fifteen + 2,
              width: SIZES.fifteen + 2,
              resizeMode: 'contain',
            }}
          />
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
              marginStart: SIZES.five,
            }}>
            {item.location}
          </RegularTextCB>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.five,
            alignItems: 'center',
          }}>
          <Image
            source={Images.iconStopWatch}
            style={{
              height: SIZES.fifteen + 2,
              width: SIZES.fifteen + 2,
              resizeMode: 'contain',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginStart: SIZES.five,
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
      </View>
    );
  };

  render() {
    // console.log('render data ====== ',this.state.completeJob)

    return (
      <View style={STYLES.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: SIZES.ten * 2,
            marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
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
              style={[styles.iconBack, {tintColor: Colors.black1}]}
            />
          </TouchableOpacity>

          <RegularTextCB style={[FONTS.boldFont24, {color: Colors.black}]}>
            Dashboard
          </RegularTextCB>

          <TouchableOpacity
            style={{position: 'absolute', right: SIZES.ten}}
            onPress={() => {
              this.props.navigation.navigate(Constants.withDraw);
            }}>
            <Image
              source={Images.iconWithDraw}
              style={{height: SIZES.ten * 4, width: SIZES.ten * 4}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: SIZES.ten, marginHorizontal: SIZES.fifteen}}>
            <RegularTextCB
              style={{
                fontSize: SIZES.twenty,
                color: Colors.black,
              }}>
              Quick Job
            </RegularTextCB>
            {/* <View style={{ marginTop: SIZES.ten }}>
              <ButtonRadius10
                label="1 Job available in your location"
                bgColor={Colors.sickGreen}
                onPress={() => {
                  // this.props.navigation.navigate(Constants.viewJob);
                }}
              />

            </View> */}
          </View>
          <View
            style={{
              marginTop: SIZES.twenty,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <RegularTextCB style={{fontSize: SIZES.twenty}}>
              Total Earnings:
            </RegularTextCB>
            <RegularTextCB
              style={{
                fontSize: SIZES.twenty,
                marginStart: SIZES.five,
                color: Colors.sickGreen,
              }}>
              {this.state.withDraw.total}
            </RegularTextCB>
          </View>

          <View
            style={{marginTop: SIZES.fifteen, marginHorizontal: SIZES.fifteen}}>
            <RegularTextCB
              style={{
                fontSize: SIZES.twenty,
                color: Colors.black,
              }}>
              Order In Progress
            </RegularTextCB>
            <FlatList
              data={this.state.progress}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={this.renderProgressJob}
            />
          </View>
          <View
            style={{marginTop: SIZES.fifteen, marginHorizontal: SIZES.fifteen}}>
            <RegularTextCB
              style={{
                fontSize: SIZES.twenty,
                color: Colors.black,
              }}>
              Completed Order
            </RegularTextCB>
            <FlatList
              style={{paddingBottom: SIZES.ten * 10}}
              data={this.state.completeJob}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={this.rendercompletedJobsItem}
            />
          </View>
        </ScrollView>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={{color: '#FFFf', fontFamily: Constants.fontRegular}}
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
  quickJobCard: {
    flexDirection: 'row',
    height: SIZES.fifty,
    borderColor: Colors.sickGreen,
    borderWidth: 1.5,
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    paddingHorizontal: SIZES.fifteen,
    paddingVertical: SIZES.five,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  circleCard: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: SIZES.ten * 3,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.5,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  iconUser: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: (SIZES.ten * 6) / 2,
    resizeMode: 'contain',
  },
});
