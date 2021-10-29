import {
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import Colors from '../common/Colors';
import Images from '../common/Images';
import RegularTextCB from '../components/RegularTextCB';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants, {SIZES} from '../common/Constants';
import Axios from '../network/APIKit';

export default class Faq extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    expanded: false,
    faqs: [],
    title: 'FAQs',
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
        faqs: data.data.faq_paragraph.map((faq) => ({
          ...faq,
          isExpanded: false,
        })),
      });
    };

    const onFailure = (error) => {
      this.toggleIsLoading();
      utils.showResponseError(error);
    };

    this.toggleIsLoading();

    Axios.get(Constants.contentsURL).then(onSuccess).catch(onFailure);
  };

  onChangeLayout = (title) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: title});
  };

  renderFaqItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          {padding: SIZES.fifteen - 1, borderWidth: item.isExpanded ? 2 : 0},
        ]}
        onPress={() => {
          this.onChangeLayout(item.title);
          this.state.faqs.map((childItem) => {
            childItem.isExpanded = false;
          });

          item.isExpanded = true;
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RegularTextCB
            style={{
              fontSize: 16,
              color: item.isExpanded ? Colors.black : Colors.coolGrey,
              flex: 1,
            }}>
            {item.question}
          </RegularTextCB>
          <Image
            source={item.isExpanded ? Images.iconDash : Images.iconArrowDown}
            style={{
              height: SIZES.fifteen - 1,
              width: SIZES.fifteen - 1,
              resizeMode: 'contain',
            }}
          />
        </View>
        {item.isExpanded && (
          <View>
            <RegularTextCB style={{fontSize: 14, color: Colors.coolGrey}}>
              {item.answer}
            </RegularTextCB>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: SIZES.fifteen - 1,
            marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: SIZES.ten}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={Images.arrowBack} style={[styles.iconBack]} />
          </TouchableOpacity>
          <RegularTextCB style={{fontSize: 30}}>
            {this.state.title}
          </RegularTextCB>
        </View>
        <FlatList
          data={this.state.faqs}
          showsVerticalScrollIndicator={false}
          keyExtractor={(data) => data.id}
          renderItem={this.renderFaqItem}
        />
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
    height: SIZES.twenty,
    width: SIZES.twenty,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: SIZES.ten,
    padding: SIZES.twenty,
    margin: SIZES.ten,
    borderColor: Colors.sickGreen,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five, height: SIZES.five},
    shadowOpacity: 1.0,
    shadowRadius: SIZES.ten,
    elevation: SIZES.ten,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});
