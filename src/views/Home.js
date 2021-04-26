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
} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ButtonRadius10 from '../components/ButtonRadius10';
import Constants from '../common/Constants';

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
    {
      id: '5',
      image: Images.iconMechanic,
      title: 'Mechanic',
    },
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
      title: 'Home Renovation',
      type: 'Lorem ipsum',
    },
    {
      id: '2',
      image: Images.emp2,
      title: 'Car Mechanic',
      type: 'Lorem ipsum',
    },
    {
      id: '3',
      image: Images.emp3,
      title: 'Home Renovation',
      type: 'Lorem ipsum',
    },
    {
      id: '4',
      image: Images.emp1,
      title: 'Car Mechanic',
      type: 'Lorem ipsum',
    },
    {
      id: '5',
      image: Images.emp2,
      title: 'Home Renovation',
      type: 'Lorem ipsum',
    },
    {
      id: '6',
      image: Images.emp1,
      title: 'Car Mechanic',
      type: 'Lorem ipsum',
    },
  ];

  constructor(props) {
    super(props);
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
      <View style={styles.bottomSheetBody}>
        <RegularTextCB style={{fontSize: 30}}>Upload Photo</RegularTextCB>
        <RegularTextCB style={{fontSize: 16, color: Colors.grey}}>
          Upload a photo from
        </RegularTextCB>
        <View style={{marginTop: 30}}>
          <ButtonRadius10
            bgColor={Colors.sickGreen}
            label="CAMERA"
            onPress={() => bs.current.snapTo(1)}
          />
        </View>
        <View style={{marginTop: 20}}>
          <ButtonRadius10
            bgColor={Colors.sickGreen}
            label="GALLERY"
            onPress={() => bs.current.snapTo(1)}
          />
        </View>
        <View style={{marginTop: 20}}>
          <ButtonRadius10
            bgColor={Colors.sickGreen}
            label="CANCEL"
            onPress={() => bs.current.snapTo(1)}
          />
        </View>
      </View>
    );
  };

  renderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Nearby')}
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
      <View
        style={[
          styles.card,
          {padding: 20, marginHorizontal: 15, marginBottom: 20, marginTop: 5},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.circleCard}>
            <Image source={item.image} style={styles.iconUser} />
          </View>
          <TouchableOpacity>
            <RegularTextCB
              style={{
                color: Colors.black,
                textDecorationLine: 'underline',
                marginStart: 15,
                fontSize: 16,
              }}>
              View Profile
            </RegularTextCB>
          </TouchableOpacity>
        </View>
        <RegularTextCB
          style={{
            color: Colors.black,
            marginTop: 10,
            fontSize: 16,
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
      </View>
    );
  };

  renderUrgentServicesItem = ({item}) => {
    return (
      <View
        style={[
          styles.card,
          {
            padding: 20,
            marginHorizontal: 15,
            marginTop: 5,
            marginBottom: 40,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.circleCard}>
            <Image source={item.image} style={styles.iconUser} />
          </View>
          <TouchableOpacity>
            <RegularTextCB
              style={{
                color: Colors.black,
                textDecorationLine: 'underline',
                marginStart: 15,
                fontSize: 16,
              }}>
              View Profile
            </RegularTextCB>
          </TouchableOpacity>
        </View>
        <RegularTextCB
          style={{
            color: Colors.black,
            marginTop: 10,
            fontSize: 16,
          }}>
          {item.title}
        </RegularTextCB>
        <RegularTextCB
          style={{
            color: Colors.coolGrey,
            marginTop: 5,
          }}>
          {item.type}
        </RegularTextCB>
        <Image
          source={Images.circularArrowForward}
          style={{
            height: 100,
            width: 100,
            position: 'absolute',
            bottom: -60,
            alignSelf: 'center',
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            flex: 1,
            opacity: Animated.add(0.5, Animated.multiply(fall, 1.0)),
          }}>
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
                }}>
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
                Urgent Services
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
              bottom: 75,
              right: 15,
              shadowColor: '#ccc',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 10,
            }}
            onPress={() => {}}>
            <RegularTextCB style={{color: Colors.white}}>
              Quick Service
            </RegularTextCB>
          </TouchableOpacity>
          <BottomSheet
            ref={bs}
            snapPoints={[450, 0]}
            initialSnap={1}
            callbackNode={fall}
            renderContent={this.renderBottomSheetContent}
            renderHeader={this.renderBottomSheetHeader}
            enabledGestureInteraction={true}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
  bottomSheetHeader: {
    backgroundColor: Colors.white,
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: 20,
  },
});
