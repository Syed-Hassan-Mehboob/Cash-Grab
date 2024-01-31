import React, {Component} from 'react';
import Images from '../common/Images';
import Colors from '../common/Colors';
import LightTextCB from '../components/LightTextCB';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonRadius10 from '../components/ButtonRadius10';
import {CommonActions} from '@react-navigation/native';
import {SIZES, STYLES} from '../common/Constants';

const resetAction = CommonActions.reset({
  index: 0,
  routes: [
    {
      name: 'BookingConfirmed',
    },
  ],
});

export default class AdvanceBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [
        {
          id: '1',
          name: 'Today',
          isSelected: false,
        },
        {
          id: '2',
          name: 'Tomorrow',
          isSelected: false,
        },
        {
          id: '3',
          name: 'Custom',
          isSelected: false,
        },
      ],
      slots: [
        {
          id: '1',
          name: '12:00pm',
          isSelected: false,
        },
        {
          id: '2',
          name: '12:30pm',
          isSelected: false,
        },
        {
          id: '3',
          name: '01:00pm',
          isSelected: false,
        },
        {
          id: '4',
          name: '01:30pm',
          isSelected: false,
        },
        {
          id: '5',
          name: '02:00pm',
          isSelected: false,
        },
        {
          id: '6',
          name: '02:30pm',
          isSelected: false,
        },
        {
          id: '7',
          name: '03:00pm',
          isSelected: false,
        },
        {
          id: '8',
          name: '03:30pm',
          isSelected: false,
        },
        {
          id: '9',
          name: '04:00pm',
          isSelected: false,
        },
      ],
    };
  }

  renderDateItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={
          item.isSelected === false
            ? styles.unselectedDate
            : styles.selectedDate
        }
        onPress={() => {
          this.handleOnDateItemClick(index);
        }}>
        <View>
          <LightTextCB style={{fontSize: 16}}>{item.name}</LightTextCB>
        </View>
      </TouchableOpacity>
    );
  };

  handleOnDateItemClick = (index) => {
    let mDates = this.state.dates;
    mDates.forEach((item) => {
      item.isSelected = false;
    });
    mDates[index].isSelected = true;
    this.setState({dates: mDates});
  };

  renderSlotItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={
          item.isSelected === false
            ? styles.unselectedDate
            : styles.selectedDate
        }
        onPress={() => {
          this.handleOnSlotItemClick(index);
        }}>
        <View>
          <LightTextCB style={{fontSize: 16}}>{item.name}</LightTextCB>
        </View>
      </TouchableOpacity>
    );
  };

  handleOnSlotItemClick = (index) => {
    let mSlots = this.state.slots;
    mSlots.forEach((item) => {
      item.isSelected = false;
    });
    mSlots[index].isSelected = true;
    this.setState({slots: mSlots});
  };

  render() {
    return (
      <View style={STYLES.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Image source={Images.arrowBack} style={styles.iconBack} />
        </TouchableOpacity>
        <LightTextCB style={{fontSize: 30, marginTop: SIZES.ten * 3}}>
          Furniture service
        </LightTextCB>
        <LightTextCB style={{fontSize: 16, marginTop: SIZES.ten}}>
          Advance Booking
        </LightTextCB>
        <View>
          <LightTextCB style={{fontSize: 18, marginTop: SIZES.twenty}}>
            Date
          </LightTextCB>
          <FlatList
            style={{marginTop: SIZES.ten}}
            data={this.state.dates}
            numColumns={3}
            keyExtractor={(date) => date.id}
            renderItem={this.renderDateItem}
            extraData={this.state}
          />
        </View>
        <View style={{marginTop: SIZES.twenty}}>
          <LightTextCB style={{fontSize: 18}}>Open Slots</LightTextCB>
          <FlatList
            style={{marginTop: SIZES.ten}}
            data={this.state.slots}
            numColumns={3}
            keyExtractor={(slot) => slot.id}
            showsVerticalScrollIndicator={false}
            renderItem={this.renderSlotItem}
            extraData={this.state}
          />
        </View>
        <View style={styles.childContainer}>
          <ButtonRadius10
            label="Confirm & book"
            onPress={() => {
              this.props.navigation.dispatch(resetAction);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: SIZES.twenty,
    paddingTop: SIZES.twenty,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: SIZES.twenty,
  },
  selectedDate: {
    alignItems: 'center',
    paddingTop: SIZES.twenty,
    paddingBottom: SIZES.twenty,
    margin: SIZES.ten,
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderRadius: SIZES.fifteen,
    borderColor: Colors.orange,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  unselectedDate: {
    alignItems: 'center',
    paddingTop: SIZES.twenty,
    paddingBottom: SIZES.twenty,
    margin: SIZES.ten,
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderRadius: SIZES.fifteen,
    borderColor: Colors.white,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    marginTop: SIZES.twenty,
    resizeMode: 'contain',
  },
});
