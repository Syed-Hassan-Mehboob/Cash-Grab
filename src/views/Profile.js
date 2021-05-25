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
            borderBottomStartRadius: 30,
            borderBottomEndRadius: 30,
            height: height / 2.15,
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
          </View>
          <View style={styles.circleCard}>
            <Image source={Images.emp1} style={styles.iconUser} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Image
              source={Images.iconVerified}
              style={{height: 15, width: 15, resizeMode: 'contain'}}
            />
            <RegularTextCB
              style={{
                color: Colors.turqoiseGreen,
                fontSize: 14,
                marginStart: 5,
              }}>
              Verified
            </RegularTextCB>
          </View>
          <RegularTextCB
            style={{color: Colors.white, fontSize: 18, marginTop: 5}}>
            Damian Santosa
          </RegularTextCB>
          <RegularTextCB
            style={{
              color: Colors.coolGrey,
              fontSize: 16,
              textAlign: 'center',
              marginTop: 5,
            }}>
            Hello there i am a professional car mechanic,{'\n'}I have 8 years of
            experience so feel free{'\n'}to contact me.
          </RegularTextCB>
        </View>
        <View
          style={[
            styles.card,
            {marginHorizontal: 20, marginTop: -20, padding: 20},
          ]}>
          <View
            style={[
              styles.card,
              {
                marginTop: -40,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderColor: Colors.sickGreen,
              },
            ]}>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              Description
            </RegularTextCB>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: 10,
            }}>
            <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
              User Name
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              Damian Santosa
            </RegularTextCB>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: 10,
            }}>
            <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
              Email Address
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              damian@gmail.com
            </RegularTextCB>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: 10,
            }}>
            <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
              Email Address
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              +1(239) 555-01089
            </RegularTextCB>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: 10,
            }}>
            <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
              Location
            </RegularTextCB>
            <RegularTextCB style={{color: Colors.black, fontSize: 16}}>
              New York, USA
            </RegularTextCB>
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
