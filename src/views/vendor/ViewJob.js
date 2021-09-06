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

    // console.log('props Data ======',this.props.route.params.item.userProfile.image);
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
                    source={{uri:Constants.imageURL+this.props.route.params.item.user.userProfile.image}}
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
                    {this.props.route.params.item.user.name}
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
                  Tittle
                  {/* {this.props.route.params.item.title} */}
                </RegularTextCB>
                <LightTextCB
                  style={{
                    color: Colors.black,
                    fontSize: 12,
                  }}>
                  Price
                  {/* {this.props.route.params.item.price+'/'+this.props.route.params.item.time} */}
                </LightTextCB>
              </View>
              <RegularTextCB
                style={{
                  color: Colors.sickGreen,
                  fontSize: 12,
                }}>
                User Type
                {/* {this.props.route.params.item.user.type} */}
              </RegularTextCB>
              <RegularTextCB
                style={{
                  color: Colors.coolGrey,
                }}>
                Description
                {/* {this.props.route.params.item.description} */}
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
                  Location
                  {/* {this.props.route.params.item.location} */}
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
                  {this.props.route.params.item.time}
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
