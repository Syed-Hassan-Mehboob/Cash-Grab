import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Images from '../common/Images';
import Colors from '../common/Colors';
import ButtonRadius10 from '../components/ButtonRadius10';
import RegularTextCB from '../components/RegularTextCB';

const resetAction = CommonActions.reset({
  index: 0,
  routes: [
    {
      name: 'BookingConfirmed',
    },
  ],
});

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [
        {
          id: '1',
          name: 'Cleaner',
          isSelected: false,
        },
        {
          id: '2',
          name: 'Automobile',
          isSelected: false,
        },
        {
          id: '3',
          name: 'Plumber',
          isSelected: false,
        },
        {
          id: '4',
          name: 'Mechanic',
          isSelected: false,
        },
        {
          id: '6',
          name: 'Painter',
          isSelected: false,
        },
        {
          id: '5',
          name: 'Electrician',
          isSelected: false,
        },
      ],

      prices: [
        {
          id: '1',
          name: '$12-$20',
          isSelected: false,
        },
        {
          id: '2',
          name: '$35-$50',
          isSelected: false,
        },
        {
          id: '3',
          name: '$100-$150',
          isSelected: false,
        },
      ],

      locations: [
        {
          id: '1',
          name: 'UK',
          isSelected: false,
        },
        {
          id: '2',
          name: 'New York',
          isSelected: false,
        },
        {
          id: '3',
          name: 'France',
          isSelected: false,
        },
        {
          id: '4',
          name: 'Durban',
          isSelected: false,
        },
        {
          id: '5',
          name: 'UAE',
          isSelected: false,
        },
        {
          id: '6',
          name: 'Italy',
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
          <RegularTextCB style={{fontSize: 14}}>{item.name}</RegularTextCB>
        </View>
      </TouchableOpacity>
    );
  };

  handleOnDateItemClick = (index) => {
    let mDates = this.state.categories;
    mDates.forEach((item) => {
      item.isSelected = false;
    });
    mDates[index].isSelected = true;
    this.setState({dates: mDates});
  };

  renderPriceItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={
          item.isSelected === false
            ? styles.unselectedDate
            : styles.selectedDate
        }
        onPress={() => {
          this.handleOnPriceItemClick(index);
        }}>
        <View>
          <RegularTextCB style={{fontSize: 14}}>{item.name}</RegularTextCB>
        </View>
      </TouchableOpacity>
    );
  };

  handleOnPriceItemClick = (index) => {
    let mPrices = this.state.prices;
    mPrices.forEach((item) => {
      item.isSelected = false;
    });
    mPrices[index].isSelected = true;
    this.setState({prices: mPrices});
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
          <RegularTextCB style={{fontSize: 14}}>{item.name}</RegularTextCB>
        </View>
      </TouchableOpacity>
    );
  };

  handleOnSlotItemClick = (index) => {
    let mSlots = this.state.locations;
    mSlots.forEach((item) => {
      item.isSelected = false;
    });
    mSlots[index].isSelected = true;
    this.setState({slots: mSlots});
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{position: 'absolute', left: 0}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image source={Images.arrowBack} style={styles.iconBack} />
            </TouchableOpacity>
            <RegularTextCB style={{fontSize: 30}}>
              Furniture service
            </RegularTextCB>
          </View>
          <View style={{marginTop: 20}}>
            <RegularTextCB style={{fontSize: 18}}>Categories</RegularTextCB>
            <FlatList
              style={{marginTop: 10}}
              data={this.state.categories}
              numColumns={3}
              keyExtractor={(date) => date.id}
              renderItem={this.renderDateItem}
              extraData={this.state}
              contentInset={{
                // for ios
                bottom: 10,
              }}
              contentContainerStyle={{
                // for android
                paddingBottom: 10,
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <RegularTextCB style={{fontSize: 18}}>Price</RegularTextCB>
            <FlatList
              style={{marginTop: 10}}
              data={this.state.prices}
              numColumns={3}
              keyExtractor={(date) => date.id}
              renderItem={this.renderPriceItem}
              extraData={this.state}
              contentInset={{
                // for ios
                bottom: 10,
              }}
              contentContainerStyle={{
                // for android
                paddingBottom: 10,
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <RegularTextCB style={{fontSize: 18}}>Location</RegularTextCB>
            <FlatList
              style={{marginTop: 10}}
              data={this.state.locations}
              numColumns={3}
              keyExtractor={(slot) => slot.id}
              showsVerticalScrollIndicator={false}
              renderItem={this.renderSlotItem}
              extraData={this.state}
              contentInset={{
                // for ios
                bottom: 10,
              }}
              contentContainerStyle={{
                // for android
                paddingBottom: 10,
              }}
            />
          </View>
          <View style={styles.childContainer}>
            <ButtonRadius10
              label="APPLY"
              bgColor={Colors.sickGreen}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  childContainer: {
    marginTop: 40,
    paddingBottom: 100,
  },
  selectedDate: {
    alignItems: 'center',
    paddingVertical: 10,
    margin: 10,
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: Colors.sickGreen,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  unselectedDate: {
    alignItems: 'center',
    paddingVertical: 10,
    margin: 10,
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: Colors.white,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  iconBack: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
