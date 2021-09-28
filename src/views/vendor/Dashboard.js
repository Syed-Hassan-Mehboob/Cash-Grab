import React, {Component} from 'react';
import {
  FlatList,
  Image,
  LogBox,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import Colors from '../../common/Colors';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import LightTextCB from '../../components/LightTextCB';
import ButtonRadius10 from '../../components/ButtonRadius10';
import BoldTextCB from '../../components/BoldTextCB';
import Constants, {SIZES, FONTS, STYLES, width} from '../../common/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Axios from '../../network/APIKit';
import utils from '../../utils';
import {Easing} from 'react-native-reanimated';

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
      selectedMonth: {},
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
            <BoldTextCB
              style={{
                color: Colors.black,
                fontSize: 16,
              }}>
              {item.user.name}
            </BoldTextCB>
            <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.five,
                alignItems: 'center',
              }}>
              <Image
                source={Images.iconVerified}
                style={{
                  height: SIZES.fifteen * 1.5,
                  width: SIZES.fifteen * 1.5,
                }}
                resizeMode="contain"
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
          <RegularTextCB
            style={{
              color: Colors.black,
              fontSize: 14,
            }}>
            ${item.price}
          </RegularTextCB>
        </View>
        {/* <View
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
        </View> */}
        {/* <View
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
        </View> */}
        <Text style={[FONTS.mediumFont12, {color: Colors.sickGreen}]}>
          Automobile
        </Text>
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

  barLabel = (labelText) => {
    return (
      <View>
        <Text style={[FONTS.mediumFont12, {color: Colors.barBg}]}>
          {labelText}
        </Text>
      </View>
    );
  };

  data = [
    {
      value: 70,
      label: 'Jan',
      labelTextStyle: [
        FONTS.mediumFont14,
        {
          color: Colors.coolGrey,
        },
      ],
      frontColor: Colors.sickGreen,
      topLabel: 's',
      onPress: (value) => {
        this.setState({selectedMonth: this.data[0]});
        console.log(
          'this.data[0][value]========================>',
          this.data[0]['value'],
        );
      },
    },
    {
      value: 50,
      label: 'Feb',
      labelTextStyle: [
        FONTS.mediumFont14,
        {
          color: Colors.coolGrey,
        },
      ],
      frontColor: Colors.sickGreen,
      onPress: (value) => {
        this.setState({selectedMonth: this.data[1]});
        console.log(
          'this.data[0][value]========================>',
          this.data[1]['value'],
        );
      },
    },
    {
      value: 90,
      label: 'Mar',
      labelTextStyle: [
        FONTS.mediumFont14,
        {
          color: Colors.black,
        },
      ],
      frontColor: Colors.sickGreen,
      onPress: (value) => {
        this.setState({selectedMonth: this.data[2]});
        console.log(
          'this.data[0][value]========================>',
          this.data[2]['value'],
        );
      },
    },
    {
      label: 'Apr',
      value: 60,
      labelTextStyle: [
        FONTS.mediumFont14,
        {
          color: Colors.coolGrey,
        },
      ],
      frontColor: Colors.sickGreen,
      onPress: (value) => {
        this.setState({selectedMonth: this.data[3]});
        console.log(
          'this.data[0][value]========================>',
          this.data[3]['value'],
        );
      },
    },
    {
      label: 'May',
      value: 20,
      labelTextStyle: [
        FONTS.mediumFont14,
        {
          color: Colors.coolGrey,
        },
      ],
      frontColor: Colors.sickGreen,
      onPress: (value) => {
        this.setState({selectedMonth: this.data[4]});
        console.log(
          'this.data[0][value]========================>',
          this.data[4]['value'],
        );
      },
    },
  ];

  render() {
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
            <View
              style={{
                // marginTop: SIZES.ten,
                borderColor: Colors.sickGreen,
                borderWidth: 1.1,
                borderRadius: SIZES.ten,
                marginVertical: SIZES.twenty,
              }}>
              <View
                style={[
                  styles.card,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: SIZES.twenty,
                    paddingVertical: SIZES.fifteen * 1.2,
                    borderRadius: SIZES.ten,
                  },
                ]}>
                <RegularTextCB>1 Job Available in your location</RegularTextCB>
                <Image
                  source={Images.iconDrawerBell}
                  style={{
                    height: SIZES.twenty * 1.3,
                    width: SIZES.twenty * 1.3,
                    tintColor: Colors.coolGrey,
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          <View style={{}}>
            <View
              style={{
                marginTop: SIZES.fifteen,
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: SIZES.fifteen,
              }}>
              <RegularTextCB style={{fontSize: SIZES.twenty}}>
                Total Earnings
              </RegularTextCB>
              <BoldTextCB
                style={{
                  fontSize: SIZES.twenty * 1.2,
                  marginStart: SIZES.five,
                  color: Colors.black1,
                }}>
                ${this.state.withDraw.total}
              </BoldTextCB>
            </View>
            <View
              style={{
                marginTop: SIZES.fifteen,
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: SIZES.fifteen,
              }}>
              <RegularTextCB style={{fontSize: SIZES.twenty}}>
                {`Monthly Earnings (${
                  this.state.selectedMonth.label === undefined
                    ? ''
                    : this.state.selectedMonth.label
                })`}
              </RegularTextCB>
              <BoldTextCB
                style={{
                  fontSize: SIZES.twenty * 1.2,
                  marginStart: SIZES.five,
                  color: Colors.black1,
                }}>
                ${this.state.selectedMonth.value}
              </BoldTextCB>
            </View>

            <BarChart
              data={this.data}
              barWidth={SIZES.twenty * 3.1}
              hideRules={true}
              activeOpacity={0.7}
              animationEasing={Easing.cubic}
              showYAxisIndices={false}
              hideYAxisText
              yAxisIndicesColor={'transparent'}
              barBorderRadius={SIZES.five * 1.8}
              intactTopLabel={50}
              xAxisThickness={0}
              yAxisThickness={0}
              initialSpacing={10}
            />
            {/* <TouchableGraph
              onPressBar={(data) => {
                console.log(data);
              }}
              onPressTickAxis={(data) => {
                console.log(data);
              }}>
              <VictoryChart>
                <VictoryAxis crossAxis orientation="left" />
                <VictoryAxis dependentAxis crossAxis orientation="bottom" />
                <VictoryBar data={data} />
                <VictoryArea data={data} />
              </VictoryChart>
            </TouchableGraph> */}
          </View>

          {/* <View
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
          </View> */}
          <View style={{marginTop: SIZES.ten, marginHorizontal: SIZES.fifteen}}>
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
