import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import BoldTextCB from '../components/BoldTextCB';
export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {timer: 0};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('Login');
    }, 2000);
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.splashBg}>
          <BoldTextCB style={{fontSize: 20}}>CashGrab</BoldTextCB>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  splashBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
