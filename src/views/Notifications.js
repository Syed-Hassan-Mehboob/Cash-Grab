import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
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
import Colors from '../common/Colors';
import Constants, {SIZES} from '../common/Constants';
import Images from '../common/Images';
import NormalHeader from '../components/NormalHeader';
import RegularTextCB from '../components/RegularTextCB';
import Axios from '../network/APIKit';
import utils from '../utils';

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      notifications: [],
      accessToken: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => this.getUserAccessToken());
  }

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

  renderNotificationsItem = ({item}) => {
    console.log(
      'Item  ===============>',
      item.notifications.map((item) => {
        console.log(item);
      }),
    );
    return (
      <View style={{marginHorizontal: SIZES.fifteen}}>
        <RegularTextCB style={{color: Colors.black, fontSize: 18}}>
          {item.date}
        </RegularTextCB>

        {item.notifications.map((notification) => {
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
                activeOpacity={0.5}
                style={styles.itemContainer}
                onPress={() => {}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={styles.circleCard}>
                    <Image
                      source={{uri: Constants.imageURL + notification.image}}
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
                        {notification.title}
                      </RegularTextCB>
                      <RegularTextCB>{item.time}</RegularTextCB>
                    </View>
                    <RegularTextCB
                      numberOfLines={1}
                      style={{
                        fontSize: 14,
                        color: Colors.coolGrey,
                        marginTop: SIZES.five,
                      }}>
                      {notification.content}
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

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({accessToken: token}, () => this.getNotifications());
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

  render() {
    // console.log('Notifications======', this.state.notifications);
    return (
      <View style={[styles.container]}>
        <NormalHeader name="Notifications" />
        <SwipeListView
          style={{marginTop: SIZES.ten}}
          data={this.state.notifications}
          renderItem={this.renderNotificationsItem}
          contentInset={{
            // for ios
            bottom: 100,
          }}
          contentContainerStyle={{
            // for android
            paddingBottom: 100,
          }}
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
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  iconUser: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: (SIZES.ten * 6) / 2,
    resizeMode: 'contain',
  },
  iconPassword: {
    fontSize: SIZES.twenty,
    height: SIZES.twenty,
    width: SIZES.twenty,
    alignSelf: 'center',
    color: Colors.orange,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
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
    height: 45,
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
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
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
    width: SIZES.ten * 7,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: SIZES.ten * 7,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: SIZES.five,
    borderBottomRightRadius: SIZES.five,
  },
  trash: {
    height: SIZES.twentyFive,
    width: SIZES.twentyFive,
    marginRight: 7,
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
