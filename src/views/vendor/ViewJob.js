import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Colors from '../../common/Colors';
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
      id: '5',
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
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 10}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={[styles.iconBack]} />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: 30}}>View Job</RegularTextCB>
        </View>
        <ScrollView>
          <View style={{marginBottom: 5}}>
            <View style={{padding: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={styles.circleCard}>
                  <Image
                    source={this.completedJobs[0].image}
                    style={styles.iconUser}
                  />
                </View>
                <View style={{marginStart: 10}}>
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
                      marginTop: 5,
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
                        marginStart: 5,
                      }}>
                      Verified
                    </RegularTextCB>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
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
                  marginTop: 5,
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.iconLocationPin}
                  style={{height: 17, width: 17, resizeMode: 'contain'}}
                />
                <RegularTextCB
                  style={{
                    color: Colors.coolGrey,
                    marginStart: 5,
                  }}>
                  {this.completedJobs[0].location}
                </RegularTextCB>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.iconStopWatch}
                  style={{height: 17, width: 17, resizeMode: 'contain'}}
                />
                <RegularTextCB
                  style={{
                    color: Colors.coolGrey,
                    marginStart: 5,
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
            <View style={{marginVertical: 30, marginHorizontal: 20}}>
              <ButtonRadius10
                label="CONTACT"
                bgColor={Colors.sickGreen}
                onPress={() => {}}
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
    height: 400,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconBack: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  circleCard: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
  carImage: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  carImageShadow: {
    height: 80,
    width: 80,
    borderRadius: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
  iconUser: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode: 'contain',
  },
});
