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
import Constants from '../common/Constants';
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
                height: 15,
                width: 15,
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
        <View style={{marginTop: 20}}>
          <ButtonRadius10
            label="GALLERY"
            onPress={() => this.choosePhotoFromGallery()}
          />
        </View>
        <View style={{height: 50}} />
      </View>
    );
  };

  choosePhotoFromGallery = () => {
    this.toggleIsModalVisible();
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    }).then((image) => {
      this.setState({avatar: image.path});
    });
  };

  takePhotoFromCamera = () => {
    this.toggleIsModalVisible();
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
    }).then((image) => {
      this.setState({avatar: image.path});
    });
  };

  renderChatItem = ({item}) => {
    return (
      <View
        style={{flexDirection: 'row', marginVertical: 5, marginHorizontal: 15}}>
        <View style={styles.circleCard}>
          <Image
            source={item.user.image}
            style={styles.iconUser}
            resizeMode="cover"
          />
        </View>
        <View>
          <View style={{marginStart: 10}}>
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
            padding: 15,
            marginTop: Platform.OS === 'android' ? 0 : 20,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 10}}
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
              padding: 10,
            },
          ]}>
          <TouchableOpacity onPress={() => this.toggleIsModalVisible()}>
            <Image
              source={Images.iconCamera}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <TextInput
            placeholder={'Type Your Message'}
            value={this.state.message}
            style={styles.textInput}
            onChangeText={(text) => this.setState({message: text})}
          />
          <TouchableOpacity onPress={() => {}}>
            <Image source={Images.iconSend} style={{height: 40, width: 40}} />
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
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  chatContainer: {
    borderRadius: 10,
    backgroundColor: Colors.paleGrey,
    padding: 10,
  },
  circleCard: {
    height: 40,
    width: 40,
    borderRadius: 20,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  iconUser: {
    height: 40,
    width: 40,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    marginHorizontal: 10,
    height: 50,
    fontFamily: Constants.fontRegular,
    color: Colors.black,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
});
