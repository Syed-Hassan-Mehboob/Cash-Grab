import React, {Component} from 'react';
import {
  ImageBackground,
  TextInput,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Images from '../common/Images';
import Colors from '../common/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LightTextCB from '../components/LightTextCB';
import Constants from '../common/Constants';
import {Icon} from 'native-base';
import ButtonRadius10 from '../components/ButtonRadius10';
import ImagePicker from 'react-native-image-crop-picker';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RegularTextCB from '../components/RegularTextCB';
import BoldTextCB from '../components/BoldTextCB';
import EditText from '../components/EditText';

const fall = new Animated.Value(1);
const bs = React.createRef();

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      fullName: '',
      service: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
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

  renderBottomSheetHeader = () => {
    return (
      <View style={styles.bottomSheetHeader}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    );
  };

  renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <RegularTextCB style={{fontSize: 30}}>Upload Photo</RegularTextCB>
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
            bgColor={Colors.sickGreen}
            label="GALLERY"
            onPress={() => this.choosePhotoFromGallery()}
          />
        </View>
        <View style={{marginTop: 20}}>
          <ButtonRadius10
            bgColor={Colors.sickGreen}
            label="CANCEL"
            onPress={() => bs.current.snapTo(1)}
          />
        </View>
      </View>
    );
  };

  choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    }).then((image) => {
      bs.current.snapTo(1);
      this.setState({avatar: image.path});
    });
  };

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
    }).then((image) => {
      bs.current.snapTo(1);
      this.setState({avatar: image.path});
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Animated.View
          style={{
            flex: 1,
            opacity: Animated.add(0.5, Animated.multiply(fall, 1.0)),
          }}>
          <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={{flexGrow: 1}}>
            {/* <ScrollView bounces={false} showsVerticalScrollIndicator={false}> */}
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                style={{
                  marginStart: 15,
                  alignSelf: 'flex-start',
                }}>
                <Image source={Images.arrowBack} style={styles.iconBack} />
              </TouchableOpacity>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={Images.logoCashGrab}
                  style={{
                    height: 250,
                    width: 250,
                  }}
                />
                <BoldTextCB
                  style={{
                    fontSize: 28,
                    color: Colors.black,
                    marginTop: -50,
                  }}>
                  Create an account
                </BoldTextCB>
                <RegularTextCB style={{fontSize: 18, color: Colors.coolGrey}}>
                  Hello there, sign up to continue!
                </RegularTextCB>
              </View>
            </View>
            <View style={[styles.childContainer]}>
              {/* <View
                style={{
                  flexShrink: 1,
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    bs.current.snapTo(0);
                  }}>
                  <ImageBackground
                    imageStyle={styles.iconUser}
                    style={[styles.iconUser, {alignSelf: 'center'}]}
                    source={
                      this.state.avatar === ''
                        ? Images.userPlaceHolder
                        : {uri: this.state.avatar}
                    }>
                    <View style={styles.orangeCircle}>
                      <Image
                        source={Images.iconPencil}
                        style={{
                          height: 15,
                          width: 15,
                          tintColor: Colors.white,
                          alignSelf: 'center',
                        }}
                      />
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View> */}
              <View style={[styles.textInputContainer, {marginTop: 30}]}>
                <EditText
                  ref={'fullName'}
                  placeholder={'Full Name'}
                  value={this.state.fullName}
                  onChangeText={(text) => {
                    this.setState({
                      fullName: text,
                    });
                  }}
                  style={[styles.textInput]}
                />
              </View>
              <View style={[styles.textInputContainer, {marginTop: 15}]}>
                <EditText
                  ref={'service'}
                  placeholder={'Select Service'}
                  value={this.state.service}
                  onChangeText={(text) => {
                    this.setState({
                      service: text,
                    });
                  }}
                  style={[styles.textInput]}
                />
              </View>
              <View style={[styles.textInputContainer, {marginTop: 15}]}>
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
              <View style={[styles.textInputContainer, {marginTop: 15}]}>
                <EditText
                  ref={'password'}
                  placeholder={'Password'}
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                  style={[styles.textInput]}
                />
              </View>
              <View style={[styles.textInputContainer, {marginTop: 15}]}>
                <EditText
                  ref={'confirm_password'}
                  placeholder={'Confirm Password'}
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={(text) => {
                    this.setState({
                      confirmPassword: text,
                    });
                  }}
                  style={[styles.textInput]}
                />
              </View>
            </View>
            <View style={{justifyContent: 'flex-end', marginHorizontal: 15}}>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 30,
                  },
                ]}>
                <LightTextCB style={styles.noUnderlineText}>
                  Already have an account?
                </LightTextCB>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(Constants.login);
                  }}>
                  <LightTextCB style={styles.underlineText}>
                    Sign In
                  </LightTextCB>
                </TouchableOpacity>
              </View>
              <View style={{marginVertical: 20}}>
                <ButtonRadius10
                  label="SIGN UP"
                  bgColor={Colors.sickGreen}
                  onPress={() => this.props.navigation.navigate(Constants.otp)}
                />
              </View>
            </View>
            {/* </ScrollView> */}
          </KeyboardAwareScrollView>
        </Animated.View>
        <BottomSheet
          ref={bs}
          snapPoints={[400, 0]}
          initialSnap={1}
          callbackNode={fall}
          renderContent={this.renderBottomSheetContent}
          renderHeader={this.renderBottomSheetHeader}
          enabledGestureInteraction={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconBack: {
    height: 20,
    width: 20,
    marginTop: 20,
    resizeMode: 'contain',
  },
  iconPassword: {
    fontSize: 20,
    height: 20,
    width: 20,
    alignSelf: 'center',
    color: Colors.orange,
  },
  iconUser: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
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
    width: '100%',
    fontFamily: Constants.fontLight,
    color: Colors.black,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
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
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: 20,
  },
  orangeCircle: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30 / 2,
    alignSelf: 'flex-end',
    right: 10,
    backgroundColor: Colors.orange,
  },
});
