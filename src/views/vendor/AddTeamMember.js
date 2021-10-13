import React, {useState, useEffect} from 'react';
import {Icon} from 'native-base';
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import ImgToBase64 from 'react-native-image-base64';
import Colors from '../../common/Colors';
import Constants, {FONTS, SIZES, STYLES} from '../../common/Constants';
import ButtonRadius10 from '../../components/ButtonRadius10';
import EditText from '../../components/EditText';
import RegularTextCB from '../../components/RegularTextCB';
import LightTextCB from '../../components/LightTextCB';
import Images from '../../common/Images';
import utils from '../../utils';
import Axios from '../../network/APIKit';

export default function AddTeamMember(props) {
  const [accessToken, setAccessToken] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserAccessToken();
  }, []);

  const getUserAccessToken = async () => {
    console.log(
      'getUserAccessToken, getUserAccessToken, getUserAccessToken, getUserAccessToken, getUserAccessToken',
    );
    const token = await AsyncStorage.getItem(Constants.accessToken);
    setAccessToken(token);
  };

  const renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <LightTextCB style={{fontSize: 30}}>Upload Photo</LightTextCB>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <Image
              source={Images.iconClose}
              style={{
                height: SIZES.fifteen,
                width: SIZES.fifteen,
                tintColor: Colors.coolGrey,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <LightTextCB style={{fontSize: 16, color: Colors.grey}}>
          Upload a photo from
        </LightTextCB>
        <View style={{marginTop: 30}}>
          <ButtonRadius10
            bgColor={Colors.sickGreen}
            label="CAMERA"
            onPress={() => takePhotoFromCamera()}
          />
        </View>
        <View style={{marginTop: SIZES.twenty}}>
          <ButtonRadius10
            label="GALLERY"
            onPress={() => choosePhotoFromGallery()}
          />
        </View>
        <View style={{height: SIZES.fifty}} />
      </View>
    );
  };

  const choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: SIZES.five * 100,
      height: SIZES.five * 100,
      cropping: true,
    }).then((image) => {
      setIsModalVisible(false);
      ImgToBase64.getBase64String(image.path)
        .then((base64String) => {
          // console.log("image converted to base 64 =======>>>>", 'data:image/png;base64,'+base64String)
          setImage('data:image/png;base64,' + base64String);
        })
        .catch((err) =>
          console.log(
            'catch error while converting image to base 64=====>>>>',
            err,
          ),
        );
    });
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: SIZES.five * 100,
      height: SIZES.five * 100,
      cropping: true,
    }).then((image) => {
      setIsModalVisible(false);
      ImgToBase64.getBase64String(image.path)
        .then((base64String) => {
          // console.log("image converted to base 64 =======>>>>", 'data:image/png;base64,'+base64String)
          setImage('data:image/png;base64,' + base64String);
        })
        .catch((err) =>
          console.log(
            'catch error while converting image to base 64=====>>>>',
            err,
          ),
        );
    });
  };

  const addTeamMember = async () => {
    const onSuccess = ({data}) => {
      setIsLoading(false);
      utils.showToast(data.message);
      setTimeout(() => {
        props.navigation.goBack();
      }, 500);
    };

    const onFailure = (error) => {
      setIsLoading(false);
      utils.showResponseError(error);
    };

    console.log(
      'sdfkjhsfkjhsflkhsklhdf ===================== >>>>>>>> name: ',
      name + ' image: ' + image,
    );

    if (name === '') {
      utils.showToast('Invalid Name');
      return;
    }

    if (image === '') {
      utils.showToast('Invalid Image');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: accessToken,
      },
    };

    setIsLoading(true);
    Axios.post(Constants.addTeamMemberURL, formData, options)
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          //   marginTop: Platform.OS === 'android' ? 0 : SIZES.twenty,
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: 0}}
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
          Add Team Member
        </RegularTextCB>
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <TouchableOpacity
          style={{
            height: SIZES.fifty * 1.5,
            width: SIZES.fifty * 1.5,
            borderRadius: SIZES.fifty,
            backgroundColor: Colors.sickGreen,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setIsModalVisible(true);
          }}
          activeOpacity={0.6}>
          <Icon
            type="AntDesign"
            name="plus"
            style={{color: Colors.black, fontSize: SIZES.fifteen * 2.3}}
          />
        </TouchableOpacity>

        <Text style={[FONTS.mediumFont16]}>
          {' '}
          {image === '' ? 'Upload Photo' : 'Photo Uploaded'}
        </Text>

        <EditText
          placeholder="Enter Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={{marginTop: SIZES.fifteen}}
        />
      </View>

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
          label="ADD"
          onPress={() => {
            addTeamMember();
          }}
        />
      </View>

      <Modal isVisible={isModalVisible} style={styles.modal}>
        {renderBottomSheetContent()}
      </Modal>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontFamily: Constants.fontRegular,
  },
  bottomSheetBody: {
    backgroundColor: Colors.white,
    padding: SIZES.twenty,
    borderTopStartRadius: SIZES.twenty,
    borderTopEndRadius: SIZES.twenty,
  },
});
