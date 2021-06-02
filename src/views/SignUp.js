import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Platform,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Images from '../common/Images';
import Colors from '../common/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LightTextCB from '../components/LightTextCB';
import Constants from '../common/Constants';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';
import BoldTextCB from '../components/BoldTextCB';
import EditText from '../components/EditText';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVendor: false,
      avatar: '',
      fullName: '',
      service: 'Select',
      email: '',
      password: '',
      confirmPassword: '',
      isSelectionModalVisible: false,
      selections: [
        {
          id: '0',
          text: 'Service 1',
          isSelected: false,
        },
        {
          id: '1',
          text: 'Service 2',
          isSelected: false,
        },
        {
          id: '2',
          text: 'Service 3',
          isSelected: false,
        },
        {
          id: '3',
          text: 'Service 4',
          isSelected: false,
        },
        {
          id: '4',
          text: 'Service 5',
          isSelected: false,
        },
        {
          id: '5',
          text: 'Service 6',
          isSelected: false,
        },
      ],
    };
  }

  componentDidMount() {
    this.getUserType();
  }

  getUserType = async () => {
    const value = await AsyncStorage.getItem('isVendor');
    var data = JSON.parse(value);
    console.log(data);
    if (value !== null) {
      this.setState({isVendor: data});
    }
  };

  validateEmail = (text) => {
    this.setState({email: text});

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({tickIcon: 'cross'});
    } else {
      this.setState({tickIcon: 'check'});
    }
  };

  toggleIsSelectionModalVisible = () => {
    this.setState({
      isSelectionModalVisible: !this.state.isSelectionModalVisible,
    });
  };

  renderSelectionBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <RegularTextCB style={{fontSize: 16, color: Colors.sickGreen}}>
            Select
          </RegularTextCB>
          <TouchableOpacity
            onPress={() => {
              this.clearSelection();
              this.toggleIsSelectionModalVisible();
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
        <FlatList
          style={{marginTop: 5}}
          data={this.state.selections}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={this.renderSelectionItem}
          extraData={this.state.selections}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
        />
      </View>
    );
  };

  renderSelectionItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          item.isSelected === false
            ? styles.unselectedFilter
            : styles.selectedFilter,
        ]}
        onPress={() => {
          this.handleOnSelectionItemClick(index);
        }}>
        <RegularTextCB
          style={{
            fontSize: 14,
            color: Colors.black,
          }}>
          {item.text}
        </RegularTextCB>
      </TouchableOpacity>
    );
  };

  handleOnSelectionItemClick = (index) => {
    let mSelection = this.state.selections;
    mSelection.forEach((item) => {
      item.isSelected = false;
    });
    mSelection[index].isSelected = true;
    this.setState({selections: mSelection, service: mSelection[index].text});
    this.toggleIsSelectionModalVisible();
  };

  clearSelection() {
    this.state.selections.forEach((item) => {
      item.isSelected = false;
    });
    this.state.service = 'Select';
  }

  render() {
    return (
      <ImageBackground
        source={Images.loginBgWeb}
        style={[styles.container, {flex: 1, width: '100%'}]}>
        <View style={{flex: 1}}>
          <KeyboardAwareScrollView
            style={{flex: 1, paddingTop: Platform.OS === 'android' ? 0 : 20}}
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
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
                  source={Images.cashGrabLogoNew2}
                  style={{
                    height: 50,
                    width: '60%',
                    resizeMode: 'contain',
                    marginTop: 40,
                  }}
                />
                <BoldTextCB
                  style={{
                    fontSize: 28,
                    color: Colors.black,
                    marginTop: 20,
                  }}>
                  Create an account
                </BoldTextCB>
                <RegularTextCB style={{fontSize: 18, color: Colors.coolGrey}}>
                  Hello there, sign up to continue!
                </RegularTextCB>
              </View>
            </View>
            <View style={[styles.childContainer]}>
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
              {this.state.isVendor && (
                <View style={{marginTop: 15, marginHorizontal: 15}}>
                  <TouchableOpacity
                    style={[
                      styles.card,
                      {
                        height: 60,
                        borderRadius: 10,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                      },
                    ]}
                    onPress={() => this.toggleIsSelectionModalVisible()}>
                    <RegularTextCB style={{color: Colors.black}}>
                      {this.state.service}
                    </RegularTextCB>
                  </TouchableOpacity>
                </View>
              )}
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
                  onPress={() =>
                    this.props.navigation.navigate(Constants.verifyVia)
                  }
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
          <Modal
            isVisible={this.state.isSelectionModalVisible}
            coverScreen={false}
            style={styles.modal}>
            {this.renderSelectionBottomSheetContent()}
          </Modal>
        </View>
      </ImageBackground>
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
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
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
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
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
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  selectedFilter: {
    alignItems: 'center',
    paddingVertical: 10,
    margin: 2,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.sickGreen,
    borderRadius: 12,
  },
  unselectedFilter: {
    alignItems: 'center',
    paddingVertical: 10,
    margin: 2,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
});
