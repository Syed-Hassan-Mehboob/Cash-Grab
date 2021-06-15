import React from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../common/Colors';
import Constants from '../common/Constants';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import Axios from '../network/APIKit';

const {height, width} = Dimensions.get('window');

export default class TermsAndConditions extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    title: '',
    text: '',
    isLoading: false,
  };

  componentDidMount() {
    this.getContent();
  }

  toggleIsLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  getContent = () => {
    const onSuccess = ({data}) => {
      this.toggleIsLoading();
      this.setState({
        title: data.data.terms_condition_title,
        text: data.data.terms_condition_paragraph,
      });
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
    };

    this.toggleIsLoading();

    Axios.get(Constants.contentsURL).then(onSuccess).catch(onFailure);
  };

  render() {
    return (
      <View style={[styles.container, {padding: 0}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: 15,
            marginTop: Platform.OS === 'android' ? 0 : 20,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 10}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={Images.arrowBack}
              style={[styles.iconBack, {tintColor: Colors.black}]}
            />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: 30, color: Colors.black}}>
            {this.state.title}
          </RegularTextCB>
        </View>
        <View style={styles.card}>
          <ScrollView
            style={{height: height - 60 * 5}}
            showsVerticalScrollIndicator={false}>
            <View>
              <RegularTextCB style={{color: Colors.coolGrey, fontSize: 16}}>
                {this.state.text}
              </RegularTextCB>
            </View>
          </ScrollView>
        </View>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  iconBack: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
