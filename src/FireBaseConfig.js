import firebase from '@react-native-firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBza97wLNIobQVng0ar7M6zCV9EXV_REo0',
  authDomain: '',
  databaseURL: '',
  projectId: 'cashgrab-db612',
  storageBucket: 'cashgrab-db612.appspot.com',
  messagingSenderId: '409712438268',
  appId: '1:409712438268:android:a4784578a68650da87e079',
};

export default Firebase = () => {
  // console.log('========================>', firebase.apps.length);
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  } else {
    return firebase.app();
  }
};
