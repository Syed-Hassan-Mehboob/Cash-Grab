import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../../common/Colors';
import Images from '../../common/Images';
import ButtonRadius10 from '../../components/ButtonRadius10';
import LightTextCB from '../../components/LightTextCB';
import RegularTextCB from '../../components/RegularTextCB';
import EditText from '../../components/EditText';
import Constants, { SIZES } from '../../common/Constants';
import Axios from '../../network/APIKit';
import utils from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

export default class VendorEditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar:this.props.route.params.avatar,
      fullName:this.props.route.params.name,
      email:this.props.route.params.email,
      phoneNumber:this.props.route.params.phone,
      location:this.props.route.params.location,
      countryCode:this.props.route.params.countryCode,
      oldPassword: '',
      newPassword: '',
      isModalVisible: false,
      isLoading: false,
      accessToken: '',
    };
  }

  componentDidMount() {
    this.getUserAccessToken();
    console.log('Avator========',this.state.fullName)
  }

  getUserAccessToken = async () => {
    const token = await AsyncStorage.getItem(Constants.accessToken);
    this.setState({ accessToken: token });
  };

  changePasswordState() {
    if (this.state.secureText)
      this.setState({secureText: false, eyeIcon: 'eye'});
    else this.setState({secureText: true, eyeIcon: 'eye-off'});
  }

  validateEmail = (text) => {
    this.setState({email: text});

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({tickIcon: 'cross'});
    } else {
      this.setState({tickIcon: 'check'});
    }
  };

  toggleIsLoading = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };

  toggleIsModalVisible = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

   editUserProfile = () => {
    let name = this.state.fullName;
    let email = this.state.email;
    let countryCode = this.state.countryCode;
    let phone = this.state.phoneNumber;
    let image = this.state.avatar;
    let location = this.state.location;
    
    if (utils.isEmpty(name)) {
      utils.showToast('Invalid Name');
      return;
    }

    if (name.length < 3) {
      utils.showToast('Name Should Not Be Less Than 3 Characters');
      return;
    }

    if (name.length > 55) {
      utils.showToast('Name Should Not Be Greater Than 55 Characters');
      return;
    }

    if (this.validateEmail(email)) {
      utils.showToast('Invalid Email');
      return;
    }

    if (utils.isEmpty(phone)) {
      utils.showToast('Invalid Phone Number');
      return;
    }

    if (phone.length < 9) {
      utils.showToast('Phone Number Should Not Be Less Than 9 Characters');
      return;
    }

    if (phone.length > 14) {
      utils.showToast('Phone Number Should Not Be Greater Than 14 Characters');
      return;
    }

    const onSuccess = ({ data }) => {
     console.log('upload======',data)
      this.toggleIsLoading();
      utils.showToast(data.message);

      setTimeout(() => {
        this.props.navigation.goBack();
      }, 1000);
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
    };

  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('country_code', countryCode);
    formData.append('phone', phone);
    formData.append('location', location);
    formData.append('image', {
      ...image,
      uri: Platform.OS === 'android' ? image : image.replace('file:///',''),
      name: `image-profile`,
      type: 'image/jpeg',
    }
    );

    const options = {
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        Authorization: this.state.accessToken,
      },
    };

    this.toggleIsLoading();
    Axios.post(Constants.updateProfileURL,formData, options)
      .then(onSuccess)
      .catch(onFailure);
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
                height:SIZES.fifteen,
                width:SIZES.fifteen,
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
        <View style={{height:SIZES.fifty}} />
      </View>
    );
  };

  choosePhotoFromGallery = () => {
    this.toggleIsModalVisible();
    ImagePicker.openPicker({
      width:SIZES.five*100,
      height:SIZES.five*100,
      cropping: true,
    }).then((image) => {
      this.setState({avatar:image.path});
    });
  };

  takePhotoFromCamera = () => {
    this.toggleIsModalVisible();
    ImagePicker.openCamera({
      width:SIZES.five*100,
      height:SIZES.five*100,
      cropping: true,
    }).then((image) => {
      // console.log('=====Image',image.path)
      this.setState({avatar:image.path});
      // console.log('Avator===',this.state.avatar)
    });
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View
          style={{
            borderBottomStartRadius:SIZES.ten*3,
            borderBottomEndRadius:SIZES.ten*3,
            height: height / 3.75,
            backgroundColor: Colors.navy,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding:SIZES.fifteen,
              marginTop: Platform.OS === 'android' ? 0 :SIZES.twenty,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', left:SIZES.ten}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={Images.arrowBack}
                style={[styles.iconBack, {tintColor: Colors.white}]}
              />
            </TouchableOpacity>
            <RegularTextCB style={{fontSize: 30, color: Colors.white}}>
              Profile
            </RegularTextCB>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right:SIZES.ten,
                paddingVertical:SIZES.five,
                paddingHorizontal:SIZES.fifteen,
                backgroundColor: Colors.sickGreen,
                borderRadius:SIZES.five,
              }}
              onPress={() => this.editUserProfile()}
              >
              <RegularTextCB style={{color: Colors.white}}>Save</RegularTextCB>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.circleCard,
              {justifyContent: 'center', alignItems: 'center'},
            ]}
            onPress={() => this.toggleIsModalVisible()}>
            <Image
              source={{uri:this.state.avatar}}
              style={styles.iconUser}
              resizeMode="cover"
            />
            <Image
              source={Images.iconCamera}
              style={{
                height:SIZES.twentyFive,
                width:SIZES.twentyFive,
                position: 'absolute',
                resizeMode: 'contain',
                opacity: 0.2,
              }}
            />
          </TouchableOpacity>
          <RegularTextCB
            style={{color: Colors.white, fontSize: SIZES.TWENTY, marginTop:SIZES.ten}}>
            {this.props.route.params.name}
          </RegularTextCB>
        </View>
        <ScrollView
          style={[styles.container, {paddingVertical:SIZES.twenty}]}
          showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart:SIZES.twenty,
                flex: 0.5,
              }}>
              Name
            </RegularTextCB>
            <EditText
              ref={'name'}
              placeholder={'Name'}
              value={this.state.fullName}
              onChangeText={(text) => {
                this.setState({fullName: text});
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart:SIZES.twenty,
                flex: 0.5,
              }}>
              Email
            </RegularTextCB>
            <EditText
              ref={'email'}
              keyboardType="email-address"
              placeholder={'Email Address'}
              value={this.state.email}
              onChangeText={(text) => {
                this.validateEmail(text);
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart:SIZES.twenty,
                flex: 0.5,
              }}>
              Phone No.
            </RegularTextCB>
            <EditText
              ref={'phone'}
              keyboardType={
                Platform.OS === 'android' ? 'numeric' : 'number-pad'
              }
              placeholder={'Phone Number'}
              value={this.state.phoneNumber}
              onChangeText={(text) => {
                this.setState({
                  phoneNumber: text,
                });
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart:SIZES.twenty,
                flex: 0.5,
              }}>
              Location
            </RegularTextCB>
            <EditText
              ref={'location'}
              placeholder={'Location'}
              value={this.state.location}
              onChangeText={(text) => {
                this.setState({location: text});
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart:SIZES.twenty,
                flex: 0.5,
              }}>
              Old Password
            </RegularTextCB>
            <EditText
              ref={'oldPassword'}
              placeholder={'Old Password'}
              secureTextEntry={true}
              value={this.state.oldPassword}
              onChangeText={(text) => {
                this.setState({oldPassword: text});
              }}
              style={[styles.textInput]}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RegularTextCB
              style={{
                color: Colors.coolGrey,
                fontSize: 16,
                marginStart:SIZES.twenty,
                flex: 0.5,
              }}>
              New Password
            </RegularTextCB>
            <EditText
              ref={'newPassword'}
              placeholder={'New Password'}
              secureTextEntry={true}
              value={this.state.newPassword}
              onChangeText={(text) => {
                this.setState({newPassword: text});
              }}
              style={[styles.textInput, {marginBottom: SIZES.TWENTY}]}
            />
          </View>
        </ScrollView>
        <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
          {this.renderBottomSheetContent()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconBack: {
    height:SIZES.twenty,
    width:SIZES.twenty,
    resizeMode: 'contain',
  },
  iconPassword: {
    fontSize: SIZES.TWENTY,
    height: SIZES.twenty,
    width:SIZES.twenty,
    alignSelf: 'center',
    color: Colors.orange,
  },
  iconUser: {
    height:SIZES.ten*8,
    width:SIZES.ten*8,
    borderRadius: SIZES.ten*8 / 2,
    resizeMode: 'contain',
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  formLabel: {
    fontSize: 16,
    color: Colors.grey,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    marginVertical: SIZES.ten,
    marginHorizontal:SIZES.twenty,
    height:SIZES.fifty,
    color: Colors.black,
  },
  textInputContainer: {
    borderBottomWidth: 0.3,
    height: SIZES.fifty-5,
    borderColor: Colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  underlineText: {
    color: Colors.black1,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  noUnderlineText: {
    color: Colors.black1,
    textDecorationLine: 'none',
    fontSize: 16,
  },
  bottomSheetHeader: {
    backgroundColor: Colors.white,
    shadowColor: '#333333',
    shadowOffset: {width:SIZES.five, height:SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    paddingTop:SIZES.twenty,
    borderTopStartRadius:SIZES.twenty,
    borderTopEndRadius: SIZES.twenty,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width:SIZES.fifty-10,
    height: SIZES.ten-2,
    borderRadius: SIZES.five-1,
    backgroundColor: '#00000040',
    marginBottom:SIZES.ten,
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: SIZES.twenty,
    borderTopStartRadius: SIZES.twenty,
    borderTopEndRadius: SIZES.twenty,
  },
  orangeCircle: {
    height:SIZES.ten*3,
    width: SIZES.ten*3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.ten*3 / 2,
    alignSelf: 'flex-end',
    right:SIZES.ten,
    backgroundColor: Colors.orange,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius:SIZES.ten,
    padding: SIZES.twenty,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius:SIZES.ten,
    elevation:SIZES.ten,
    alignItems: 'center',
  },
  iconUser: {
    height: SIZES.ten*9,
    width: SIZES.ten*9,
    borderRadius: SIZES.ten*9 / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height:SIZES.ten*9,
    width: SIZES.ten*9,
    borderRadius:SIZES.fifty-5,
    shadowColor: '#c5c5c5',
    shadowOffset: {width:SIZES.five, height:SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius:SIZES.five,
    elevation:SIZES.five,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
