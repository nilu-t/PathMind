import { useState } from "react";
import firebase from 'firebase/compat/app'; // for backward compatibility
import 'firebase/compat/auth'; // for backward compatibility
import firebaseConfig from "./fireBaseConfig";

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const SignIn = () => {
    // States for signing in.
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [myMessage, setMyMessage] = useState('');

    const handleSubmitButtonClick = () => {
        if (user === '' || pass === '') {
            setMyMessage('Username or Password is empty');
        } else {
            // Setting up Firebase authentication to get the user signed in.
            firebase.auth().signInWithEmailAndPassword(user, pass)
                .then((userCredential) => {
                    // Successfully signed in
                    setMyMessage(`Welcome back, ${userCredential.user.email}!`);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    /** Error codes from documentation https://firebase.google.com/docs/reference/js/auth#autherrorcodes */
                    if (errorCode === 'auth/wrong-password') {
                        // WRONG_PASSWORD error code customized message.
                        setMyMessage(`Incorrect password. Please try again.`);
                    } else if (errorCode === 'auth/user-not-found') {
                        // USER_NOT_FOUND error code customized message.
                        setMyMessage(`No user found with this email.`);
                    } else {
                        // Other errors.
                        setMyMessage(`Encountered error: ${errorMessage}`);
                    }
                });
        }
    };

    return (
        <form id="sign-form">
            <h1>Sign In to Path Mind</h1>

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

            <button type="button" onClick={handleSubmitButtonClick}>Sign In</button>
            <p>Don't have an account? Sign up instead: <a href="SignUp">Sign up</a></p>
            <p id="sign-in-message">{myMessage}</p>
        </form>
    );
};

export default SignIn;
