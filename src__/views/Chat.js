import React from 'react';
import database from '@react-native-firebase/database';

import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Dimensions,
  Platform,
  Linking,
  ScrollView,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../common/Colors';
import Constants, {FIREBASECONSTANTS, SIZES} from '../common/Constants';
import Images from '../common/Images';
import ButtonRadius10 from '../components/ButtonRadius10';
import LightTextCB from '../components/LightTextCB';
import RegularTextCB from '../components/RegularTextCB';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import KeyboardManager, {PreviousNextView} from 'react-native-keyboard-manager';

const {width, height} = Dimensions.get('window');

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(true);
  KeyboardManager.setKeyboardDistanceFromTextField(30);
  KeyboardManager.setLayoutIfNeededOnUpdate(true);
  KeyboardManager.setEnableAutoToolbar(false);
  KeyboardManager.setToolbarDoneBarButtonItemText('Done');
  KeyboardManager.setToolbarManageBehaviourBy('subviews'); // "subviews" | "tag" | "position"
  KeyboardManager.setToolbarPreviousNextButtonEnable(true);
  KeyboardManager.setToolbarTintColor('#FF00FF'); // Only #000000 format is supported
  KeyboardManager.setToolbarBarTintColor('#FFFF00'); // Only #000000 format is supported
  KeyboardManager.setShouldShowToolbarPlaceholder(true);
  KeyboardManager.setOverrideKeyboardAppearance(false);
  KeyboardManager.setKeyboardAppearance('default'); // "default" | "light" | "dark"
  KeyboardManager.setShouldResignOnTouchOutside(true);
  KeyboardManager.setShouldPlayInputClicks(true);
}

export default class Chat extends React.Component {
  FlatListRef = null;
  chatList = React.createRef();

  constructor(props) {
    super(props);
  }

  state = {
    accessToken: '',
    message: '',
    chatList: [],
    time: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
    isModalVisible: false,
    isVendor: '',
    gotUser: '',
    myID: '',
    textMessageContainerWidth: '',
  };

  VendorId =
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_type === 'vendor'
        ? this.props.route.params.data?.receiver_id.toString()
        : this.props.route.params.data?.sender_type === 'vendor'
        ? this.props.route.params.data?.sender_id.toString()
        : null
      : this.props.route.params.payload?.vendor.id.toString(); // Vendor ID

  VendorName =
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_type === 'vendor'
        ? this.props.route.params.data?.receiver_name.toString()
        : this.props.route.params.data?.sender_type === 'vendor'
        ? this.props.route.params.data?.sender_name.toString()
        : null
      : this.props.route.params.payload?.vendor.name.toString(); // Vendor Name

  VendorType =
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_type === 'vendor'
        ? this.props.route.params.data?.receiver_type.toString()
        : this.props.route.params.data?.sender_type === 'vendor'
        ? this.props.route.params.data?.sender_type.toString()
        : null
      : this.props.route.params.payload?.vendor.type.toString(); // Vendor type

  VendorImage =
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_type === 'vendor'
        ? this.props.route.params.data?.receiver_image !== undefined
          ? this.props.route.params.data?.receiver_image.toString()
          : ''
        : this.props.route.params.data?.sender_type === 'vendor'
        ? this.props.route.params.data?.sender_image !== undefined
          ? this.props.route.params.data?.sender_image.toString()
          : ''
        : null
      : Constants.imageURL +
        this.props.route.params?.payload.vendor.user_profiles.image.toString(); // Vendor image

  customerId =
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_type === 'customer'
        ? this.props.route.params.data?.receiver_id.toString()
        : this.props.route.params.data?.sender_type === 'customer'
        ? this.props.route.params.data?.sender_id.toString()
        : null
      : this.props.route.params.payload?.user.id.toString(); // Customer Id

  customerName =
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_type === 'customer'
        ? this.props.route.params.data?.receiver_name.toString()
        : this.props.route.params.data?.sender_type === 'customer'
        ? this.props.route.params.data?.sender_name.toString()
        : null
      : this.props.route.params.payload?.user.name.toString(); // Customer Name

  customerType =
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_type === 'customer'
        ? this.props.route.params.data?.receiver_type.toString()
        : this.props.route.params.data?.sender_type === 'customer'
        ? this.props.route.params.data?.sender_type.toString()
        : null
      : this.props.route.params.payload?.user.type.toString(); // Customer Type

  customerImage =
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_type === 'customer'
        ? this.props.route.params.data?.receiver_image !== undefined
          ? this.props.route.params.data?.receiver_image.toString()
          : ''
        : this.props.route.params.data?.sender_type === 'customer'
        ? this.props.route.params.data?.sender_image !== undefined
          ? this.props.route.params.data?.sender_image.toString()
          : ''
        : null
      : Constants.imageURL +
        this.props.route.params?.payload.user.user_profiles.image.toString(); // Customer Image

  orderId =
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.order_id.toString()
      : this.props.route.params.payload?.id.toString(); // Order ID

  componentDidMount() {
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
      KeyboardManager.resignFirstResponder();
    }
    this.getUserType();
  }

  componentDidUpdate() {
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
      KeyboardManager.isKeyboardShowing().then((isShowing) => {
        console.log('isKeyboardShowing: ' + isShowing);
      });
    }
  }

  // onEnableDisable = (value) => {
  //   KeyboardManager.setEnable(value);
  //   this.setState({
  //     enableDisable: value,
  //   });
  // };

  // checking user type whether he is user or vendor
  getUserType = async () => {
    const user = await AsyncStorage.getItem('user');
    var userData = JSON.parse(user);
    console.log('===================getUserType=======================');
    this.setState({accessToken: userData.token, myID: userData.id});
    this.setState({isVendor: userData.type === 'vendor'}, () => {
      if (this.state.isVendor) {
        this.getChatForVendor();
      } else {
        this.getChatForCustomer();
      }
      this.setState({gotUser: true});
    });
  };

  // openn dial call dialog
  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };

  // getting chat as customer
  getChatForCustomer = async () => {
    try {
      database()
        .ref(FIREBASECONSTANTS.FIREBASE_CHAT)
        .child(this.customerId)
        .child(this.VendorId)
        .child(this.orderId) // order Id
        .child(FIREBASECONSTANTS.FIREBASE_MESSAGES)
        .on('value', (dataSnapshot) => {
          let msgs = [];
          dataSnapshot.forEach((child) => {
            // console.log('child=====', child);
            msgs.push({
              senderId: child.val().senderId,
              message: child.val().message,
              type: child.val().type,
              time: child.val().time,
            });
          });

          // console.log('msgs======>>>>>>', msgs);
          this.setState({chatList: msgs}, () => {
            AsyncStorage.setItem(
              `isMessageForOrderVisited${this.orderId}`,
              JSON.stringify({orderID: this.orderId, isRead: true}),
            );
            setTimeout(() => {
              this.scrollView.scrollTo({
                x: 0,
                y: 100000000000,
                animated: true,
              });
            }, 300);
          });
        });
    } catch (error) {
      console.log(
        ' get chat error ===================================>',
        error,
      );
    }
  };

  // getting chat as vendor
  getChatForVendor = async () => {
    try {
      database()
        .ref(FIREBASECONSTANTS.FIREBASE_CHAT)
        .child(this.VendorId)
        .child(this.customerId)
        .child(this.orderId) // order Id
        .child(FIREBASECONSTANTS.FIREBASE_MESSAGES)
        .on('value', (dataSnapshot) => {
          let msgs = [];
          dataSnapshot.forEach((child) => {
            // console.log('vendor chat child=====', child);
            msgs.push({
              senderId: child.val().senderId,
              message: child.val().message,
              type: child.val().type,
              time: child.val().time,
            });
          });

          // console.log('msgs======>>>>>>', msgs);
          this.setState({chatList: msgs}, () => {
            AsyncStorage.setItem(
              `isMessageForOrderVisited${this.orderId}`,
              JSON.stringify({orderID: this.orderId, isRead: true}),
            );
            setTimeout(() => {
              this.scrollView.scrollTo({
                x: 0,
                y: 100000000000,
                animated: true,
              });
            }, 300);
          });
        });
    } catch (error) {
      console.log(
        ' get chat error ===================================>',
        error,
      );
    }
  };

  sendMessage = () => {
    // createChatHead();
    if (this.state.message !== '') {
      if (this.state.isVendor) {
        this.setVendorMessage();
      } else {
        this.setUserMessage();
      }
    }
  };

  /*
   * Creating and Sending nessage for current and other user as customer
   */
  setUserMessage = async () => {
    // current user k liye msg banaya
    database()
      .ref(FIREBASECONSTANTS.FIREBASE_CHAT)
      .child(this.customerId)
      .child(this.VendorId)
      .child(this.orderId) // order Id
      .child(FIREBASECONSTANTS.FIREBASE_MESSAGES)
      .push({
        message: this.state.message,

        senderId: this.customerId, // cusmtomer id
        senderName: this.customerName,
        senderType: this.customerType,
        sender_image: this.customerImage,

        receiverId: this.VendorId, // Vendor Id
        receiverName: this.VendorName,
        receiverType: this.VendorType,
        receiver_image: this.VendorImage,

        time: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
        type: 1,
      });

    // other user k liye msg banaya
    database()
      .ref(FIREBASECONSTANTS.FIREBASE_CHAT)
      .child(this.VendorId)
      .child(this.customerId)
      .child(this.orderId) // order Id
      .child(FIREBASECONSTANTS.FIREBASE_MESSAGES)
      .push({
        message: this.state.message,

        senderId: this.customerId, // cusmtomer id
        senderName: this.customerName,
        senderType: this.customerType,
        sender_image: this.customerImage,

        receiverId: this.VendorId, // Vendor Id
        receiverName: this.VendorName,
        receiverType: this.VendorType,
        receiver_image: this.VendorImage,

        time: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
        type: 1,
      });
    this.setState({message: ''});
  };

  /*
   * Creating and Sending nessage for current and other user as vendor
   */
  setVendorMessage = () => {
    // current user k liye msg banaya
    database()
      .ref(FIREBASECONSTANTS.FIREBASE_CHAT)
      .child(this.VendorId) // Vendor Id
      .child(this.customerId) // cusmtomer Id
      .child(this.orderId)
      .child(FIREBASECONSTANTS.FIREBASE_MESSAGES)
      .push({
        message: this.state.message,

        senderId: this.VendorId, // Vendor id
        senderName: this.VendorName,
        senderType: this.VendorType,
        sender_image: this.VendorImage,

        receiverId: this.customerId, // cusmtomer Id
        receiverName: this.customerName,
        receiverType: this.customerType,
        receiver_image: this.customerImage,

        time: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
        type: 1,
      });

    // other user k liye msg banaya
    database()
      .ref(FIREBASECONSTANTS.FIREBASE_CHAT)
      .child(this.customerId) // cusmtomer Id
      .child(this.VendorId) // Vendor Id
      .child(this.orderId)
      .child(FIREBASECONSTANTS.FIREBASE_MESSAGES)
      .push({
        message: this.state.message,

        senderId: this.VendorId, // Vendor id
        senderName: this.VendorName,
        senderType: this.VendorType,
        sender_image: this.VendorImage,

        receiverId: this.customerId, // cusmtomer Id
        receiverName: this.customerName,
        receiverType: this.customerType,
        receiver_image: this.customerImage,

        time: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
        type: 1,
      });
    this.setState({message: ''});
  };

  toggleIsModalVisible = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <LightTextCB style={{fontSize: 30}}>Upload Photo</LightTextCB>
          <TouchableOpacity
            onPress={() => {
              this.toggleIsModalVisible();
            }}>
            <Image
              source={Images.iconClose}
              style={{
                height: SIZES.fifteenWidth,
                width: SIZES.fifteenWidth,
                tintColor: Colors.coolGrey,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <LightTextCB style={{fontSize: 16, color: Colors.grey}}>
          Upload a photo from
        </LightTextCB>
        <View style={{marginTop: 30}}>
          <ButtonRadius10
            bgColor={Colors.sickGreen}
            label="CAMERA"
            onPress={() => this.takePhotoFromCamera()}
          />
        </View>
        <View style={{marginTop: SIZES.twenty}}>
          <ButtonRadius10
            label="GALLERY"
            onPress={() => this.choosePhotoFromGallery()}
          />
        </View>
        <View style={{height: SIZES.fifty}} />
      </View>
    );
  };

  choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    }).then((image) => {
      this.toggleIsModalVisible();
      this.setState({avatar: image.path});
    });
  };

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
    }).then((image) => {
      this.toggleIsModalVisible();
      this.setState({avatar: image.path});
    });
  };

  /*
   * Creating message layout for current and other user as vendor
   */
  renderChatItemForVendor = (item, index) => {
    return (
      <View
        key={index}
        style={{
          alignItems:
            item?.senderId !== this.VendorId ? 'baseline' : 'flex-end',
          paddingHorizontal: SIZES.ten,
          marginVertical: SIZES.five,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          {item?.senderId !== this.VendorId ? (
            <Image
              source={{uri: this.customerImage}}
              style={{
                height: 35,
                width: 35,
                borderRadius: 35 / 2,
                marginRight: SIZES.five * 1.3,
              }}
            />
          ) : null}
          <View
            style={{
              backgroundColor:
                item?.senderId === this.VendorId
                  ? Colors.paleGrey
                  : Colors.sickGreen,
              paddingHorizontal: SIZES.twenty,
              paddingVertical: SIZES.ten * 1.3,
              borderTopRightRadius: SIZES.fifteen,
              borderTopLeftRadius: SIZES.fifteen,
              borderBottomRightRadius:
                item?.senderId !== this.VendorId ? SIZES.fifteen : 0,
              borderBottomLeftRadius:
                item?.senderId === this.VendorId ? SIZES.fifteen : 0,
              maxWidth: width * 0.8,
              // flex: 1,
              // width: this.textMessageContainerWidth, // width: width >== (width * 0.8) ? (width * 0.8) : width
            }}>
            <RegularTextCB
              numberOfLines={3}
              style={{
                color: Colors.black,
                alignSelf: 'baseline',
                marginLeft: SIZES.five,
                fontSize: SIZES.h18,
                borderRadius: SIZES.ten,
              }}>
              {item?.message}
            </RegularTextCB>
            <LightTextCB
              numberOfLines={3}
              style={{
                color: Colors.black1,
                alignSelf:
                  this.props.route.params.trigger === 'notification'
                    ? this.props.route.params.data?.receiver_type === 'vendor'
                      ? item?.senderId !==
                        this.props.route.params.data?.receiver_id
                        ? 'baseline'
                        : 'flex-end'
                      : this.props.route.params.data?.sender_type === 'vendor'
                      ? item?.senderId !==
                        this.props.route.params.data?.sender_id
                        ? 'baseline'
                        : 'flex-end'
                      : null
                    : item?.senderId !==
                      this.props.route.params.payload?.vendor.id.toString()
                    ? 'baseline'
                    : 'flex-end',
                // marginLeft: SIZES.five,
                fontSize: 11,
                borderRadius: SIZES.ten,
                marginTop: SIZES.five,
              }}>
              {moment(item?.time).format('hh:mm a')}
            </LightTextCB>
          </View>
          {item?.senderId === this.VendorId ? (
            <Image
              source={{uri: this.VendorImage}}
              style={{
                height: 35,
                width: 35,
                borderRadius: 35 / 2,
                marginLeft: SIZES.five * 1.3,
              }}
            />
          ) : null}
        </View>
      </View>
    );
  };

  /*
   * Creating message layout for current and other user as customer
   */
  renderChatItemForUser = (item, index) => {
    return (
      <View
        key={index}
        style={{
          alignItems:
            item?.senderId !== this.customerId ? 'baseline' : 'flex-end',
          paddingHorizontal: SIZES.ten,
          marginVertical: SIZES.five,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          {item?.senderId !== this.customerId ? (
            <Image
              source={{uri: this.VendorImage}}
              style={{
                height: 35,
                width: 35,
                borderRadius: 35 / 2,
                marginRight: SIZES.five * 1.3,
              }}
            />
          ) : null}
          <View
            style={{
              backgroundColor:
                item?.senderId === this.customerId
                  ? Colors.paleGrey
                  : Colors.sickGreen,
              paddingHorizontal: SIZES.twenty,
              paddingVertical: SIZES.ten * 1.3,

              borderTopRightRadius: SIZES.fifteen,
              borderTopLeftRadius: SIZES.fifteen,
              borderBottomRightRadius:
                item?.senderId !== this.customerId ? SIZES.fifteen : 0,
              borderBottomLeftRadius:
                item?.senderId === this.customerId ? SIZES.fifteen : 0,
              maxWidth: width * 0.8,
            }}>
            <RegularTextCB
              numberOfLines={20}
              style={{
                color: Colors.black,
                alignSelf: 'baseline',
                marginLeft: SIZES.five,
                fontSize: SIZES.h18,
                borderRadius: SIZES.ten,
              }}>
              {item?.message}
            </RegularTextCB>
            <LightTextCB
              numberOfLines={1}
              style={{
                color: Colors.grey,
                alignSelf:
                  this.props.route.params.trigger === 'notification'
                    ? this.props.route.params.data?.receiver_type === 'customer'
                      ? item?.senderId ===
                        this.props.route.params.data?.receiver_id
                        ? 'baseline'
                        : 'flex-end'
                      : this.props.route.params.data?.sender_type === 'customer'
                      ? item?.senderId ===
                        this.props.route.params.data?.sender_id
                        ? 'baseline'
                        : 'flex-end'
                      : null
                    : item?.senderId ===
                      this.props.route.params.payload?.vendor.id.toString()
                    ? 'baseline'
                    : 'flex-end',
                // marginLeft: SIZES.five,
                fontSize: 11,
                borderRadius: SIZES.ten,
                marginTop: SIZES.five,
              }}>
              {moment(item?.time).format('hh:mm a')}
            </LightTextCB>
          </View>
          {item?.senderId === this.customerId ? (
            <Image
              source={{uri: this.customerImage}}
              style={{
                height: 35,
                width: 35,
                borderRadius: 35 / 2,
                marginLeft: SIZES.five * 1.3,
              }}
            />
          ) : null}
        </View>
      </View>
    );
  };

  /*
   * render and return for chat screen
   */
  render() {
    // console.log('myID=========>>>>>>>>>>>>', this.state.myID);
    // console.log('vendor id========>>>>>>>>>>>', this.VendorId);
    // console.log('customer id========>>>>>>>>>>>', this.customerId);
    return (
      <View style={styles.container}>
        {/* <StatusBar barStyle="light-content" backgroundColor={Colors.navy} /> */}
        <View
          style={{
            borderBottomStartRadius: 30,
            borderBottomEndRadius: 30,
            height: height / 7.5,
            justifyContent: 'center',
            backgroundColor: Colors.navy,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              marginTop: SIZES.ten,
              padding: SIZES.fifteenWidth,
            }}>
            <TouchableOpacity
              style={{padding: SIZES.ten / 1.3}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={Images.arrowBack}
                style={[styles.iconBack, {tintColor: Colors.white}]}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginStart: SIZES.five,
              }}>
              <View style={styles.circleCard}>
                <Image
                  source={{
                    uri: this.state.isVendor
                      ? this.customerImage
                      : this.VendorImage,
                  }}
                  style={[styles.iconUser, {borderRadius: SIZES.fifteen * 5}]}
                  resizeMode="contain"
                />
              </View>
              <View style={{marginStart: SIZES.twenty}}>
                <RegularTextCB style={{fontSize: 18, color: Colors.sickGreen}}>
                  {this.props.route.params.trigger !== null &&
                  this.props.route.params.trigger !== undefined &&
                  this.props.route.params.trigger === 'notification'
                    ? this.state.isVendor
                      ? this.customerName
                      : this.VendorName
                    : this.state.isVendor
                    ? this.customerName
                    : this.VendorName}
                </RegularTextCB>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                right: SIZES.ten,
                flexDirection: 'row',
              }}>
              {/* <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  if (this.state.isVendor) {
                    this.dialCall(this.props.route.params?.payload.user.phone);
                  } else {
                    this.dialCall(
                      this.props.route.params?.payload.vendor.phone,
                    );
                  }
                }}>
                <Image
                  source={Images.iconAudioCall}
                  style={{
                    height: SIZES.fifty,
                    width: SIZES.fifty,
                  }}
                />
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
        <ScrollView
          ref={(ref) => {
            this.scrollView = ref;
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100, paddingTop: SIZES.twenty}}
          style={styles.messages}>
          {this.state.chatList !== null && this.state.chatList !== undefined
            ? this.state.chatList.map((item, i) =>
                this.state.isVendor
                  ? this.renderChatItemForVendor(item, i)
                  : this.renderChatItemForUser(item, i),
              )
            : null}
        </ScrollView>
        <View
          style={[
            styles.card,
            {
              backgroundColor: Colors.white,
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: SIZES.ten,
            },
          ]}>
          <TextInput
            placeholder={'Type Your Message'}
            value={this.state.message}
            style={styles.textInput}
            onChangeText={(text) => this.setState({message: text})}
            onSubmitEditing={() => {
              this.sendMessage();
            }}
            returnKeyType={'send'}
          />
          <TouchableOpacity
            style={{marginRight: SIZES.five, padding: SIZES.five}}
            onPress={() => {
              this.sendMessage();
            }}>
            <Image
              source={Images.iconSend}
              style={{height: SIZES.ten * 4, width: SIZES.ten * 4}}
            />
          </TouchableOpacity>
        </View>
        <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
          {this.renderBottomSheetContent()}
        </Modal>
      </View>
    );
  }
}

/*
 * Styles for chat screen
 */
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
  chatContainer: {
    borderRadius: SIZES.ten,
    backgroundColor: Colors.paleGrey,
    padding: SIZES.ten,
  },
  circleCard: {
    height: SIZES.ten * 4,
    width: SIZES.ten * 4,
    borderRadius: SIZES.fifteen * 5,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
    marginStart: SIZES.fifteen,
  },
  iconUser: {
    height: SIZES.fifteen * 3.2,
    width: SIZES.fifteen * 3.2,
    borderRadius: SIZES.fifteen * 5,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    marginHorizontal: SIZES.ten,
    height: SIZES.fifty,
    fontFamily: Constants.fontRegular,
    color: Colors.black,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: SIZES.twenty,
    borderTopStartRadius: SIZES.twenty,
    borderTopEndRadius: SIZES.twenty,
  },
});
