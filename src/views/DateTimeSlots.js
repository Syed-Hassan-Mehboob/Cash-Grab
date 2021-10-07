import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  TextInput,
  Switch,
  Platform,
  Text,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Slider from '@react-native-community/slider';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import Colors from '../common/Colors';
import Constants, {FONTS, SIZES} from '../common/Constants';
import ButtonRadius10 from '../components/ButtonRadius10';
import MessageEditText from '../components/MessageEditText';

const {height, width} = Dimensions.get('window');

export default class DateTimeSlots extends Component {
  timeDurations = [
    {
      id: '1',
      time: '2:30',
      unit: 'PM',
    },
    {
      id: '2',
      time: '3:00',
      unit: 'PM',
    },
    {
      id: '3',
      time: '3:30',
      unit: 'PM',
    },
    {
      id: '4',
      time: '4:00',
      unit: 'PM',
    },
    {
      id: '5',
      time: '4:30',
      unit: 'PM',
    },
    {
      id: '6',
      time: '5:00',
      unit: 'PM',
    },
    {
      id: '7',
      time: '5:30',
      unit: 'PM',
    },
    {
      id: '8',
      time: '6:00',
      unit: 'PM',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      selectedTimeSlot: '',
      sliderValue: 0,
      isSwitchEnabled: false,
      hrFrom: '',
      minFrom: '',
      hrTo: '',
      minTo: '',
    };
  }

  onDayPress = (day) => {
    console.log('day press===============>>>>', day);
    this.setState(
      {
        selected: day.dateString,
      },
      () => {
        console.log('state callback day press===============>>>>', day);
      },
    );
  };

  selectTimeSlot = (slot) => {
    this.setState({selectedTimeSlot: slot});
  };

  renderTimeSlotItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={
          this.state.selectedTimeSlot === item.time
            ? styles.selectedTimeBG
            : styles.unSelectedTimeBG
        }
        onPress={() => this.selectTimeSlot(item.time)}>
        <RegularTextCB>{item.time}</RegularTextCB>
        <RegularTextCB>{item.unit}</RegularTextCB>
      </TouchableOpacity>
    );
  };

  toggleIsEnabled = () =>
    this.setState({isSwitchEnabled: !this.state.isSwitchEnabled});

  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: SIZES.fifteen,
            marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: SIZES.ten}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={[styles.iconBack]} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <View style={styles.circleCard}>
              <Image source={Images.emp1} style={styles.iconUser} />
            </View>
            <RegularTextCB style={{fontSize: 14}}>Damian Miller</RegularTextCB>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.fifteen,
            alignItems: 'center',
          }}>
          <Image
            source={Images.iconRepairing}
            style={{height: 35, width: 35, resizeMode: 'contain'}}
          />
          <View style={{marginStart: SIZES.ten}}>
            <RegularTextCB style={{fontSize: 16, color: Colors.black}}>
              Repairing
            </RegularTextCB>
            <RegularTextCB style={{fontSize: 14, color: Colors.coolGrey}}>
              3 AC split units maintenace
            </RegularTextCB>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            marginHorizontal: SIZES.fifteen,
          }}>
          <Image
            source={Images.iconCalendar}
            style={{
              width: SIZES.twentyFive,
              height: SIZES.twentyFive,
              resizeMode: 'contain',
            }}
          />
          <Calendar
            firstDay={1}
            minDate={new Date()}
            monthFormat={'MMM yyyy'}
            disabledByDefault={true}
            hideExtraDays
            onDayPress={this.onDayPress}
            markingType={'custom'}
            renderrArow={(direction) =>
              direction === 'left' ? (
                <Image
                  source={Images.arrowBack}
                  style={{
                    height: SIZES.twenty,
                    width: SIZES.twenty,
                    resizeMode: 'contain',
                  }}
                />
              ) : (
                <Image
                  source={Images.arrowBack}
                  style={{
                    transform: [{scaleX: -1}],
                    height: SIZES.twenty,
                    width: SIZES.twenty,
                    resizeMode: 'contain',
                  }}
                />
              )
            }
            markedDates={{
              [this.state.selected]: {
                customStyles: {
                  container: styles.selectedDateBG,
                  text: {
                    color: Colors.white,
                    fontFamily: Constants.fontRegular,
                  },
                },
              },
            }}
            theme={{
              textDayFontFamily: Constants.fontRegular,
              textMonthFontFamily: Constants.fontRegular,
              textDayHeaderFontFamily: Constants.fontRegular,
              color: Colors.black,
              dayTextColor: Colors.navy,
              monthTextColor: Colors.navy,
            }}
            style={{
              width: width / 1.15,
              height: height / 2,
              color: Colors.black,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            marginHorizontal: SIZES.fifteen,
            marginTop: SIZES.ten * 3,
          }}>
          <Image
            source={Images.iconStopWatchGrey}
            style={{
              width: SIZES.twentyFive,
              height: SIZES.twentyFive,
              resizeMode: 'contain',
            }}
          />
          <View
            style={{
              borderWidth: 2,
              borderRadius: SIZES.ten,
              marginStart: SIZES.twenty,
              borderColor: Colors.sickGreen,
            }}>
            <FlatList
              horizontal
              data={this.timeDurations}
              extraData={this.state.selectedTimeSlot}
              keyExtractor={(timeSlot) => timeSlot.id}
              renderItem={this.renderTimeSlotItem}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingEnd: SIZES.fifty,
              }}
            />
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: SIZES.fifteen,
            alignSelf: 'flex-end',
            marginTop: SIZES.fifteen,
          }}>
          <RegularTextCB style={{fontSize: 14}}>
            {this.state.sliderValue}
          </RegularTextCB>
          <Slider
            style={{
              width: width / 1.3,
              height: 55,
              marginStart: SIZES.ten,
            }}
            minimumValue={0}
            maximumValue={340}
            minimumTrackTintColor={Colors.silver}
            maximumTrackTintColor={Colors.silver}
            thumbImage={Images.sliderThumb}
            onValueChange={(number) =>
              this.setState({sliderValue: parseInt(number)})
            }
          />
        </View> */}
        <Text
          style={[
            FONTS.mediumFont16,
            {marginHorizontal: SIZES.fifteen, marginTop: SIZES.fifteen * 1.8},
          ]}>
          Add Custom Time
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: SIZES.fifteen,
            flex: 1,
            marginTop: SIZES.fifteen,
          }}>
          <View
            style={[
              styles.card,
              {borderWidth: 2, borderColor: Colors.sickGreen, flex: 1},
            ]}>
            <View style={{alignItems: 'center'}}>
              <RegularTextCB style={{fontSize: 12, color: Colors.coolGrey}}>
                From
              </RegularTextCB>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  placeholderTextColor={Colors.black}
                  placeholder={'Hr'}
                  style={styles.textInput}
                  maxLength={2}
                  value={this.state.hrFrom}
                  keyboardType={'numeric'}
                  onChangeText={(text) =>
                    this.setState({hrFrom: text.replace(/[^0-9]/g, '')})
                  }
                />
                <TextInput
                  placeholderTextColor={Colors.black}
                  placeholder={'Min'}
                  style={styles.textInput}
                  maxLength={2}
                  keyboardType={'numeric'}
                  value={this.state.minFrom}
                  onChangeText={(text) =>
                    this.setState({minFrom: text.replace(/[^0-9]/g, '')})
                  }
                />
              </View>
            </View>
          </View>
          <View
            style={[
              styles.card,
              {borderWidth: 2, borderColor: Colors.sickGreen, flex: 1},
            ]}>
            <View style={{alignItems: 'center'}}>
              <RegularTextCB style={{fontSize: 12, color: Colors.coolGrey}}>
                To
              </RegularTextCB>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  placeholderTextColor={Colors.black}
                  placeholder={'Hr'}
                  placeholderTextColor={Colors.black}
                  style={styles.textInput}
                  maxLength={2}
                  value={this.state.hrTo}
                  keyboardType={'numeric'}
                  onChangeText={(text) =>
                    this.setState({hrTo: text.replace(/[^0-9]/g, '')})
                  }
                />
                <TextInput
                  placeholderTextColor={Colors.black}
                  placeholder={'Min'}
                  style={styles.textInput}
                  maxLength={2}
                  value={this.state.hrMin}
                  keyboardType={'numeric'}
                  onChangeText={(text) =>
                    this.setState({hrMin: text.replace(/[^0-9]/g, '')})
                  }
                />
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={[
              FONTS.mediumFont16,
              {
                paddingHorizontal: SIZES.fifteen,
                marginVertical: SIZES.twenty,
              },
            ]}>
            Description
          </Text>
          <View style={{paddingHorizontal: SIZES.fifteen}}>
            <MessageEditText
              placeholder={'Write'}
              height={SIZES.twentyFive * 4.5}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: SIZES.fifteen,
            marginVertical: SIZES.fifteen * 1.6,
          }}>
          <Image
            source={Images.barHome}
            style={{
              height: SIZES.twentyFive,
              width: SIZES.twentyFive,
              resizeMode: 'contain',
              tintColor: Colors.coolGrey,
            }}
          />
          <View style={{marginHorizontal: SIZES.ten, flex: 1}}>
            <RegularTextCB style={{fontSize: 16, color: Colors.black}}>
              Get service at home
            </RegularTextCB>
            <RegularTextCB style={{fontSize: 14, color: Colors.coolGrey}}>
              Set this service at my place
            </RegularTextCB>
          </View>
          <Switch
            trackColor={{
              false: Colors.lightGrey,
              true: Colors.lighNewGreen,
            }}
            thumbColor={
              this.state.isSwitchEnabled ? Colors.sickGreen : Colors.sickGreen
            }
            ios_backgroundColor={Colors.lightGrey}
            onValueChange={this.toggleIsEnabled}
            value={this.state.isSwitchEnabled}
          />
        </View>
        <View
          style={{
            marginVertical: SIZES.ten * 3,
            marginHorizontal: SIZES.fifteen,
          }}>
          <ButtonRadius10
            label="NEXT"
            bgColor={Colors.sickGreen}
            onPress={() =>
              this.props.navigation.navigate(Constants.bookingConfirmed)
            }
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    padding: SIZES.twenty,
    margin: SIZES.ten,
    borderColor: Colors.sickGreen,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  circleCard: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    borderRadius: SIZES.twentyFive,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  selectedDateBG: {
    height: SIZES.ten * 3,
    width: SIZES.ten * 3,
    padding: 2,
    backgroundColor: Colors.sickGreen,
    borderRadius: SIZES.fifteen,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  selectedTimeBG: {
    paddingHorizontal: SIZES.fifteen,
    paddingVertical: SIZES.fifteen,
    marginHorizontal: SIZES.five,
    marginVertical: SIZES.five,
    backgroundColor: Colors.sickGreen,
    borderRadius: SIZES.fifteen,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    alignItems: 'center',
    elevation: SIZES.ten,
    marginBottom: SIZES.fifteen,
  },
  unSelectedTimeBG: {
    paddingHorizontal: SIZES.fifteen,
    paddingVertical: SIZES.fifteen,
    borderRadius: SIZES.fifteen,
    marginHorizontal: SIZES.five,
    marginVertical: SIZES.five,
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginBottom: SIZES.fifteen,
  },
  iconUser: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    borderRadius: SIZES.twentyFive,
    resizeMode: 'contain',
  },
  textInput: {
    fontSize: 16,
    fontFamily: Constants.fontBold,
    color: Colors.black,
    borderColor: Colors.sickGreen,
    borderBottomWidth: SIZES.five,
    margin: SIZES.five,
    flex: 1,
    textAlign: 'center',
  },
  selector: {
    backgroundColor: Colors.sickGreen,
    borderRadius: SIZES.ten,
    flex: 1,
  },
  unselector: {
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    flex: 1,
  },
});
