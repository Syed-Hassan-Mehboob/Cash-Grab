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
import Constants from '../common/Constants';
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
      onPress={() => {
      }}
      activeOpacity={0.6} style={styles.contaner}>
      <TouchableOpacity
        style={styles.containerView} onPress={props.onPress} >
        <Icon
          name="time-outline"
          type="Ionicons"
          style={{fontSize: height * 0.025, color: Colors.lightYellowGreen}}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 15,
    backgroundColor: Colors.white,
    borderRadius: height * 0.01,
    shadowColor: Colors.grey,
    shadowRadius: 10,
    shadowOpacity: 0.25,
    shadowOffset: {x: 1, y: 1},
    overflow: 'visible',
    height: height * 0.07,
    paddingHorizontal: height * 0.02,
  },
  containerView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  text: {
    fontSize: height * 0.022,
    color: Colors.grey,
    fontFamily: Constants.fontRegular,
    marginLeft: height * 0.03,
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
