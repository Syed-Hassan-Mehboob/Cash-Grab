import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import defaultIcons from './Icons';

import {FONTFAMILY, SIZES} from '../../../common/Constants';
import Colors from '../../../common/Colors';

const s = StyleSheet.create({
  baseInputStyle: {
    color: 'black',
  },
});

export default class CCInput extends Component {
  static propTypes = {
    // field: PropTypes.string.isRequired,
    // label: PropTypes.string,
    // value: PropTypes.string,
    // placeholder: PropTypes.string,
    // keyboardType: PropTypes.string,
    // status: PropTypes.oneOf(['valid', 'invalid', 'incomplete']),
    // containerStyle: ViewPropTypes.style,
    // inputStyle: Text.propTypes.style,
    // labelStyle: Text.propTypes.style,
    // validColor: PropTypes.string,
    // invalidColor: PropTypes.string,
    // placeholderColor: PropTypes.string,
    // onFocus: PropTypes.func,
    // onChange: PropTypes.func,
    // onBecomeEmpty: PropTypes.func,
    // onBecomeValid: PropTypes.func,
    // additionalInputProps: PropTypes.shape(TextInput.propTypes),
  };

  static defaultProps = {
    label: '',
    value: '',
    status: 'incomplete',
    containerStyle: {},
    inputStyle: {},
    labelStyle: {},
    onFocus: () => {},
    onChange: () => {},
    onBecomeEmpty: () => {},
    onBecomeValid: () => {},
    additionalInputProps: {},
  };

  componentWillReceiveProps = (newProps) => {
    const {status, value, onBecomeEmpty, onBecomeValid, field} = this.props;
    const {status: newStatus, value: newValue} = newProps;

    if (value !== '' && newValue === '') onBecomeEmpty(field);
    if (status !== 'valid' && newStatus === 'valid') onBecomeValid(field);
  };

  focus = () => this.refs.input.focus();

  _onFocus = () => this.props.onFocus(this.props.field);
  _onChange = (value) => this.props.onChange(this.props.field, value);

  render() {
    const {
      label,
      value,
      placeholder,
      status,
      keyboardType,
      containerStyle,
      inputStyle,
      labelStyle,
      validColor,
      invalidColor,
      placeholderColor,
      additionalInputProps,
      customIcons,
    } = this.props;

    const Icons = {...defaultIcons, ...customIcons};
    return (
      <TouchableOpacity
        onPress={this.focus}
        activeOpacity={1}
        style={{
          // backgroundColor: 'red',
          marginHorizontal: SIZES.fifteen,
          marginTop: SIZES.fifteen,
        }}>
        {!!label && <Text style={[labelStyle]}>{label}</Text>}
        <View style={inputStyle}>
          <TextInput
            ref="input"
            {...additionalInputProps}
            keyboardType={keyboardType}
            autoCapitalise="words"
            autoCorrect={false}
            style={[
              s.baseInputStyle,
              inputStyle,
              validColor && status === 'valid'
                ? {color: Colors.orange}
                : invalidColor &&
                  label === 'CARD NUMBER' &&
                  status === 'invalid'
                ? {color: invalidColor}
                : {
                    fontSize: SIZES.h16,
                    fontFamily: FONTFAMILY.Medium,
                    color: Colors.orange,
                  },
              {paddingHorizontal: SIZES.twenty},
            ]}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={placeholderColor}
            placeholder={placeholder}
            value={value}
            onFocus={this._onFocus}
            onChangeText={this._onChange}
          />
          {/* {label === 'CARD NUMBER' ? (
            <Image
              style={[
                STYLES.CardImage,
                {
                  position: 'absolute',
                  end: SIZES.fifteen,
                  top: SIZES.five - 1.8,
                },
              ]}
              source={Icons[this.props.brand]}
              resizeMode="contain"
            />
          ) : null} */}
        </View>
      </TouchableOpacity>
    );
  }
}
