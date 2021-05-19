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
import ImagePicker from 'react-native-image-crop-picker';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Colors from '../../common/Colors';
import Images from '../../common/Images';
import ButtonRadius10 from '../../components/ButtonRadius10';
import LightTextCB from '../../components/LightTextCB';
import RegularTextCB from '../../components/RegularTextCB';
import EditText from '../../components/EditText';

const {width, height} = Dimensions.get('window');

const fall = new Animated.Value(1);
const bs = React.createRef();

export default class VendorEditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      location: '',
      oldPassword: '',
      newPassword: '',
    };
  }

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
        <LightTextCB style={{fontSize: 30}}>Upload Photo</LightTextCB>
        <LightTextCB style={{fontSize: 16, color: Colors.grey}}>
          Upload a photo from
        </LightTextCB>
        <View style={{marginTop: 30}}>
          <ButtonRadius10
            label="Camera"
            onPress={() => this.takePhotoFromCamera()}
          />
        </View>
        <View style={{marginTop: 20}}>
          <ButtonRadius10
            label="Gallery"
            onPress={() => this.choosePhotoFromGallery()}
          />
        </View>
        <View style={{marginTop: 20}}>
          <ButtonRadius10 label="Cancel" onPress={() => bs.current.snapTo(1)} />
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
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <Animated.View
          style={{
            flex: 1,
            opacity: Animated.add(0.5, Animated.multiply(fall, 1.0)),
          }}>
          <View
            style={{
              borderBottomStartRadius: 30,
              borderBottomEndRadius: 30,
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
                padding: 15,
              }}>
              <TouchableOpacity
                style={{position: 'absolute', left: 10}}
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
                  right: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  backgroundColor: Colors.sickGreen,
                  borderRadius: 5,
                }}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <RegularTextCB style={{color: Colors.white}}>
                  Save
                </RegularTextCB>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                styles.circleCard,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <Image source={Images.emp1} style={styles.iconUser} />
              <Image
                source={Images.iconCamera}
                style={{
                  height: 25,
                  width: 25,
                  position: 'absolute',
                  resizeMode: 'contain',
                  opacity: 0.4,
                }}
              />
            </TouchableOpacity>
            <RegularTextCB
              style={{color: Colors.white, fontSize: 20, marginTop: 10}}>
              Damian Santosa
            </RegularTextCB>
          </View>
          <ScrollView style={[styles.container, {paddingVertical: 20}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RegularTextCB
                style={{
                  color: Colors.coolGrey,
                  fontSize: 16,
                  marginStart: 20,
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
                  marginStart: 20,
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
                  marginStart: 20,
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
                  marginStart: 20,
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
                  marginStart: 20,
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
                  marginStart: 20,
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
                style={[styles.textInput, {marginBottom: 20}]}
              />
            </View>
          </ScrollView>
        </Animated.View>
        <BottomSheet
          ref={bs}
          snapPoints={[380, 0]}
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
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
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
    marginVertical: 10,
    marginHorizontal: 20,
    height: 50,
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
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    alignItems: 'center',
  },
  iconUser: {
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
    resizeMode: 'contain',
  },
  circleCard: {
    height: 90,
    width: 90,
    borderRadius: 45,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
});
