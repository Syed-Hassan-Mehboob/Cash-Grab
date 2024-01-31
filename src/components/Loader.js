import React from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import Colors from '../common/Colors';

export default function Loader(props) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.transparent
            ? Colors.transparent
            : Colors.transparent,
        },
      ]}>
      <ActivityIndicator size="large" color={Colors.sickGreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.transparent,
  },
});
