import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import Constants from '../common/Constants';

export default class RegularTextCB extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text {...this.props} style={[styles.defaultStyle, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: Constants.fontRegular,
  },
});
