import firebase from '@react-native-firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCGlDm7qTUpB4cK3K1jkXBORw6oCCFrEes',
  authDomain: 'cashgrab-db612.firebaseapp.com',
  projectId: 'cashgrab-db612',
  storageBucket: 'cashgrab-db612.appspot.com',
  messagingSenderId: '409712438268',
  databaseURL: '',
  appId: '1:409712438268:ios:b42cc00f9b98af7987e079',
};

export default Firebase = () => {
  console.log('========================>', firebase.apps.length);
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  } else {
    return firebase.app();
  }
};
