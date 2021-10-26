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
import {StatusBar} from 'react-native';
import {ScrollView} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class Chat extends React.Component {
  messages = [
    {
      user: {
        image: Images.emp1,
      },
      message: {
        text: "Hi Ankur! What's up?",
        date: 'Yesterday 14:26 PM',
      },
    },
    {
      user: {
        image: Images.emp1,
      },
      message: {
        text: "How's your day?",
        date: 'Today 12:54 PM',
      },
    },
  ];

  FlatListRef = null;
  chatList = React.createRef();

  constructor(props) {
    super(props);
  }

  // this.props.route.params.data.

  //  if(this.props.route.params.trigger === 'notification'){

  //  }

  VendorId =
    this.props.route.params.data?.receiver_type === 'vendor' &&
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_id
      : this.props.route.params.data?.sender_type === 'vendor' &&
        this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.sender_id
      : this.props.route.params.payload?.vendor.id.toString(); // Vendor ID

  VendorName =
    this.props.route.params.data?.receiver_type === 'vendor' &&
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_id
      : this.props.route.params.data?.sender_type === 'vendor' &&
        this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.sender_name
      : this.props.route.params.payload?.vendor.name.toString(); // Vendor Name

  VendorType =
    this.props.route.params.data?.receiver_type === 'vendor' &&
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_type
      : this.props.route.params.data?.sender_type === 'vendor' &&
        this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.sender_type
      : this.props.route.params.payload?.vendor.type.toString(); // Vendor type

  customerId =
    this.props.route.params.data?.receiver_type === 'customer' &&
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_id
      : this.props.route.params.data?.sender_type === 'customer' &&
        this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.sender_id
      : this.props.route.params.payload?.user.id.toString(); // Customer Id

  customerName =
    this.props.route.params.data?.receiver_type === 'customer' &&
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_name
      : this.props.route.params.data?.sender_type === 'customer' &&
        this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.sender_name
      : this.props.route.params.payload?.user.name.toString(); // Customer Name

  customerType =
    this.props.route.params.data?.receiver_type === 'customer' &&
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.receiver_type
      : this.props.route.params.data?.sender_type === 'customer' &&
        this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.sender_type
      : this.props.route.params.payload?.user.type.toString(); // Customer Type

  orderId =
    this.props.route.params.data?.order_id !== null ||
    this.props.route.params.data?.order_id !== undefined ||
    this.props.route.params.trigger === 'notification'
      ? this.props.route.params.data?.order_id
      : this.props.route.params.payload?.id.toString(); // Order ID

  // user id
  // user name
  // user type

  // other user id
  // other user name
  // other user type

  state = {
    accessToken: '',
    message: '',
    chatList: [],
    time: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
    isModalVisible: false,
    isVendor: '',
    gotUser: '',
  };

  componentDidMount() {
    this.getUserType();
  }

  // checking user type whether he is user or vendor
  getUserType = async () => {
    const user = await AsyncStorage.getItem('user');
    var userData = JSON.parse(user);

    this.setState({accessToken: userData.token});
    this.setState({isVendor: userData.type === 'vendor'}, () => {
      // console.log('userType: ', this.state.isVendor);
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
            setTimeout(() => {
              this.scrollView.scrollTo({
                x: 0,
                y: 100000000000,
                animated: true,
              });
            }, 800);
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
            setTimeout(() => {
              this.scrollView.scrollTo({
                x: 0,
                y: 100000000000,
                animated: true,
              });
            }, 500);
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
      .child(this.customerId) // cusmtomer Id
      .child(this.VendorId) // Vendor Id
      .child(this.orderId) // order Id
      .child(FIREBASECONSTANTS.FIREBASE_MESSAGES)
      .push({
        message: this.state.message,

        senderId: this.customerId, // cusmtomer id
        senderName: this.customerName,
        senderType: this.customerType,

        receiverId: this.VendorId, // Vendor Id
        receiverName: this.VendorName,
        receiverType: this.VendorType,

        time: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
        type: 1,
      });

    // other user k liye msg banaya
    database()
      .ref(FIREBASECONSTANTS.FIREBASE_CHAT)
      .child(this.VendorId) //Vendor id
      .child(this.customerId) // cusmtomer id
      .child(this.orderId) // order Id
      .child(FIREBASECONSTANTS.FIREBASE_MESSAGES)
      .push({
        message: this.state.message,

        senderId: this.customerId, // cusmtomer id
        senderName: this.customerName,
        senderType: this.customerType,

        receiverId: this.VendorId, // Vendor Id
        receiverName: this.VendorName,
        receiverType: this.VendorType,

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
      .child(this.orderId) // order Id
      .child(FIREBASECONSTANTS.FIREBASE_MESSAGES)
      .push({
        message: this.state.message,
        senderId: this.VendorId, // Vendor id
        senderName: this.VendorName,
        senderType: this.VendorType,

        receiverId: this.customerId, // cusmtomer Id
        receiverName: this.customerName,
        receiverType: this.customerType,

        time: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
        type: 1,
      });

    // other user k liye msg banaya
    database()
      .ref(FIREBASECONSTANTS.FIREBASE_CHAT)
      .child(this.customerId) // cusmtomer Id
      .child(this.VendorId) // Vendor Id
      .child(this.orderId) // order Id
      .child(FIREBASECONSTANTS.FIREBASE_MESSAGES)
      .push({
        message: this.state.message,
        senderId: this.VendorId, // Vendor id
        senderName: this.VendorName,
        senderType: this.VendorType,

        receiverId: this.customerId, // cusmtomer Id
        receiverName: this.customerName,
        receiverType: this.customerType,

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

  renderSupportItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: SIZES.five,
          marginHorizontal: SIZES.fifteenWidth,
        }}>
        <View style={styles.circleCard}>
          <Image
            source={item.user.image}
            style={styles.iconUser}
            resizeMode="cover"
          />
        </View>
        <View>
          <View style={{marginStart: SIZES.ten}}>
            <View style={[styles.chatContainer]}>
              <RegularTextCB>{item.message.text}</RegularTextCB>
            </View>
            <RegularTextCB style={{fontSize: 12, color: Colors.coolGrey}}>
              {item.message.date}
            </RegularTextCB>
          </View>
        </View>
      </View>
    );
  };

  renderChatItemForVendor = (item, index) => {
    // console.log(
    //   item,
    //   'msg item=====>>>> ',
    //   // typeof item.senderId,
    //   '========>>>>',
    //   // typeof this.VendorId,
    // );
    return (
      <View
        key={index}
        style={{
          alignItems:
            item?.senderId !== this.VendorId ? 'baseline' : 'flex-end',
          paddingHorizontal: SIZES.ten,
          marginVertical: SIZES.five,
        }}>
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
          }}>
          <RegularTextCB
            numberOfLines={3}
            style={{
              color:
                item?.senderId === this.VendorId ? Colors.black : Colors.white,
              alignSelf: 'baseline',
              marginLeft: SIZES.five,
              fontSize: SIZES.h18,
              borderRadius: SIZES.ten,
            }}>
            {item?.message}
          </RegularTextCB>
        </View>
      </View>
    );
  };

  renderChatItemForUser = (item, index) => {
    // console.log(
    //   item,
    //   'msg item=====>>>> ',
    //   // typeof item?.senderId,
    //   '========>>>>',
    //   // typeof this.customerId,
    // );
    return (
      <View
        key={index}
        style={{
          alignItems:
            item?.senderId !== this.customerId ? 'baseline' : 'flex-end',
          paddingHorizontal: SIZES.ten,
          marginVertical: SIZES.five,
        }}>
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
          }}>
          <RegularTextCB
            numberOfLines={3}
            style={{
              color:
                item?.senderId === this.customerId
                  ? Colors.black
                  : Colors.white,
              alignSelf: 'baseline',
              marginLeft: SIZES.five,
              fontSize: SIZES.h18,
              borderRadius: SIZES.ten,
            }}>
            {item?.message}
          </RegularTextCB>
        </View>
      </View>
    );
  };

  render() {
    // console.log(
    //   'chat props=========>>>>>>',
    //   this.props.route.params?.payload.user.phone,
    // );
    console.log('vendor ==========================?', this.props.route.params);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.navy} />
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
                      ? Constants.imageURL +
                        this.props.route.params?.payload.user.user_profiles
                          .image
                      : Constants.imageURL +
                        this.props.route.params?.payload.vendor.user_profiles
                          .image,
                  }}
                  style={[styles.iconUser, {borderRadius: SIZES.fifteen * 5}]}
                  resizeMode="contain"
                />
              </View>
              <View style={{marginStart: SIZES.twenty}}>
                <RegularTextCB style={{fontSize: 18, color: Colors.sickGreen}}>
                  {this.state.isVendor
                    ? this.props.route.params?.payload.user.name
                    : this.props.route.params?.payload.vendor.name}
                </RegularTextCB>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                right: SIZES.ten,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
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
              </TouchableOpacity>
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
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ref={(scrollView) => (this._scrollView = scrollView)}
          data={this.state.chatList}
          keyExtractor={(item, index) => index}
          renderItem={
            this.state.isVendor
              ? this.renderChatItemForVendor
              : this.renderChatItemForUser
          }
          contentContainerStyle={{
            paddingTop: SIZES.twenty,
            paddingBottom: 150,
            flexDirection: 'column',
          }}
        /> */}
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
