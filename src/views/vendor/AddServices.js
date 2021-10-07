import {Icon} from 'native-base';
import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
  const refService = useRef([{name: '', price: ''}]);
  const scrollViewRef = useRef();
  // const refService = useRef([textValue]);

  const addInputFields = () => {
    refService.current.push({name: '', price: ''});
    setNumInputs((prev) => prev + 1);
    scrollViewRef.current.scrollTo({x: 0, y: 100000000000, animated: true});
    console.log('hamzaaaaaaaaaaaaaaaaaaaaaaaaaaaa ', scrollViewRef.current);
  };

  const saveCategoriesToStorage = async () => {
    refService.current.map((inputss) => {
      if (inputss.name === '' || inputss.price === '') {
        utils.showToast('All Fields are rquired..');
        console.log('helooo');
        setAreAllFieldsFilled(false);
      } else {
        setAreAllFieldsFilled(true);
      }
    });

    if (areAllFieldsFilled) {
      const data = {
        cat_id: props.route.params.id,
        services: refService.current,
      };
      var something = [];

      const myServices = await AsyncStorage.getItem('SelectedServices');
      if (myServices !== null) {
        // console.log('myservices==========>>>> ', myServices);
        something = JSON.parse(myServices);
        something.push(data);
        console.log('myservices==========>>>> ', JSON.stringify(something));
        await AsyncStorage.setItem(
          'SelectedServices',
          JSON.stringify(something),
        ).then((val) => {
          console.log('bhens ki aankh ==========>>>> ', val);
          // props.navigation.replace(Constants.SelectIndustry);
        });
      } else {
        something.push(data);

        console.log('myservices==========>>>> ', something);
        AsyncStorage.clear();

        await AsyncStorage.setItem(
          'SelectedServices',
          JSON.stringify(something),
        ).then((val) => {
          console.log('bhens ki lulli ==========>>>> ', val);
        });
      }
    }

    // if (areAllFieldsFilled)
    // const data = {
    //   cat_id: props.route.params.id,
    //   services: refService.current,
    // };
    // var something = [];

    // const myServices = await AsyncStorage.getItem('SelectedServices');
    // if (myServices !== null) {
    //   // console.log('myservices==========>>>> ', myServices);
    //   something = JSON.parse(myServices);
    //   something.push(data);
    //   console.log('myservices==========>>>> ', something);
    //   AsyncStorage.clear();
    //   // await AsyncStorage.setItem(
    //   //   'SelectedServices',
    //   //   JSON.stringify(something),
    //   // ).then(() => {
    //   //   props.navigation.replace(Constants.SelectIndustry);
    //   // });
    // } else {
    //   something.push(data);

    //   console.log('myservices==========>>>> ', something);
    //   AsyncStorage.clear();

    //   // await AsyncStorage.setItem(
    //   //   'SelectedServices',
    //   //   JSON.stringify(something),
    //   // ).then(() => {
    //   //   console.log(
    //   //     'else===========================>>>>>',
    //   //     JSON.stringify(something),
    //   //   );
    //   //   props.navigation.replace(Constants.SelectIndustry);
    //   // });
    // }

    // // console.log(
    // //   'if===========================>>>>>',
    // //   JSON.stringify(something),
    // // );
    // // await AsyncStorage.setItem('SelectedServices', JSON.stringify(data)).then(
    // //   () => {
    // //     props.navigation.replace(Constants.SelectIndustry);
    // //   },
    // // );
  };
  const setInputValues = (index, serviceName, from) => {
    let names = refService.current;

    refService.current[index].name = serviceName;
    names[index].name = serviceName;
    // refService.current = inputs;
  };

  const setPrice = (index, serviceName, from) => {
    let prices = refService.current;
    prices[index].price = serviceName;
    refService.current[index].price = serviceName;

    // refService.current = inputs;
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
          <Text style={[FONTS.mediumFont16, {marginTop: SIZES.ten}]}>Name</Text>
          <EditText
            placeholder="Enter Service Name"
            // value={refService.current[i].name}
            onChangeText={(text) => {
              setInputValues(i, text, 'name');
            }}
          />
        </View>

        <View style={{marginTop: SIZES.five, marginBottom: SIZES.fifteen}}>
          <Text style={[FONTS.mediumFont16, {marginTop: SIZES.ten}]}>
            Price
          </Text>
          <EditText
            // value={refService.current[i].price}
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
        <RegularTextCB style={[FONTS.boldFont24, {}]}>
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
        // ref={(ref) => {
        //   scrollViewRef = ref;
        // }}
        style={{marginBottom: 75}}
        contentContainerStyle={{paddingBottom: 150}}
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
