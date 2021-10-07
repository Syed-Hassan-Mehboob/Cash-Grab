import React, {Component} from 'react';
import {Platform} from 'react-native';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../../common/Colors';
import Constants, {FONTS, SIZES, STYLES} from '../../common/Constants';
import ButtonRadius10 from '../../components/ButtonRadius10';
import RegularTextCB from '../../components/RegularTextCB';
import {CommonActions} from '@react-navigation/native';
import NormalHeader from '../../components/NormalHeader';
import Axios from '../../network/APIKit';
import utils from '../../utils';

export default class SelectIndustry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      myServices: [],
      Data: [],
      newData: [],
    };
  }

  resetAction = CommonActions.reset({
    index: 0,
    routes: [
      {
        name: Constants.login,
      },
    ],
  });

  // UNSAFE_componentWillMount() {
  //   var temp = [];

  //   const onSuccess = ({data}) => {
  //     // this.setState({Data: data.data.records}, () => {

  //     this.setState(
  //       {
  //         Data: data.data.records.map((el) => {
  //           return {...el, isSelected: false};
  //         }),
  //       },
  //       () => {
  //         // console.log(temp);
  //       },
  //     );
  //     var result = [];
  //     this.state.Data.map(async (key) => {
  //       // AsyncStorage.getItem(`${key.name}`).then((item) => {
  //       //   var o = Object.assign({}, key);
  //       //   // console.log('o=============>>>>>>', o);
  //       //   if (
  //       //     item !== null &&
  //       //     JSON.parse(item).cat_id !== undefined &&
  //       //     key.id == JSON.parse(item).cat_id
  //       //   ) {
  //       //     console.log(
  //       //       'IF===========>>>>>> ',
  //       //       Object.keys({...key, isSelected: true}),
  //       //     );
  //       //     return {...key, isSelected: true};
  //       //     // console.log('item in storage ========>>>', item);
  //       //     // o.isSelected = true;
  //       //     // return o;
  //       //   } else {
  //       //     // o.isSelected = false;
  //       //     // return o;
  //       //     console.log(
  //       //       'ELSE===========>>>>>>',
  //       //       typeof {...key, isSelected: false},
  //       //     );
  //       //     return {...key, isSelected: false};
  //       //   }
  //       // });

  //       const servicesItems = await AsyncStorage.getItem(`${key.name}`);
  //       // console.log(servicesItems);
  //       if (servicesItems !== null) {
  //         if (JSON.parse(servicesItems).cat_id == key.id) {
  //           // console.log('true');
  //           // this.state.newData.push({...key, isSelected: true});
  //           // result.push({...key, isSelected: true});
  //           // return {...key, isSelected: true};
  //           key.isSelected = true;
  //         } else {
  //           key.isSelected = false;
  //           // this.state.newData.push({...key, isSelected: false});
  //           // result.push({...key, isSelected: false});
  //           // return {...key, isSelected: false};
  //         }
  //       }
  //     });

  //     console.log('result==========>>>>', result);
  //     // });

  //     this.setState({isLoading: false});
  //   };
  //   const onFaliure = (error) => {
  //     console.log('get industry error=============>>>', error);
  //   };
  //   Axios.get(Constants.getCategories).then(onSuccess).catch(onFaliure);
  // }

  componentDidMount() {
    var temp = [];

    const onSuccess = async ({data}) => {
      const harami = await AsyncStorage.getItem('SelectedServices');
      // console.log('ffffffff======>>>>', JSON.parse(harami));
      var parsedHarami = JSON.parse(harami);
      // console.log('parsedHarami============>>>', JSON.stringify(parsedHarami));

      // data.data.records.map((rec) => {
      //   // console.log('parentID==========>>>', rec.id);
      //   parsedHarami.map((ph) => {
      //     // console.log('child==========>>>', ph.cat_id);

      //     if (rec.id === ph.cat_id) {
      //       // return;
      //       temp.push({...rec, isSelected: true});

      //       console.log('parent', true, rec.id, ' ', ph.cat_id);
      //       return;
      //     } else {
      //       console.log('child', false, rec.id, ' ', ph.cat_id);

      //       temp.push({...rec, isSelected: false});
      //     }
      //   });
      // });

      this.setState({Data: data.data.records}, () => {
        this.setState({isLoading: false}, () => {
          // console.log('after loading========>>>>>>', temp);
        });
      });
      // });
    };
    const onFaliure = (error) => {
      console.log('get industry error=============>>>', error);
    };
    Axios.get(Constants.getCategories).then(onSuccess).catch(onFaliure);
  }

  formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data?.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }

    return data;
  };

  renderIntustry = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    if (
      this.state.myServices[index] !== undefined &&
      this.state.myServices[index].cat_id === item.id
    ) {
      console.log(
        'checking========>>>>>',
        this.state.myServices[index].cat_id,
        ' === ',
        item.id,
      );
    }
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: SIZES.ten / 1.1,
          marginTop: SIZES.twenty,
          paddingHorizontal: SIZES.fifteen,
        }}>
        <TouchableOpacity
          style={[
            styles.card,
            {
              flex: 1,
              padding: Platform.OS === 'ios' ? SIZES.ten * 2.9 : SIZES.ten * 4,
              alignItems: 'center',
              borderColor: Colors.sickGreen,
              borderRadius: SIZES.ten,
              borderWidth: item.isSelected ? 1.5 : 0,
              backgroundColor: Colors.white,
            },
          ]}
          onPress={() => {
            this.props.navigation.navigate(Constants.AddServices, {
              id: item.id,
              name: item.name,
            });
          }}
          activeOpacity={0.6}>
          <Image
            source={{
              uri: Constants.imageURL + item.image,
            }}
            // source={item.image}
            style={{height: SIZES.ten * 4.5, width: SIZES.ten * 4.5}}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <RegularTextCB
          style={{
            fontSize: 16,
            marginTop: SIZES.five,
            color: Colors.black,
            paddingBottom: SIZES.five,
          }}>
          {item.name}
        </RegularTextCB>
      </View>
    );
  };

  signUp = async () => {
    const asyncData = await AsyncStorage.getItem('SelectedServices');

    const body = {
      name: this.props.route.params.venderData.name,
      email: this.props.route.params.venderData.email,
      country_flag: this.props.route.params.venderData.country_flag,
      country_code: this.props.route.params.venderData.country_code,
      phone: this.props.route.params.venderData.phone,
      type: this.props.route.params.venderData.type,
      password: this.props.route.params.venderData.password,
      password_confirmation:
        this.props.route.params.venderData.password_confirmation,
      verified_by: 'email',
      experience: this.props.route.params.venderData.experience,
      interest_id: this.props.route.params.interestId,
      categories: JSON.parse(asyncData),
    };
    if (asyncData !== null) {
      console.log('datas===========>>>>>>>', JSON.stringify(body));

      const onSuccess = ({data}) => {
        console.log('data', data.data);
        AsyncStorage.clear();
        this.props.navigation.navigate(Constants.otp, {
          email: this.props.route.params.venderData.email,
        });
        this.setState({isLoading: false});
      };

      const onFailure = (error) => {
        console.log('eeeeeeeeeeeeeeeeeeeeeeeee', error);
        utils.showResponseError(error);

        this.setState({isLoading: false});
      };

      // Show spinner when call is made
      this.setState({isLoading: true});

      Axios.post(Constants.signUpURL, body).then(onSuccess).catch(onFailure);
    } else {
      utils.showToast('Please Select Industry and Enter services first...');
    }
  };

  render() {
    console.log(this.props.route.params);

    return (
      <View style={[STYLES.container, {paddingHorizontal: SIZES.ten}]}>
        <NormalHeader name="Select Industry" />
        {this.state.isLoading ? (
          <Spinner
            visible={this.state.isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <FlatList
            numColumns={3}
            data={
              this.state.newData.length === 0
                ? this.formatData(this.state.Data, 3)
                : this.formatData(this.state.Data, 3)
            }
            keyExtractor={(item) => item.id}
            renderItem={this.renderIntustry}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: SIZES.twenty,
            }}
          />
        )}

        <View style={{marginVertical: SIZES.ten * 3}}>
          <ButtonRadius10
            label="CONTINUE"
            bgColor={Colors.sickGreen}
            onPress={() => {
              this.signUp();
              // props.navigation.replace(Constants.login);
              // props.navigation.dispatch(resetAction);
              // console.log(this.state.myServices);
              // console.log(this.state.newData);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    // height: Dimensions.get('window').width / 2, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    padding: SIZES.ten,
    marginHorizontal: SIZES.fifteen,
    marginBottom: SIZES.twenty,
    marginTop: SIZES.five,
  },
  card: {
    flex: 1,
    borderRadius: SIZES.ten * 2,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: SIZES.five - 2, height: SIZES.five - 2},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 15,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
});

// const Data = [
//   {
//     id: 1,
//     name: 'Gaming',
//   },
//   {
//     id: 2,
//     name: 'Planting',
//   },
//   {
//     id: 3,
//     name: 'Bike Riding',
//   },
//   {
//     id: 4,
//     name: 'Photography',
//   },
//   {
//     id: 5,
//     name: 'Peotry',
//   },
// ];
