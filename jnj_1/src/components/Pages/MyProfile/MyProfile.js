import React from 'react';
import styles from './MyProfile.module.scss';

import Header from '../../Header/Header';
import SideBar from '../../SideBar/SideBar';
import Backdrop from '../../basic/Backdrop/Backdrop';
import { QUESTIONS } from './MyProfileQuestions';
import { OPTIONS } from './MyProfileOptions';
import SingleValDropdown from "../../basic/Dropdown/SingleValDropdown";

export default function MyProfile() {

  return (
    <div className={styles.MyProfile}>
      <Header />
      <SideBar />
      <Backdrop />
      <hr />
      <div className={styles.MyProfileBodyWrapper}>
        <div className={styles.MyProfileBody}>
          <div className={styles.Layout}>
            <div className={styles.PageTitle}><strong>My Profile</strong></div>
            <div className={styles.SubLayout1}>
              {
                QUESTIONS.map((el, idx) => {
                  if (el['type'] === 'simple_dropdown') {
                    return (
                      <div className={styles.CardWrapper} key={'my_profile_cardwrapper_'+idx}>
                      <div className={styles.Card} key={'my_profile_card_'+idx}>
                        <label 
                          className={styles.Title} 
                          htmlFor={el['question']+idx+'select'}
                          key={'my_profile_label_'+idx}
                        >
                          {el['question']}
                        </label>
                        <SingleValDropdown key={'my_profile_dropdown_'+idx} props={{
                          'select_classname': styles.Select,
                          'select_name': el['question']+idx+'select',
                          'select_id': el['question']+idx+'select',
                          'option_classname': styles.Option,
                          'options_data': OPTIONS[el['question']]
                        }}/>
                      </div>
                      </div>
                    )
                  }
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
}

/*
if (window.innerWidth > 700) {
  paired[r] = [];
  paired[r][c] = el;
  if ((idx+1) % 2 === 0) {
    r += 1;
    c = 0;
  } else {
    c += 1;
  }
}
else {
*/