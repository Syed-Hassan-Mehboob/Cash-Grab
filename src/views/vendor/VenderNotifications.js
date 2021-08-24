import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { SwipeListView } from 'react-native-swipe-list-view';
import Colors from '../../common/Colors';
import Constants from '../../common/Constants';
import Images from '../../common/Images';
import RegularTextCB from '../../components/RegularTextCB';
import Axios from '../../network/APIKit';
import utils from '../../utils';

export default class VenderNotifications extends Component {
  constructor(props) {
    super(props);
    this.state={
      isLoading: false,
      notifications:[]
    }
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

  renderNotificationsItem = ({ item }) => {
    console.log("Item  ===============>", item.notifications.map((item) => {
      console.log(item.content)
    }))
    return (
      <View style={{ marginHorizontal: 15 }}>
        <RegularTextCB style={{ color: Colors.black, fontSize: 18 }}>
          {item.date}
        </RegularTextCB>

        {item.notifications.map((notification) => {
          return (
            <View
              key={notification.id}
              style={[
                styles.card,
                {
                  marginVertical: 10,
                  borderWidth: item.date === 'Latest' ? 1 : 0,
                },
              ]}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.itemContainer}
                onPress={() => { }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={styles.circleCard}>
                    <Image
                      source={{ uri: Constants.imageURL + notification.image }}
                      style={styles.iconUser}
                      resizeMode="cover"
                    />
                  </View>
                  <View
                    style={{
                      marginStart: 10,
                      flex: 1,
                      flexShrink: 1,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <RegularTextCB style={{ fontSize: 16, color: Colors.black }}>
                        {notification.title}
                      </RegularTextCB>
                      <RegularTextCB>{item.time}</RegularTextCB>
                    </View>
                    <RegularTextCB
                      numberOfLines={1}
                      style={{
                        fontSize: 14,
                        color: Colors.coolGrey,
                        marginTop: 5,
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

  renderDeleteButton = ({ item }) => {
    return (
      <View
        style={{
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          backgroundColor: Colors.sickGreen,
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={Images.iconSwipeToDelete}
          style={{ height: 20, width: 20 }}
        />
      </View>
    );
  };

  toggleIsLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({ accessToken: token }, () => this.getNotifications());
  };

  getNotifications = () => {
    const onSuccess = ({ data }) => {
     
      this.toggleIsLoading();
      this.setState({ notifications: data.data });
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
    // console.log('Notifications======',this.state.notifications)
    return (
      <View style={[styles.container]}>
        <RegularTextCB style={{ fontSize: 30, alignSelf: 'center' }}>
          Notifications
        </RegularTextCB>
        <SwipeListView
          style={{ marginTop: 10 }}
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
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  iconFilter: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  iconForward: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  iconUser: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode: 'contain',
  },
  iconPassword: {
    fontSize: 20,
    height: 20,
    width: 20,
    alignSelf: 'center',
    color: Colors.orange,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 20 : 40,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  itemContainer: {
    padding: 15,
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
    borderRadius: 20,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  circleCard: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
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
