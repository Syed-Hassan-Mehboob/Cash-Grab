import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';

export default class RegularTextCB extends Component {
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
    fontFamily: 'BrownRegular',
  },
});
