import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Images from '../common/Images';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';
import BoldTextCB from '../components/BoldTextCB';
import EditText from '../components/EditText';

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  validateEmail = (text) => {
    this.setState({email: text});

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
    } else {
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{marginStart: 15, alignSelf: 'flex-start'}}>
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
            Forgot Password
          </BoldTextCB>
          <RegularTextCB
            style={{fontSize: 18, color: Colors.coolGrey, textAlign: 'center'}}>
            Enter your email & we will send you a {'\n'} verification code
          </RegularTextCB>
        </View>
        <View style={[styles.childContainer]}>
          <View style={[styles.textInputContainer, {marginTop: 50}]}>
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
        </View>
        <View style={{marginVertical: 30, marginHorizontal: 15}}>
          <ButtonRadius10
            label="CONTINUE"
            bgColor={Colors.newGreen}
            onPress={() => this.props.navigation.navigate(Constants.otp)}
          />
        </View>
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
  },
  formLabel: {
    fontSize: 16,
    color: Colors.grey,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    color: Colors.black1,
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
});
