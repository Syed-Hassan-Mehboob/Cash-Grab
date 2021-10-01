import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../common/Colors';
import Constants, {SIZES, STYLES} from '../common/Constants';
import Images from '../common/Images';
import LightTextCB from '../components/LightTextCB';
import RegularTextCB from '../components/RegularTextCB';

const {width, height} = Dimensions.get('window');

export default class ChatListing extends Component {
  users = [
    {
      id: '1',
      image: Images.emp1,
    },
    {
      id: '2',
      image: Images.emp2,
    },
    {
      id: '3',
      image: Images.emp3,
    },
    {
      id: '4',
      image: Images.emp4,
    },
    {
      id: '5',
      image: Images.emp1,
    },
    {
      id: '6',
      image: Images.emp2,
    },
    {
      id: '7',
      image: Images.emp3,
    },
    {
      id: '8',
      image: Images.emp4,
    },
  ];

  chats = [
    {
      id: '1',
      user: {
        image: Images.emp1,
        name: 'Julian Dasliva',
      },
      message: {
        text: 'Hi Julian! See you after work?',
        date: '12:00',
        isRead: false,
        count: 1,
      },
    },
    {
      id: '2',
      user: {
        image: Images.emp2,
        name: 'Mike Lyne',
      },
      message: {
        text: 'I must teel you my interview this...',
        date: '13:50',
        isRead: true,
        count: 0,
      },
    },
    {
      id: '3',
      user: {
        image: Images.emp3,
        name: 'Claire Kumas',
      },
      message: {
        text: 'Yes I can do this you in the...',
        date: '13:00',
        isRead: false,
        count: 1,
      },
    },
    {
      id: '4',
      user: {
        image: Images.emp4,
        name: 'Blair Dota',
      },
      message: {
        text: "By the way, didn't you see my...",
        date: '06:38',
        isRead: false,
        count: 3,
      },
    },
    {
      id: '5',
      user: {
        image: Images.emp1,
        name: 'Molly Clark',
      },
      message: {
        text: 'Yes I am so happy!',
        date: '06:00',
        isRead: true,
        count: 0,
      },
    },
    {
      id: '6',
      user: {
        image: Images.emp2,
        name: 'Julian Dasliva',
      },
      message: {
        text: 'Hi Julian! See you after work?',
        date: '04:50',
        isRead: true,
        count: 0,
      },
    },
    {
      id: '7',
      user: {
        image: Images.emp3,
        name: 'Molly Clark',
      },
      message: {
        text: 'Yes I am so happy!',
        date: '04:20',
        isRead: true,
        count: 0,
      },
    },
    {
      id: '8',
      user: {
        image: Images.emp4,
        name: 'Mike Lyne',
      },
      message: {
        text: 'I must teel you my interview this...',
        date: '03:00',
        isRead: false,
        count: 6,
      },
    },
  ];

  renderUsersItem = ({item}) => {
    return (
      <View style={[styles.circleCard, {margin: SIZES.ten}]}>
        <Image source={item.image} style={styles.iconUser} resizeMode="cover" />
      </View>
    );
  };

  renderChatListingItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          margin: SIZES.ten,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 0.2,
          borderColor: Colors.coolGrey,
          paddingBottom: SIZES.ten,
        }}
        onPress={() => this.props.navigation.navigate(Constants.chat)}>
        <View style={styles.circleCard}>
          <Image
            source={item.user.image}
            style={styles.iconUser}
            resizeMode="cover"
          />
        </View>
        <View style={{marginStart: SIZES.ten, flex: 1}}>
          <RegularTextCB
            style={{
              fontSize: 16,
              color: item.message.isRead ? Colors.black : Colors.sickGreen,
            }}>
            {item.user.name}
          </RegularTextCB>
          <LightTextCB style={{fontSize: 14, color: Colors.black}}>
            {item.message.text}
          </LightTextCB>
        </View>
        <View>
          <LightTextCB style={{fontSize: 12, color: Colors.coolGrey}}>
            {item.message.date}
          </LightTextCB>
          {!item.message.isRead && (
            <View
              style={[
                styles.greenCirclrCard,
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                },
              ]}>
              <RegularTextCB style={{fontSize: 12, color: Colors.coolGrey}}>
                {item.message.count}
              </RegularTextCB>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  state = {};
  render() {
    return (
      <View style={STYLES.container}>
        <View
          style={{
            borderBottomStartRadius: SIZES.ten * 3,
            borderBottomEndRadius: SIZES.ten * 3,
            height: height / 3.75,
            backgroundColor: Colors.navy,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginTop: Platform.OS === 'android' ? SIZES.ten : SIZES.twenty,
              padding: SIZES.fifteen,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', left: SIZES.ten}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={Images.arrowBack}
                style={[styles.iconBack, {tintColor: Colors.white}]}
              />
            </TouchableOpacity>
            <RegularTextCB
              style={{fontSize: SIZES.ten * 3, color: Colors.white}}>
              Chat
            </RegularTextCB>
            <View
              style={{
                position: 'absolute',
                right: SIZES.ten,
              }}>
              <Image
                source={Images.emp1}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
          <View>
            <RegularTextCB
              style={{
                fontSize: SIZES.twenty,
                color: Colors.white,
                marginStart: SIZES.fifteen,
              }}>
              Favorites
            </RegularTextCB>
            <FlatList
              horizontal
              data={this.users}
              keyExtractor={(user) => user.id}
              showsHorizontalScrollIndicator={false}
              renderItem={this.renderUsersItem}
            />
          </View>
        </View>
        <FlatList
          data={this.chats}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderChatListingItem}
          keyExtractor={(chat) => chat.id}
          contentContainerStyle={{
            paddingBottom: SIZES.ten * 10,
          }}
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
  iconBack: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  circleCard: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: SIZES.ten * 3,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 0.15,
    shadowRadius: SIZES.five,
    elevation: SIZES.five,
  },
  iconUser: {
    height: SIZES.ten * 6,
    width: SIZES.ten * 6,
    borderRadius: SIZES.ten * 3,
    resizeMode: 'contain',
  },
  greenCirclrCard: {
    height: SIZES.twenty,
    width: SIZES.twenty,
    borderRadius: SIZES.ten,
    backgroundColor: Colors.sickGreen,
  },
});
