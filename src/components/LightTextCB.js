import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';

export default class LightTextCB extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={[styles.defaultStyle, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: Constants.fontLight,
    color: Colors.black1,
  },
});
