import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import Colors from '../common/Colors';

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
    fontFamily: 'BrownLight',
    color: Colors.black1,
  },
});
