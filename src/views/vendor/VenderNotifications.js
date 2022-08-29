import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {Component} from 'react';
import {Text} from 'react-native';
import {StatusBar} from 'react-native';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {SwipeListView} from 'react-native-swipe-list-view';
import Colors from '../../common/Colors';
import Constants, {FONTS, SIZES, STYLES} from '../../common/Constants';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import Axios from '../../network/APIKit';
import utils from '../../utils';

export default class VenderNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      notifications: [],
    };
  }

  componentDidMount() {
    this.getUserAccessToken();
    this.props.navigation.addListener('focus', () => this.getUserAccessToken());
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => this.getNotifications());
  };

  getBookingDetail = async (orderId) => {
    // alert('booking');
    let token = await AsyncStorage.getItem(Constants.accessToken);
    this.toggleIsLoading();

    const onSuccess = ({data}) => {
      console.log(' Schedule Bookings Detail  =====', data.data);

      if (
        data.data.orderStatus === 'pending' ||
        data.data.orderStatus === 'cancelled'
      ) {
        this.toggleIsLoading();
        this.props.navigation.navigate(Constants.BookingAcceptance, {
          orderId: orderId,
        });
      } else {
        this.toggleIsLoading();
        this.props.navigation.navigate(Constants.JobInProgress, {
          orderId: orderId,
        });
      }
    };

    const onFailure = (error) => {
      this.toggleIsLoading();

      utils.showResponseError(error);
      console.log('==================Error', error);
    };
    let params = {
      orderId: orderId,
    };
    Axios.get(Constants.orderDetail, {
      params: params,
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  getNotifications = () => {
    const onSuccess = ({data}) => {
      this.toggleIsLoading();
      this.setState({notifications: data.data});
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
    };

    this.toggleIsLoading();
    Axios.get(Constants.notificationsURL, {
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
      this.props.navigation.navigate(Constants.ViewQuickJob, {item: id});
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

  renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <this.HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => this.closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  // VALID render notification METHOD

  renderNotificationsItem = ({item}) => {
    // console.log('Notification Item ==== =====', item);

    return (
      <View style={{marginHorizontal: SIZES.fifteen}}>
        <RegularTextCB style={{color: Colors.black, fontSize: 18}}>
          {item.date}
        </RegularTextCB>

        {item.notifications.map((notification) => {
          console.log('notification================>>>>', notification);
          return (
            <View
              key={notification.id}
              style={[
                styles.card,
                {
                  marginVertical: SIZES.ten,
                  borderWidth: item.date === 'Latest' ? 1 : 0,
                },
              ]}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.itemContainer}
                onPress={() => {
                  console.log('=========>>>>>>>>', notification);
                  // For posted job
                  if (
                    notification.message ===
                    'your job request successfully accepted'
                  ) {
                    this.props.navigation.navigate(
                      Constants.MyAcceptedJobDetails,
                      {
                        orderId: notification.trigger_id,
                      },
                    );
                  } else {
                    if (notification.source === 'Booking') {
                      this.getBookingDetail(notification.trigger_id);
                    }

                    if (
                      notification.trigger_type === 'quick_notify' ||
                      notification.trigger_type === 'quick_order_accepted'
                    ) {
                      //For quick job

                      this.getQuickJobDetails(notification.trigger_id);
                      // alert('quick job notification');
                    } else {
                      // this.props.navigation.navigate(Constants.viewJob, {
                      //   item: notification.job_id,
                      // });
                    }
                    // alert('posteb job notification');
                  }

                  // this.props.navigation.navigate(Constants.SchechuleJobDetail, {
                  //   catName: item.category_name,
                  //   joid: item.id,})
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={styles.circleCard}>
                    <Image
                      source={{
                        uri:
                          Constants.imageURL +
                          notification.sender?.user_profiles?.image,
                      }}
                      style={styles.iconUser}
                      resizeMode="cover"
                    />
                  </View>
                  <View
                    style={{
                      marginStart: SIZES.ten,
                      flex: 1,
                      flexShrink: 1,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <RegularTextCB
                        style={{fontSize: 16, color: Colors.black}}>
                        {notification.sender !== null
                          ? notification.sender.name
                          : null}
                      </RegularTextCB>
                      <RegularTextCB style={{fontSize: SIZES.ten * 1.4}}>
                        {moment(notification.created_at).format('hh:mm A')}
                      </RegularTextCB>
                    </View>
                    <RegularTextCB
                      numberOfLines={1}
                      style={{
                        fontSize: 14,
                        color: Colors.coolGrey,
                        marginTop: SIZES.five,
                      }}>
                      {notification.message}
                    </RegularTextCB>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  renderDeleteButton = ({item}) => {
    return (
      <View
        style={{
          borderTopLeftRadius: SIZES.twenty,
          borderBottomLeftRadius: SIZES.twenty,
          backgroundColor: Colors.sickGreen,
          padding: SIZES.twenty,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={Images.iconSwipeToDelete}
          style={{height: SIZES.twenty, width: SIZES.twenty}}
        />
      </View>
    );
  };

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  render() {
    // console.log('Notifications======',this.state.notifications)
    return (
      <View style={[STYLES.container]}>
        {/* <StatusBar barStyle="dark-content" /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: 15,
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
          <RegularTextCB style={{fontSize: 30, alignSelf: 'center'}}>
            Notifications
          </RegularTextCB>
        </View>
        <SwipeListView
          showsVerticalScrollIndicator={false}
          style={{marginTop: SIZES.ten}}
          data={this.state.notifications}
          renderItem={this.renderNotificationsItem}
          contentInset={{
            // for ios
            bottom: SIZES.ten * 10,
          }}
          contentContainerStyle={{
            // for android
            paddingBottom: SIZES.ten * 10,
          }}
          ListEmptyComponent={() => (
            <Text style={[FONTS.boldFont18, {flex: 1, alignSelf: 'center'}]}>
              {!this.state.isLoading && 'No Notification(s)!'}
            </Text>
          )}
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
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  iconFilter: {
    height: SIZES.ten * 3,
    width: SIZES.ten * 3,
    resizeMode: 'contain',
  },
  iconForward: {
    height: SIZES.ten * 10,
    width: SIZES.ten * 10,
    resizeMode: 'contain',
  },
  iconUser: {
    height: SIZES.ten * 3,
    width: SIZES.ten * 3,
    borderRadius: (SIZES.ten * 3) / 2,
    resizeMode: 'contain',
  },
  iconPassword: {
    fontSize: 20,
    height: SIZES.twenty,
    width: SIZES.twenty,
    alignSelf: 'center',
    color: Colors.orange,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: Platform.OS === 'android' ? SIZES.twenty : SIZES.ten * 4,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  itemContainer: {
    padding: SIZES.fifteen,
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
    height: SIZES.fifty - 5,
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
    borderColor: Colors.sickGreen,
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
    height: SIZES.ten * 3,
    width: SIZES.ten * 3,
    borderRadius: SIZES.ten * 3,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: SIZES.five,
    height: SIZES.ten * 6,
    margin: SIZES.five,
    marginBottom: SIZES.fifteen,
    shadowColor: '#999',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.five,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: SIZES.five,
    height: SIZES.ten * 6,
    padding: SIZES.ten,
    marginBottom: SIZES.fifteen,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: SIZES.fifteen,
    margin: SIZES.five,
    marginBottom: SIZES.fifteen,
    borderRadius: SIZES.five,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: SIZES.five,
    height: SIZES.ten * 6,
    margin: SIZES.five,
    marginBottom: SIZES.fifteen,
    shadowColor: '#999',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.five,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: SIZES.five,
    height: SIZES.ten * 6,
    padding: SIZES.ten,
    marginBottom: SIZES.fifteen,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: SIZES.fifteen,
    margin: SIZES.five,
    marginBottom: SIZES.fifteen,
    borderRadius: SIZES.five,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: SIZES.ten * 8,
    paddingRight: SIZES.twenty - 3,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: SIZES.twenty - 3,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: SIZES.five,
    borderBottomRightRadius: SIZES.five,
  },
  trash: {
    height: SIZES.twenty,
    width: SIZES.twentyFive,
    marginRight: SIZES.ten - 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: SIZES.five,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
