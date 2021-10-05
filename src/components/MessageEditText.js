import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';

export default function MessageEditText(props) {
  const [borderColor, setBorderColor] = React.useState('transparent');
  const [secureText, setsecureText] = React.useState(true);
  const [eye, seteye] = React.useState('eye-off');

  const {value, onChangeText, placeholder} = props;
  return (
    <View
      style={[
        styles.card,
        props.style,
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: borderColor,
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 10,
        },
      ]}>
      <TextInput
        secureTextEntry={false}
        placeholderTextColor={Colors.grey}
        autoCapitalize="none"
        blurOnSubmit={true}
        onFocus={() => setBorderColor(Colors.sickGreen)}
        onBlur={() => setBorderColor('transparent')}
        selectionColor={Colors.sickGreen}
        placeholder={placeholder}
        keyboardType={'default'}
        value={value}
        onChangeText={onChangeText}
        style={[styles.textInput, {height: props.height}]}
        multiline={true}
        numberOfLines={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 14,
    flex: 1,
    width: '100%',
    color: Colors.black,
    textAlignVertical: 'top',
    fontFamily: Constants.fontRegular,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
});
