import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
// import {CONSTANTS, FIREBASECONSTANTS} from '../../constants';
import {FIREBASECONSTANTS} from './common/Constants';

export async function requestUserPermission(userToken) {
  // console.log('method start');

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken(userToken);
  }
}

const getFcmToken = async (userToken) => {
  try {
    messaging()
      .getToken()
      .then((token) => {
        console.log('the new token generated ', token);
        // SetFcmToken(token, userToken);
      });
    messaging().onTokenRefresh((token) => {
      console.log('the new refreshed token generated ', token);
      //   SetFcmToken(token, userToken);
    });
  } catch (error) {
    console.log('get fcmToken error ', error);
  }
};

// const SetFcmToken = async (token, userToken) => {
//   // const Token = useSelector(state => state.Auth.AccessToken);
//   console.log('set fcm token ==========>', token);

//   let config = {
//     headers: {
//       Authorization: userToken,
//     },
//   };
//   let data = {
//     device_token: token,
//   };
//   const onSuccess = ({data}) => {
//     console.log('user fcm token save', data);
//   };
//   const onFailure = (error) => {
//     console.log('user fcm token error', error);
//   };
//   Axios.post(CONSTANTS.SaveUserDeviceToken, data, config)
//     .then(onSuccess)
//     .catch(onFailure);
// };
