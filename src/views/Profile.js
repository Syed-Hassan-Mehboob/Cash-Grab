import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';

const {width, height} = Dimensions.get('window');

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            borderBottomStartRadius: 30,
            borderBottomEndRadius: 30,
            height: height / 2,
            backgroundColor: Colors.navy,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 15,
          }}>
          <RegularTextCB style={{fontSize: 30, color: Colors.white}}>
            Profile
          </RegularTextCB>
          <TouchableOpacity
            style={{position: 'absolute', right: 10}}
            onPress={() => {
              this.props.navigation.navigate(Constants.editProfile);
            }}>
            <Image
              source={Images.iconEdit}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <View style={styles.card}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <RegularTextCB style={{color: Colors.coolGrey}}>
                User Name
              </RegularTextCB>
              <RegularTextCB style={{color: Colors.black}}>
                Damian Santosa
              </RegularTextCB>
            </View>
          </View>
        </View>
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
  card: {
    flexDirection: 'row',
    height: 60,
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
});
