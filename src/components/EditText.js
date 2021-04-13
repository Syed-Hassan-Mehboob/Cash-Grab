import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';

export default class EditText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      value,
      keyboardType,
      onChangeText,
      placeHolder,
      secureTextEntry,
    } = this.props;
    return (
      <View style={[styles.card, this.props.style]}>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholderTextColor={Colors.grey}
          autoCapitalize="none"
          blurOnSubmit={true}
          placeholder={placeHolder}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          style={[styles.textInput]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    flex: 1,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    overflow: 'hidden',
  },
  textInput: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 5,
    flex: 1,
    fontFamily: Constants.fontLight,
    color: Colors.black1,
  },
});
