import { useState } from "react";
import firebase from 'firebase/compat/app'; // for backward compatibility
import 'firebase/compat/auth'; // for backward compatibility
import axios from "axios";
import firebaseConfig from "./fireBaseConfig";

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const SignUp = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [myMessage, setMyMessage] = useState('');
    const [checked, setChecked] = useState(false)

    const handleSubmitButtonClick = () => {
        if (user === '' || pass === '' || confirmPass === '') {
            setMyMessage('Username or Passwords are empty');
        } else if (pass === confirmPass) {
            firebase.auth().createUserWithEmailAndPassword(user, pass)
                .then((userCredential) => {
                    setMyMessage(`Signup successful! Please check ${user} to verify your email.`);
                    return userCredential.user.sendEmailVerification();
                })
                .then(() => {
                    // Add the user email to the database
                    return axios.post("http://localhost:8000/add_user", { email: user });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    if (errorCode === 'auth/email-already-in-use') {
                        setMyMessage(`Email: ${user}, already in use. Please log in instead.`);
                    } else if (errorCode === 'auth/weak-password') {
                        setMyMessage(`Password should be at least 6 characters.`);
                    } else {
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

            <div id="promotions-div">
                <label>You are {checked? '' : 'not'} signed up for future promotions / offers (optional)</label>
                <input 
                    type="checkbox" 
                    onChange={()=> setChecked(!checked)} 
                    value={checked}
                />
            </div>

            <p>Already have an account? Sign in instead: <a href="SignIn">Sign in</a></p>
            <p id="sign-up-message">{myMessage}</p>
        </form>
    );
};

export default SignUp;
