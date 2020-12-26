import React, {useState, useReducer} from 'react';
import styles from './BidUnit.module.scss';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { DATETIMEFORMAT, DB_API } from '../../../constants';
import moment from 'moment';
import axios from 'axios';

import ResponsiveBar from './Chart/Chart';

function getCurrentTime() {

  const dSettingTime = new Date();
  const stringSettingTime =
      dSettingTime.getUTCFullYear() + "-" +
      ("0" + (dSettingTime.getUTCMonth()+1)).slice(-2) + "-" +
      ("0" + dSettingTime.getUTCDate()).slice(-2) + " " +
      ("0" + dSettingTime.getUTCHours()).slice(-2) + ":" +
      ("0" + dSettingTime.getUTCMinutes()).slice(-2) + ":" +
      ("0" + dSettingTime.getUTCSeconds()).slice(-2);
  const settingTime = moment(stringSettingTime, DATETIMEFORMAT);

  return [settingTime, stringSettingTime];
}

function toMomentTime(stringDatetime) {
  const dummy = moment(stringDatetime, DATETIMEFORMAT);
  console.log("toMomentTime: "+ dummy+" type: "+ typeof(dummy));
  return moment(stringDatetime, DATETIMEFORMAT);
}

function toStringTime(momentTime) {
  let returnTime;
  if (typeof(momentTime) == 'string') {
    returnTime = moment(momentTime, DATETIMEFORMAT);
  }
  else {
    returnTime = momentTime;
  }
  
  return returnTime.format(DATETIMEFORMAT);
}


export default function BidUnit(props) {
  
  const title = props.params.title;
  const element_name = props.params.element_name;
  const parity = props.parity;
  
  const [data, setData] = useState(window.localStorage.getItem(element_name+"_chart_data"));
  
  console.log("Data from LS: "+ window.localStorage.getItem(element_name+"_chart_data"));
  async function getDataForChart() {
    try {
      
      console.log("async - fetching data..");
      console.log("Fetching from: "+DB_API+"/"+element_name);
      const response = await axios.get(DB_API+"/"+element_name);
      console.log('Chart data received from DB for element_name: '+element_name);
      console.log(response.data);
      let newData = response.data;
      console.log("Now setting data state in async..");
      setData(newData);
      /*
      let newData = [
        {
          "name": "21:00-21:30",
          "Male": 25,
          "Female": 25
        },
        {
          "name": "21:30-22:00",
          "Male": 40,
          "Female": 50
        },
        {
          "name": "22:00-22:30",
          "Male": 30,
          "Female": 500
        },
        {
          "name": "22:30-23:00",
          "Male": 17,
          "Female": 15
        },
        {
          "name": "23:00-23:30",
          "Male": 45,
          "Female": 18
        }
      ];
      
      console.log("Data fetched, now setting in async..");
      setData(newData);
      */
    }
    catch (err) {
      console.log(err);
    }
  }

  if (data === null) {
    console.log("Data is null, so let's fetch");
    getDataForChart();
  }
  
  // console.log("Data just after fetch outside: "+ data[0]);
  /*
  const data = [
    {
      "name": "21:00-21:30",
      "Male": 25,
      "Female": 25
    },
    {
      "name": "21:30-22:00",
      "Male": 40,
      "Female": 50
    },
    {
      "name": "22:00-22:30",
      "Male": 30,
      "Female": 500
    },
    {
      "name": "22:30-23:00",
      "Male": 17,
      "Female": 15
    },
    {
      "name": "23:00-23:30",
      "Male": 45,
      "Female": 18
    }
  ];
  */

  console.log("Parity: ", parity);

  // check if user has voted already so as to display that status and selected checkbox choices
  let registeredVote = window.localStorage.getItem(element_name+"_registered_vote");
  
  // clear votes if expired
  const [currentTime, stringCurrentTime] = getCurrentTime();
  let storedExpirationTime = window.localStorage.getItem(element_name+"_registered_vote_expiration_time");
  
  let expirationTime;
  let stringExpirationTime;
  
  if (storedExpirationTime != null) {
    console.log("storedExpirationTime IF -- "+storedExpirationTime);
    expirationTime = toMomentTime(storedExpirationTime);
    console.log("currentTime -- "+stringCurrentTime);
    if (expirationTime.isBefore(currentTime)) {
      console.log('not null, expired');
      // set new expiration time ( = +1 day, 00 hr)
      // I think expirationTime should be made null, once expired.
      // - stringExpirationTime = toStringTime(currentTime.add(1, 'days').calendar()).slice(0, 10) + " 00:00:00";
      // - expirationTime = toMomentTime(stringExpirationTime);
      window.localStorage.removeItem(element_name+"_registered_vote_expiration_time");
      console.log(window.localStorage.getItem(element_name+"_registered_vote_expiration_time"));
      storedExpirationTime = null;
      expirationTime = null;
      // - window.localStorage.setItem(element_name+"_registered_vote_expiration_time", stringExpirationTime);
      // reset vote status
      window.localStorage.setItem(element_name+"_registered_vote", "Not Voted");
      registeredVote = window.localStorage.getItem(element_name+"_registered_vote");
    } else {
      console.log('not null, not expired');
      stringExpirationTime = toStringTime(expirationTime);
    }
  }
  else {
    console.log('null');
    console.log("storedExpirationTime ELSE -- "+storedExpirationTime);
    // set the initial default of vote status
    window.localStorage.setItem(element_name+"_registered_vote", "Not Voted");
    registeredVote = window.localStorage.getItem(element_name+"_registered_vote");
  }
  
  let selectedChoices = window.localStorage.getItem(element_name+"_selected_choices");
  console.log("Before check -- "+element_name+"_registered_vote: "+registeredVote);
  let memoryVoteStatus; // holds vote status of first visit/session
  if (registeredVote === null || registeredVote === "Not Voted") {
    memoryVoteStatus = false;
    selectedChoices = null;
    console.log("After check -- "+element_name+"_registered_vote: "+registeredVote);
  } else {
    memoryVoteStatus = true;
  }
  
  // console.log("Data just after fetch outside: "+ data[0]); // @@@@
  if (data != null) {
    console.log("Data is apparently not NULL");
    console.log(data);
    if (selectedChoices === null) {
      selectedChoices = {};
      data.map(el => selectedChoices[el["name"]] = false);
      console.log("After check (was null) -- "+element_name+"_selected_choices: "+JSON.stringify(selectedChoices));
    } else {
      selectedChoices = JSON.parse(selectedChoices);
      console.log("After check (was NOT null)-- "+element_name+"_selected_choices: "+JSON.stringify(selectedChoices));
    }
  }
  
  const [voteStatus, setVoteStatus] = useState(memoryVoteStatus);

  /*
  forceUpdate is reqd as when checkbox options are selected, voted and refreshed, 
  the options are highlighted correctly and actually toggle, but toggle happens only of the values,
  not visually, i.e. the highlights remain. It is possibly due to the initial render affixing the 'checked'
  prop on the input element.
  */
  // const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  function checkboxChangeHandler(e) {
    /*
    const current = selectedChoices[e.target.name];
    if (current == "checked") {
      selectedChoices[e.target.name] = "";
    }
    else {
      selectedChoices[e.target.name] = "checked";
    }
    */
    selectedChoices[e.target.name] = !selectedChoices[e.target.name];
    console.log("Registered checkbox selection: ", selectedChoices);
    // forceUpdate();
  }

  function refreshChart(e) {
    console.log("Refreshing chart");
    getDataForChart();
  }
  
  function registerVote(e) {
    // save status of whether user has voted or not for today
    window.localStorage.setItem(element_name+"_registered_vote", e.target.value);
    // save status of time of vote and expiration (fresh votes reqd at start of new day)
    
    
    const [settingTime, stringSettingTime] = getCurrentTime();
    
    window.localStorage.setItem(element_name+"_registered_vote_setting_time", stringSettingTime);
    // set expiration time
    console.log(settingTime);
    console.log(settingTime.add(1, 'days'));
    console.log(typeof(settingTime));
    stringExpirationTime = toStringTime(settingTime.add(1, 'days')).slice(0, 10) + " 00:00:00";
    expirationTime = toMomentTime(stringExpirationTime);
    window.localStorage.setItem(element_name+"_registered_vote_expiration_time", stringExpirationTime);
    // toggle vote status
    setVoteStatus(true);
    console.log("User has voted for "+element_name+"_registered_vote as: "+ e.target.value);
    // save checkbox choices in local storage for checkbox default selection
    window.localStorage.setItem(element_name+"_selected_choices", JSON.stringify(selectedChoices));
    console.log("User has voted for "+element_name+"_selected_choices as: "+ JSON.stringify(selectedChoices));
    // post to server to register user's votes - important!
    
    // trigger auto-refresh of chart
    
    // animate "Registering Vote" (in that callback, push css state to Voted - is rerender reqd anywhere?)

  }

  return (
    <div className={`${styles.BidUnit} ${parity}`}>
      <div className={styles.Title}>{title}</div>
      {
        data === null ?
         <div className={styles.NoData}></div>
        :
        <>
          <div className={styles.Chart}>
            <ResponsiveBar data={data}/>
          </div>
          <div className={styles.RefreshBlock}>
            <div className={styles.LastRefreshed}>last refreshed 10 mintues ago</div>
            <motion.button className={styles.Refresh} onClick={refreshChart}>Refresh</motion.button>
          </div>
          <div className={styles.VoteBlock}>
            <div className={styles.VoteSubBlock}>
              <div className={cn(styles.RegisteredVote, {[styles.Voted] : voteStatus})}>{registeredVote}</div>
              <motion.button className={styles.VoteButton} value="Voted" onClick={registerVote}>Vote!</motion.button>
            </div>
            <div className={styles.VoteOptions}>
              <form className={styles.FormVoteOptions}>
                {
                  data.map(
                    (el) => {
                      return (
                        <>
                          <input className={styles.VoteOption} type="checkbox" key={"input_"+el["name"]} id={el["name"]} 
                                  name={el["name"]} value={el["name"]} defaultChecked={selectedChoices[el["name"]]}
                                  onChange={checkboxChangeHandler}
                          />
                          <label className={styles.VoteOption} htmlFor={el["name"]} key={"label_"+el["name"]}> 
                            {window.innerWidth < 700 ? el["name"].slice(0, 5): el["name"]}
                          </label>
                        </>
                      )
                    }
                  )
                }            
              </form>
            </div>
          </div>  
      </>
        
      }
    </div>
  );
}