import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {Icon} from 'native-base';
import Constants, {SIZES} from '../common/Constants';
import Colors from '../common/Colors';
const {width, height} = Dimensions.get('window');
const fontLight = Constants.fontLight;

export default class SearchBox extends Component {
  render() {
    const {disabled = false, onPress = null} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={disabled ? 0.8 : 1.0}
        style={[
          styles.default,
          {
            flexDirection: 'row',
            width: '100%',
            backgroundColor: '#eaeaea',
            borderRadius: SIZES.ten,
            marginVertical: 10,
          },
        ]}
        onPress={onPress}>
        <View
          style={{
            width: 30,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 15,
          }}>
          <Icon
            name="search"
            style={{
              width: 22,
              height: 22,
              fontSize: 20,
              color: Colors.orange,
              textAlign: 'center',
              marginTop: 5,
            }}
          />
        </View>
        <TextInput
          ref={'search'}
          placeholder={'Search Categories..'}
          placeholderTextColor={Colors.grey}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          blurOnSubmit={true}
          returnKeyType={'done'}
          editable={!disabled}
          onChangeText={(text) => {
            this.setState({
              search: text,
            });
          }}
          style={{
            fontFamily: Constants.fontLight,
            fontSize: 16,
            height: 50,
            flex: 1,
            paddingHorizontal: 10,
            color: Colors.black1,
          }}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  default: {
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
});

export {SearchBox};
