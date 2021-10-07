import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';
import Colors from '../common/Colors';
import Constants, {SIZES} from '../common/Constants';
import Moment from 'moment';

const {width, height} = Dimensions.get('window');

// Date Picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function DateTimePickerComponent(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //   const showDatePicker = () => {
  //     setDatePickerVisibility(true);
  //   };

  //   const hideDatePicker = () => {
  //     setDatePickerVisibility(false);
  //   };

  //   const handleConfirm = date => {
  //       const newTime=Moment(date).format('LT');
  //     console.log('A date has been picked: ',newTime);
  //     setTime(newTime);
  //     hideDatePicker();
  //   };

  return (
    <TouchableOpacity
      onPress={() => {}}
      activeOpacity={0.6}
      style={styles.contaner}>
      <TouchableOpacity style={styles.containerView} onPress={props.onPress}>
        <Icon
          name="timer"
          type="MaterialIcons"
          style={{fontSize: height * 0.025, color: Colors.sickGreen}}
        />
        <Text style={styles.text}>{props.time}</Text>
        <DateTimePickerModal
          {...props}
          //   isVisible={isDatePickerVisible}
          //   mode='time'
          //   onConfirm={props.onConfirm}
          //   onCancel={hideDatePicker}
          //   is24Hour={false}
          //   hideTitleContainerIOS={true}
          titleStyletitleStyle={{backgroundColor: 'red', color: 'red'}}
          confirmTextStyle={Colors.lightYellowGreen}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
  containerView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  text: {
    fontSize: 16,
    color: Colors.grey,
    fontFamily: Constants.fontRegular,
    marginLeft: SIZES.ten,
  },
  datepicker: {
    backgroundColor: Colors.white,
    height: height * 0.3,
    width: width - 40,
    marginVertical: '10%',
  },
  date: {
    width: '100%',
  },
});
