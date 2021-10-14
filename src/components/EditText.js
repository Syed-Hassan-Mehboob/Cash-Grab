import {Icon} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import Colors from '../common/Colors';
import Constants, {SIZES} from '../common/Constants';

export default class EditText extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    secureText: true,
    eyeIcon: 'eye-closed',
    borderColor: 'transparent',
  };

  changePasswordState(secureTextEntry = false) {
    if (secureTextEntry) {
      if (this.state.secureText)
        this.setState({secureText: false, eyeIcon: 'eye'});
      else this.setState({secureText: true, eyeIcon: 'eye-closed'});
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
      isEditable = true,
    } = this.props;
    // console.log('=========', secureTextEntry);
    return (
      <View
        style={[
          styles.card,
          this.props.style,
          {borderColor: this.state.borderColor, borderWidth: 1},
        ]}>
        <TextInput
          secureTextEntry={secureTextEntry ? this.state.secureText : false}
          placeholderTextColor={Colors.grey}
          autoCapitalize="none"
          blurOnSubmit={true}
          onFocus={() => {
            if (this.props.onFocuss !== undefined) {
              this.props.onFocuss();
            }
            this.setState({borderColor: Colors.sickGreen});
          }}
          onBlur={() => {
            if (this.props.onBlurs !== undefined) {
              this.props.onBlurs();
            }
            this.setState({borderColor: 'transparent'});
          }}
          selectionColor={Colors.sickGreen}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={Colors.coolGrey}
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={isEditable}
          style={[
            this.props.styles,
            styles.textInput,
            {flex: 1, fontFamily: Constants.fontRegular, color: Colors.black},
          ]}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              this.changePasswordState(secureTextEntry);
            }}>
            <Icon
              type={'Octicons'}
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
    paddingHorizontal: SIZES.twenty,
    paddingVertical: 5,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
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
