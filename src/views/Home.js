import React, {Component} from 'react';
import LightTextCB from '../components/LightTextCB';
import Images from '../common/Images';
import Colors from '../common/Colors';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchBox from '../components/SearchBox';

export default class Home extends Component {
  categories = [
    {
      id: '1',
      title: 'Massage',
    },
    {
      id: '2',
      title: 'Cleaning',
    },
    {
      id: '3',
      title: 'Repair',
    },
    {
      id: '4',
      title: 'Automobile',
    },
    {
      id: '5',
      title: 'Others',
    },
  ];

  constructor(props) {
    super(props);
  }

  renderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Nearby')}
        style={{margin: 15, alignItems: 'center'}}>
        <View style={styles.orangeCircle} />
        <LightTextCB style={{fontSize: 14, marginTop: 5, color: Colors.grey}}>
          {item.title}
        </LightTextCB>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <View>
              <LightTextCB style={{fontSize: 30}}>Hi, Smitty</LightTextCB>
              <LightTextCB
                style={{
                  fontSize: 16,
                  marginTop: 10,
                  color: Colors.grey,
                }}>
                Need help?
              </LightTextCB>
            </View>
            <TouchableOpacity>
              <Image source={Images.emp1} style={styles.iconUser} />
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 10, paddingHorizontal: 20}}>
            <SearchBox
              disabled={true}
              onPress={() => this.props.navigation.navigate('EmergencyBooking')}
            />
          </View>
          <LightTextCB
            style={{fontSize: 16, marginTop: 10, paddingHorizontal: 20}}>
            Browse categories
          </LightTextCB>
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
          <LightTextCB
            style={{fontSize: 16, marginTop: 10, paddingHorizontal: 20}}>
            Urgent Services
          </LightTextCB>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingHorizontal: 20,
              marginVertical: 10,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={[styles.card, {marginEnd: 10}]}
              onPress={() => {
                this.props.navigation.navigate('EmergencyBooking');
              }}>
              <View
                style={{
                  padding: 20,
                }}>
                <LightTextCB style={{fontSize: 16}}>
                  {'Emergency\nBooking'}
                </LightTextCB>
                <LightTextCB
                  style={{fontSize: 14, marginTop: 10, color: Colors.grey}}>
                  {'201 people\navailable around\nyou'}
                </LightTextCB>
              </View>
              <Image
                source={Images.handHoldingPhone}
                style={{
                  height: 120,
                  width: 80,
                  resizeMode: 'stretch',
                  alignSelf: 'flex-end',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.card, {marginStart: 10}]}
              onPress={() => {
                this.props.navigation.navigate('BestEmployees');
              }}>
              <View
                style={{
                  padding: 20,
                }}>
                <LightTextCB style={{fontSize: 16}}>
                  {'Best\nEmployees'}
                </LightTextCB>
                <LightTextCB
                  style={{fontSize: 14, marginTop: 10, color: Colors.grey}}>
                  {'201 people\navailable around\nyou'}
                </LightTextCB>
              </View>
              <Image
                source={Images.employeeThumbsUp}
                style={{
                  resizeMode: 'stretch',
                  height: 120,
                  width: 80,
                  alignSelf: 'flex-end',
                }}
              />
            </TouchableOpacity>
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
    paddingTop: 20,
  },
  iconUser: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode: 'contain',
  },
  orangeCircle: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    opacity: 0.1,
    backgroundColor: Colors.orange,
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
    overflow: 'hidden',
  },
});
