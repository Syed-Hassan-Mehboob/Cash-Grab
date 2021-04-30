import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import LightTextCB from '../components/LightTextCB';
import RegularTextCB from '../components/RegularTextCB';

const {width, height} = Dimensions.get('window');

export default class Chat extends React.Component {
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
        image: Images.emp1,
      },
      message: {
        text: "How's your day?",
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

  renderSupportItem = ({item}) => {
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
            borderBottomStartRadius: 30,
            borderBottomEndRadius: 30,
            height: height / 6,
            justifyContent: 'center',
            backgroundColor: Colors.navy,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              padding: 15,
            }}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={Images.arrowBack}
                style={[styles.iconBack, {tintColor: Colors.white}]}
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginStart: 10}}>
              <View style={styles.circleCard}>
                <Image source={Images.emp1} style={styles.iconUser} />
              </View>
              <View style={{marginStart: 10}}>
                <RegularTextCB style={{fontSize: 18, color: Colors.sickGreen}}>
                  Mike Lyne
                </RegularTextCB>
                <LightTextCB style={{fontSize: 14, color: Colors.silver}}>
                  Online
                </LightTextCB>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                right: 10,
                flexDirection: 'row',
              }}>
              <Image
                source={Images.iconAudioCall}
                style={{
                  height: 75,
                  width: 75,
                  resizeMode: 'contain',
                }}
              />
              <Image
                source={Images.iconVideoCall}
                style={{
                  height: 75,
                  width: 75,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
        </View>
        <FlatList
          data={this.messages}
          keyExtractor={(item) => item.id}
          renderItem={this.renderSupportItem}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 20,
          }}
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
            <Image source={Images.iconpencil} style={{height: 25, width: 25}} />
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
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
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
