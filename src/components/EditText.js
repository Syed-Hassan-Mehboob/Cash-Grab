import {Icon} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';

export default class EditText extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    secureText: true,
    eyeIcon: 'eye-off',
  };

  changePasswordState(secureTextEntry = false) {
    if (secureTextEntry) {
      if (this.state.secureText)
        this.setState({secureText: false, eyeIcon: 'eye'});
      else this.setState({secureText: true, eyeIcon: 'eye-off'});
    }
  }

  render() {
    const {
      value,
      keyboardType,
      onChangeText,
      placeholder,
      secureTextEntry,
      multiline = false,
      numberOfLines = 1,
    } = this.props;
    return (
      <View style={[styles.card, this.props.style]}>
        <TextInput
          secureTextEntry={secureTextEntry ? this.state.secureText : null}
          placeholderTextColor={Colors.grey}
          autoCapitalize="none"
          blurOnSubmit={true}
          selectionColor={Colors.sickGreen}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={Colors.coolGrey}
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              this.changePasswordState(secureTextEntry);
            }}>
            <Icon
              type={'Ionicons'}
              name={this.state.eyeIcon}
              style={styles.iconPassword}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    alignItems: 'center',
  },
  textInput: {
    fontSize: 16,
    height: 60,
    flex: 1,
    fontFamily: Constants.fontRegular,
    color: Colors.black,
  },
  iconPassword: {
    fontSize: 20,
    height: 20,
    width: 20,
    color: Colors.sickGreen,
  },
});
