import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import BoldTextCB from '../components/BoldTextCB';
import RegularTextCB from '../components/RegularTextCB';

export default class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isUserSelected: false,
    isVendorSelected: false,
  };

  openSignUp(isVendor) {
    setTimeout(() => {
      this.props.navigation.navigate(Constants.signUp, {
        isVendor: isVendor,
      });
    }, 500);
  }

  render() {
    return (
      <SafeAreaView style={styles.main}>
        <Image source={Images.logoCashGrab} style={{height: 250, width: 250}} />
        <BoldTextCB style={{fontSize: 28, color: Colors.black}}>
          Create an account
        </BoldTextCB>
        <RegularTextCB style={{fontSize: 18, color: Colors.coolGrey}}>
          Which type of account would you like?
        </RegularTextCB>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              isUserSelected: true,
              isVendorSelected: false,
            });
            this.openSignUp(false);
          }}
          style={[
            styles.card,
            {
              marginTop: 20,
              paddingHorizontal: 25,
              borderWidth: this.state.isUserSelected ? 2 : 0,
            },
          ]}>
          <Image source={Images.becomeAUser} style={styles.circularImage} />
          <View style={{marginHorizontal: 15}}>
            <RegularTextCB style={{fontSize: 18, color: Colors.black}}>
              Become a user
            </RegularTextCB>
            <RegularTextCB style={{fontSize: 18, color: Colors.coolGrey}}>
              Lorem ipsum eluit fold sed, {'\n'}fludin gem
            </RegularTextCB>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              isUserSelected: false,
              isVendorSelected: true,
            });
            this.openSignUp(true);
          }}
          style={[
            styles.card,
            {
              marginTop: 20,
              paddingHorizontal: 25,
              borderWidth: this.state.isVendorSelected ? 2 : 0,
            },
          ]}>
          <Image source={Images.becomeAVendor} style={styles.circularImage} />
          <View style={{marginHorizontal: 15}}>
            <RegularTextCB style={{fontSize: 18, color: Colors.black}}>
              Become a vendor
            </RegularTextCB>
            <RegularTextCB style={{fontSize: 18, color: Colors.coolGrey}}>
              Lorem ipsum eluit fold sed, {'\n'}fludin gem
            </RegularTextCB>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderColor: Colors.sickGreen,
    borderRadius: 15,
    width: '90%',
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    padding: 15,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circularImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
});
