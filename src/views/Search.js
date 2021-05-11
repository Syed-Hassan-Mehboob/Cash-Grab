import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import RegularTextCB from '../components/RegularTextCB';
import Images from '../common/Images';
import Colors from '../common/Colors';
import EditText from '../components/EditText';
import Constants from '../common/Constants';

export default class Search extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    searchText: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 0}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={styles.iconBack} />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: 30}}>Search</RegularTextCB>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextInput
            ref={'search'}
            keyboardType="default"
            placeholder={'Search Here'}
            value={this.state.searchText}
            onChangeText={(text) => {
              this.setState({searchText: text});
            }}
            style={styles.textInput}
          />
          <TouchableOpacity>
            <Image
              source={Images.iconSearch}
              style={{height: 80, width: 80, resizeMode: 'stretch'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  iconBack: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  iconFilter: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: Constants.fontRegular,
    color: Colors.black1,
  },
});
