import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Images from '../common/Images';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';
import BoldTextCB from '../components/BoldTextCB';

export default class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
  }

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
            Verification
          </BoldTextCB>
          <RegularTextCB
            style={{fontSize: 18, color: Colors.coolGrey, textAlign: 'center'}}>
            Enter your verification code that we sent{'\n'}you through your
            email or phone number
          </RegularTextCB>
        </View>
        <View style={[styles.childContainer]}>
          <View style={[styles.textInputContainer]}>
            <OTPInputView
              style={{width: '90%', height: 75, marginTop: 50}}
              pinCount={4}
              code={this.state.code}
              onCodeChanged={(code) => {
                this.setState({code});
              }}
              autoFocusOnLoad
              codeInputFieldStyle={styles.card}
              codeInputHighlightStyle={styles.card}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </View>
        </View>
        <View style={{marginVertical: 50, marginHorizontal: 15}}>
          <ButtonRadius10
            label="VERIFY"
            bgColor={Colors.sickGreen}
            onPress={() => this.props.navigation.naigate(Constants.login)}
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
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  card: {
    height: 65,
    width: 65,
    backgroundColor: Colors.white,
    borderColor: Colors.sickGreen,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: '#ccc',
    color: Colors.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    alignItems: 'center',
    fontFamily: Constants.fontRegular,
    fontSize: 24,
  },
});
