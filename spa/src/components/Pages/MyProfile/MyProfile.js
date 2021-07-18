import React, { useState, useEffect } from 'react';
import styles from './MyProfile.module.scss';
import cn from 'classnames';
import axios from 'axios';
import { API_KEY } from '../../../constants';
import { SUPPORTED_COUNTRIES } from './MyProfileQuestions';
import { BiErrorCircle } from 'react-icons/bi';

import { useRecoilState } from 'recoil';
import { userProfileState } from '../../globalState/userState';

import Header from '../../Headers/Header/Header';
import SideBar from '../../SideBar/SideBar';
import Backdrop from '../../basic/Backdrop/Backdrop';
import JackSpinner from '../../basic/Spinner/JackSpinner';
import { getCountrySpecificSpecialQuestions } from './MyProfileSpecialQuestions';
import { getCountrySpecificSpecialOptions } from './MyProfileSpecialOptions';
import { getCountrySpecificQuestions } from './MyProfileQuestions';
import { getCountrySpecificOptions } from './MyProfileOptions';
import { DEFAULT_COUNTRY, EMPTY_FORM_VAL } from '../../../constants';
import SingleValDropdown from "../../basic/Dropdown/SingleValDropdown/SingleValDropdown";
import SlicerDropdown from "../../basic/Dropdown/SlicerDropdown/SlicerDropdown";
import { MAPS_API } from '../../../constants';

export default function MyProfile() {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  const questions = getCountrySpecificQuestions(userProfile["currentCountry"] || DEFAULT_COUNTRY);
  const options = getCountrySpecificOptions(userProfile["currentCountry"] || DEFAULT_COUNTRY);
  const spQuestions = getCountrySpecificSpecialQuestions(userProfile["currentCountry"] || DEFAULT_COUNTRY);
  const spOptions = getCountrySpecificSpecialOptions(userProfile["currentCountry"] || DEFAULT_COUNTRY);
  console.log(spQuestions);
  useEffect(() => {
    async function getGeoLocation() {
      async function getReverseGeocode(lat, long) {
        try {
          console.log(`outside, after geoloc, before axios LAT: ${lat} | LONG: ${long}`);
          const response = await axios.get(`${MAPS_API}latlng=${lat},${long}&key=${API_KEY}&filter_type=country`);
          console.log("After axios");
          setLoading(false);
          const data = JSON.parse(JSON.stringify(response.data));
          const arr = data['results'][0]['address_components'];
          let country = null;
          for (let i in arr) {
            if (arr[i]['types'].includes("country")) {
              country = arr[i]['long_name'];
            }
          }
          if (country !== null) {
            console.log(`Current country identified via Google Maps API as ${country}`);
            if (!(SUPPORTED_COUNTRIES.includes(country))) {
              console.log(`We're sorry, but we are currently non-operational in ${country}`);
              setError(`We're sorry, but we are currently non-operational in ${country}`);
              setTimeout(() => {
                setError("");
              }, 2000);
            } else {
              setUserProfile(u => ({...u, currentCountry: country}));
            }
          } else {
            console.log(`Current country could not be identified via Google Maps API`);
          }
        } catch (err) {
          console.log(err);
          setError(`It looks like you had previously declined permissions for Geolocation. Kindly select country manually.`);
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      }
      
      setLoading(true);
      // await new Promise(r => setTimeout(r, 5000)); // to sleep for 5s
      navigator.geolocation.getCurrentPosition(
        position => {
          let lat, long;
          lat = position.coords.latitude;
          long = position.coords.longitude;
          console.log(`inside LAT: ${lat} | LONG: ${long}`);
          getReverseGeocode(lat, long);
        },
        err => {
          console.log(err);
          setError(`Error occurred during geolocation. Kindly select country manually.`);
          setTimeout(() => {
            console.log("Vanishing the error prompt & loader");
            setError("");
            setLoading(false);
          }, 2000);
        }
      );
    }
    getGeoLocation();      
      
    return () => {}; // way to unsubscribe as per doc
  }, []);

  if (questions.length % 2 !== 0) {
    // so that questions are in pairs (looks consistent & pleasant in pair-mode)
    const dummy = 'Dummy question. Please ignore.';
    questions.push({
      'question': dummy,
      'type': 'simple_dropdown',
    });
    options[dummy] = [];
    options[dummy].push({'option_value': '-- empty --', 'option_display_value': '-- empty --'});
  }

  function currentCountryHandler(e) {
    console.log("currentCountryHandler: "+e.target.value);
    setUserProfile(u => ({...u, currentCountry: e.target.value}));
  }

  function currentCityHandler(e) {
    setUserProfile(u => ({...u, currentCity: e.target.value}));
  }

  function getOnChange(q) {
    if (q === "Current Country") return currentCountryHandler;
    else if (q === "Current City") return currentCityHandler;
  }

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
              {loading && <JackSpinner />}
              {
                error && 
                <div className={styles.InfoPromptWrapper}>
                  <div className={styles.InfoPrompt}>
                    <BiErrorCircle className={styles.ErrorCircle}/>
                    <div className={styles.InfoText}>{error}</div>
                  </div>
                </div>
              }
              {
                questions.map((el, idx) => {
                  let selectedOption = userProfile['currentCountry'] || undefined;
                  let selectDisabled = false;
                  let selectStyle = cn(styles.Select, styles.Enabled);
                  // determine style class
                  if (el['question'] !== 'Current Country') {
                    selectedOption = undefined;
                    if (!userProfile['currentCountry']) {
                      selectStyle = cn(styles.Select, styles.Disabled);
                      selectDisabled = true;
                    }
                  } else {
                    options[el['question']].splice(0, 1); // remove double default value
                  }               

                  if (el['type'] === 'simple_dropdown') {
                    console.log("simple  "+el['question']);
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
                        <SingleValDropdown key={'my_profile_slicer_dropdown_'+idx} props={{
                          'select_classname': selectStyle,
                          'select_name': el['question']+idx+'select',
                          'select_id': el['question']+idx+'select',
                          'option_classname': styles.Option, // {userProfile['currentCountry'] ? : ;}
                          'options_data': options[el['question']],
                          'special_onchange': getOnChange(el['question']),
                          'selected_option': selectedOption,
                          'select_disabled': selectDisabled,
                        }}/>
                      </div>
                      </div>
                    )
                  }
                }
                )
              }
            </div>
            {
              spQuestions.map((el, idx) => {
                let selectDisabled = userProfile['currentCountry'] ? false : true;

                if (el['type'] === 'slicer_dropdown') {
                  console.log("slicer  "+el['question']);
                  console.log(spOptions[el['question_id']]);
                  return (
                    <SlicerDropdown key={'my_profile_slicer_dropdown_'+idx} props={{
                        'id': idx,
                        'question': el['question'],
                        'helper_info': el['helper_info'],
                        'options_data': spOptions[el['question_id']],
                        'select_disabled': selectDisabled,
                      }}/>
                  )
                }
              }
              )
            }
          </div>
        </div>
      </div>
    </div>
  ); 
}

