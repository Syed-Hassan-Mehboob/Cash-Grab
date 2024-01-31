import firebase from '@react-native-firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCijEnIq5ivEdXgjvecEvsYyVQpcoQEQK8',
  authDomain: 'cashgrab-7ba51.firebaseapp.com',
  projectId: 'cashgrab-7ba51',
  storageBucket: 'cashgrab-7ba51.appspot.com',
  databaseURL: 'https://cashgrab-7ba51-default-rtdb.firebaseio.com',
  messagingSenderId: '380399947047',
  appId: '1:380399947047:ios:ba775f8e53a729c188ad02',
};

export default Firebase = () => {
  console.log('========================>', firebase.apps.length);
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  } else {
    return firebase.app();
  }
};
