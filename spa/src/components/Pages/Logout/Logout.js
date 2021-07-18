import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import styles from './Logout.module.scss';

import Header from './../../Headers/Header/Header';
import SideBar from './../../SideBar/SideBar';
import Backdrop from './../../basic/Backdrop/Backdrop';

import { useAuth } from '../../contexts/AuthContext';


export default function Logout() { 

  const { logout, currentUser } = useAuth();
  const [error, setError]= useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function LogoutSubmitHandler(e) {
    console.log("Logout Submit Button clicked!");
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await logout();
      console.log("Log Out successful! Attempting to redirect to Login page");
      history.push("/login");
    }
    catch {
      setError("Failed to log out of account");
    }
    
    setLoading(false);
  }
  let username = "Jack";
  return (
    <div className={styles.Logout}>
      <Header />
      <SideBar />
      <Backdrop />
      <div className={styles.LogoutBodyWrapper}>
        <div className={styles.LogoutBody}>
          <h2>Log Out</h2>
          {error && <div className={styles.Alert}>{error}</div>}
          <div className={styles.User}>
            <div><strong>Username:</strong> {username}</div>
            <div><strong>Email ID:</strong> {currentUser.email}</div>            
          </div>
          <form className={styles.LogoutForm} onSubmit={LogoutSubmitHandler}>
            <button className={styles.LogoutSubmit} type="submit" disabled={loading}>
              Log Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/*
<strong>Username:</strong>{username}
            
            <strong>Email ID:</strong>{currentUser}
*/