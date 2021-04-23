import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';

export default function Tab({tab, icon, onPress, color}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.tab]}
      onPress={onPress}>
      <Image
        source={icon}
        style={[{tintColor: color, height: 25, resizeMode: 'contain'}]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    height: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
