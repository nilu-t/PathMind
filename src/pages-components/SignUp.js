import { useState } from "react";
import firebase from 'firebase/compat/app'; // for backward compatibility
import 'firebase/compat/auth'; // for backward compatibility
import firebaseConfig from "./fireBaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const SignUp = () => {
    // States for signing up.
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [myMessage, setMyMessage] = useState('');

    const handleSubmitButtonClick = () => {
        if (user === '' || pass === '' || confirmPass === '') {
            setMyMessage('Username or Passwords are empty');
        } else if (pass === confirmPass) {
            // Setting up Firebase authentication to get the user signed in.
            firebase.auth().createUserWithEmailAndPassword(user, pass)
                .then((userCredential) => {
                    // Successfully signed in
                    setMyMessage(`Signup successful! Please check ${user} to verify your email.`);
                    // Send verification email
                    return userCredential.user.sendEmailVerification();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    /** Error codes from documentation https://firebase.google.com/docs/reference/js/auth#autherrorcodes */
                    if (errorCode === 'auth/email-already-in-use') {
                        // EMAIL_EXISTS error code customized message.
                        setMyMessage(`Email: ${user}, already in use. Please log in instead.`);
                    } else if (errorCode === 'auth/weak-password') {
                        // WEAK_PASSWORD error code customized message.
                        setMyMessage(`Password should be at least 6 characters.`);
                    } else {
                        // Other errors.
                        setMyMessage(`Encountered error: ${errorMessage}`);
                    }
                });
        } else {
            setMyMessage('Passwords do not match');
        }
    };

    return (
        <form id="sign-form">
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
            <p>Already have an account? Sign in instead: <a href="SignIn">Sign in</a></p>
            <p id="sign-up-message">{myMessage}</p>
        </form>
    );
};

export default SignUp;
