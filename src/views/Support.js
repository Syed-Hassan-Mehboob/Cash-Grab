import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../common/Colors';
import Constants, { SIZES } from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import ButtonRadius10 from '../components/ButtonRadius10';
import LightTextCB from '../components/LightTextCB';

export default class Support extends React.Component {
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
        image: Images.emp2,
      },
      message: {
        text: "Hi Ankur! What's up?",
        date: 'Today 12:54 PM',
      },
    },
  ];

  constructor(props) {
    super(props);
  }

  state = {
    message: '',
    isModalVisible: false,
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
                height: SIZES.fifteen,
                width: SIZES.fifteen,
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
    this.toggleIsModalVisible();
    ImagePicker.openPicker({
      width: SIZES.ten*50,
      height: SIZES.ten*50,
      cropping: true,
    }).then((image) => {
      this.setState({avatar: image.path});
    });
  };

  takePhotoFromCamera = () => {
    this.toggleIsModalVisible();
    ImagePicker.openCamera({
      width: SIZES.ten*50,
      height: SIZES.ten*50,
      cropping: true,
    }).then((image) => {
      this.setState({avatar: image.path});
    });
  };

  renderChatItem = ({item}) => {
    return (
      <View
        style={{flexDirection: 'row', marginVertical: SIZES.five, marginHorizontal: SIZES.fifteen}}>
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

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: SIZES.fifteen,
            marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: SIZES.ten}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={[styles.iconBack]} />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: 30}}>Support</RegularTextCB>
        </View>
        <FlatList
          data={this.messages}
          keyExtractor={(item) => item.id}
          renderItem={this.renderChatItem}
        />
        <View
          style={[
            styles.card,
            {
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: SIZES.ten,
            },
          ]}>
          <TouchableOpacity onPress={() => this.toggleIsModalVisible()}>
            <Image
              source={Images.iconCamera}
              style={{height: SIZES.twentyFive, width: SIZES.twentyFive, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <TextInput
            placeholder={'Type Your Message'}
            value={this.state.message}
            style={styles.textInput}
            onChangeText={(text) => this.setState({message: text})}
          />
          <TouchableOpacity onPress={() => {}}>
            <Image source={Images.iconSend} style={{height: SIZES.ten*4, width: SIZES.ten*4}} />
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
    height: SIZES.ten*4,
    width: SIZES.ten*4,
    borderRadius: SIZES.twenty,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  iconUser: {
    height: SIZES.ten*4,
    width: SIZES.ten*4,
    borderRadius: SIZES.twenty,
    resizeMode: 'contain',
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
