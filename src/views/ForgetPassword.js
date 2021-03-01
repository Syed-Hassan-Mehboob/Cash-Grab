import React, {Component} from 'react';
import {
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Images from '../common/Images';
import Colors from '../common/Colors';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import LightTextCB from '../components/LightTextCB';
import Constants from '../common/Constants';
import {Icon} from 'native-base';
import ButtonRadius10 from '../components/ButtonRadius10';

const {width, height} = Dimensions.get('window');

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      tickIcon: 'cross',
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

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        {/* <ScrollView bounces={false} showsVerticalScrollIndicator={false}> */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Image source={Images.arrowBack} style={styles.iconBack} />
        </TouchableOpacity>
        <LightTextCB style={{fontSize: 30, marginTop: 30}}>
          {"Forgot Your Password?\nDon't worry."}
        </LightTextCB>
        <View style={styles.childContainer}>
          <LightTextCB style={[styles.formLabel, {marginTop: 20}]}>
            Email Address
          </LightTextCB>
          <View style={styles.textInputContainer}>
            <TextInput
              ref={'email'}
              placeholder={'Enter Email'}
              placeholderTextColor={Colors.grey}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              blurOnSubmit={true}
              keyboardType="email-address"
              returnKeyType={'done'}
              value={this.state.email}
              onChangeText={(text) => {
                this.validateEmail(text);
              }}
              style={[styles.textInput, {flex: 1}]}
            />
            <Icon
              type={'Entypo'}
              name={this.state.tickIcon}
              style={styles.iconPassword}
            />
          </View>
          <View style={{marginTop: 30}}>
            <ButtonRadius10 label="Send Email" />
          </View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
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
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 20,
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
    fontFamily: Constants.fontLight,
    color: Colors.black1,
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
});
