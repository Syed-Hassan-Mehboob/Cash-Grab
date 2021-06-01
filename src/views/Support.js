import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';

export default class Support extends React.Component {
  messages = [
    {
      user: {
        image: Images.emp1,
      },
      message: {
        text: "Hi Ankur! What's up?",
        date: 'Yesterday 14:26 PM',
      },
    },
    {
      user: {
        image: Images.emp2,
      },
      message: {
        text: "Hi Ankur! What's up?",
        date: 'Today 12:54 PM',
      },
    },
  ];

  constructor(props) {
    super(props);
  }

  state = {
    message: '',
  };

  renderChatItem = ({item}) => {
    return (
      <View
        style={{flexDirection: 'row', marginVertical: 5, marginHorizontal: 15}}>
        <View style={styles.circleCard}>
          <Image source={item.user.image} style={styles.iconUser} />
        </View>
        <View>
          <View style={{marginStart: 10}}>
            <View style={[styles.chatContainer]}>
              <RegularTextCB>{item.message.text}</RegularTextCB>
            </View>
            <RegularTextCB style={{fontSize: 12, color: Colors.coolGrey}}>
              {item.message.date}
            </RegularTextCB>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: 15,
            marginTop: Platform.OS === 'android' ? 0 : 20,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 10}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={[styles.iconBack]} />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: 30}}>Support</RegularTextCB>
        </View>
        <FlatList
          data={this.messages}
          keyExtractor={(item) => item.id}
          renderItem={this.renderChatItem}
        />
        <View
          style={[
            styles.card,
            {
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 10,
            },
          ]}>
          <TouchableOpacity>
            <Image
              source={Images.iconCamera}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <TextInput
            placeholder={'Type Your Message'}
            value={this.state.message}
            style={styles.textInput}
            onChangeText={(text) => this.setState({message: text})}
          />
          <TouchableOpacity onPress={() => {}}>
            <Image source={Images.iconSend} style={{height: 40, width: 40}} />
          </TouchableOpacity>
        </View>
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
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  chatContainer: {
    borderRadius: 10,
    backgroundColor: Colors.paleGrey,
    padding: 10,
  },
  circleCard: {
    height: 40,
    width: 40,
    borderRadius: 20,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  iconUser: {
    height: 40,
    width: 40,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    marginHorizontal: 10,
    height: 50,
    fontFamily: Constants.fontRegular,
    color: Colors.black,
  },
});
