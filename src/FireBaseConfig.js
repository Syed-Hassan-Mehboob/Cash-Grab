import firebase from '@react-native-firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCGlDm7qTUpB4cK3K1jkXBORw6oCCFrEes',
  // apiKey: 'AIzaSyBza97wLNIobQVng0ar7M6zCV9EXV_REo0',
  authDomain: 'cashgrab-db612.firebaseapp.com',
  projectId: 'cashgrab-db612',
  storageBucket: 'cashgrab-db612.appspot.com',
  messagingSenderId: '409712438268',
  databaseURL:
    'https://cashgrab-db612-default-rtdb.europe-west1.firebasedatabase.app/',
  appId: '1:409712438268:ios:363dbd2c3d27f21487e079',
};

export default Firebase = () => {
  console.log('========================>', firebase.apps.length);
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  } else {
    return firebase.app();
  }
};
