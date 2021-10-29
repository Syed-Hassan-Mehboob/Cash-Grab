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
import Constants, {FONTS, SIZES, STYLES} from '../common/Constants';
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
        paddingBottom: SIZES.twenty,
      }}
      showsVerticalScrollIndicator={false}>
      <NormalHeader name="Review" />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.fifteen,
          marginTop: SIZES.twentyFive * 1.5,
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
              height: SIZES.ten * 7.5,
              width: SIZES.ten * 7.5,
              borderRadius: SIZES.ten * 7.5,
            }}
            resizeMode="cover"
          />

          <View style={{marginStart: SIZES.five}}>
            <Text style={[FONTS.boldFont18, {color: Colors.black}]}>
              {'Ray Hammond'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: SIZES.five,
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
              <Text
                style={[
                  FONTS.mediumFont14,
                  {
                    color: Colors.turqoiseGreen,
                    //   fontSize: 14,
                    marginStart: SIZES.five,
                  },
                ]}>
                Verified
              </Text>
            </View>
          </View>
        </View>
        <Text style={[FONTS.boldFont16]}>$240.00</Text>
      </View>

      <View style={{paddingHorizontal: SIZES.fifteen}}>
        <Text
          style={[
            FONTS.boldFont22,
            {alignSelf: 'center', marginTop: SIZES.twentyFive * 1.5},
          ]}>
          Write a Review
        </Text>
        <View style={{alignItems: 'center'}}>
          <StarRating
            disabled={false}
            maxStars={5}
            animation="swing"
            containerStyle={{
              marginTop: SIZES.fifteen,
              width: '85%',
            }}
            rating={starCount}
            fullStarColor={'#ffcc00FF'}
            emptyStarColor={'#ffcc00FF'}
            selectedStar={(rating) => onStarRatingPress(rating)}
          />
        </View>

        <Text
          style={[
            FONTS.mediumFont14,
            {marginTop: SIZES.twentyFive * 1.5, marginBottom: SIZES.fifteen},
          ]}>
          Description
        </Text>

        <MessageEditText
          placeholder={'Write Review'}
          height={SIZES.twentyFive * 5.5}
        />

        <TouchableOpacity
          style={{alignSelf: 'center', marginVertical: SIZES.twentyFive * 1.5}}
          activeOpacity={0.6}>
          <Text style={[FONTS.mediumFont12]}>I'll do It Later</Text>
        </TouchableOpacity>

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
