import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Tab from './Tab';

const {width} = Dimensions.get('window');

export default function TabBar({state, navigation}) {
  const {routes} = state;
  const [selectedTab, setSelectedTab] = React.useState(Constants.home);
  const renderColor = (currentSelectedTab) =>
    currentSelectedTab === selectedTab ? Colors.navy : Colors.silver;
  const handlePress = (activeTab, index) => {
    console.log('index: ' + index + ' activeTab: ' + activeTab);
    if (state.index !== index) {
      setSelectedTab(activeTab);
      navigation.navigate(activeTab);
    }
  };
  return (
    <View style={styles.bottomBarParent}>
      <View style={styles.bottomBarChild}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBarParent: {
    position: 'absolute',
    bottom: 0,
    width: width,
    alignItems: 'center',
  },
  bottomBarChild: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    width,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#ccc',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});
