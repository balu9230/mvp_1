import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';
import styles from './SignUp.module.scss';

import { useAuth } from '../../contexts/AuthContext';
import Header from '../../Header/Header';

export default function SignUp(props) {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUp, currentUser } = useAuth();
  console.log("SignUp - |component| (currentUser)"); // @@@@
  console.log(currentUser); // @@@@
  const [error, setError]= useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function signUpSubmitHandler(e) {
    console.log("Sign Up Submit Button clicked!");
    e.preventDefault();
    console.log(passwordRef.current.value, passwordConfirmRef.current.value);
    // validations
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError('');
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    }
    catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }
  
  return (
    <div className={styles.SignUp}>
      <Header />
      <div className={styles.SignUpBodyWrapper}>
        <div className={styles.SignUpBody}>
          <h2>Sign Up</h2>
          {error && <div className={styles.Alert}>{error}</div>}
          {currentUser && console.log(currentUser.email, currentUser.emailVerified)}
          {currentUser && <div className={styles.Alert}>{currentUser.email}</div>}
          <form className={styles.SignUpForm} onSubmit={signUpSubmitHandler}>
            <div className={cn(styles.SignUpForm, styles.AlignContainer)}>
              <label htmlFor="signup_email">
                  Email
              </label>
            </div>
            <input type="email" ref={emailRef}
                    id="signup_email" name="signup_email"
                    pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
            />
            <div className={cn(styles.SignUpForm, styles.AlignContainer)}>
              <label htmlFor="signup_password">
                  Password
              </label>
            </div>
            <input type="password" ref={passwordRef}
                    id="signup_password" name="signup_password"
            />
            <div className={cn(styles.SignUpForm, styles.AlignContainer)}>
              <label htmlFor="signup_password_confirm">
                  Password Confirmation 
              </label>
            </div>
            <input type="password" ref={passwordConfirmRef}
                    id="signup_password_confirm" name="signup_password_confirm"
            />
            <button className={styles.SignUpSubmit} type="submit" disabled={loading}>
              Sign Up
            </button>
          </form>
          <div className={cn(styles.SignUpForm, styles.SignInRedirect)}>
            <label className={cn(styles.SignUpForm, styles.SignInRedirect, styles.Label)}>
              Already have an account?
            </label>
            <Link className={cn(styles.SignUpForm, styles.SignInRedirect, styles.Link)} to="/signin">
              Sign In
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

// pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"