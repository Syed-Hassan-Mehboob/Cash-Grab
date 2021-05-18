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
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Slider from '@react-native-community/slider';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import ButtonRadius10 from '../components/ButtonRadius10';

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
    this.setState(
      {
        selected: day.dateString,
      },
      () => {
        console.log('selected: ' + this.state.selected);
      },
    );
  };

  selectTimeSlot = (slot) => {
    this.setState({selectedTimeSlot: slot}, () => console.log(slot));
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
      <ScrollView style={styles.container}>
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
            paddingHorizontal: 15,
            alignItems: 'center',
          }}>
          <Image
            source={Images.iconRepairing}
            style={{height: 35, width: 35, resizeMode: 'contain'}}
          />
          <View style={{marginStart: 10}}>
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
            marginHorizontal: 15,
          }}>
          <Image
            source={Images.iconCalendar}
            style={{width: 25, height: 25, resizeMode: 'contain'}}
          />
          <Calendar
            firstDay={1}
            minDate={new Date()}
            monthFormat={'MMM yyyy'}
            disabledByDefault={true}
            onDayPress={this.onDayPress}
            markingType={'custom'}
            renderArrow={(direction) =>
              direction === 'left' ? (
                <Image
                  source={Images.arrowBack}
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                />
              ) : (
                <Image
                  source={Images.arrowBack}
                  style={{
                    transform: [{scaleX: -1}],
                    height: 20,
                    width: 20,
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
              dayTextColor: Colors.navy,
              monthTextColor: Colors.navy,
            }}
            style={{width: width / 1.15, height: height / 2}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            marginHorizontal: 15,
            marginTop: 30,
          }}>
          <Image
            source={Images.iconStopWatchGrey}
            style={{width: 25, height: 25, resizeMode: 'contain'}}
          />
          <View
            style={{
              borderWidth: 2,
              borderRadius: 10,
              marginStart: 20,
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
                paddingEnd: 50,
                borderRadius: 6,
                borderWidth: 5,
                overflow: 'hidden',
                borderColor: Colors.sickGreen,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            alignSelf: 'flex-end',
            marginTop: 15,
          }}>
          <RegularTextCB style={{fontSize: 14}}>
            {this.state.sliderValue}
          </RegularTextCB>
          <Slider
            style={{width: width / 1.3, height: 75, marginStart: 10}}
            minimumValue={0}
            maximumValue={340}
            minimumTrackTintColor={Colors.silver}
            maximumTrackTintColor={Colors.silver}
            thumbImage={Images.sliderThumb}
            onValueChange={(number) =>
              this.setState({sliderValue: parseInt(number)})
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            flex: 1,
            marginTop: 15,
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
                  placeholder={'Hr'}
                  style={styles.textInput}
                  maxLength={2}
                  value={this.state.hrTo}
                  keyboardType={'numeric'}
                  onChangeText={(text) =>
                    this.setState({hrTo: text.replace(/[^0-9]/g, '')})
                  }
                />
                <TextInput
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            marginTop: 15,
          }}>
          <Image
            source={Images.barHome}
            style={{
              height: 25,
              width: 25,
              resizeMode: 'contain',
              tintColor: Colors.coolGrey,
            }}
          />
          <View style={{marginHorizontal: 10, flex: 1}}>
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
              this.state.isSwitchEnabled ? Colors.sickGreen : Colors.coolGrey
            }
            ios_backgroundColor={Colors.coolGrey}
            onValueChange={this.toggleIsEnabled}
            value={this.state.isSwitchEnabled}
          />
        </View>
        <View style={{marginVertical: 30, marginHorizontal: 15}}>
          <ButtonRadius10
            label="NEXT"
            bgColor={Colors.sickGreen}
            onPress={() =>
              this.props.navigation.navigate(Constants.confirmPayment)
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
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    borderColor: Colors.sickGreen,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  circleCard: {
    height: 50,
    width: 50,
    borderRadius: 25,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
  selectedDateBG: {
    height: 30,
    width: 30,
    backgroundColor: Colors.sickGreen,
    borderRadius: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
  selectedTimeBG: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 5,
    backgroundColor: Colors.sickGreen,
    borderRadius: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    alignItems: 'center',
    elevation: 10,
    marginBottom: 15,
  },
  unSelectedTimeBG: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginBottom: 15,
  },
  iconUser: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'contain',
  },
  textInput: {
    fontSize: 16,
    fontFamily: Constants.fontRegular,
    color: Colors.black,
    borderColor: Colors.sickGreen,
    borderBottomWidth: 5,
    margin: 5,
    flex: 1,
    textAlign: 'center',
  },
  selector: {
    backgroundColor: Colors.sickGreen,
    borderRadius: 10,
    flex: 1,
  },
  unselector: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    flex: 1,
  },
});
