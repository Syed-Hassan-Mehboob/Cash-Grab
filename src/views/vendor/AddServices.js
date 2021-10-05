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
import Colors from './../../common/Colors';

export default function AddServices(props) {
  // this will be attached with each input onChangeText
  const [textValue, setTextValue] = useState('');
  // our number of inputs, we can add the length or decrease
  const [numInputs, setNumInputs] = useState(1);
  // all our input fields are tracked with this array
  const refService = useRef([textValue]);

  const addInputFields = () => {
    refService.current.push('');
    setNumInputs((prev) => prev + 1);
  };

  const setInputValues = (index, serviceName) => {
    const inputs = refService.current;
    inputs[index] = serviceName;

    setTextValue(serviceName);
  };
  const inputs = [];
  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View
        style={[
          {
            paddingHorizontal: SIZES.fifteen,
          },
        ]}>
        <View>
          <Text style={[FONTS.mediumFont16, {marginTop: SIZES.ten}]}>Name</Text>
          <EditText
            placeholder="Enter Service Name"
            value={refService.current[i]}
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
            placeholder="Enter Service Price"
            keyboardType="number-pad"
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
            props.navigation.navigate(Constants.SelectIndustry);
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
        contentContainerStyle={{paddingBottom: 110}}
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
