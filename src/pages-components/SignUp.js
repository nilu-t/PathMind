import { useState } from "react";

import firebase from 'firebase/compat/app'; // for backward compatibility
import 'firebase/compat/auth'; // for backward compatibility

import firebaseConfig from "./fireBaseConfig";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const myFirebaseConfig = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
  measurementId: firebaseConfig.measurementId
};

// Initialize Firebase
firebase.initializeApp(myFirebaseConfig);

const SignUp = () => {

    // States for signing up.
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    
    //Boolean states for signing up.
    // const [isUserEmpty, setUserEmpty] = useState(false);
    // const [isPassEmpty, setPassEmpty] = useState(false);
    // const [isConfirmEmpty, setConfirmEmpty] = useState(false);

    const handleSubmitButtonClick = () => {

        //setting up firebase authentication to get the user signed in.
        firebase.auth().createUserWithEmailAndPassword(user, pass)
        .then((userCredential) => {
          // Successfully signed in
          var user = userCredential.user;
          alert('Successfully signed up with email: ' + user.email);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/email-already-in-use') {
            alert('Email already in use.');
          } else {
            alert(errorMessage);
          }
        });
        
        alert(`${user}, ${pass}, ${confirmPass}`)

        //TODO: posting the USERNAME data only (no passwords) into the mysql database for the user table.
        
         
    }

    return (
      <form id="sign-up-form">
        <h1>Sign Up to Path Mind</h1>
        
        <label htmlFor="username">Username (Email)</label>
        <input 
          id="username"
          name="username"
          type="email"
          required
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input 
          id="password"
          name="password"
          type="password"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input 
          id="confirm-password"
          name="confirm-password"
          type="password"
          required
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <button type="button" onClick={handleSubmitButtonClick}>Sign Up</button>
      </form>
    );
};

export default SignUp;
