import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Colors from '../common/Colors';
import Constants, {SIZES, STYLES} from '../common/Constants';
import Images from '../common/Images';
import BoldTextCB from '../components/BoldTextCB';
import NormalHeader from '../components/NormalHeader';
import RegularTextCB from '../components/RegularTextCB';
import StarRating from 'react-native-star-rating';
import EditText from '../components/EditText';
import {Icon} from 'native-base';
import ButtonRadius10 from '../components/ButtonRadius10';
import MessageEditText from '../components/MessageEditText';

export default function WriteReviews() {
  const [starCount, setStarCount] = useState(0);

  const onStarRatingPress = (rating) => {
    setStarCount(rating);
  };

  return (
    <ScrollView
      style={[STYLES.container]}
      contentContainerStyle={{
        paddingHorizontal: SIZES.twenty,
        paddingBottom: SIZES.twenty,
      }}
      showsVerticalScrollIndicator={false}>
      <NormalHeader name="Review" />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: SIZES.ten * 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <Image
            source={Images.emp3}
            style={{
              height: SIZES.ten * 6,
              width: SIZES.ten * 6,
              borderRadius: SIZES.ten * 6,
            }}
            resizeMode="cover"
          />

          <View style={{marginStart: SIZES.five}}>
            <BoldTextCB style={{color: Colors.black, fontSize: 14}}>
              {'Ray Hammond'}
            </BoldTextCB>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={Images.iconVerified}
                style={{
                  height: SIZES.ten * 2.5,
                  width: SIZES.ten * 2.5,
                  resizeMode: 'contain',
                  tintColor: Colors.turqoiseGreen,
                }}
              />
              <RegularTextCB
                style={{
                  color: Colors.turqoiseGreen,
                  fontSize: 14,
                  marginStart: SIZES.five,
                }}>
                Verified
              </RegularTextCB>
            </View>
          </View>
        </View>
        <BoldTextCB>$240.00</BoldTextCB>
      </View>

      <BoldTextCB
        style={{fontSize: 24, alignSelf: 'center', marginTop: SIZES.ten * 5}}>
        Write a Review
      </BoldTextCB>

      <StarRating
        disabled={false}
        maxStars={5}
        containerStyle={{
          marginTop: SIZES.twenty,
        }}
        rating={starCount}
        fullStarColor={'#ffcc00FF'}
        emptyStarColor={'#ffcc00FF'}
        selectedStar={(rating) => onStarRatingPress(rating)}
      />
      <RegularTextCB style={{fontSize: 16, marginVertical: SIZES.twenty}}>
        Description
      </RegularTextCB>

      {/* <View style={[styles.card, {borderWidth: 1, borderColor: borderColor}]}>
        <Image
          source={Images.iconpencil}
          style={{
            height: SIZES.ten * 2.5,
            width: SIZES.ten * 2.5,
            // backgroundColor: 'red',
            marginTop: SIZES.ten + 3,
            marginHorizontal: SIZES.fifteen,
          }}
          resizeMode={'cover'}
        />
        <TextInput
          placeholderTextColor={Colors.grey}
          autoCapitalize="none"
          blurOnSubmit={true}
          placeholder={'Write Reviews'}
          onFocus={() => setBorderColor(Colors.sickGreen)}
          onBlur={() => setBorderColor('transparent')}
          selectionColor={Colors.sickGreen}
          multiline={true}
          editable={true}
          textAlignVertical={'top'}
          style={[
            {
              flex: 1,
              fontFamily: Constants.fontRegular,
              color: Colors.black,
              fontSize: 16,
              //   backgroundColor: 'red',
            },
          ]}
        />
      </View> */}

      <MessageEditText placeholder={'Write'} height={SIZES.twentyFive * 4.5} />

      <TouchableOpacity
        style={{alignSelf: 'center', marginTop: SIZES.ten * 3}}
        activeOpacity={0.6}>
        <RegularTextCB>I'll do It Later</RegularTextCB>
      </TouchableOpacity>

      <View style={{marginTop: SIZES.ten * 7}}>
        <ButtonRadius10
          label="Submit"
          bgColor={Colors.sickGreen}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: SIZES.ten * 17,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: '#c5c5c5',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'flex-start',
  },
});
