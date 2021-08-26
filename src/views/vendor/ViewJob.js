import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Colors from '../../common/Colors';
import Constants, { SIZES } from '../../common/Constants';
import Images from '../../common/Images';
import ButtonRadius10 from '../../components/ButtonRadius10';
import LightTextCB from '../../components/LightTextCB';
import RegularTextCB from '../../components/RegularTextCB';
export default class ViewJob extends React.Component {
  completedJobs = [
    {
      id: '1',
      image: Images.emp1,
      title: 'Ray Hammond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: '2',
      image: Images.emp2,
      title: 'Jay Almond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: '3',
      image: Images.emp3,
      title: 'Ray Hammond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: '4',
      image: Images.emp4,
      title: 'Jay Almond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: 'SIZES.five',
      image: Images.emp1,
      title: 'Ray Hammond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: '6',
      image: Images.emp3,
      title: 'Ray Hammond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: '7',
      image: Images.emp4,
      title: 'Jay Almond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
    {
      id: '8',
      image: Images.emp1,
      title: 'Ray Hammond',
      desc:
        'Looking for a car mechanic that can look into the battery setup. The car is in a still position & would require some man power',
      pricing: '$24/Hr',
      requirement: 'Car Mechanic Needed',
      type: 'Automobile',
      location: '111, NYC Street, NY 121',
      time: '12:00-3:00',
    },
  ];

  initialMapState = {
    region: {
      latitude: 24.9050562,
      longitude: 67.0785654,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  constructor(props) {
    super(props);
  }

  state = {
    region: this.initialMapState.region,
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: 15,
            marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: SIZES.ten}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={[styles.iconBack]} />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: SIZES.ten*3}}>View Job</RegularTextCB>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: SIZES.five}}>
            <View style={{padding: SIZES.twenty}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={styles.circleCard}>
                  <Image
                    source={this.completedJobs[0].image}
                    style={styles.iconUser}
                    resizeMode="cover"
                  />
                </View>
                <View style={{marginStart: SIZES.ten}}>
                  <RegularTextCB
                    style={{
                      color: Colors.black,
                      fontSize: 16,
                    }}>
                    {this.completedJobs[0].title}
                  </RegularTextCB>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: SIZES.five,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={Images.iconVerified}
                      style={{height: 15, width: 15, resizeMode: 'contain'}}
                    />
                    <RegularTextCB
                      style={{
                        color: Colors.turqoiseGreen,
                        fontSize: 12,
                        marginStart: SIZES.five,
                      }}>
                      Verified
                    </RegularTextCB>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.five,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <RegularTextCB
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                  }}>
                  {this.completedJobs[0].requirement}
                </RegularTextCB>
                <LightTextCB
                  style={{
                    color: Colors.black,
                    fontSize: 12,
                  }}>
                  {this.completedJobs[0].pricing}
                </LightTextCB>
              </View>
              <RegularTextCB
                style={{
                  color: Colors.sickGreen,
                  fontSize: 12,
                }}>
                {this.completedJobs[0].type}
              </RegularTextCB>
              <RegularTextCB
                style={{
                  color: Colors.coolGrey,
                }}>
                {this.completedJobs[0].desc}
              </RegularTextCB>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.five,
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.iconLocationPin}
                  style={{height: 17, width: 17, resizeMode: 'contain'}}
                />
                <RegularTextCB
                  style={{
                    color: Colors.coolGrey,
                    marginStart: SIZES.five,
                  }}>
                  {this.completedJobs[0].location}
                </RegularTextCB>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.five,
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.iconStopWatch}
                  style={{height: 17, width: 17, resizeMode: 'contain'}}
                />
                <RegularTextCB
                  style={{
                    color: Colors.coolGrey,
                    marginStart: SIZES.five,
                  }}>
                  {this.completedJobs[0].time}
                </RegularTextCB>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <View>
                  <Image source={Images.car1} style={styles.carImage} />
                </View>
                <View>
                  <Image source={Images.car2} style={styles.carImage} />
                </View>
                <View>
                  <Image source={Images.car3} style={styles.carImage} />
                </View>
              </View>
            </View>
            <MapView
              provider={PROVIDER_GOOGLE}
              initialRegion={this.state.region}
              showsUserLocation={true}
              showsMyLocationButton={false}
              zoomEnabled={false}
              style={styles.mapStyle}
            />
            <View style={{marginVertical: SIZES.ten*3, marginHorizontal: SIZES.twenty}}>
              <ButtonRadius10
                label="CONTACT"
                bgColor={Colors.sickGreen}
                onPress={() => {
                  this.props.navigation.navigate(Constants.chat);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mapStyle: {
    height:SIZES.ten*40,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.twenty,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    elevation: SIZES.ten,
  },
  circleCard: {
    height: SIZES.ten*6,
    width: SIZES.ten*6,
    borderRadius: SIZES.ten*3,
    shadowColor: '#c5c5c5',
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  carImage: {
    height: SIZES.fifty*3,
    width: SIZES.fifty*3,
    resizeMode: 'contain',
  },
  carImageShadow: {
    height: SIZES.ten*8,
    width: SIZES.ten*8,
    borderRadius: SIZES.ten,
    shadowColor: '#c5c5c5',
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  iconUser: {
    height: SIZES.ten*6,
    width: SIZES.ten*6,
    borderRadius: SIZES.ten*6 / 2,
    resizeMode: 'contain',
  },
});
