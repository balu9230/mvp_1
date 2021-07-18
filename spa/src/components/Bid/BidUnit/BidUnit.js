import React, {useState, useEffect, useRef} from 'react';
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
      console.log('fetched data');
      console.log(JSON.parse(JSON.stringify(fetchedData)));
      console.log("Now setState using retrieved data state within async function..");
      await set(element_name+"_chart_data", fetchedData);
      setData(fetchedData);
    }
    catch (err) {
      console.log(err);
    }
  }

  /** Get saved state from IndexedDB */
  const [data, setData] = useState([]);
  // read from IDB: to fetch chart data from IDB - runs only once, after the first render
  useEffect(() => {
    console.log("Only 1-time useEffect started for chart data");
    get(element_name+"_chart_data")
    .then(val => {
      console.log(`Check if chart data is available from IDB: ${val} | type: ${typeof (val)}`);
      if (val === undefined) {
        console.log("Chart data is undefined, hence fetching latest data from server.");
        console.log(val);
        getDataForChart();
      } else {
        console.log("Chart data is available in IDB, hence setting data with IDB value.");
        console.log(val);
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

  const selectedChoices = useRef({});
  // console.log("got startingChoicesObj: ");
  // console.log(startingChoicesObj);
  const [expiryStatus, setExpiryStatus] = useState(undefined);
  // read from IDB: to fetch vote expiration time from IDB - runs only once, after the first render
  useEffect(() => {
    console.log("Only 1-time useEffect started for vote-cum-options expiry");
    get(element_name+"_registered_vote_expiration_time")
    .then(val => {
      console.log(`Check if expiration time for registered vote was saved & is available from IDB: ${val} | type: ${typeof (val)}`);
      if (val === undefined) {
        console.log("expiryStatus is undefined as no expiration time found, doing nothing as of now.");
        // do nothing
      } else {
        console.log("expiryStatus to be evaluated as storedExpirationTime is available in IDB");
        const [currentTime, _] = getCurrentTime();
        const expirationTime = val;
        if (expirationTime.isBefore(currentTime)) {
          console.log('Expiration time has been crossed aka '
          + '1. expiration time to be cleared from IDB '
          + '2. selected options to be discarded/reset '
          + '3. vote status to be reset'
          );
          del(element_name+"_registered_vote_expiration_time")
          .then(() => console.log("Expiration time for registered vote has been deleted asynchronously."));
          setExpiryStatus(true);
          setVoteStatus(false);
          // read from IDB: to fetch selected choices from IDB
          get(element_name+"_selected_choices")
          .then(val => {
            console.log(`Check if obj of selected choices is saved & is available from IDB: ${val} | type: ${typeof (val)}`);
              if (val === undefined) {
                console.log("selectedChoices is undefined, no need to do anything.");
                // startingChoicesObj = {};
              } else {
                console.log("selectedChoices is available in IDB, clear out the selected values.");
                // startingChoicesObj = {};
                del(element_name+"_selected_choices")
                .then(() => console.log("Cleared selected choices cache from IDB as initial expiryStatus is true."));
              }
            }
          )
        } else {
          console.log('Expiration time has not been crossed aka options selected options can be retained');
          setExpiryStatus(false);
          setVoteStatus(true);
          // read from IDB: to fetch selected choices from IDB
          get(element_name+"_selected_choices")
          .then(val => {
            console.log(`Check if obj of selected choices is saved & is available from IDB: ${val} | type: ${typeof (val)}`);
              if (val === undefined) {
                console.log("selectedChoices is undefined, no need to do anything.");
                // startingChoicesObj = val;
              } else {
                console.log("selectedChoices is available in IDB, display the selected values.");
                selectedChoices.current = val;
              }
            }
          )
        }
      }
    }
   )
  }, []);

  // set new expiration time ( = +1 day, 00 hr)
  // I think expirationTime should be made null, once expired.
  // - stringExpirationTime = toStringTime(currentTime.add(1, 'days').calendar()).slice(0, 10) + " 00:00:00";
  // - expirationTime = toMomentTime(stringExpirationTime);

  // Define key:value pairs for selectedChoices once data is available.. the data's keys becomes keys for this
  if (data.length > 0) {
    console.log("Data is apparently not empty array. Data: ");
    console.log(JSON.parse(JSON.stringify(data)));
    if (Object.keys(selectedChoices.current).length === 0) {
      // Only first time, this will execute, if sC not in IDB and non-null data is acquired for first time
      data.map(el => selectedChoices.current[el["name"]] = false); // eg: selectedChoices.current = {'option1': false, 'option1': false, ...}
      console.log(`selectedChoices (is a useRef object) is empty from IDB.. now with chart data, set each option's value to false: ${selectedChoices}`);
      console.log("Also, all options are unselected, then again to reset."); // #### shd be part of onChange for select
    } else {
      console.log("selectedChoices is not empty from IDB or from useRef. So all set for display. Doing nothing here");
    }
  } else {
    console.log(`Selected choices is not even going to render, so need not worry about its value: ${selectedChoices}`);
  }

  /*
  forceUpdate is reqd as when checkbox options are selected, voted and refreshed, 
  the options are highlighted correctly and actually toggle, but toggle happens only of the values,
  not visually, i.e. the highlights remain. It is possibly due to the initial render affixing the 'checked'
  prop on the input element.
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  */

  function refreshChart(e) {
    console.log("Refreshing chart");
    getDataForChart();
  }
  
  function numOptionsSelected() {
    let counter = 0;
    
    if (Object.keys(selectedChoices.current).length !== 0 && selectedChoices.constructor === Object) {
      console.log("numOptionsSelected, selectedChoices: ");
      console.log(selectedChoices);
      Object.keys(selectedChoices.current).map(el => {if (selectedChoices.current[el] === true) counter++;})
    }
    
    console.log(`counter: ${counter} | votable: ${(counter > 0) ? true : false}`);
    return (counter > 0) ? true : false;
  }

  const [votable, setVotable] = useState(false);
  
  function checkboxChangeHandler(e) {
    console.log("$$ targetName: "+e.target.name);
    let optionName = e.target.name; // to ensure short and long names of options match (like for time slot)
    console.log(data[0], data[1]);
    for (let k of Object.keys(data)) {
      if (data[k]["name"].startsWith(e.target.name)) {
        // console.log(`${k} starts with ${e.target.name}?`);
        optionName = data[k]["name"];
      }
      else {
        console.log(`${data[k]["name"]} does NOT start with ${e.target.name}?`);
      }
    }
    console.log("optionName: "+optionName);
    selectedChoices.current[optionName] = !selectedChoices.current[optionName];
    console.log("Registered new checkbox selection: ", selectedChoices);
    set(element_name+"_selected_choices", selectedChoices.current)
    .then(() => console.log("Setting new selected choices to IDB cache."));
    setVotable(numOptionsSelected());
  }

  function registerVote(e) {
    console.log(`Register vote initiated..`);
    // register vote status
    setVoteStatus(true);
    // push selected choices to server

    // save vote options to IDB (already happens for every checkbox onChange - so need not implement here)
    set(element_name+"_vote_status", voteStatus)
    .then(() => console.log(`Registered to IDB the new vote status for ${element_name}: ${voteStatus}`));
  }

  console.log("Rendering HTML now. Data | selected choices | voteStatus | expiryStatus | votable");
  console.log(JSON.parse(JSON.stringify(data)));
  console.log(JSON.parse(JSON.stringify(selectedChoices)));
  console.log(voteStatus); console.log(expiryStatus); console.log(votable);
  return (
    <div className={`${styles.BidUnit} ${parity}`}>
      {/* <div className={styles.BidBox}> */}
        <div className={styles.Title}>{title}</div>
        {
          (data === undefined || selectedChoices === undefined || selectedChoices === {}) ?
          <div className={styles.NoData}></div>
          :
          <>
            <div className={styles.Chart}>
              <ResponsiveBar data={data}/>
            </div>
            <div className={styles.RefreshBlock}>
              <div className={styles.LastRefreshed}>last refreshed 10 minutes ago</div>
              <motion.button className={styles.Refresh} onClick={refreshChart}>Refresh</motion.button>
            </div>
            <div className={styles.VoteBlock}>
              <div className={styles.VoteSubBlock}>
                <div className={cn(styles.RegisteredVote, {[styles.Voted] : voteStatus})}>{voteStatus ? "Voted" : "Not Voted"}</div>
                <motion.button className={cn(styles.VoteButton, {[styles.Unvotable] : !votable})} value="Voted" disabled={!votable} onClick={registerVote}>Vote!</motion.button>
              </div>
              <div className={styles.VoteOptions}>
                <form className={styles.FormVoteOptions}>
                  {
                    data.map(
                      (el) => {
                        console.log(el["name"]);
                        return (
                          <>
                            <input className={styles.VoteOption} type="checkbox" key={"input_"+el["name"]} id={el["name"]} 
                                    name={el["name"]} value={el["name"]} defaultChecked={selectedChoices.current[el["name"]]}
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
      {/* </div> */}
    </div>
  );
}