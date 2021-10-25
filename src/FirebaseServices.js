import messaging from '@react-native-firebase/messaging';
import Constants, {FIREBASECONSTANTS} from './common/Constants';
import Axios from './network/APIKit';
import database from '@react-native-firebase/database';
export async function requestUserPermission(userToken) {
  // console.log('method start');

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
    getFcmToken(userToken);
  }
}

export const getFcmToken = async (userToken, userId) => {
  // console.log('get fcm token', userId);
  try {
    messaging()
      .getToken()
      .then((token) => {
        console.log('the new token generated ', token);
        SetFcmToken(token, userToken, userId);
      });
    messaging().onTokenRefresh((token) => {
      console.log('the new refreshed token generated ', token);
      SetFcmToken(token, userToken, userId);
    });
  } catch (error) {
    // console.log('get fcmToken error ', error);
  }
};

export const SetFcmToken = async (token, userToken, userId) => {
  // const Token = useSelector(state => state.Auth.AccessToken);
  // console.log('set fcm token ==========>', userToken);
  // console.log('set fcm token', userId);

  // console.log('database========>>>>>>>', database());

  await database()
    .ref(FIREBASECONSTANTS.FIREBASE_TOKEN)
    .child(userId.toString())
    .set(token)
    .then(() => console.log('HHHHAAAAMMMMZZZZAAAAA FCM Data Upload.'))
    .catch((error) => console.log('HHHHAAAAMMMMZZZZAAAAA error ====>', error));

  const formData = new FormData();

  let config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  formData.append('device_token', token);

  const onSuccess = ({data}) => {
    // console.log(
    //   '=====================================================>>>>>>>>>> user fcm token save================================================================>>>>>>>>>>>>>>>>',
    //   data,
    // );
  };

  const onFailure = (error) => {
    // console.log('user fcm token error', error);
  };

  Axios.post(Constants.SaveUserDeviceTokenURL, formData, config)
    .then(onSuccess)
    .catch(onFailure);
};
