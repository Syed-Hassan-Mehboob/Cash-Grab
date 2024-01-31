import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../common/Colors';
import Constants, {SIZES, STYLES, width} from '../common/Constants';
import Images from '../common/Images';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';
import Axios from '../network/APIKit';

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{name: 'Tab'}],
});

export default class ConfirmPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {accessToken: '', currentOrder: '', isLoading: true};
  }

  navigateToHome() {
    // this.props.navigation.replace(Constants.profile);
    this.props.navigation.dispatch(resetAction);
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      if (
        this.props.route.params.from === 'notification' ||
        this.props.route.params.from === 'quick'
      ) {
        this.getUserAccessToken();
      }
      if (this.props.route.params.from === 'scheduled') {
        // this.getUserAccessToken();
        alert('from scheduled flow');
      }
      if (this.props.route.params?.from === 'posted') {
        // this.getUserAccessToken();
        alert('from posted flow');
      }
    });
    if (
      this.props.route.params.from === 'notification' ||
      this.props.route.params.from === 'quick'
    ) {
      this.getUserAccessToken();
    }
    if (this.props.route.params.from === 'scheduled') {
      // this.getUserAccessToken();
      alert('from scheduled flow');
    }
    if (this.props.route.params?.from === 'posted') {
      // this.getUserAccessToken();
      alert('from posted flow');
    }
  }

  getUserAccessToken = async () => {
    const value = await AsyncStorage.getItem('user');
    const accessToken = JSON.parse(value);
    this.setState({accessToken: accessToken.token}, () => {
      this.getOrderDetials();
    });
  };

  getOrderDetials = () => {
    const onSuccess = ({data}) => {
      console.log(
        'confirm payment get order detail success ===============================>>>>>>>>>>',
        data.data.orderStatus,
      );
      this.setState({currentOrder: data.data, isLoading: false});
      if (data.data.payment_status === 'paid') {
        this.props.navigation.navigate(Constants.QuickJobDetail, {
          orderItem: data.data,
        });
      }
    };
    const onFailure = (error) => {
      console.log('confirm payment get order detail error >>>>>>>>>>', error);
      this.setState({isLoading: false});
    };
    let params = {
      orderId: this.props.route.params.orderId,
    };
    Axios.get(Constants.orderDetail, {
      params,
      headers: {
        Authorization: `Bearer ${this.state.accessToken}`,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };

  render() {
    return (
      <View style={STYLES.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: SIZES.fifteen,
            // marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: SIZES.ten}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={[styles.iconBack]} />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: SIZES.ten * 3}}>
            {!this.state.isLoading &&
            this.state.currentOrder.orderStatus !== 'pending'
              ? 'Confirm Payment'
              : null}
          </RegularTextCB>
        </View>
        {!this.state.isLoading ? (
          this.state.currentOrder.orderStatus !== 'pending' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: SIZES.fifteen,
                  marginTop: SIZES.fifteen,
                }}>
                <View style={styles.circleCard}>
                  <Image
                    source={{
                      uri:
                        Constants.imageURL +
                        this.state.currentOrder?.vendor?.user_profiles?.image,
                    }}
                    style={styles.iconUser}
                  />
                </View>
                <RegularTextCB
                  style={{
                    fontSize: 16,
                    color: Colors.sickGreen,
                    flex: 1,
                    marginHorizontal: SIZES.ten,
                  }}>
                  {this.state.currentOrder?.vendor?.name}
                </RegularTextCB>
                <TouchableOpacity>
                  <Image
                    source={Images.moreDots}
                    style={{height: 25, width: 25, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: SIZES.fifteen,
                  marginTop: SIZES.fifteen,
                }}>
                <Image
                  source={Images.iconRepairing}
                  style={{
                    height: SIZES.ten * 3,
                    width: SIZES.ten * 3,
                    resizeMode: 'contain',
                  }}
                />
                <View style={{marginStart: SIZES.ten}}>
                  <RegularTextCB style={{fontSize: 16}}>
                    Repairing
                  </RegularTextCB>
                  <RegularTextCB style={{fontSize: 14, color: Colors.coolGrey}}>
                    3 AC split units maintenace
                  </RegularTextCB>
                </View>
              </View>
              <View style={{padding: SIZES.fifteen}}>
                <RegularTextCB
                  style={{
                    color: Colors.black,
                    fontSize: 18,
                    marginTop: SIZES.twenty,
                  }}>
                  Payment Details
                </RegularTextCB>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: SIZES.twenty,
                  }}>
                  <RegularTextCB style={{color: Colors.coolGrey, fontSize: 14}}>
                    Credit Card Number
                  </RegularTextCB>
                  <RegularTextCB style={{color: Colors.black, fontSize: 14}}>
                    **** **** **** 0123
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: SIZES.fifteen,
                  }}>
                  <RegularTextCB style={{color: Colors.coolGrey, fontSize: 14}}>
                    Amount
                  </RegularTextCB>
                  <RegularTextCB style={{color: Colors.black, fontSize: 14}}>
                    ${this.state.currentOrder.grandTotal}
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: SIZES.fifteen,
                  }}>
                  <RegularTextCB style={{color: Colors.coolGrey, fontSize: 14}}>
                    Phone No.
                  </RegularTextCB>
                  <RegularTextCB style={{color: Colors.black, fontSize: 14}}>
                    {this.state.currentOrder?.vendor?.phone}
                  </RegularTextCB>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: SIZES.fifteen,
                  }}>
                  <RegularTextCB style={{color: Colors.coolGrey, fontSize: 14}}>
                    Address
                  </RegularTextCB>
                  <RegularTextCB style={{color: Colors.black, fontSize: 14}}>
                    {this.state.currentOrder?.address}
                  </RegularTextCB>
                </View>
              </View>
              <View
                style={{
                  padding: SIZES.fifteen,
                  position: 'absolute',
                  bottom: 0,
                  start: 0,
                  end: 0,
                }}>
                <ButtonRadius10
                  onPress={() => {
                    if (
                      this.props.route.params.from === 'notification' ||
                      this.props.route.params.from === 'quick'
                    ) {
                      this.props.navigation.navigate(Constants.QuickJobDetail, {
                        orderItem: this.state.currentOrder,
                      });
                    } else {
                      this.navigateToHome();
                    }
                  }}
                  label="PAY NOW"
                  bgColor={Colors.sickGreen}
                />
              </View>
            </>
          ) : (
            <RegularTextCB
              style={{
                marginTop: SIZES.five,
                alignSelf: 'center',
                color: Colors.coolGrey,
                alignSelf: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: width * 0.7,
              }}>
              *Your job hasn't been accepted aceepted yet{' '}
            </RegularTextCB>
          )
        ) : (
          <Spinner
            visible={this.state.isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        )}
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
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: Constants.fontRegular,
    color: Colors.black,
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
  card: {
    flexDirection: 'row',
    height: SIZES.ten * 12,
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    padding: SIZES.twenty,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
    alignItems: 'center',
  },
  iconUser: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: (SIZES.ten * 6) / 2,
    resizeMode: 'contain',
  },
  dashBorder: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.sickGreen,
    borderRadius: SIZES.ten,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
