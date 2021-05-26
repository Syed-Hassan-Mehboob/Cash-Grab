import React, {Component} from 'react';
import RegularTextCB from '../components/RegularTextCB';
import Images from '../common/Images';
import Colors from '../common/Colors';
import {
  FlatList,
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ButtonRadius10 from '../components/ButtonRadius10';
import EditText from '../components/EditText';
import Constants from '../common/Constants';

const {height, width} = Dimensions.get('window');
const bs = React.createRef();
const fall = new Animated.Value(1);

export default class Home extends Component {
  categories = [
    {
      id: '1',
      image: Images.iconElectrician,
      title: 'Electrician',
    },
    {
      id: '2',
      image: Images.iconCleaning,
      title: 'Cleaning',
    },
    {
      id: '3',
      image: Images.iconRepair,
      title: 'Repair',
    },
    {
      id: '4',
      image: Images.iconAutomobile,
      title: 'Automobile',
    },
    // {
    //   id: '5',
    //   image: Images.iconMechanic,
    //   title: 'Mechanic',
    // },
  ];

  vendors = [
    {
      id: '1',
      image: Images.emp1,
      title: 'Ray Hammond',
      type: 'Car Mechanic, NY (2km)',
      ratings: '1.0 ratings',
    },
    {
      id: '2',
      image: Images.emp2,
      title: 'Jay Almond',
      type: 'Car Wash, NY (1km)',
      ratings: '1.1 ratings',
    },
    {
      id: '3',
      image: Images.emp3,
      title: 'Ray Hammond',
      type: 'Puncture, NY (1.2km)',
      ratings: '1.2 ratings',
    },
    {
      id: '4',
      image: Images.emp4,
      title: 'Jay Almond',
      type: 'Plumber, NY (0.2km)',
      ratings: '1.3 ratings',
    },
    {
      id: '5',
      image: Images.emp1,
      title: 'Ray Hammond',
      type: 'Bike Electrician, NY (0.5km)',
      ratings: '1.4 ratings',
    },
  ];

  urgentServices = [
    {
      id: '1',
      image: Images.emp1,
      name: 'Ray Hammond',
      title: 'Home Renovation',
      type: 'Lorem ipsum',
      ratings: '1.0 ratings',
    },
    {
      id: '2',
      image: Images.emp2,
      name: 'Ray Hammond',
      title: 'Car Mechanic',
      type: 'Lorem ipsum',
      ratings: '1.0 ratings',
    },
    {
      id: '3',
      image: Images.emp3,
      name: 'Ray Hammond',
      title: 'Home Renovation',
      type: 'Lorem ipsum',
      ratings: '1.0 ratings',
    },
    {
      id: '4',
      image: Images.emp1,
      name: 'Ray Hammond',
      title: 'Car Mechanic',
      type: 'Lorem ipsum',
      ratings: '1.0 ratings',
    },
    {
      id: '5',
      image: Images.emp2,
      name: 'Ray Hammond',
      title: 'Home Renovation',
      type: 'Lorem ipsum',
      ratings: '1.0 ratings',
    },
    {
      id: '6',
      image: Images.emp1,
      name: 'Ray Hammond',
      title: 'Car Mechanic',
      type: 'Lorem ipsum',
      ratings: '1.0 ratings',
    },
  ];

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  constructor(props) {
    super(props);
    this.state = {
      service: '',
      rateRequested: '',
      location: '',
      address: '',
      exactTime: '',
    };
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  renderBottomSheetHeader = () => {
    return (
      <View style={styles.bottomSheetHeader}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    );
  };

  renderBottomSheetContent = () => {
    return (
      <ScrollView style={styles.bottomSheetBody}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <RegularTextCB style={{fontSize: 16, color: Colors.sickGreen}}>
            Quick Service
          </RegularTextCB>
          <TouchableOpacity
            onPress={() => {
              bs.current.snapTo(1);
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
        <View style={[styles.textInputContainer, {marginTop: 10}]}>
          <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
            Select Service
          </RegularTextCB>
          <EditText
            ref={'service'}
            placeholder={'Select Service'}
            value={this.state.service}
            onChangeText={(text) => {
              this.setState({
                service: text,
              });
            }}
            style={[styles.textInput]}
          />
        </View>
        <View style={[styles.textInputContainer, {marginTop: 20}]}>
          <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
            Rate Requested
          </RegularTextCB>
          <EditText
            ref={'rate'}
            placeholder={'Enter Rate'}
            value={this.state.rateRequested}
            onChangeText={(text) => {
              this.setState({
                rateRequested: text,
              });
            }}
            style={[styles.textInput]}
          />
        </View>
        <View style={[styles.textInputContainer, {marginTop: 20}]}>
          <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
            Location
          </RegularTextCB>
          <EditText
            ref={'location'}
            placeholder={'Enter Location'}
            value={this.state.location}
            onChangeText={(text) => {
              this.setState({
                location: text,
              });
            }}
            style={[styles.textInput]}
          />
        </View>
        <View style={[styles.textInputContainer, {marginTop: 20}]}>
          <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
            Address
          </RegularTextCB>
          <EditText
            ref={'address'}
            placeholder={'Enter Address'}
            value={this.state.address}
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
            style={[styles.textInput]}
          />
        </View>
        <View style={[styles.textInputContainer, {marginTop: 20}]}>
          <RegularTextCB style={{fontSize: 14, color: Colors.black}}>
            Exact Time
          </RegularTextCB>
          <EditText
            ref={'exact_time'}
            placeholder={'Enter Exact Time'}
            value={this.state.exactTime}
            onChangeText={(text) => {
              this.setState({
                exactTime: text,
              });
            }}
            style={[styles.textInput]}
          />
        </View>
        <View style={{marginTop: 30, paddingBottom: 80, marginHorizontal: 10}}>
          <ButtonRadius10
            bgColor={Colors.sickGreen}
            label="QUICK NOTIFY"
            onPress={() => bs.current.snapTo(1)}
          />
        </View>
      </ScrollView>
    );
  };

  renderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate(Constants.singleCategory, {
            item: item,
          })
        }
        style={{alignItems: 'center'}}>
        <Image style={styles.circle} source={item.image} />
        <RegularTextCB
          style={{fontSize: 14, marginTop: -20, color: Colors.coolGrey}}>
          {item.title}
        </RegularTextCB>
      </TouchableOpacity>
    );
  };

  renderVendorsAroundYouItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          {padding: 10, marginHorizontal: 15, marginBottom: 20, marginTop: 5},
        ]}
        onPress={() =>
          this.props.navigation.navigate(Constants.viewVendorProfile)
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.circleCard}>
            <Image source={item.image} style={styles.iconUser} />
          </View>
          <RegularTextCB
            style={{
              color: Colors.black,
              textDecorationLine: 'underline',
              marginStart: 5,
              fontSize: 14,
            }}>
            View Profile
          </RegularTextCB>
        </View>
        <RegularTextCB
          style={{
            color: Colors.black,
            marginTop: 10,
            fontSize: 14,
          }}>
          {item.title}
        </RegularTextCB>
        <View style={{flexDirection: 'row', marginTop: 5}}>
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
        <RegularTextCB
          style={{
            color: Colors.coolGrey,
            marginTop: 5,
          }}>
          {item.type}
        </RegularTextCB>
        <RegularTextCB
          style={{
            color: Colors.orangeYellow,
            marginTop: 5,
          }}>
          {item.ratings}
        </RegularTextCB>
      </TouchableOpacity>
    );
  };

  renderUrgentServicesItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          {
            padding: 10,
            paddingBottom: 30,
            marginHorizontal: 15,
            marginTop: 5,
            marginBottom: 40,
          },
        ]}
        onPress={() =>
          this.props.navigation.navigate(Constants.viewVendorProfile)
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.circleCard}>
            <Image source={item.image} style={styles.iconUser} />
          </View>
          <RegularTextCB
            style={{
              color: Colors.black,
              textDecorationLine: 'underline',
              marginStart: 5,
              fontSize: 14,
            }}>
            View Profile
          </RegularTextCB>
        </View>
        <RegularTextCB
          style={{
            color: Colors.black,
            marginTop: 10,
            fontSize: 14,
          }}>
          {item.name}
        </RegularTextCB>
        <RegularTextCB
          style={{
            color: Colors.coolGrey,
            marginTop: 5,
          }}>
          {item.title}
        </RegularTextCB>
        <RegularTextCB
          style={{
            color: Colors.orangeYellow,
            marginTop: 5,
          }}>
          {item.ratings}
        </RegularTextCB>
        <Image
          source={Images.circularArrowForward}
          style={{
            height: 50,
            width: 50,
            position: 'absolute',
            bottom: -25,
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
    );
  };

  animatedShadowOpacity = Animated.interpolate(fall, {
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                paddingHorizontal: 20,
                marginTop: 20,
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() =>
                  this.props.navigation.navigate(Constants.profile)
                }>
                <View style={styles.circleCard}>
                  <Image source={Images.emp1} style={styles.iconUser} />
                </View>
                <RegularTextCB style={{fontSize: 16, marginStart: 10}}>
                  Welcome,
                </RegularTextCB>
                <RegularTextCB
                  style={{
                    fontSize: 16,
                    marginStart: 3,
                    color: Colors.sickGreen,
                  }}>
                  Damien
                </RegularTextCB>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate(Constants.filter);
                }}
                style={{
                  position: 'absolute',
                  right: 20,
                }}>
                <Image
                  source={Images.iconHamburger}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                marginVertical: 10,
                paddingStart: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate(Constants.search)}>
              <RegularTextCB style={{fontSize: 16, color: Colors.coolGrey}}>
                Search Service...
              </RegularTextCB>
              <Image
                source={Images.iconSearch}
                style={{height: 80, width: 80}}
              />
            </TouchableOpacity>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RegularTextCB
                style={{
                  fontSize: 20,
                  color: Colors.black,
                }}>
                Browse categories
              </RegularTextCB>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(Constants.allCategories)
                }>
                <RegularTextCB
                  style={{
                    color: Colors.black,
                    textDecorationLine: 'underline',
                  }}>
                  See All
                </RegularTextCB>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={this.categories}
              keyExtractor={(item) => item.id}
              renderItem={this.renderCategoryItem}
              showsHorizontalScrollIndicator={false}
              contentInset={{
                // for ios
                top: 0,
                bottom: 0,
                left: 10,
                right: 10,
              }}
              contentContainerStyle={{
                // for android
                paddingHorizontal: Platform.OS === 'android' ? 10 : 0,
              }}
            />
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RegularTextCB
                style={{
                  fontSize: 20,
                  color: Colors.black,
                }}>
                Vendors Around You
              </RegularTextCB>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(Constants.nearby)
                }>
                <RegularTextCB
                  style={{
                    color: Colors.black,
                    textDecorationLine: 'underline',
                  }}>
                  See All
                </RegularTextCB>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={this.vendors}
              keyExtractor={(item) => item.id}
              renderItem={this.renderVendorsAroundYouItem}
              showsHorizontalScrollIndicator={false}
            />
            <RegularTextCB
              style={{fontSize: 20, marginTop: 10, paddingHorizontal: 20}}>
              Top Services
            </RegularTextCB>
            <FlatList
              style={{paddingBottom: 100}}
              numColumns={2}
              data={this.urgentServices}
              keyExtractor={(item) => item.id}
              renderItem={this.renderUrgentServicesItem}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: Colors.navy,
            borderRadius: 10,
            position: 'absolute',
            bottom: 15,
            right: 15,
          }}
          onPress={() => {
            bs.current.snapTo(0);
          }}>
          <RegularTextCB style={{color: Colors.white}}>
            Quick Service
          </RegularTextCB>
        </TouchableOpacity>
        <BottomSheet
          ref={bs}
          snapPoints={[height / 1.2, 0]}
          initialSnap={1}
          callbackNode={fall}
          renderContent={this.renderBottomSheetContent}
          enabledGestureInteraction={true}
        />
        <Animated.View
          pointerEvents="none"
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: Colors.silver,
              opacity: this.animatedShadowOpacity,
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  textInputContainer: {
    marginHorizontal: 10,
    height: 70,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    color: Colors.black1,
  },
  iconUser: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode: 'contain',
  },
  circle: {
    height: 120,
    width: 120,
    resizeMode: 'stretch',
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
