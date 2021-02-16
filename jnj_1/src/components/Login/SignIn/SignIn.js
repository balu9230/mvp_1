import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';
import styles from './SignIn.module.scss';

import { useAuth } from '../../contexts/AuthContext';
import Header from '../../Header/Header';

export default function SignIn(props) {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn, currentUser } = useAuth();
  console.log("SignIn - |component| (currentUser)"); // @@@@
  console.log(currentUser); // @@@@
  const [error, setError]= useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function signInSubmitHandler(e) {
    console.log("Sign In Submit Button clicked!");
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await signIn(emailRef.current.value, passwordRef.current.value);
      console.log("Sign In successful! Attempting to redirect to Dashboard");
      history.push("/");
    }
    catch {
      setError("Failed to sign in to account");
    }

    setLoading(false);
  }
  
  return (
    <div className={styles.SignIn}>
      <Header />
      <div className={styles.SignInBodyWrapper}>
        <div className={styles.SignInBody}>
          <h2>Sign In</h2>
          {error && <div className={styles.Alert}>{error}</div>}
          {currentUser && console.log(currentUser.email, currentUser.emailVerified)}
          {currentUser && <div className={styles.Alert}>{currentUser.email}</div>}
          <form className={styles.SignInForm} onSubmit={signInSubmitHandler}>
            <div className={cn(styles.SignInForm, styles.AlignContainer)}>
              <label htmlFor="signin_email">
                  Email
              </label>
            </div>
            <input type="email" ref={emailRef}
                    id="signin_email" name="signin_email"
                    pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
            />
            <div className={cn(styles.SignInForm, styles.AlignContainer)}>
              <label htmlFor="signin_password">
                  Password
              </label>
            </div>
            <input type="password" ref={passwordRef}
                    id="signin_password" name="signin_password"
            />
            <button className={styles.SignInSubmit} type="submit" disabled={loading}>
              Sign In
            </button>
          </form>
          <div className={cn(styles.SignInForm, styles.SignUpRedirect)}>
            <label className={cn(styles.SignInForm, styles.SignUpRedirect, styles.Label)}>
              Need an account?
            </label>
            <Link className={cn(styles.SignInForm, styles.SignUpRedirect, styles.Link)} to="/signup">
              Sign Up
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

// pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"