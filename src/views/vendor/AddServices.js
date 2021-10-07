import React, {useRef, useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Platform} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Icon} from 'native-base';
import Constants, {FONTS, SIZES, STYLES} from '../../common/Constants';
import ButtonRadius10 from '../../components/ButtonRadius10';
import EditText from '../../components/EditText';
import RegularTextCB from '../../components/RegularTextCB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './../../common/Colors';
import {utc} from 'moment';
import utils from '../../utils';

export default function AddServices(props) {
  console.log('props==============>>>>>', props.route.params);
  // our number of inputs, we can add the length or decrease
  const [numInputs, setNumInputs] = useState(1);
  const [areAllFieldsFilled, setAreAllFieldsFilled] = useState(false);
  // all our input fields are tracked with this array
  const [textValue, setTextVlaue] = useState([{name: '', price: ''}]);
  // const refService = useRef([{name: '', price: ''}]);
  const scrollViewRef = useRef();
  const refService = useRef([textValue]);

  useEffect(() => {
    async function getServices() {
      const harami = await AsyncStorage.getItem('SelectedServices');

      if (harami !== null) {
        var parsedHarami = JSON.parse(harami);

        parsedHarami.map((e) => {
          if (props.route.params.id === e.cat_id) {
            console.log(e);
            setTextVlaue(e.services);
            setNumInputs(e.services.length);
          }
        });
      }
    }
    getServices();
  }, []);

  const addInputFields = () => {
    // refService.current.push({name: '', price: ''});
    textValue.push({name: '', price: ''});
    setNumInputs((prev) => prev + 1);
    scrollViewRef.current.scrollTo({x: 10, y: 100000000000, animated: true});
    console.log('hamzaaaaaaaaaaaaaaaaaaaaaaaaaaaa ', scrollViewRef.current);
  };

  const removeInputFields = (index) => {
    if (index > 0) {
      refService.current.splice(index, 1);
      textValue.splice(index, 1);
      setNumInputs((prev) => prev - 1);
    }
  };

  const saveCategoriesToStorage = async () => {
    // AsyncStorage.clear();

    textValue.map((inputss) => {
      if (inputss.name === '' || inputss.price === '') {
        utils.showToast('All Fields are rquired..');
        console.log('helooo');
        setAreAllFieldsFilled(false);
      } else {
        setAreAllFieldsFilled(true);
        // goto start;
        return;
      }
    });

    if (areAllFieldsFilled) {
      const data = {
        cat_id: props.route.params.id,
        services: textValue,
      };
      var something = [];

      // something.push(data);

      console.log('myservices==========>>>> ', JSON.stringify(something));

      const myServices = await AsyncStorage.getItem('SelectedServices');
      if (myServices !== null) {
        console.log('myservices==========>>>> ', myServices);
        something = JSON.parse(myServices);
        console.log(
          'something==========>>>> ',
          something.id +
            ' ' +
            props.route.params.id +
            ' ' +
            JSON.stringify(something),
        );

        something.map((x) => {
          if (x.cat_id.toString() === props.route.params.id.toString()) {
            x.services = data.services;
          } else {
            something.push(data);
          }
        });

        // something.push(data);
        // console.log('bhen ki annkh==========>>>> ', JSON.stringify(something));
        await AsyncStorage.setItem(
          'SelectedServices',
          JSON.stringify(something),
        ).then((val) => {
          // console.log('bhens ki aankh ==========>>>> ', val);
          props.navigation.replace(Constants.SelectIndustry);
        });
      } else {
        something.push(data);

        console.log('bhens ki taang==========>>>> ', JSON.stringify(something));
        // AsyncStorage.clear();

        await AsyncStorage.setItem(
          'SelectedServices',
          JSON.stringify(something),
        ).then((val) => {
          // console.log('bhens ki lulli ==========>>>> ', val);
          props.navigation.replace(Constants.SelectIndustry);
        });
      }
    }
  };

  const setInputValues = (index, serviceName, from) => {
    let names = [];
    textValue.map((el, i) => {
      if (index === i) {
        el.name = serviceName;
        names.push(el);
      } else {
        names.push(el);
      }
    });
    setTextVlaue(names);
    refService.current = names;
    // console.log('name handleChange======>>>>>', names);
  };

  const setPrice = (index, serviceName) => {
    let prices = [];
    refService.current.map((el, i) => {
      if (index === i) {
        el.price = serviceName;
        prices.push(el);
      } else {
        prices.push(el);
      }
    });
    setTextVlaue(prices);
    refService.current = prices;
  };

  const inputs = [];

  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View
        key={i.toString()}
        style={[
          {
            paddingHorizontal: SIZES.fifteen,
          },
        ]}>
        <View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: SIZES.fifteen,
            }}>
            <Text style={[FONTS.mediumFont16, {marginTop: SIZES.ten}]}>
              Name
            </Text>
            {i !== 0 ? (
              <TouchableOpacity
                onPress={() => {
                  removeInputFields(i);
                }}
                activeOpacity={0.6}
                style={{
                  padding: 5,
                }}>
                <Icon
                  name="close"
                  type="SimpleLineIcons"
                  style={{fontSize: SIZES.fifteen * 1.8}}
                />
              </TouchableOpacity>
            ) : null}
          </View>

          <EditText
            placeholder="Enter Service Name"
            value={textValue[i].name}
            onChangeText={(text) => {
              setInputValues(i, text);
            }}
          />
        </View>

        <View style={{marginTop: SIZES.five, marginBottom: SIZES.fifteen}}>
          <Text style={[FONTS.mediumFont16, {marginTop: SIZES.ten}]}>
            Price
          </Text>
          <EditText
            value={textValue[i].price}
            placeholder="Enter Service Price"
            keyboardType="number-pad"
            onChangeText={(text) => {
              setPrice(i, text);
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: Colors.lightGrey,
            height: 0.4,
            marginVertical: SIZES.ten,
          }}
        />
      </View>,
    );
  }

  return (
    <View style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          //   marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
        }}>
        <TouchableOpacity
          // style={{position: 'absolute', left: 0}}
          onPress={() => {
            props.navigation.goBack();
          }}
          activeOpacity={0.6}>
          <Icon
            type="AntDesign"
            name="left"
            style={{color: Colors.black, fontSize: SIZES.ten * 3}}
          />
        </TouchableOpacity>
        <RegularTextCB
          style={[
            {
              color: Colors.black,
              fontSize:
                props.name === 'Service Provider On the Way' &&
                Platform.OS === 'ios'
                  ? SIZES.ten * 2.5
                  : SIZES.ten * 3,
            },
          ]}>
          Add Services
        </RegularTextCB>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            // props.navigation.navigate(Constants.SelectIndustry);
            saveCategoriesToStorage();
          }}
          style={{
            backgroundColor: Colors.sickGreen,
            paddingHorizontal: SIZES.fifteen,
            paddingVertical: SIZES.five / 2,
            borderRadius: SIZES.five * 1.5,
          }}>
          <Text style={[FONTS.mediumFont14, {color: Colors.white}]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={{marginBottom: 75}}
        contentContainerStyle={{paddingBottom: 250}}
        overScrollMode="never"
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {inputs}
      </ScrollView>

      <View
        style={[
          STYLES.shadow,
          {
            marginTop: SIZES.ten * 5,
            paddingBottom: SIZES.ten,
            marginHorizontal: SIZES.ten,
            position: 'absolute',
            bottom: SIZES.twenty,
            width: '97%',
            alignSelf: 'center',
          },
        ]}>
        <ButtonRadius10
          bgColor={Colors.sickGreen}
          label="+ ADD"
          onPress={() => {
            addInputFields();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: SIZES.ten,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: SIZES.ten,
    // width: width - SIZES.fifteen,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
  },
});
