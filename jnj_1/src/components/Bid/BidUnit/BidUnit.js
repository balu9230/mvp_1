import React, {useState, useEffect, useReducer} from 'react';
import styles from './BidUnit.module.scss';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { DATETIMEFORMAT, DB_API } from '../../../constants';
import moment from 'moment';
import axios from 'axios';
import { set, get, del } from 'idb-keyval';

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
  
  console.log("Component render has started");
  const title = props.params.title;
  const element_name = props.params.element_name;
  const parity = props.parity;

  async function getDataForChart() {
    try {
      console.log("Fetching asynchronously from: "+DB_API+"/"+element_name);
      const response = await axios.get(DB_API+"/"+element_name);
      console.log('Chart data received from DB for element_name: '+element_name);

      let fetchedData = response.data;
      console.log("Now setState using retrieved data state within async function..");
      await set(element_name+"_chart_data", fetchedData);
      setData(fetchedData);
    }
    catch (err) {
      console.log(err);
    }
  }

  /** Get saved state from IndexedDB */
  const [data, setData] = useState(undefined);
  // read from IDB: to fetch chart data from IDB - runs only once, after the first render
  useEffect(() => {
    console.log("Only 1-time useEffect started for chart data");
    get(element_name+"_chart_data")
    .then(val => {
      console.log(`Check if chart data is available from IDB: ${val} | type: ${typeof (val)}`);
      if (val === undefined) {
        console.log("Chart data is undefined, hence fetching latest data from server.");
        getDataForChart();
      } else {
        console.log("Chart data is available in IDB, hence setting data with IDB value.");
        setData(val);
      }
    }
    )
  }, []);

  const [voteStatus, setVoteStatus] = useState(undefined);
  // read from IDB: to fetch vote status from IDB - runs only once, after the first render
  useEffect(() => {
    console.log("Only 1-time useEffect started for vote status");
    get(element_name+"_vote_status")
    .then(val => {
      console.log(`Check if vote was ever registered & is available from IDB: ${val} | type: ${typeof (val)}`);
      if (val === undefined) {
        console.log("voteStatus is undefined, doing nothing as of now.");
        // do nothing
      } else {
        console.log("voteStatus is available in IDB, hence setting data with IDB value.");
        setVoteStatus(val);
      }
    }
    )
  }, []);

  const [storedExpirationTime, setStoredExpirationTime] = useState(undefined);
  // read from IDB: to fetch vote expiration time from IDB - runs only once, after the first render
  useEffect(() => {
    console.log("Only 1-time useEffect started for vote expiration time");
    get(element_name+"_registered_vote_expiration_time")
    .then(val => {
      console.log(`Check if expiration time for registered vote was saved & is available from IDB: ${val} | type: ${typeof (val)}`);
      if (val === undefined) {
        console.log("storedExpirationTime is undefined, doing nothing as of now.");
        // do nothing
      } else {
        console.log("storedExpirationTime is available in IDB, hence setting data with IDB value.");
        setStoredExpirationTime(val);
      }
    }
    )
  }, []);

  const [selectedChoices, setSelectedChoices] = useState(undefined);
  // read from IDB: to fetch selected choices from IDB - runs only once, after the first render
  useEffect(() => {
    console.log("Only 1-time useEffect started for selected choices");
    get(element_name+"_selected_choices")
    .then(val => {
      console.log(`Check if obj of selected choices is saved & is available from IDB: ${val} | type: ${typeof (val)}`);
      if (val === undefined) {
        console.log("selectedChoices is undefined, doing nothing as of now.");
        // do nothing
      } else {
        console.log("selectedChoices is available in IDB, hence setting data with IDB value.");
        setSelectedChoices(val);
      }
    }
    )
  }, []);
  
  // clear votes if expired
  const [currentTime, stringCurrentTime] = getCurrentTime();
  
  let expirationTime;
  let stringExpirationTime;
  
  useEffect(() => {
    console.log(`Detected change in storedExpirationTime, useEffect activated.`);
    if (storedExpirationTime !== undefined) {
      console.log(`storedExpirationTime is not null, storedExpirationTime: ${storedExpirationTime} | currentTime: ${stringCurrentTime}`);
      expirationTime = toMomentTime(storedExpirationTime);
      if (expirationTime.isBefore(currentTime)) {
        console.log('Expiration time has been crossed aka options selected options have expired');
        // set new expiration time ( = +1 day, 00 hr)
        // I think expirationTime should be made null, once expired.
        // - stringExpirationTime = toStringTime(currentTime.add(1, 'days').calendar()).slice(0, 10) + " 00:00:00";
        // - expirationTime = toMomentTime(stringExpirationTime);
        del(element_name+"_registered_vote_expiration_time")
        .then(() => console.log("Expiration time for registered vote has been deleted asynchronously."))
        
        setStoredExpirationTime(undefined);
        expirationTime = undefined;
        // reset vote status
        setVoteStatus(false);
      } else {
        console.log('Expiration time has not been crossed aka options selected options have not expired');
        // do nothing
      }
    }
    else {
      console.log(`storedExpirationTime is undefined, storedExpirationTime: ${storedExpirationTime}`);
      // set the initial default of vote status
      setVoteStatus(false);
    }
  }, [storedExpirationTime]);
  
  useEffect(() => {
    console.log(`Detected change in voteStatus, useEffect activated.`);
    set(element_name+"_vote_status", voteStatus)
    .then(() => console.log(`Registering to IDB the new vote status for ${element_name}: ${voteStatus}`));
    
    if (voteStatus) {
      // save status of time of vote and expiration (fresh votes reqd at start of new day)
      const [settingTime, stringSettingTime] = getCurrentTime();
      
      // set expiration time and save
      stringExpirationTime = toStringTime(settingTime.add(1, 'days')).slice(0, 10) + " 00:00:00";
      expirationTime = toMomentTime(stringExpirationTime);
      setStoredExpirationTime(expirationTime);

      // save checkbox choices in local storage for checkbox default selection
      setSelectedChoices(selectedChoices);
      console.log(`User has voted for ${element_name}_selected_choices as: ${JSON.stringify(selectedChoices)}`);
      // post to server to register user's votes - important!
      
      // trigger auto-refresh of chart
      
      // animate "Registering Vote" (in that callback, push css state to Voted - is rerender reqd anywhere?)
      
    }
    else {
      console.log("Not even one vote option has been selected. Hence, NOT registering vote.");
    }
  }, [voteStatus]);
  
  useEffect(() => {
    console.log(`Data change detected (useEffect)`);
    if (data !== undefined) {
      console.log(`Data is apparently not null. Data: ${data}`);
      if (selectedChoices === undefined) {
        setSelectedChoices(() => {
          const tempChoiceBuilder = {};
          data.map(el => tempChoiceBuilder[el["name"]] = false);
          console.log(`Setting selectedChoices with tempBuilder: ${tempChoiceBuilder}`);
          return [tempChoiceBuilder];
        });
        console.log(`Selected choices (data was not null) for first time (i.e., when choices are still undefined): ${JSON.stringify(selectedChoices)}`);
      } else {
        console.log(`Selected choices (data was not null) for non-first time: ${selectedChoices}`);
      }
    }
  }, [data]);

  /*
  forceUpdate is reqd as when checkbox options are selected, voted and refreshed, 
  the options are highlighted correctly and actually toggle, but toggle happens only of the values,
  not visually, i.e. the highlights remain. It is possibly due to the initial render affixing the 'checked'
  prop on the input element.
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  */

  function checkboxChangeHandler(e) {
    selectedChoices[e.target.name] = !selectedChoices[e.target.name];
    console.log("Registered new checkbox selection: ", selectedChoices);
    // forceUpdate();
  }

  function refreshChart(e) {
    console.log("Refreshing chart");
    getDataForChart();
  }
  
  function numOptionsSelected() {
    let counter = 0;
    if (selectedChoices !== undefined) {
      console.log("numOptionsSelected, type of selectedChoices: "+typeof(selectedChoices));
      console.log({selectedChoices});
      selectedChoices.map(el => {if (selectedChoices[el] === true) counter++;})
    }
    console.log(`counter: ${counter} | votable: ${(counter > 0) ? true : false}`);
    return (counter > 0) ? true : false;
  }

  const [votable, setVotable] = useState(numOptionsSelected());
  
  useEffect(() => {
    console.log(`'votable' (i.e., at least one option selected?) change detected (useEffect)`);
    if (votable) {
      console.log("At least one vote option has been selected. Hence, registering vote..");
      // save status of whether user has voted or not for today
      setVoteStatus(true);
    }
    else {
      console.log("Not even one vote option has been selected. Hence, NOT registering vote.")
    }
  }, [votable]);

  function registerVote(e) {
    console.log("onClick registerVote has been triggered.");
    setVotable(numOptionsSelected());
    console.log("setVotable has been triggered, will update state async");
  }

  console.log("Rendering HTML now. Data | selected choices | voteStatus | expiration time:");
  console.log(data); console.log(selectedChoices); console.log(voteStatus); console.log(storedExpirationTime); 
  return (
    <div className={`${styles.BidUnit} ${parity}`}>
      <div className={styles.Title}>{title}</div>
      {
        (data === undefined || selectedChoices === undefined) ?
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
              <div className={cn(styles.RegisteredVote, {[styles.Voted] : voteStatus})}>{voteStatus ? "Voted" : "Not Voted"}</div>
              <motion.button className={cn(styles.VoteButton, {[styles.Unvotable] : !votable})} value="Voted" onClick={registerVote}>Vote!</motion.button>
            </div>
            <div className={styles.VoteOptions}>
              <form className={styles.FormVoteOptions}>
                {
                  data.map(
                    (el) => {
                      console.log(el);
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



/*
import { useState, useEffect, useCallback } from "react";
import { set, get } from "idb-keyval";

export function usePersistedState(keyToPersistWith, defaultState) {
    const [state, setState] = useState(undefined);

    useEffect(() => {
        get(keyToPersistWith).then(retrievedState =>
            // If a value is retrieved then use it; otherwise default to defaultValue
            setState(retrievedState ?? defaultState));
    }, [keyToPersistWith, setState, defaultState]);
    
    const setPersistedValue = useCallback((newValue) => {
        setState(newValue);
        set(keyToPersistWith, newValue);
    }, [keyToPersistWith, setState]);
    
    return [state, setPersistedValue];
}
*/